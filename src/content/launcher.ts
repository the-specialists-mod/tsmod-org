// What the TS launcher (github.com/the-specialists-mod/tsmod-launcher) does, and screenshots of
// each of its screens (public/img/launcher, copied from the launcher repo's docs/screenshots).

export const launcherFeatures: { title: string; text: string }[] = [
  {
    title: 'Installs TS 3.0',
    text: "Into your Half-Life install, or with the free Xash3D FWGS engine so you don't need Half-Life. The original ts-3-final.exe is checked against its MD5 and unpacked natively.",
  },
  { title: 'Original DLLs or the Rust port', text: 'Switch between them, and between Rust port releases, whenever you like.' },
  { title: 'Several installations', text: 'Each with its own launch options, picked from a list.' },
  { title: 'Validate, repair, reset', text: 'Checks every TS file against the release, puts damaged ones back, or returns the install to a clean TS 3.0.' },
  {
    title: 'Server browser',
    text: "Servers from Steam's master server (through the Steam client when it runs), the community list, your LAN and favorites, with players and ping. Double-click to join.",
  },
  { title: 'Steam servers on Xash3D', text: 'A built-in Steam broker lets Xash3D FWGS join GoldSrc servers that check Steam.' },
  { title: 'Host a server', text: 'A listen server, or a dedicated one on Linux, with bots, game mode, limits and TS options.' },
  { title: 'Player models', text: 'Previews, a 3D view you can turn, a one-click switch, and adding new models.' },
  { title: 'Game configuration', text: 'Name, mouse, video, audio, HUD, network and every other cvar, without starting the game.' },
  { title: 'Controls', text: 'Rebind keys and mouse buttons; a key taken elsewhere moves over.' },
  { title: 'Download cache', text: 'Everything downloaded is kept and reused, so repairs and reinstalls work offline.' },
  { title: 'Keeps itself up to date', text: 'And runs headless too: install, play, validate, repair and reset from the command line.' },
]

export const launcherScreenshots: { src: string; caption: string }[] = [
  { src: '/img/launcher/welcome.webp', caption: 'First start: your Half-Life, or Xash3D FWGS' },
  { src: '/img/launcher/setup.webp', caption: 'Setup: where each part comes from' },
  { src: '/img/launcher/installing.webp', caption: 'Installing' },
  { src: '/img/launcher/select.webp', caption: 'Several installations' },
  { src: '/img/launcher/overview.webp', caption: 'Overview: game libraries, validation, launch options' },
  { src: '/img/launcher/servers.webp', caption: 'Server browser' },
  { src: '/img/launcher/host.webp', caption: 'Start a server' },
  { src: '/img/launcher/models.webp', caption: 'Player models' },
  { src: '/img/launcher/gameconfig.webp', caption: 'Game configuration' },
  { src: '/img/launcher/controls.webp', caption: 'Controls' },
  { src: '/img/launcher/cache.webp', caption: 'Download cache' },
]
