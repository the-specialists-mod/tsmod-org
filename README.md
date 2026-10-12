# tsmod.org

The community website for **The Specialists**, the Half-Life action movie mod. Built with Vite, React,
Tailwind CSS and shadcn/ui, and served by a Cloudflare Worker.

Content draws on the original [specialistsmod.net](https://github.com/The-Specialists-Archive/specialistsmod.net)
(2007), the previous [tsmod.org](https://github.com/The-Specialists-Archive/tsmod.org), the
[launcher](https://github.com/the-specialists-mod/tsmod-launcher) and the
[Rust port](https://github.com/the-specialists-mod/the-specialistsmod-rs).

## Develop

The community map zips are stored with [Git LFS](https://git-lfs.com), so install it before cloning
(or run `git lfs pull` afterwards). Without it the zips are tiny pointer files and deploys serve
broken downloads.

```sh
npm install
npm run dev          # Vite on :5173, proxies /api to :8787
npm run dev:worker   # in another terminal: builds and runs the Worker (API + assets) on :8787
```

## Deploy

```sh
npx wrangler deploy
```

`wrangler.jsonc` runs `npm run build` first, then uploads `dist/` as static assets with SPA
fallback. Only `/api/*` reaches the Worker (`worker/index.ts`).

Optional configuration:

| Setting | How | Effect |
|---|---|---|
| `STEAM_API_KEY` | `npx wrangler secret put STEAM_API_KEY` | `/api/servers` adds live name/map/players from Steam's master server. Without it, the servers page lists `servers.txt` entries only. |
| `VITE_CUSTOM_MAPS_BASE_URL` | `.env` at build time | Serve the community map zips from somewhere else (default: `/downloads/maps`, shipped with the site). |

## Layout

```
src/pages/        one file per route
src/content/      hand-written content: links, official maps & models, history, manual
src/data/         generated listings (see below), committed
public/previews/  model preview JPGs (converted from the original BMPs)
public/downloads/maps/  packaged community map zips + manifest.json (zips in Git LFS)
worker/           Cloudflare Worker: /api/servers
scripts/          data generators
```

## Data

`src/data/` and `public/previews/` are generated and committed, so builds need no network.

- `npm run fetch-data` snapshots map and model listings from
  [map-resources](https://github.com/The-Specialists-Archive/map-resources) and
  [ts-model-goldmine](https://github.com/The-Specialists-Archive/ts-model-goldmine), and converts each
  model's preview BMP to JPG (quality 90). Needs ImageMagick (and ffmpeg as a fallback for odd BMPs);
  set `GITHUB_TOKEN` to avoid rate limits.
- `npm run extract-maps` packages every non-stock map in a local TS install (`../hl/ts_custom`) into
  a self-contained zip in `public/downloads/maps/` (tracked by Git LFS) with a `manifest.json`, and writes
  `src/data/custom-maps.json`. Dependencies come from each map's `.res` file and from the BSP
  itself (entities, skybox, and the WADs that provide its external textures); files that ship with
  stock TS 3.0 or Half-Life are left out. Edit the paths in `package.json` to point at your install.
- `python3 -I scripts/gen-weapons.py <the-specialistsmod-rs>/crates/shared/data/weapons.toml` regenerates
  `src/content/weapons.ts` (the Manual's weapon table and loadout builder) from the Rust port's decoded
  TS 3.0 weapon table. Kung fu moves (`src/content/kungfu.ts`) and loadout rules (`src/lib/loadout.ts`)
  are hand-written from the same port's source.

Anyone can contribute with a pull request.
