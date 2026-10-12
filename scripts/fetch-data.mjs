// Snapshots the repo list, map and model listings from The Specialists Archive
// GitHub org into src/data/*.json, and converts model preview BMPs to JPG (quality 90)
// in public/previews/models/. Run with `npm run fetch-data` (set GITHUB_TOKEN
// to avoid unauthenticated rate limits). Requires ImageMagick (`magick`).
import { execFile } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'

const run = promisify(execFile)

const ORG = 'The-Specialists-Archive'
const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'tsmod-org' }
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

async function tree(repo) {
  const res = await fetch(`https://api.github.com/repos/${ORG}/${repo}/git/trees/main?recursive=1`, { headers })
  if (!res.ok) throw new Error(`${repo}: ${res.status} ${await res.text()}`)
  const json = await res.json()
  if (json.truncated) console.warn(`warning: ${repo} tree was truncated`)
  return json.tree.filter((e) => e.type === 'blob')
}

async function maps() {
  const files = await tree('map-resources')
  const paths = new Set(files.map((f) => f.path.toLowerCase()))
  return files
    .filter((f) => /^(maps|entmaps\/[^/]+\/maps)\/[^/]+\.bsp$/i.test(f.path))
    .map((f) => {
      const name = f.path.split('/').pop().replace(/\.bsp$/i, '')
      const dir = f.path.slice(0, f.path.lastIndexOf('/'))
      return {
        name,
        path: f.path,
        size: f.size,
        entmap: f.path.startsWith('entmaps/'),
        res: paths.has(`${dir}/${name}.res`.toLowerCase()),
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
}

async function models() {
  const files = await tree('ts-model-goldmine')
  const byName = new Map()
  for (const f of files) {
    const m = f.path.match(/^models\/player\/([^/]+)\/([^/]+)$/)
    if (!m) continue
    const [, name, file] = m
    const entry = byName.get(name) ?? { name, files: 0, size: 0, preview: null }
    entry.files++
    entry.size += f.size
    if (file.toLowerCase() === `${name.toLowerCase()}.bmp`) entry.preview = f.path
    byName.set(name, entry)
  }
  return [...byName.values()].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
}

async function repos() {
  const res = await fetch(`https://api.github.com/orgs/${ORG}/repos?per_page=100&type=public`, { headers })
  if (!res.ok) throw new Error(`repos: ${res.status} ${await res.text()}`)
  return (await res.json())
    .filter((r) => !r.private)
    .map((r) => ({ name: r.name, description: r.description || null, fork: r.fork, archived: r.archived, size: r.size * 1024, pushed: r.pushed_at.slice(0, 10) }))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
}

// Downloads each preview BMP into a scratch dir and converts it to JPG.
// Existing JPGs are kept, so re-runs only fetch new previews.
async function convertPreviews(list) {
  const outDir = new URL('../public/previews/models/', import.meta.url).pathname
  await mkdir(outDir, { recursive: true })
  const scratch = await mkdtemp(path.join(tmpdir(), 'ts-previews-'))
  try {
    const queue = list.filter((m) => m.preview)
    const worker = async () => {
      for (let m; (m = queue.shift()); ) {
        const jpg = path.join(outDir, `${m.name}.jpg`)
        const src = m.preview
        m.preview = `/previews/models/${m.name}.jpg`
        if (existsSync(jpg)) continue
        const url = `https://raw.githubusercontent.com/${ORG}/ts-model-goldmine/main/${src.split('/').map(encodeURIComponent).join('/')}`
        const res = await fetch(url)
        if (!res.ok) {
          console.warn(`warning: ${src}: ${res.status}`)
          m.preview = null
          continue
        }
        const bmp = path.join(scratch, `${m.name}.bmp`)
        await writeFile(bmp, Buffer.from(await res.arrayBuffer()))
        try {
          await run('magick', [`bmp:${bmp}`, '-quality', '90', jpg])
        } catch {
          // ImageMagick rejects some old BMPs (e.g. out-of-range colormap
          // indices) that ffmpeg decodes fine, so go via ffmpeg as a fallback.
          try {
            const png = path.join(scratch, `${m.name}.png`)
            await run('ffmpeg', ['-loglevel', 'error', '-y', '-i', bmp, png])
            await run('magick', [png, '-quality', '90', jpg])
          } catch (err) {
            console.warn(`warning: ${src}: ${err.stderr || err.message}`)
            m.preview = null
          }
        }
      }
    }
    await Promise.all(Array.from({ length: 8 }, worker))
  } finally {
    await rm(scratch, { recursive: true, force: true })
  }
}

const [mapList, modelList, repoList] = await Promise.all([maps(), models(), repos()])
await convertPreviews(modelList)
await mkdir(new URL('../src/data/', import.meta.url), { recursive: true })
await writeFile(new URL('../src/data/maps.json', import.meta.url), JSON.stringify(mapList) + '\n')
await writeFile(new URL('../src/data/models.json', import.meta.url), JSON.stringify(modelList) + '\n')
await writeFile(new URL('../src/data/archive-repos.json', import.meta.url), JSON.stringify(repoList) + '\n')
console.log(`repos: ${repoList.length}, maps: ${mapList.length}, models: ${modelList.length} (${modelList.filter((m) => m.preview).length} with previews)`)
