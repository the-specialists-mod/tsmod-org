// FAQ adapted from the official 2007 FAQ. Controls are TS 3.0's shipped config.cfg binds.
// Rules and numbers come from the Rust port's docs and decoded TS 3.0 tables
// (the-specialistsmod-rs docs/implementation/{movement,weapons,rules,client-hud}.md).
//
// The `...21` exports are TS 2.1's, as the Rust port plays them with `ts_gameplay 21`
// (the-specialistsmod-rs docs/implementation/ts21.md and crates/ts21, issue #100 and its
// corrections). Where 2.1 plays like 3.0 they share the 3.0 entries.

export type Faq = { q: string; a: string }

const whatIsTs: Faq = { q: 'What is The Specialists?', a: "The Specialists, or TS, is a multiplayer action movie mod / total conversion for Valve's Half-Life." }
const matrixMod: Faq = {
  q: 'Is TS a Matrix mod?',
  a: 'No, although since The Matrix is an action movie, portions of the mod are influenced by it, alongside Hong Kong action cinema like Hard Boiled.',
}
const whoMakesTs: Faq = {
  q: 'Who makes TS?',
  a: 'TS was conceived by Filippo "Morfeo" De Luca and Lorenzo "John_Matrix" Pasini, and worked on by a large number of mappers, modelers and testers from around the world. Today the community maintains the archive, the installer and a Rust port of the game code.',
}
const whatDoINeed: Faq = {
  q: 'What do I need to play TS?',
  a: 'Either the original Half-Life (the Steam version, not Half-Life: Source or Half-Life 2), or nothing at all: the TS installer can set up the free Xash3D FWGS engine with the Half-Life data it needs.',
}
const howToStunt: Faq = { q: 'How do I do a stunt?', a: 'Press the stunt button (Mouse3 or Q). With a direction it dives, rolls or cartwheels; mid-stunt you take 30% less damage.' }
const restrictions: Faq = {
  q: 'Why can I only use pistols / melee / kung fu on this server?',
  a: 'The server runs weapon restrictions: kung fu only, melee, melee + pistols, melee + pistols + shotguns, or everything (the default).',
}
const altFire: Faq = {
  q: 'What does the alternate fire on some guns do?',
  a: "Centering or turning the gun sideways doesn't affect gameplay. It just looks cool, though some players like that it blocks less of the view.",
}

export const faq: Faq[] = [
  whatIsTs,
  matrixMod,
  whoMakesTs,
  whatDoINeed,
  {
    q: 'How do I pick my weapons?',
    a: "The buy menu (B) opens while you're dead or spectating, including when you join. Money isn't a limit in 3.0, slots are: you have 81. Pick guns, attachments, akimbo pairs and Kevlar, then save the loadout to one of nine slots. Your loadout is cleared when you die, and the menu sends it again for your next life.",
  },
  {
    q: 'How do I get slow motion?',
    a: "Pick up a slow motion power-up, or on servers with 'slowmatch' on (the default), get frags to store up to three seconds. Your slow motion time shows in the top left of your HUD.",
  },
  { q: 'How do I use slow motion?', a: "Press use twice (E by default), or use power-up once (Z by default). You slow to 0.6× and everyone you can see slows to 0.35×, so you move faster than them." },
  howToStunt,
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
  restrictions,
  { q: 'Can I buy grenades or stealth shoes?', a: "Not in 3.0: the buy menu lists them but the server refuses them. Grenades come from power-ups, two per life, and from the bodies of players who carried them." },
  altFire,
]

export type Bind = { key: string; action: string }

export const controls: Bind[] = [
  { key: 'W A S D', action: 'Move' },
  { key: 'Space', action: 'Jump (double-tap to flip, tap at walls to climb, hold next to enemies to kick)' },
  { key: 'Mouse3 / Q', action: 'Stunt: dive, roll, cartwheel, wall flip' },
  { key: 'Ctrl / C', action: 'Duck (hold + jump = superjump)' },
  { key: 'Mouse1', action: 'Fire' },
  { key: 'Mouse2', action: 'Secondary attack: kick (kung fu), throw (blades), zoom (scope), second gun (akimbo)' },
  { key: 'V', action: 'Gun-butt strike, on guns with a stock' },
  { key: 'E', action: 'Use (double-tap for slow motion)' },
  { key: 'Z', action: 'Use power-up' },
  { key: 'R', action: 'Reload; block with kung fu or a blade' },
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
  { cvar: 'ts_gameplay 21', desc: "Rust port only: play by TS 2.1's rules (see the 2.1 manual). 30 is 3.0, the default" },
]

