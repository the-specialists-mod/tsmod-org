// Text drawn from the archived specialistsmod.net (2007), tsmod.org, and the
// TSRP wiki's "History of TSRP" (2017, saved in The-Specialists-Archive/filedump).

export const introStory = [
  'Feet pounding, heart hammering, you sprint along the corridor, the metal of the pistol cold against your hand. As you emerge into the bright lights of the deserted station, you breathe a sigh of relief. Not far to go now.',
  'As you run underneath the overpass towards the stairs the silent station suddenly erupts with gunfire, the stone floor around you is sprayed with bullets. You dive for cover, swinging round in time to see him leaping from the top of the overpass. As he lands and flows smoothly into a forward roll, you dive towards him, firing. Time seems to slow down all around you, so much so that you can almost see the bullets gliding through the air, drifting towards their target. He dives to the side, narrowly dodging all your fire. You land as he does, both coming to a halt, lying flat on the floor a few feet away from each other.',
  '*Click*',
  'Out of ammo.',
  "You quickly get up, ejecting the empty magazine from your gun, you slam the new one home just as he leaps at you, catching your arm and kicking the gun away. You duck and kick, sending him staggering back. As he recovers, you stare into his eyes and take your stance. He runs forward, launching himself into the air… 10 feet… 20 feet up. You don't have time to be amazed; you dive backwards, desperately reaching for your fallen gun. He plummets towards you, fist raised to strike. Your hand finds the gun and grips it, you bring it to bear and pull the trigger as fast as you can. For a brief moment you think you see what looks like surprise on his face, before the hail of bullets catches him in the head and chest.",
  'There is silence for a few moments, punctuated only by the sound of your heart beating. Shaking, you slowly get up and make your way to the stairs, sparing only a glance for the slack body of your fallen adversary, dropping the spent magazine and reloading as you go.',
  'Welcome to a minute in the life of a Specialist.',
]

export type TimelineEntry = { date: string; title: string; body: string }

export const timeline: TimelineEntry[] = [
  {
    date: '1999',
    title: 'Before TS: Action Half-Life',
    body: 'Action Half-Life (AHL) brings Hong Kong action movie gunplay to Half-Life. It inspires TS, and its players, roleplayers among them, are the first to move over when TS arrives.',
  },
  {
    date: 'Oct 29, 2002',
    title: 'The Specialists 1.0',
    body: 'Filippo "Morfeo" De Luca and Lorenzo "John_Matrix" Pasini release TS: a multiplayer action movie mod for Half-Life, first hosted by Multiplayer.it. PC Gamer UK covers it in its December 2002 issue and puts it on the cover disc.',
  },
  { date: '2003', title: 'TS 1.5 and 2.0', body: 'Patches bring new maps and weapons, the slot and weight system, and a Linux server.' },
  { date: '2004', title: 'TS 2.1', body: 'The last 2.x release, as a full installer and as an update from 2.0.' },
  {
    date: 'Jun 21, 2007',
    title: 'TS 3.0: "Here it is."',
    body: 'After years of development, 3.0 ships with reworked movement and stunts, Capture The Briefcase, throwing katanas and enhanced slow motion. It reaches the front page of Digg within eight hours.',
  },
  {
    date: '2007 to now',
    title: 'The community carries on',
    body: 'Servers, roleplay communities like Fisk City, and thousands of custom maps and models keep TS alive long after the official site goes dark.',
  },
  {
    date: '2024',
    title: 'tsmod.org and The Specialists Archive',
    body: 'Players gather the scattered maps, models, tools and tutorials into a public GitHub archive, and tsmod.org returns as a community hub.',
  },
  {
    date: '2026',
    title: 'A new installer and a Rust port',
    body: 'A cross-platform installer and launcher puts TS on Windows and Linux in a few clicks, and a wire-compatible Rust port of the game libraries runs on Xash3D FWGS, ReHLDS and the Half-Life 25th anniversary engine.',
  },
]

export type TsrpChapter = { title: string; body: string[] }

