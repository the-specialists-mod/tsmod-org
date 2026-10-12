// FAQ adapted from the official 2007 FAQ. Controls are TS 3.0's shipped config.cfg binds.
// Rules and numbers come from the Rust port's docs and decoded TS 3.0 tables
// (the-specialistsmod-rs docs/implementation/{movement,weapons,rules,client-hud}.md).

export type Faq = { q: string; a: string }

export const faq: Faq[] = [
  { q: 'What is The Specialists?', a: "The Specialists, or TS, is a multiplayer action movie mod / total conversion for Valve's Half-Life." },
  { q: 'Is TS a Matrix mod?', a: 'No, although since The Matrix is an action movie, portions of the mod are influenced by it, alongside Hong Kong action cinema like Hard Boiled.' },
  {
    q: 'Who makes TS?',
    a: 'TS was conceived by Filippo "Morfeo" De Luca and Lorenzo "John_Matrix" Pasini, and worked on by a large number of mappers, modelers and testers from around the world. Today the community maintains the archive, the installer and a Rust port of the game code.',
  },
  {
    q: 'What do I need to play TS?',
    a: 'Either the original Half-Life (the Steam version, not Half-Life: Source or Half-Life 2), or nothing at all: the TS installer can set up the free Xash3D FWGS engine with the Half-Life data it needs.',
  },
  {
    q: 'How do I pick my weapons?',
    a: "The buy menu (B) opens while you're dead or spectating, including when you join. Money isn't a limit in 3.0, slots are: you have 81. Pick guns, attachments, akimbo pairs and Kevlar, then save the loadout to one of nine slots. Your loadout is cleared when you die, and the menu sends it again for your next life.",
  },
  {
    q: 'How do I get slow motion?',
    a: "Pick up a slow motion power-up, or on servers with 'slowmatch' on (the default), get frags to store up to three seconds. Your slow motion time shows in the top left of your HUD.",
  },
  { q: 'How do I use slow motion?', a: "Press use twice (E by default), or use power-up once (Z by default). You slow to 0.6× and everyone you can see slows to 0.35×, so you move faster than them." },
  { q: 'How do I do a stunt?', a: 'Press the stunt button (Mouse3 or Q). With a direction it dives, rolls or cartwheels; mid-stunt you take 30% less damage.' },
  {
    q: 'How do I flip, and land on my feet?',
    a: 'Double-tap jump to flip. How well you dive and flip depends on how many of your 81 slots are used: under 42 is full strength, under 52 medium, under 62 low, and above that your dives barely leave the ground.',
  },
  { q: 'How do I climb a wall?', a: 'Face the wall and tap jump: you get three climbs before you fall. On the last climb press stunt to flip off it, or run at a wall and press stunt to flip off without climbing. Chained wall stunts take longer to recover from.' },
  { q: 'How do I wall dive?', a: 'Instead of just pressing stunt on one of your climbs, quickly turn around 180° and press stunt. You push off the wall with your feet and go into a dive.' },
  {
    q: 'How do I kick with a gun in my hand?',
    a: "Hold jump next to an opponent. It only works with a gun or blade out (not kung fu or holstered), and not while ducking. A kick can disarm them; the faster you're moving the harder it hits, and the Kung Fu power-up doubles it. They can block it.",
  },
  {
    q: 'How do I superjump?',
    a: 'Collect a superjump power-up (the foot), get a 9-kill spree, or become The One. Hold duck and press jump: you launch upwards, and holding jump makes you glide. Land still holding duck to roll out of it.',
  },
  { q: 'Why do other people move faster than me?', a: "They're carrying less. Speed runs from 210 with a full load to 330 with nothing; every weapon, Kevlar (10 slots) and the CTB briefcase (20 slots) take slots." },
  { q: 'Why can I only use pistols / melee / kung fu on this server?', a: 'The server runs weapon restrictions: kung fu only, melee, melee + pistols, melee + pistols + shotguns, or everything (the default).' },
  { q: 'Can I buy grenades or stealth shoes?', a: "Not in 3.0: the buy menu lists them but the server refuses them. Grenades come from power-ups, two per life, and from the bodies of players who carried them." },
  { q: 'What does the alternate fire on some guns do?', a: "Centering or turning the gun sideways doesn't affect gameplay. It just looks cool, though some players like that it blocks less of the view." },
]

export type Bind = { key: string; action: string }

export const controls: Bind[] = [
  { key: 'W A S D', action: 'Move' },
  { key: 'Space', action: 'Jump (double-tap to flip, tap at walls to climb, hold next to enemies to kick)' },
  { key: 'Mouse3 / Q', action: 'Stunt: dive, roll, cartwheel, wall flip' },
  { key: 'Ctrl / C', action: 'Duck (hold + jump = superjump)' },
  { key: 'Mouse1', action: 'Fire' },
  { key: 'Mouse2 / V', action: 'Alternate attack' },
  { key: 'E', action: 'Use (double-tap for slow motion)' },
  { key: 'Z', action: 'Use power-up' },
  { key: 'R', action: 'Reload' },
  { key: 'F', action: 'Fire mode (auto, semi, burst, pump, akimbo)' },
  { key: 'G', action: 'Use items (laser, flashlight)' },
  { key: 'T', action: 'Drop weapon' },
  { key: 'B', action: 'Buy menu (while dead or spectating)' },
  { key: 'X', action: 'Third person' },
  { key: 'Tab', action: 'Scores' },
  { key: 'Y / U', action: 'Chat / team chat' },
]

