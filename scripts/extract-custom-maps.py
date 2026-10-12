#!/usr/bin/env python3
"""Package custom (non-stock) TS maps into self-contained zips.

For every BSP in the custom game dir that isn't a stock TS 3.0 map, collect
everything a client needs to play it: the BSP, companion files in maps/,
skybox, detail textures, overview, models/sprites/sounds referenced by
entities, and the WADs that actually provide its external textures. The
map's .res file (if any) is merged in too. Files that ship with stock TS or
Half-Life are left out. Each map becomes <out>/<map>.zip laid out relative to
the ts/ dir, plus a manifest.json describing contents and missing files.

Usage:
  python3 -I scripts/extract-custom-maps.py \\
      --custom ~/dev/hl/ts_custom \\
      --stock ~/dev/hl/ts_original --stock ~/dev/hl/xash3d-ts/valve \\
      --out public/downloads/maps --site-data src/data/custom-maps.json
"""

import argparse
import json
import os
import re
import struct
import sys
import zipfile

SKY_SIDES = ("bk", "dn", "ft", "lf", "rt", "up")
# Map-companion extensions that are scratch/editor files, not game content.
SKIP_COMPANION = {".ztmp", ".bak", ".resgen", ".mdwn", ".bsp", ".ini", ".prt", ".lin", ".pts", ".log", ".err"}
RESOURCE_RE = re.compile(r"\.(mdl|spr|wav|mp3|tga|bmp|wad|txt)$", re.I)


class GameDir:
    """Case-insensitive index of every file under a game directory."""

    def __init__(self, root):
        self.root = os.path.abspath(os.path.expanduser(root))
        self.files = {}
        for dirpath, _, names in os.walk(self.root):
            for n in names:
                full = os.path.join(dirpath, n)
                rel = os.path.relpath(full, self.root).replace(os.sep, "/")
                self.files.setdefault(rel.lower(), rel)

    def find(self, rel):
        hit = self.files.get(rel.replace("\\", "/").lower())
        return hit and os.path.join(self.root, hit), hit

    def __contains__(self, rel):
        return rel.replace("\\", "/").lower() in self.files


def read_bsp(path):
    """Return (entities, external texture names) from a v30 GoldSrc BSP."""
    with open(path, "rb") as f:
        data = f.read()
    version = struct.unpack_from("<i", data, 0)[0]
    if version != 30:
        raise ValueError(f"unsupported BSP version {version}")
    lumps = [struct.unpack_from("<ii", data, 4 + i * 8) for i in range(15)]

    off, length = lumps[0]
    text = data[off:off + length].split(b"\0", 1)[0].decode("latin-1")
    entities = []
    for block in re.findall(r"\{(.*?)\}", text, re.S):
        entities.append(dict(re.findall(r'"([^"]*)"\s*"([^"]*)"', block)))

    off, length = lumps[2]
    external = set()
    if length >= 4:
        count = struct.unpack_from("<i", data, off)[0]
        for i in range(count):
            mip = struct.unpack_from("<i", data, off + 4 + i * 4)[0]
            if mip < 0:
                continue
            base = off + mip
            name = data[base:base + 16].split(b"\0", 1)[0].decode("latin-1").lower()
            first_mip = struct.unpack_from("<I", data, base + 24)[0]
            if name and first_mip == 0:
                external.add(name)
    return entities, external


_wad_cache = {}


def wad_textures(path):
    if path not in _wad_cache:
        names = set()
        try:
            with open(path, "rb") as f:
                magic, count, diroff = struct.unpack("<4sii", f.read(12))
                if magic in (b"WAD3", b"WAD2"):
                    f.seek(diroff)
                    for _ in range(count):
                        entry = f.read(32)
                        if len(entry) < 32:
                            break
                        names.add(entry[16:32].split(b"\0", 1)[0].decode("latin-1").lower())
        except (OSError, struct.error):
            pass
        _wad_cache[path] = names
    return _wad_cache[path]


def entity_resources(entities):
    """Yield game-relative paths referenced by entity key values."""
    for ent in entities:
        for key, value in ent.items():
            v = value.strip().replace("\\", "/")
            if not v or v.startswith("*") or not RESOURCE_RE.search(v):
                continue
            low = v.lower()
            if low.endswith((".wav", ".mp3")) and not low.startswith("sound/"):
                v = "sound/" + v.lstrip("!/")
            yield v


def read_res(path):
    with open(path, encoding="latin-1") as f:
        for line in f:
            line = line.split("//", 1)[0].strip().strip('"')
            if line:
                yield line.replace("\\", "/")


def wad_list(worldspawn):
    for w in re.split(r"[;]", worldspawn.get("wad", "")):
        w = w.strip().replace("\\", "/")
        if w:
            yield os.path.basename(w)


def model_extras(gamedir, rel):
    """Studio models can split textures (fooT.mdl) and sequences (foo01.mdl)."""
    stem = rel[:-4]
    yield stem + "t.mdl"
    for i in range(1, 10):
        yield f"{stem}{i:02d}.mdl"


def parse_readme(path):
    info = {}
    if not path:
        return info
    try:
        with open(path, encoding="latin-1") as f:
            text = f.read(8000)
    except OSError:
        return info
    for key, field in (("title", r"title"), ("author", r"author(?: of map)?|creator|by")):
        m = re.search(rf"^\s*(?:{field})\s*[:=]\s*(.+?)\s*$", text, re.I | re.M)
        if m:
            info[key] = m.group(1).strip()
    return info