/** Roleplay (TSRP) history, condensed from the TSRP wiki. */
export const tsrp: TsrpChapter[] = [
  {
    title: 'From AHL to TS',
    body: [
      'Half-Life roleplay predates TS. Players roleplayed in Action Half-Life on maps like ahl_noir, ahl_roleplay and ahl_westminster, with no plugins at all.',
      'When TS was released on October 29, 2002, it was seen as a better AHL. Many players migrated, including a large contingent of roleplayers who set up some of the first TSRP servers.',
    ],
  },
  {
    title: 'Roleplay without plugins',
    body: [
      "With no plugins, the only way to enforce roleplay was to stop players spawning with weapons, so everyone started with kung fu. Doors couldn't be locked, so early maps like tsrp_westminster started with every door open.",
      'Where a door was meant to lock, mappers put a button beside it. A police officer would walk into the station, press the button to close the door, and control who came and went. If the door closed with nobody inside, usually because someone outside had shot the officer, it stayed shut for good.',
      'Some maps planned for police department takeovers, where criminals seized the station, its guns and the door button. Hidden buttons elsewhere on the map let the police break back in; early versions of Mecklenburg had them. Admins couldn\'t add gun spawns either, so maps came with spawns built into police stations and criminal hideouts.',
    ],
  },
  {
    title: 'The 3.0 split',
    body: [
      'When TS 3.0 arrived some TSRP servers stayed on 2.1 for a while as others moved over. 3.0 introduced new player animations that broke every model made for 2.1: walking could make a character look like it was jumping.',
      'Some players believed the developers did this on purpose to steer TS back to its deathmatch roots, since by then TSRP had more players than regular TS.',
    ],
  },
]

export const changelog30 = [
  'Vastly improved player movement and stunts',
  'Improved/tweaked weapons balance, handling and effects',
  'New game mode: Capture The Briefcase',
  'New weapons, maps and stunts',
  'New kung fu attacks',
  'Enhanced slow-motion dynamics and effects',
  'Enhanced visual effects and graphics',
  'Throwing katanas',
  'Improved particle effects and physics',
  'The version number was increased by 0.9',
]

export type NewsPost = { title: string; author: string; date: string; body: string[] }

export const news: NewsPost[] = [
  {
    title: 'Post Release Plans',
    author: 'Schmung',
    date: 'Jul 31, 2007',
    body: [
      "Hello folks, well, it's been a month (and a bit) since the release of 3.0 and we've had some time to sit back and bask in the post release glow. There's plenty of servers and players about and the overall reaction seems pretty positive.",
      'Morfeo and John_Matrix, the Italian masterminds behind TS, are working on a new game and are currently busy preparing an initial demo.',
      "We're also toying with the idea of releasing a community mappack to support the new gamemode in 3.0, Capture The Briefcase, but that obviously depends rather on the feedback from you guys.",
    ],
  },
  {
    title: 'TS 3 : Here it is.',
    author: 'Schmung',
    date: 'Jun 21, 2007',
    body: [
      'No terrible pun, no vast news post. Just the release of TS3. We got a great response from the community when we asked for some mirrors, so a huge thank you to everyone who has donated space and bandwidth.',
      'Finally, the dev team would like to say a big thank you to the loyal supporters of the mod who have waited patiently and indeed, not so patiently over the past few years of development.',
      "Edit: 8 hours since release and it would seem we're on the front page of Digg, huzzah!",
    ],
  },
  {
    title: 'The Final Countdown',
    author: 'Schmung',
    date: 'Jun 19, 2007',
    body: [
      "It's been a long time coming and at times it looked like we'd never see this day, but we are finally here. TS3 is done and will be released this weekend.",
      'Final date and time have yet to be set and are subject to the availability of certain people, prevailing winds, the rising moon in Venus and various other factors.',
      "p.s. apologies for the newspost title, I couldn't resist.",
    ],
  },
  {
    title: 'Join our community!',
    author: 'Vino',
    date: 'Apr 30, 2007',
    body: [
      'Here at The Specialists we pride ourselves in being community-awesome. I bet you thought I was going to say "community-friendly." Well you were wrong, because our community is not just friendly, it is awesome.',
      'Be there or be: [] rectangle.',
    ],
  },
]

export type CreditGroup = { role: string; people: string[] }