// ---- TS 2.1 -------------------------------------------------------------------------------

export const faq21: Faq[] = [
  whatIsTs,
  matrixMod,
  whoMakesTs,
  whatDoINeed,
  {
    q: 'What is TS 2.1 mode?',
    a: "TS 2.1 (April 2004) is the release before 3.0. The Rust port can play by its rules on the same maps and content: a server turns it on with ts_gameplay 21. Play it with the port's client; the original 3.0 client mispredicts movement and weapons in 2.1 mode.",
  },
  {
    q: 'How do I pick my weapons?',
    a: "Open the buy menu (B). You have 81 slots. In deathmatch money isn't a limit; in team rounds (and on servers with usecash on) you start with $3,000 and earn more by winning rounds, or with usecash $900 a point for kills. Kevlar, Stealth Shoes and grenades are sold in team rounds only.",
  },
  { q: 'How do I respawn?', a: "Press fire once the respawn countdown has run out. In Last Man Standing and team rounds, once you've used up your respawns you wait for the next round." },
  { q: 'How do I get slow motion?', a: "Pick up a slow motion power-up, or on servers with 'slowmatch' on (the default), get frags to store up to five seconds." },
  { q: 'How do I use slow motion?', a: 'Press use twice (E by default), or use power-up once (Z by default). You slow to 0.55× and everyone else to 0.35×. A slow motion power-up lasts five seconds.' },
  howToStunt,
  {
    q: 'How do I flip, and land on my feet?',
    a: 'Double-tap jump to flip. How well you dive and flip depends on how many of your 81 slots are used: under 22 is full strength, under 42 medium, under 72 low, and above that your dives barely leave the ground. In team rounds full strength also needs no armour.',
  },
  {
    q: 'How do I climb a wall?',
    a: 'Face the wall and tap jump to climb, and press stunt to flip off it. Landing from a wall jump or climb leaves you recovering for half a second, and chained wall stunts take longer to recover from.',
  },
  { q: 'How do I wall dive?', a: "You can't: TS 2.1 has no wall dive." },
  {
    q: 'How do I kick with a gun in my hand?',
    a: "Hold jump next to an opponent. It only works with a gun or blade out (not kung fu or holstered), and not while ducking. A hard enough kick disarms them; the faster you're moving the harder it hits, and the Kung Fu power-up doubles it. It doesn't use your kung fu bar.",
  },
  {
    q: 'How do I superjump?',
    a: 'Collect a superjump power-up (the foot), get a 9-kill spree, or become The One. Hold duck and press jump: you launch upwards and forwards, and holding jump makes you glide.',
  },
  { q: 'Why do other people move faster than me?', a: "They're carrying less. Speed runs from 170 with a full load to 310 with 11 slots or fewer used. Every weapon takes slots; Kevlar and Stealth Shoes don't." },
  restrictions,
  {
    q: 'Can I buy grenades or stealth shoes?',
    a: 'In team rounds (tr_, cs_, de_ and tm_ maps), yes: grenades at $1,000, two a life, Stealth Shoes at $700 and Kevlar at $1,900. Elsewhere grenades come from power-ups.',
  },
  altFire,
]