def package(name, custom, stocks, out_dir):
    bsp_path, bsp_rel = custom.find(f"maps/{name}.bsp")
    entities, external = read_bsp(bsp_path)
    world = entities[0] if entities else {}

    wanted = {bsp_rel}
    lname = name.lower()
    for rel_low, rel in custom.files.items():
        if rel_low.startswith("maps/"):
            stem, ext = os.path.splitext(rel_low[5:])
            if stem == lname and ext not in SKIP_COMPANION:
                wanted.add(rel)
        elif rel_low.startswith("overviews/") and os.path.splitext(rel_low[10:])[0] == lname:
            if not rel_low.endswith(".ztmp"):
                wanted.add(rel)

    sky = world.get("skyname", "").strip()
    if sky:
        for side in SKY_SIDES:
            for ext in ("tga", "bmp"):
                if f"gfx/env/{sky}{side}.{ext}" in custom:
                    wanted.add(f"gfx/env/{sky}{side}.{ext}")
                    break
            else:
                wanted.add(f"gfx/env/{sky}{side}.tga")

    detail_path, _ = custom.find(f"maps/{name}_detail.txt")
    if detail_path:
        with open(detail_path, encoding="latin-1") as f:
            for line in f:
                parts = line.split()
                if len(parts) >= 2 and not line.lstrip().startswith("//"):
                    wanted.add(f"gfx/{parts[1]}.tga")

    refs = set(entity_resources(entities))
    res_path, _ = custom.find(f"maps/{name}.res")
    if res_path:
        refs.update(read_res(res_path))
    for ref in sorted(refs):
        if ref.lower().endswith(".wad"):
            continue  # WADs are chosen by texture coverage below
        wanted.add(ref)
        if ref.lower().endswith(".mdl"):
            wanted.update(e for e in model_extras(custom, ref) if e in custom)

    # Pick WADs: walk the worldspawn list in order, take a custom WAD only if
    # it provides an external texture not already covered by a stock WAD.
    needed = set(external)
    wads_used = []
    for wad in wad_list(world):
        stock_hit = next((s.find(wad)[0] for s in stocks if wad in s), None)
        path, rel = custom.find(wad)
        source = stock_hit or path
        if not source or not needed:
            continue
        provides = wad_textures(source) & needed
        if provides:
            needed -= provides
            if not stock_hit:
                wanted.add(rel)
                wads_used.append(rel)

    # References often differ only in case, so dedupe case-insensitively.
    files, missing, stock_skipped, seen = [], [], [], set()
    for rel in sorted(wanted, key=str.lower):
        if rel.lower() in seen:
            continue
        seen.add(rel.lower())
        if any(rel in s for s in stocks):
            stock_skipped.append(rel)
            continue
        path, real = custom.find(rel)
        if path:
            files.append((path, real))
        else:
            missing.append(rel)

    zip_path = os.path.join(out_dir, f"{name}.zip")
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        for path, rel in files:
            z.write(path, rel)

    readme = next((p for p, r in files if r.lower() == f"maps/{lname}.txt"), None)
    return {
        "name": name,
        "zip": os.path.basename(zip_path),
        "zipSize": os.path.getsize(zip_path),
        "bspSize": os.path.getsize(bsp_path),
        "skyname": sky or None,
        "wads": wads_used,
        "unresolvedTextures": sorted(needed),
        "files": [r for _, r in files],
        "missing": missing,
        "stockSkipped": len(stock_skipped),
        **parse_readme(readme),
    }


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--custom", required=True, help="game dir containing custom maps")
    ap.add_argument("--stock", action="append", default=[], help="stock game dir(s) to exclude (repeatable)")
    ap.add_argument("--out", required=True, help="output directory for zips + manifest.json")
    ap.add_argument("--site-data", help="also write a trimmed listing for the website here")
    ap.add_argument("maps", nargs="*", help="only package these maps")
    args = ap.parse_args()

    custom = GameDir(args.custom)
    stocks = [GameDir(s) for s in args.stock]
    stock_maps = {os.path.splitext(r)[0][5:] for s in stocks for r in s.files if r.startswith("maps/") and r.endswith(".bsp")}
    names = sorted(
        (os.path.splitext(rel)[0][5:] for low, rel in custom.files.items()
         if re.fullmatch(r"maps/[^/]+\.bsp", low) and low[5:-4] not in stock_maps),
        key=str.lower,
    )
    if args.maps:
        want = {m.lower() for m in args.maps}
        names = [n for n in names if n.lower() in want]

    out_dir = os.path.abspath(os.path.expanduser(args.out))
    os.makedirs(out_dir, exist_ok=True)
    manifest, failed = [], []
    for name in names:
        try:
            entry = package(name, custom, stocks, out_dir)
        except (ValueError, struct.error, OSError) as err:
            failed.append({"name": name, "error": str(err)})
            print(f"FAIL {name}: {err}", file=sys.stderr)
            continue
        manifest.append(entry)
        flags = []
        if entry["missing"]:
            flags.append(f"{len(entry['missing'])} missing")
        if entry["unresolvedTextures"]:
            flags.append(f"{len(entry['unresolvedTextures'])} textures unresolved")
        print(f"{name:28} {len(entry['files']):4} files {entry['zipSize'] / 1e6:7.1f} MB  {', '.join(flags)}")

    with open(os.path.join(out_dir, "manifest.json"), "w") as f:
        json.dump({"maps": manifest, "failed": failed}, f, indent=2)
    if args.site_data:
        site = [
            {k: e[k] for k in ("name", "zip", "zipSize", "bspSize", "title", "author") if e.get(k) is not None}
            | {"files": len(e["files"]), "complete": not e["missing"] and not e["unresolvedTextures"]}
            for e in manifest
        ]
        with open(args.site_data, "w") as f:
            json.dump(site, f)
            f.write("\n")
    print(f"\n{len(manifest)} packaged, {len(failed)} failed -> {out_dir}")


if __name__ == "__main__":
    main()