export const credits: CreditGroup[] = [
  { role: 'Project leads', people: ['Filippo "Morfeo" De Luca', 'Lorenzo "John_Matrix" Pasini'] },
  { role: 'Lead assistants', people: ['Jorge "Vino" Rodriguez', 'Matthew "Schmung" Carter'] },
  { role: 'Coding', people: ['Filippo "Morfeo" De Luca', 'Jorge "Vino" Rodriguez'] },
  {
    role: 'Mapping',
    people: [
      'Matthew "Schmung" Carter', 'Doeke "Clan-Killer" Wartena', 'WillSchnevel', 'Andreas "EviLTaxi" Braunagel', 'Mazy',
      'Brady "Crackerjack" Keehn', 'Casimir "Stratesiz" Tuomi', 'Brian "Lois_Must_Die" Petty', '3D Mike', 'Bram "Pericolos0" Eulaers',
      'Jan "Squad" Huygelen', 'Cayle George', 'X-Tender', 'Scott "Dredd" Winchester', 'Manah', 'Sm0lders', 'Kruxus', 'Filippo "Morfeo" De Luca',
    ],
  },
  { role: 'Sound', people: ['Menso "Atomic Shiva" von Ehrenstein'] },
  { role: 'Modeling', people: ['Lorenzo "John_Matrix" Pasini', 'Filippo "Morfeo" De Luca'] },
  { role: 'Additional models', people: ['Matthew "Schmung" Carter', 'Doeke "Clan-Killer" Wartena', 'Flakk', 'Cliff "Sjet vs. Kerrigan" Nordman'] },
  { role: 'Animations', people: ['Filippo "Morfeo" De Luca', 'Tempyst', 'Tom "Rifter" Leaman', 'Cliff "Sjet vs. Kerrigan" Nordman', 'Flakk'] },
  { role: 'Skins & textures', people: ['Filippo "Morfeo" De Luca', 'Marco "Omega" Capone', 'Michele "Supernovae" De Luca', 'Xanthi', 'Creeping Jesus', 'X-Convict', 'Kissle', 'Cliff "Sjet vs. Kerrigan" Nordman'] },
  { role: 'Web design', people: ['Graham "Cheshire Cat" Conzett', 'Matthew "Schmung" Carter', 'Marco "Omega" Capone'] },
  { role: 'Advertising & PR', people: ['Chris "BaronFelX" McMahon'] },
  { role: '3.0 trailer', people: ['Greg "Oreo" Barboza'] },
  { role: 'Linux porting', people: ['Jorge "Vino" Rodriguez'] },
  { role: 'Weapon config', people: ['Tom "That One Guy" Loughead', 'Johan "Antagonist" Allgulander'] },
  { role: 'TS manual', people: ['Ben "Nashwan" Whitingham'] },
  {
    role: 'Beta testing',
    people: [
      'Petter "Al-Akbar" Helmin', 'Johan "Antagonist" Allgulander', 'Jimi "Dire" Reittu', 'Bram "Pericolos0" Eulaers', 'Jan "Squad" Huygelen',
      'Brady "Crackerjack" Keehn', 'Dr_b_', 'Robert "Feixeno" Costello', 'Tom "That One Guy" Loughead', 'Flakk', 'Fullauto', 'Andrew "icu" Carvalho',
      'Ben "Nashwan" Whitingham', 'orgun', 'Joe "Ownij" Tynan', 'Casimir "Stratesiz" Tuomi', 'Tom "Rifter" Leaman', 'Sjet vs. Kerrigan', 'Tempyst',
      'Graham "Cheshire Cat" Conzett', 'Andreas "EviLTaxi" Braunagel', 'Brian "Lois_Must_Die" Petty', 'Tom "exobot" Right',
    ],
  },
  {
    role: 'Past contributors',
    people: [
      'Fabrizio "WarFox" Bernardi', 'Pierpaolo "Quakeman" Greco', 'Giulio "Maik" Redina', 'Francesco "Guybrush T." Degrassi', 'Graograman',
      'Holy Knight', 'Paddy', 'Sp@wn', 'U-Boat', 'Vokial', 'Komodo', 'Chan Kong-sang', 'Doctor Shaft', 'Mew', 'Necro', 'Brian "Veridian" Torres',
    ],
  },
]
