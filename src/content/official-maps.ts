// The 29 maps that ship with TS 3.0. Titles and authors come from the map
// readmes in the stock install, maps.lst, and the 2007 team page.

export type OfficialMap = {
  name: string
  title: string
  author?: string
  mode: 'Deathmatch' | 'Capture The Briefcase'
  note?: string
}

export const officialMaps: OfficialMap[] = [
  { name: 'ctb_deadheat', title: 'Dead Heat', author: 'WillSchnevel', mode: 'Capture The Briefcase' },
  { name: 'ts_antrodome', title: 'The Antrodome', author: 'Casimir "Stratesiz" Tuomi', mode: 'Deathmatch' },
  { name: 'ts_awaken', title: 'Awaken', author: 'Scott "Dredd" Winchester', mode: 'Deathmatch', note: 'Based on the Matrix dojo sparring scene.' },
  { name: 'ts_bikini', title: 'Bikini', author: '3D-Mike', mode: 'Deathmatch', note: "Don't forget to bring yer swimming trunks!" },
  { name: 'ts_casa', title: 'Casa', author: 'Matthew "Schmung" Carter', mode: 'Deathmatch' },
  { name: 'ts_central', title: 'Central Station', author: 'Matthew "Schmung" Carter', mode: 'Deathmatch' },
  { name: 'ts_dietrich', title: 'Dietrich', author: 'Matthew "Schmung" Carter', mode: 'Deathmatch' },
  { name: 'ts_dojo', title: 'Dojo', author: 'Clan-Killer & 3D-Mike', mode: 'Deathmatch', note: 'The Matrix has you.' },
  { name: 'ts_faculty', title: 'The Specialists Academy', author: 'Matthew "Schmung" Carter', mode: 'Deathmatch' },
  { name: 'ts_fall', title: 'Fall', mode: 'Deathmatch' },
  { name: 'ts_frigid', title: 'Frigid', author: 'WillSchnevel', mode: 'Deathmatch' },
  { name: 'ts_gpc', title: 'GPC', author: 'Doeke "Clan-Killer" Wartena', mode: 'Deathmatch' },
  { name: 'ts_hammertime', title: 'Hammertime', author: 'WillSchnevel & Cayle George', mode: 'Deathmatch' },
  { name: 'ts_henningsen', title: 'Henningsen', mode: 'Deathmatch' },
  { name: 'ts_henny2', title: 'Henny 2', author: 'Morfeo, tweaked by Schmung', mode: 'Deathmatch' },
  { name: 'ts_heresy', title: 'Heresy', author: 'Nelson "Manah" Ferryman', mode: 'Deathmatch' },
  { name: 'ts_kissmeyerbasic', title: 'Kissmeyer Basic', author: 'Morten "Mazy" Hedegren', mode: 'Deathmatch' },
  { name: 'ts_lobby', title: 'Lobby', author: 'Morfeo, modified by Bido', mode: 'Deathmatch', note: 'The classic.' },
  { name: 'ts_lobbyduel', title: 'Lobby Duel', author: 'WillSchnevel & Morfeo', mode: 'Deathmatch' },
  { name: 'ts_metro', title: 'Metro', author: 'Doeke "Clan-Killer" Wartena', mode: 'Deathmatch' },
  { name: 'ts_neobaroque', title: 'NeoBaroque', author: 'Andreas "EviLTaxi" Braunagel', mode: 'Deathmatch' },
  { name: 'ts_panzibar', title: 'Panzibar', author: 'Matthew "Schmung" Carter', mode: 'Deathmatch' },
  { name: 'ts_parking', title: 'Parking', author: 'Doeke "Clan-Killer" Wartena', mode: 'Deathmatch' },
  { name: 'ts_rundown', title: 'Rundown', author: 'WillSchnevel', mode: 'Deathmatch' },
  { name: 'ts_supertimor', title: 'Supertimor', author: 'Morten "Mazy" Hedegren', mode: 'Deathmatch' },
  { name: 'ts_theatre', title: 'Theatre', author: 'X-Tender', mode: 'Deathmatch' },
  { name: 'ts_trident', title: 'The Trident Lobby', author: 'Stinkey', mode: 'Deathmatch' },
  { name: 'ts_urbannights', title: 'Urban Nights', mode: 'Deathmatch' },
  { name: 'ts_wyndham', title: 'Wyndham', author: 'Brian "Lois_Must_Die" Petty', mode: 'Deathmatch', note: 'Based on the teahouse opening of Hard Boiled.' },
]

export type StockModel = { name: string; title: string; author: string; skins: string }

export const stockModels: StockModel[] = [
  { name: 'agent', title: 'Agent', author: 'Morfeo', skins: 'Morfeo' },
  { name: 'castor', title: 'Castor Troy', author: 'Antonio "RAvEN" Teglia', skins: 'Marco "Dit.{Z}"' },
  { name: 'gordon', title: 'Action Gordon', author: 'Morfeo', skins: 'Morfeo' },
  { name: 'hitman', title: 'Hitman', author: 'Morfeo', skins: 'Morfeo & Omega' },
  { name: 'laurence', title: 'Laurence', author: 'Morfeo', skins: 'Morfeo' },
  { name: 'merc', title: 'Merc', author: 'Morfeo', skins: 'Omega' },
  { name: 'seal', title: 'Seal', author: 'Morfeo', skins: 'Omega' },
]