export const controls21: Bind[] = [
  { key: 'W A S D', action: 'Move' },
  { key: 'Space', action: 'Jump (double-tap to flip, tap at walls to climb, hold next to enemies to kick)' },
  { key: 'Mouse3 / Q', action: 'Stunt: dive, roll, cartwheel, wall flip (no wall dive in 2.1)' },
  { key: 'Ctrl / C', action: 'Duck (hold + jump = superjump)' },
  { key: 'Mouse1', action: 'Fire; while dead, respawn. Kung fu and blades attack once per press' },
  { key: 'Mouse2', action: "Secondary attack: kick (kung fu), throw (knives; the katana can't be thrown), zoom (scope), second gun (akimbo)" },
  { key: 'V', action: 'Gun-butt strike, on the M4A1 and Sawed-off only' },
  { key: 'E', action: 'Use (double-tap for slow motion; hold it while touching a ground weapon to pick it up)' },
  { key: 'Z', action: 'Use power-up' },
  { key: 'R', action: 'Reload; block with kung fu (not with a blade)' },
  { key: 'F', action: 'Fire mode (auto, semi, burst, pump, akimbo)' },
  { key: 'G', action: 'Use items (laser, flashlight)' },
  { key: 'T', action: 'Drop weapon' },
  { key: 'B', action: 'Buy menu' },
  { key: 'X', action: 'Third person' },
  { key: 'Tab', action: 'Scores' },
  { key: 'Y / U', action: 'Chat / team chat' },
]

export const gameModesNote21 =
  'The map name picks the mode: tm_ maps play objective rounds, tr_, cs_ and de_ maps team rounds, and any other map deathmatch, or team deathmatch with mp_teamplay 1. Capture The Briefcase is 3.0 only.'

export const gameModes21 = [
  { name: 'Deathmatch', desc: 'Everyone for themselves. Grab power-ups, chain stunts, rack up frags.' },
  { name: 'Team Deathmatch', desc: 'mp_teamplay 1. Your team is your player model, from the server’s mp_teamlist.' },
  { name: 'Last Man Standing', desc: 'lastmanstanding 1, in deathmatch. Respawns per round come from respawnnumber; the last one standing gets 10 bonus frags.' },
  {
    name: 'The One',
    desc: 'One player becomes The One: 150 health, kung fu, superjump and a 3-second slow pause. Each kill adds 10 health per player on the server, up to 200. No extra speed and no regeneration, but The One can’t be disarmed, and only The One scores.',
  },
  {
    name: 'Team rounds',
    desc: 'On tr_, cs_ and de_ maps: Specialists against Mercenaries in rounds, with team cash. Every spawn starts with 3 seconds of slow motion, and the sides swap every third round.',
  },
  {
    name: 'Objective rounds',
    desc: 'On tm_ maps: team rounds with bombs to defuse, terminals to hack and escapes. Rust port: the maps’ objectives aren’t hooked up in 2.1 mode yet, so these play as team rounds that end in a draw when time runs out.',
  },
]

export const loadout21 = [
  { label: 'Slots', value: '81', note: 'Every weapon uses them; Kevlar and Stealth Shoes take none' },
  { label: 'Speed', value: '170–310', note: 'Full load to 11 slots or fewer; The One runs no faster' },
  { label: 'Full stunts', value: '< 22 used', note: 'Medium under 42, low under 72. In team rounds full stunts also need no armour' },
  { label: 'Money', value: '$3,000', note: 'To start when cash is on (team rounds, or usecash 1), up to $30,000. Otherwise you spend from $30,000' },
  { label: 'Kill cash', value: '$900', note: 'Per point, in deathmatch and team deathmatch with usecash 1' },
  { label: 'Round win', value: '+$1,500', note: 'Team cash; a loss costs $1,000, never below the starting cash' },
  { label: 'Kevlar', value: '$1,900', note: 'Team rounds only. Sets your armour to 100' },
  { label: 'Stealth Shoes', value: '$700', note: 'Team rounds only' },
]

export const damageRules21 = [
  { label: 'Headshot', value: '×2', note: 'Shotgun pellets too' },
  { label: 'Legs', value: '×0.5' },
  { label: 'Mid-stunt', value: '×0.7', note: 'Only while stunting: no dodge window after it' },
  { label: 'Silencer', value: '×0.8', note: 'Damage; spread ×1.2' },
  { label: 'Kevlar', value: 'Wears out', note: 'Body and arm hits up to the armour left are halved and use that much up; a bigger hit empties it and deals only what was left' },
  { label: 'Random', value: '+0–5%', note: 'Per pellet that hits, adding up over a shotgun blast' },
  { label: 'Grenade', value: '100', note: '3-second fuse, full damage within 128 units, none past 1,024' },
  { label: 'Shrapnel', value: '30–45', note: 'Pieces from every explosion, 100 damage each, at 2,000 units/s' },
]

