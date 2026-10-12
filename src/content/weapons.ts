// TS 3.0 weapon stats, generated from the Rust port's decoded tables
// (the-specialistsmod-rs crates/shared/data/weapons.toml, from ts_i386.so).
// Kung fu (weapon 0) is left out. Damage is per bullet; shotguns fire `pellets` per shot.
// Hand edits: pellet guns are listed as shotguns (TS files the USAS-12 and Sawed-off by HUD
// category), and the grenade's damage is its blast (combat.toml) rather than the table's 0.

export type Weapon = {
  name: string
  kind: 'Pistol' | 'SMG' | 'Rifle' | 'Shotgun' | 'Sniper' | 'Akimbo' | 'Grenade' | 'Blade'
  slots: number
  cost: number
  clip: number | null
  damage: number
  pellets: number | null
  modes: string[]
  /** Attachments you can add. */
  attachments: string[]
  /** Attachments the weapon always has. */
  builtIn: string[]
  /** Can also be bought as an akimbo pair. */
  akimbo: boolean
}

export const weapons: Weapon[] = [
  { name: 'Glock-18', kind: 'Pistol', slots: 10, cost: 850, clip: 17, damage: 24, pellets: null, modes: ['auto', 'semi'], attachments: ['silencer', 'laser', 'flashlight'], builtIn: [], akimbo: false },
  { name: 'Beretta 92F', kind: 'Pistol', slots: 10, cost: 900, clip: 15, damage: 27, pellets: null, modes: ['semi'], attachments: ['silencer', 'laser', 'flashlight'], builtIn: [], akimbo: true },
  { name: 'Mini-Uzi', kind: 'SMG', slots: 20, cost: 1300, clip: 32, damage: 20, pellets: null, modes: ['auto', 'semi'], attachments: ['silencer'], builtIn: [], akimbo: true },
  { name: 'Benelli M3', kind: 'Shotgun', slots: 40, cost: 3000, clip: 7, damage: 12, pellets: 8, modes: ['semi', 'pump'], attachments: ['laser', 'flashlight', 'scope'], builtIn: [], akimbo: false },
  { name: 'M4A1', kind: 'Rifle', slots: 40, cost: 4500, clip: 30, damage: 33, pellets: null, modes: ['auto', 'semi'], attachments: ['silencer', 'laser', 'flashlight', 'scope'], builtIn: [], akimbo: false },
  { name: 'MP5SD', kind: 'SMG', slots: 25, cost: 2500, clip: 30, damage: 19, pellets: null, modes: ['auto', 'semi', 'burst'], attachments: ['laser', 'flashlight', 'scope'], builtIn: ['silencer'], akimbo: false },
  { name: 'MP5K', kind: 'SMG', slots: 20, cost: 1500, clip: 30, damage: 23, pellets: null, modes: ['auto', 'semi', 'burst'], attachments: ['silencer', 'laser', 'flashlight', 'scope'], builtIn: [], akimbo: false },
  { name: 'Akimbo Berettas', kind: 'Akimbo', slots: 10, cost: 900, clip: 30, damage: 27, pellets: null, modes: ['semi', 'akimbo semi'], attachments: ['silencer', 'laser', 'flashlight'], builtIn: [], akimbo: false },
  { name: 'SOCOM-MK23', kind: 'Pistol', slots: 10, cost: 700, clip: 12, damage: 33, pellets: null, modes: ['semi'], attachments: ['silencer', 'laser', 'flashlight'], builtIn: [], akimbo: true },
  { name: 'Akimbo MK23', kind: 'Akimbo', slots: 10, cost: 700, clip: 24, damage: 33, pellets: null, modes: ['semi', 'akimbo semi'], attachments: ['silencer', 'laser', 'flashlight'], builtIn: [], akimbo: false },
  { name: 'USAS-12', kind: 'Shotgun', slots: 40, cost: 5100, clip: 20, damage: 7, pellets: 8, modes: ['auto'], attachments: ['laser', 'flashlight'], builtIn: [], akimbo: false },
  { name: 'Desert Eagle', kind: 'Pistol', slots: 15, cost: 1050, clip: 7, damage: 49, pellets: null, modes: ['semi'], attachments: ['silencer', 'laser', 'scope'], builtIn: [], akimbo: false },
  { name: 'AK47', kind: 'Rifle', slots: 40, cost: 3000, clip: 30, damage: 39, pellets: null, modes: ['auto', 'semi'], attachments: ['scope'], builtIn: [], akimbo: false },
  { name: 'Five-seveN', kind: 'Pistol', slots: 10, cost: 1250, clip: 20, damage: 23, pellets: null, modes: ['semi'], attachments: ['silencer', 'laser', 'flashlight'], builtIn: [], akimbo: true },
  { name: 'STEYR-AUG', kind: 'Rifle', slots: 30, cost: 5000, clip: 30, damage: 29, pellets: null, modes: ['auto', 'semi'], attachments: ['silencer', 'laser'], builtIn: ['scope'], akimbo: false },
  { name: 'Akimbo Mini-Uzi', kind: 'Akimbo', slots: 20, cost: 1300, clip: 64, damage: 20, pellets: null, modes: ['auto', 'akimbo auto'], attachments: ['silencer'], builtIn: [], akimbo: false },
  { name: 'Skorpion', kind: 'SMG', slots: 15, cost: 1100, clip: 20, damage: 16, pellets: null, modes: ['auto', 'semi'], attachments: [], builtIn: [], akimbo: true },
  { name: 'Barrett M82A1', kind: 'Sniper', slots: 70, cost: 9000, clip: 5, damage: 185, pellets: null, modes: ['semi'], attachments: ['laser'], builtIn: ['scope'], akimbo: false },
  { name: 'MP7-PDW', kind: 'SMG', slots: 25, cost: 2800, clip: 40, damage: 16, pellets: null, modes: ['auto', 'semi'], attachments: ['silencer', 'laser', 'scope'], builtIn: [], akimbo: false },
  { name: 'SPAS-12', kind: 'Shotgun', slots: 30, cost: 2100, clip: 8, damage: 12, pellets: 8, modes: ['semi', 'pump'], attachments: ['laser', 'flashlight'], builtIn: [], akimbo: false },
  { name: 'Golden Colts', kind: 'Akimbo', slots: 20, cost: 2600, clip: 16, damage: 40, pellets: null, modes: ['semi', 'akimbo semi'], attachments: [], builtIn: [], akimbo: false },
  { name: 'Glock-20C', kind: 'Pistol', slots: 10, cost: 1300, clip: 15, damage: 39, pellets: null, modes: ['semi'], attachments: ['silencer', 'laser', 'flashlight'], builtIn: [], akimbo: false },
  { name: 'UMP', kind: 'SMG', slots: 30, cost: 2300, clip: 25, damage: 31, pellets: null, modes: ['auto', 'semi', 'burst'], attachments: ['silencer', 'laser', 'flashlight', 'scope'], builtIn: [], akimbo: false },
  { name: 'M61 Grenade', kind: 'Grenade', slots: 7, cost: 1000, clip: null, damage: 110, pellets: null, modes: [], attachments: [], builtIn: [], akimbo: false },
  { name: 'Combat Knife', kind: 'Blade', slots: 1, cost: 100, clip: null, damage: 30, pellets: 5, modes: [], attachments: [], builtIn: [], akimbo: false },
  { name: 'Mossberg 500', kind: 'Shotgun', slots: 40, cost: 2500, clip: 8, damage: 16, pellets: 8, modes: ['pump'], attachments: ['laser', 'flashlight'], builtIn: [], akimbo: false },
  { name: 'M16A4', kind: 'Rifle', slots: 40, cost: 2500, clip: 18, damage: 40, pellets: null, modes: ['semi', 'burst'], attachments: ['laser', 'flashlight', 'scope'], builtIn: [], akimbo: false },
  { name: 'Ruger-MK1', kind: 'Pistol', slots: 5, cost: 1500, clip: 17, damage: 15, pellets: null, modes: ['semi'], attachments: ['laser'], builtIn: ['silencer'], akimbo: false },
  { name: 'Akimbo Five-seveN', kind: 'Akimbo', slots: 10, cost: 1250, clip: 40, damage: 23, pellets: null, modes: ['semi', 'akimbo semi'], attachments: ['silencer', 'laser', 'flashlight'], builtIn: [], akimbo: false },
  { name: 'Raging Bull', kind: 'Pistol', slots: 15, cost: 2100, clip: 5, damage: 95, pellets: null, modes: ['semi'], attachments: ['laser', 'scope'], builtIn: [], akimbo: false },
  { name: 'M60E3', kind: 'Rifle', slots: 70, cost: 8000, clip: 100, damage: 33, pellets: null, modes: ['auto'], attachments: [], builtIn: [], akimbo: false },
  { name: 'Sawed-off', kind: 'Shotgun', slots: 20, cost: 1900, clip: 2, damage: 21, pellets: 8, modes: ['semi'], attachments: ['laser'], builtIn: [], akimbo: false },
  { name: 'Katana', kind: 'Blade', slots: 10, cost: 2900, clip: null, damage: 45, pellets: null, modes: [], attachments: [], builtIn: [], akimbo: false },
  { name: 'Seal Knife', kind: 'Blade', slots: 1, cost: 100, clip: null, damage: 20, pellets: 10, modes: [], attachments: [], builtIn: [], akimbo: false },
  { name: 'Contender G2', kind: 'Pistol', slots: 15, cost: 1500, clip: 1, damage: 100, pellets: null, modes: ['semi'], attachments: ['laser', 'scope'], builtIn: [], akimbo: false },
  { name: 'Akimbo Skorpions', kind: 'Akimbo', slots: 15, cost: 1100, clip: 40, damage: 16, pellets: null, modes: ['auto', 'akimbo auto'], attachments: [], builtIn: [], akimbo: false },
]

export const attachmentPrices = { silencer: 900, laser: 800, flashlight: 500, scope: 1800 } as const