export const gameModes = [
  { name: 'Deathmatch', desc: 'Everyone for themselves. Grab power-ups, chain stunts, rack up frags.' },
  { name: 'Team Deathmatch', desc: 'Two teams with team models, which override your own model choice.' },
  { name: 'Last Man Standing', desc: 'Limited lives per round. The last one standing gets 10 bonus frags.' },
  {
    name: 'The One',
    desc: 'One player becomes The One: 150 health, kung fu, superjump, top speed and regeneration. Kill The One to take their place; if nobody is The One, one is picked every 10 seconds.',
  },
  { name: 'Capture The Briefcase', desc: "New in 3.0, on ctb_ maps: steal the enemy briefcase and bring it home. Carrying it costs 20 slots." },
]

export const loadout = [
  { label: 'Slots', value: '81', note: 'Every weapon, Kevlar (10) and the briefcase (20) use them' },
  { label: 'Speed', value: '210–330', note: 'Full load to empty-handed; The One always runs at 330' },
  { label: 'Full stunts', value: '< 42 used', note: 'Medium under 52, low under 62, barely any above' },
  { label: 'Money', value: '$30,000', note: 'Always in 3.0: slots are the real limit' },
]

export const damageRules = [
  { label: 'Headshot', value: '×2', note: '×1.5 for shotguns' },
  { label: 'Legs', value: '×0.5' },
  { label: 'Mid-stunt', value: '×0.7', note: 'Diving and rolling players take less damage' },
  { label: 'Silencer', value: '×0.775', note: 'Damage and kick; spread ×0.875' },
  { label: 'Falling', value: 'Hard landings', note: 'Only the fastest falls hurt' },
  { label: 'Grenade', value: '110', note: '3-second fuse, full damage within 300 units' },
]

export const powerUps = [
  { name: 'Slow motion', desc: 'You slow to 0.6×, everyone you can see to 0.35×.' },
  { name: 'Slow pause', desc: 'Nearly freezes everyone you can see (0.225×) while you move at 0.8×.' },
  { name: 'Double fire rate', desc: 'Shoot twice as fast.' },
  { name: 'Infinite clip', desc: 'No reloading.' },
  { name: 'Kung fu', desc: 'Martial arts boost; doubles jump-kick damage.' },
  { name: 'Superjump', desc: 'Hold duck and press jump to launch upwards.' },
  { name: 'Health', desc: '150 health, which slowly drains away.' },
  { name: 'Armour', desc: 'A Kevlar vest (takes 10 slots).' },
  { name: 'Grenade', desc: 'An M61 grenade: the only way to get one in 3.0.' },
]

export const powerUpNotes =
  "Some power-ups are used straight away, others are stored until you press use power-up (Z). On maps that don't place their own, a random power-up appears every 20 seconds."

export const scoring = [
  { what: 'Frag', points: '1' },
  { what: 'Kung fu or thrown-blade kill', points: '2' },
  { what: 'Stylish kill (mid-stunt or sliding)', points: '+1' },
  { what: 'Double kill', points: '×2' },
  { what: 'Suicide', points: '−1' },
]

export const sprees = [
  { kills: 3, reward: 'Health' },
  { kills: 6, reward: 'Kung fu' },
  { kills: 9, reward: 'Superjump' },
  { kills: 10, reward: 'Slow pause, and every kill after' },
]

export const votes = [
  { cmd: 'vote map <name>', desc: 'Vote to change map. Passes with at least half the players.' },
  { cmd: 'vote stats', desc: 'Show the current tally.' },
  { cmd: 'vote reset', desc: 'Clear the votes.' },
]

export const serverCvars = [
  { cvar: 'mp_teamplay 1', desc: 'Team deathmatch (teams from mp_teamlist, default hitman;gordon)' },
  { cvar: 'lastmanstanding 1', desc: 'Last Man Standing rounds (roundtime, default 150 s)' },
  { cvar: 'mp_theonemode 1', desc: 'The One (models from mp_theone / mp_theothers)' },
  { cvar: 'slowmatch 1', desc: 'Frags earn stored slow motion (default on)' },
  { cvar: 'nopowerup 1', desc: 'No random power-ups' },
  { cvar: 'respawntime 3', desc: 'Seconds before respawn' },
  { cvar: 'spectacularness 1', desc: '0–100: how often stylish kills and explosions trigger a slow-motion moment (0 is off)' },
  { cvar: 'mp_friendlyfire 1', desc: 'Team damage; banfortk kicks or bans team killers' },
  { cvar: 'ts_bot_quota N', desc: 'Rust port only: keep N bots on the server' },
]
