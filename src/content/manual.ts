// FAQ adapted from the official 2007 FAQ. Controls are TS 3.0's shipped config.cfg binds.

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
  { q: 'How do I get slow motion?', a: "Collect a slow motion power-up for three seconds of slow motion, or on servers with 'Slowmatch' enabled, get a frag to earn one second. Your slow motion time appears in the top left of your HUD." },
  { q: 'How do I use slow motion?', a: "Press 'use' twice (E by default), or press 'use power-up' once (Z by default)." },
  { q: 'How do I do a stunt?', a: 'Press the stunt button (Mouse3 by default). Combine it with movement keys for dives, rolls and cartwheels.' },
  { q: 'How do I flip, and land on my feet?', a: 'Double-tap jump to flip. To land on your feet you need to be very light and look up before you jump. Weight comes from the slots you carry.' },
  { q: 'How do I climb a wall?', a: 'Face the wall and tap jump: you get three climbs before you fall. On the third climb press stunt to flip off it, or run at a wall and press stunt to flip off without climbing.' },
  { q: 'How do I wall dive?', a: 'Instead of just pressing stunt on one of your climbs, quickly turn around 180° and press stunt. You push off the wall with your feet and go into a dive.' },
  { q: 'How do I kick with a gun in my hand?', a: 'Get close to an opponent and tap jump. If they are facing you it kicks them and can disarm them.' },
  { q: 'How do I superjump?', a: 'Collect a superjump power-up (the foot) or become The One. Press crouch, then quickly press and hold jump. You rise until you hit the max height or let go.' },
  { q: 'Why do other people move faster than me?', a: 'They weigh less. Every weapon and item takes slots and adds weight; carry less to move faster and flip higher.' },
  { q: 'Why can I only use pistols / melee / kung fu on this server?', a: 'The server runs weapon restrictions: kung fu only, melee, melee + pistols, melee + pistols + shotguns, or everything (the default).' },
  { q: 'What does the alternate fire on some guns do?', a: "Centering or turning the gun sideways doesn't affect gameplay. It just looks cool, though some players like that it blocks less of the view." },
]

export type Bind = { key: string; action: string }

export const controls: Bind[] = [
  { key: 'W A S D', action: 'Move' },
  { key: 'Space', action: 'Jump (double-tap to flip, tap at walls to climb, tap next to enemies to kick)' },
  { key: 'Mouse3 / Q', action: 'Stunt: dive, roll, cartwheel, wall flip' },
  { key: 'Ctrl / C', action: 'Duck (crouch then jump = superjump)' },
  { key: 'Mouse1', action: 'Fire' },
  { key: 'Mouse2 / V', action: 'Alternate attack' },
  { key: 'E', action: 'Use (double-tap for slow motion)' },
  { key: 'Z', action: 'Use power-up' },
  { key: 'R', action: 'Reload' },
  { key: 'F', action: 'Fire mode' },
  { key: 'G', action: 'Use items (laser, flashlight)' },
  { key: 'T', action: 'Drop weapon' },
  { key: 'B', action: 'Buy menu' },
  { key: 'X', action: 'Third person' },
  { key: 'Tab', action: 'Scores' },
  { key: 'Y / U', action: 'Chat / team chat' },
]

export const gameModes = [
  { name: 'Deathmatch', desc: 'Everyone for themselves. Grab power-ups, chain stunts, rack up frags.' },
  { name: 'Team Deathmatch', desc: 'Two teams, team models, shared score.' },
  { name: 'Last Man Standing', desc: 'One life per round. Last one breathing wins.' },
  { name: 'The One', desc: 'One player becomes The One, with superpowers. Kill The One to take their place.' },
  { name: 'Capture The Briefcase', desc: 'New in 3.0: steal the enemy briefcase and bring it home.' },
]
