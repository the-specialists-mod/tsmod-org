// Fails the build if the community map zips are Git LFS pointer files rather
// than real zips (e.g. cloned without git-lfs), so a deploy can't publish
// broken downloads. Fix with `git lfs install && git lfs pull`.
import { readdir, open } from 'node:fs/promises'

const dir = new URL('../public/downloads/maps/', import.meta.url)
const zips = (await readdir(dir).catch(() => [])).filter((f) => f.endsWith('.zip'))
const bad = []
for (const name of zips) {
  const fh = await open(new URL(name, dir))
  const { buffer } = await fh.read(Buffer.alloc(4), 0, 4, 0)
  await fh.close()
  if (buffer.toString('latin1', 0, 2) !== 'PK') bad.push(name)
}
if (bad.length) {
  console.error(`${bad.length} map zip(s) are not real zips (Git LFS pointers?): ${bad.slice(0, 5).join(', ')}${bad.length > 5 ? ', …' : ''}`)
  console.error('Run `git lfs install && git lfs pull`, then build again.')
  process.exit(1)
}