export const powerUps21 = [
  { name: 'Slow motion', desc: '5 seconds. You slow to 0.55×, everyone else to 0.35×.' },
  { name: 'Slow pause', desc: '3 seconds. Nearly freezes everyone else (0.15×) while you move at 0.6×.' },
  { name: 'Double fire rate', desc: '5 seconds. Halves the delay of automatic, shotgun and akimbo fire (not semi or burst).' },
  { name: 'Infinite clip', desc: 'Stored until you use it: 3 seconds without using up your clip.' },
  { name: 'Kung fu', desc: 'Doubles kung fu and jump-kick damage.' },
  { name: 'Superjump', desc: 'Hold duck and press jump to launch upwards.' },
  { name: 'Health', desc: '150 health, which drains back to 100.' },
  { name: 'Armour', desc: '+100 armour, up to 100. No slots. Dying in deathmatch drops your remaining armour as a power-up.' },
  { name: 'Grenade', desc: 'An M61 grenade.' },
]

export const powerUpNotes21 =
  "Slow motion, slow pause, double fire rate and infinite clip are stored until you press use power-up (Z); the rest work straight away. Slow motion starts and stops at once, with no easing in. On maps that don't place their own, a random power-up appears every 20 seconds."

export const scoring21 = [
  { what: 'Frag', points: '1' },
  { what: 'Kung fu, katana or thrown-knife kill', points: '2' },
  { what: 'Stunt kill (any speed, close combat too)', points: '+2' },
  { what: 'Slide kill', points: '+1' },
  { what: 'Double kill (within 1 s)', points: '×2' },
  { what: 'Killing a Specialist (9+ spree)', points: '+5' },
  { what: 'Suicide', points: '−1' },
]

export const scoringNote21 = 'Style pays more than in 3.0: a kung fu kill mid-stunt is worth 4. Team rounds score plain frags, and in The One mode only The One scores.'

export const sprees21 = [
  { kills: 3, reward: '+30 health (up to 150)' },
  { kills: 6, reward: '+50 health (up to 150)' },
  { kills: 9, reward: '150 health, kung fu, superjump and a 3 s slow pause' },
  { kills: 10, reward: 'Double points for every kill' },
]

export const serverCvars21 = [
  { cvar: 'ts_gameplay 21', desc: "Rust port only: play by TS 2.1's rules. Switching resets the map to a fresh start; 30 goes back to 3.0" },
  { cvar: 'mp_teamplay 1', desc: 'Team deathmatch on maps without a team prefix (teams from mp_teamlist, default hitman;gordon)' },
  { cvar: 'lastmanstanding 1', desc: 'Last Man Standing in deathmatch, applied at once' },
  { cvar: 'mp_theonemode 1', desc: 'The One (models from mp_theone / mp_theothers)' },
  { cvar: 'usecash 1', desc: 'Cash in deathmatch and team deathmatch: kills pay $900 a point' },
  { cvar: 'initial_cash 3000', desc: 'Starting cash, and the least you respawn with' },
  { cvar: 'cashforwin 1500', desc: 'Team cash for winning a round (cashforlose -1000 for losing)' },
  { cvar: 'respawnnumber 1', desc: 'Respawns per round in team rounds and Last Man Standing' },
  { cvar: 'respawntime 5', desc: 'Seconds before respawn (5–30)' },
  { cvar: 'slowmatch 1', desc: 'Frags earn stored slow motion, up to 5 s (default on)' },
  { cvar: 'nopowerup 1', desc: 'No random power-ups' },
  { cvar: 'globalslow 0.5', desc: 'Slow everyone down, 0–1; 1 (or 0) is normal speed' },
  { cvar: 'weaponrestriction 1', desc: '1 is kung fu only, up to 5 for everything (5 also overrides the map)' },
  { cvar: 'restartround 1', desc: 'Restart the round; 2 or more also clears team cash and scores' },
  { cvar: 'mp_friendlyfire 1', desc: 'Team damage; banfortk kicks or bans team killers' },
  { cvar: 'ts_bot_quota N', desc: 'Rust port only: keep N bots on the server' },
]
