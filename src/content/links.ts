// External destinations used across the site, in one place so they're easy to update.

export const ARCHIVE_ORG = 'https://github.com/The-Specialists-Archive'
export const MOD_ORG = 'https://github.com/the-specialists-mod'

export const INSTALLER_REPO = `${MOD_ORG}/tsmod-installer`
export const INSTALLER_RELEASES = `${INSTALLER_REPO}/releases/latest`
// GitHub redirects these to the files on whichever release is marked "latest". The repo's
// `ts-3.0` release (the game installer) must stay un-marked, or these links would break.
export const INSTALLER_DOWNLOADS = {
  windows: `${INSTALLER_REPO}/releases/latest/download/ts-launcher-windows-x86_64.exe`,
  linux: `${INSTALLER_REPO}/releases/latest/download/ts-launcher-linux-x86_64.bin`,
}
export const SERVERS_TXT = `${INSTALLER_REPO}/blob/main/servers.txt`

export const RUST_REPO = `${MOD_ORG}/the-specialistsmod-rs`
export const RUST_RELEASES = `${RUST_REPO}/releases/latest`
export const RUST_INSTALL_DOCS = `${RUST_REPO}/blob/main/docs/INSTALL.md`
export const DECOMP_REPO = `${MOD_ORG}/the-specialists-decomp`

export const TS_RELEASE = `${INSTALLER_REPO}/releases/tag/ts-3.0`
export const TS_INSTALLER_EXE = `${INSTALLER_REPO}/releases/download/ts-3.0/ts-3-final.exe`
export const TS_INSTALLER_MD5 = 'e0fe976a8d9d59393e66b9f1cb94c256'
export const TS_MODDB = 'https://www.moddb.com/mods/the-specialists/downloads/the-specialists-v30-client-windows'
export const TS_INTERNET_ARCHIVE = 'https://archive.org/details/ts-3.0'
export const XASH_TS_REPO = `${ARCHIVE_ORG}/xash3d-ts`
export const XASH_FWGS = 'https://github.com/FWGS/xash3d-fwgs'

export const MAP_RESOURCES_REPO = `${ARCHIVE_ORG}/map-resources`
export const MODEL_GOLDMINE_REPO = `${ARCHIVE_ORG}/ts-model-goldmine`
export const RAW_MAP_RESOURCES = 'https://raw.githubusercontent.com/The-Specialists-Archive/map-resources/main'
export const TUTORIALS_REPO = `${ARCHIVE_ORG}/tutorials`
export const OLD_SITE_REPO = `${ARCHIVE_ORG}/specialistsmod.net`
export const TSRP_HISTORY = `${ARCHIVE_ORG}/filedump/blob/main/History%20of%20TSRP.html`

export const HALF_LIFE_STEAM = 'https://store.steampowered.com/app/70/HalfLife/'
export const DISCORD = 'https://discord.gg/NcS8wrcc8t'
export const TSMOD_NET = 'https://www.tsmod.net/'
export const STEAM_GROUP = 'https://steamcommunity.com/groups/The_Specialists_Forum'
export const TS_PLUGINS_REPO = `${ARCHIVE_ORG}/ts-plugins`
export const HARBURP_REPO = `${ARCHIVE_ORG}/amxx-hrpv2`
export const OFFICIAL_SITE_WAYBACK = 'https://web.archive.org/web/20071008034150/http://www.specialistsmod.net/'
export const SITE_REPO = `${MOD_ORG}/tsmod-org`

/** Where the packaged community map zips are served. They ship with the site (public/downloads/maps, in Git LFS). */
export const CUSTOM_MAPS_BASE_URL: string = import.meta.env.VITE_CUSTOM_MAPS_BASE_URL || '/downloads/maps'
