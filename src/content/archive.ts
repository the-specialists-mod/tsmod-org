// Groups the repos of The Specialists Archive (snapshotted in src/data/archive-repos.json)
// for the Resources page. Repos not listed here show up under "Other", so new
// repos appear without a code change; add them here to file them properly.

export type ArchiveCategory = { title: string; blurb: string }

export const archiveCategories: ArchiveCategory[] = [
  { title: 'Play & content', blurb: 'The game itself, and the maps, models and files that keep it going.' },
  { title: 'Server plugins', blurb: 'AMX Mod X and Metamod plugins: roleplay, zombies, bots and more.' },
  { title: 'Mapping', blurb: 'Compilers, viewers and decompilers for GoldSrc maps.' },
  { title: 'Models & textures', blurb: 'Tools and guides for player models, WADs and sprites.' },
  { title: 'Guides & preservation', blurb: 'Tutorials, archived websites and the tools used to save them.' },
]

/** Repo name → [category title, description override for repos without a useful one]. */
export const archiveRepos: Record<string, [string, string?]> = {
  'xash3d-ts': ['Play & content', 'TS on the Xash3D engine, playable without owning Half-Life.'],
  'The-Specialists-3.0-25th-Anniversary': ['Play & content', 'TS 3.0 client files patched for the Half-Life 25th anniversary update. No longer needed: TS 3.0 now runs on current Half-Life as is.'],
  'map-resources': ['Play & content', 'Hundreds of community maps with their WADs, skies, models and sounds.'],
  'ts-model-goldmine': ['Play & content', 'Nearly two thousand player models.'],
  filedump: ['Play & content', 'Odds and ends: entmod, the TS patcher, a Steam icon fix, and TSRP wiki pages.'],
  'xash3d-fwgs': ['Play & content'],

  'ts-plugins': ['Server plugins', 'AMX Mod X plugin sources for TS, mostly Apollo RP modules: jobs, items, jail, cars, hunger, NPCs.'],
  'Apollo-RP': ['Server plugins'],
  'amxx-hrpv2': ['Server plugins'],
  'amxx-zombiemod': ['Server plugins'],
  tspp: ['Server plugins'],
  rcbotold: ['Server plugins', 'RCBot by Cheeseh: bots for Half-Life mods.'],
  amxmodx: ['Server plugins'],
  'amxmodx-ci-docker': ['Server plugins', 'Docker image for compiling AMX Mod X plugins in CI.'],
  'metamod-hl1': ['Server plugins'],
  'lysis-java': ['Server plugins'],

  MHLT: ['Mapping'],
  SDHLT: ['Mapping'],
  newbspguy: ['Mapping'],
  'HalfLife.UnifiedSdk.MapDecompiler': ['Mapping'],
  resgen: ['Mapping'],
  'hl-map-zipper': ['Mapping', 'Packs a Half-Life map and everything it references into a zip.'],
  tools: ['Mapping', 'A big shelf of HL dev tools: Crafty, BSP viewers and decompilers, VHLT, GCFScape, Batch Compiler and more.'],

  HalfLifeAssetManager: ['Models & textures'],
  Crowbar: ['Models & textures'],
  'HL-Texture-Tools': ['Models & textures'],
  AGCRemapper: ['Models & textures', 'Create GoldSrc textures with remappable colours, like player model team colours.'],
  'ai-texture-upscaling': ['Models & textures', 'Guide and chaiNNer templates for AI-upscaling TS textures into detail textures.'],
  'xnconvert-flatpak': ['Models & textures'],

  tutorials: ['Guides & preservation', 'Gameplay and development tutorials: combat, boosting, The303 GoldSrc guides.'],
  'specialistsmod.net': ['Guides & preservation', 'An offline mirror of the official 2007 website.'],
  'tsmod.org': ['Guides & preservation', 'The previous tsmod.org.'],
  httrack: ['Guides & preservation'],
  'wayback-machine-downloader': ['Guides & preservation'],
}
