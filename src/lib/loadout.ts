// Loadout rules for TS 3.0 and TS 2.1, from the Rust port (the-specialistsmod-rs).
// 3.0: shared/src/ts.rs speed_by_slots, server weapons/inventory.rs, docs/implementation/movement.md.
// 2.1: crates/ts21 (src/shared/pm.rs speed_by_slots, server/src/stunt.rs can_dive, server/src/cash.rs,
// data/combat21.toml), docs/implementation/ts21.md.
import { attachmentPrices, weaponById as weaponById30, weapons as weapons30, type Attachment, type Weapon } from '@/content/weapons'
import { weaponById21, weapons21 } from '@/content/weapons21'
import type { Version } from '@/lib/version'

export type StuntLevel = { name: string; desc: string; rank: number }

export type Entry = {
  /** Weapon id; for an akimbo pair, the pair's id. */
  id: number
  attachments: Attachment[]
  /** For stackable items (knives): how many. */
  count: number
}

export type Loadout = { entries: Entry[]; kevlar: boolean }

export const emptyLoadout: Loadout = { entries: [], kevlar: false }

type Preset = { name: string; desc: string; loadout: string }

type RulesetDef = {
  version: Version
  weapons: Weapon[]
  weaponById: Map<number, Weapon>
  totalSlots: number
  kevlarSlots: number
  kevlarCost: number
  /** What the buy menu spends outside cash-based games. */
  money: number
  speedMin: number
  speedMax: number
  /** Run speed by free slots. */
  speedBySlots: (free: number) => number
  /** Dive strength by slots used; `kevlar` for the 2.1 team rounds' armour rule. */
  stuntLevel: (used: number, kevlar: boolean) => StuntLevel
  /** A bullet's damage factor with a silencer. */
  silencerDamage: number
  /** A blade's time between swings, in seconds. */
  swingTime: (w: Weapon) => string
  /** Thrown damage by blade id. */
  thrownDamage: Record<number, string>
  presets: Preset[]
  text: {
    speed: string
    topSpeed: string
    kevlar: string
    cost: string
    buyNote: string
  }
}

const barely: StuntLevel = { name: 'Barely', desc: 'Too heavy: dives barely leave the ground.', rank: 0 }

function makeRuleset(def: RulesetDef) {
  const { weaponById, totalSlots, kevlarSlots, kevlarCost } = def

  /** Slots a weapon takes: an akimbo pair is two of its single gun. */
  const slotsOf = (w: Weapon): number => {
    const single = w.singleId != null ? weaponById.get(w.singleId) : undefined
    return single ? single.slots * 2 : w.slots
  }

  const entrySlots = (e: Entry): number => {
    const w = weaponById.get(e.id)
    if (!w) return 0
    return slotsOf(w) * (w.stack ? e.count : 1)
  }

  const entryCost = (e: Entry): number => {
    const w = weaponById.get(e.id)
    if (!w) return 0
    const single = w.singleId != null ? weaponById.get(w.singleId) : undefined
    const base = single ? single.cost * 2 : w.cost
    return base * (w.stack ? e.count : 1) + e.attachments.reduce((n, a) => n + attachmentPrices[a], 0)
  }

  const usedSlots = (l: Loadout): number => l.entries.reduce((n, e) => n + entrySlots(e), 0) + (l.kevlar ? kevlarSlots : 0)

  const totalCost = (l: Loadout): number => l.entries.reduce((n, e) => n + entryCost(e), 0) + (l.kevlar ? kevlarCost : 0)

  const decodeLoadout = (s: string | null): Loadout => {
    if (!s) return emptyLoadout
    const entries: Entry[] = []
    let kevlar = false
    for (const part of s.split('-')) {
      if (part === 'k') {
        kevlar = true
        continue
      }
      const m = part.match(/^(\d+)(?:\.(\d+))?(?:x(\d+))?$/)
      const w = m && weaponById.get(Number(m[1]))
      if (!m || !w || entries.some((e) => e.id === w.id)) continue
      const bits = Number(m[2] ?? 0)
      const allowed = new Set(w.attachments)
      entries.push({
        id: w.id,
        attachments: BITS.filter((a, i) => bits & (1 << i) && allowed.has(a)),
        count: w.stack ? Math.max(1, Number(m[3] ?? 1)) : 1,
      })
    }
    const l = { entries, kevlar }
    return usedSlots(l) <= totalSlots ? l : emptyLoadout
  }

  return {
    ...def,
    slotsOf,
    entrySlots,
    entryCost,
    usedSlots,
    totalCost,
    decodeLoadout,
    /** Weapons the buy menu sells: no grenades in the builder, and pairs are picked as an option on the single gun. */
    buyable: def.weapons.filter((w) => w.kind !== 'Grenade' && w.singleId == null),
  }
}

export type Ruleset = ReturnType<typeof makeRuleset>

export const rules30 = makeRuleset({
  version: '30',
  weapons: weapons30,
  weaponById: weaponById30,
  totalSlots: 81,
  kevlarSlots: 10,
  kevlarCost: 1900,
  money: 30000,
  speedMin: 210,
  speedMax: 330,
  /** `GetSpeedBySlots`: 330 with nothing carried, else 210 + free × 120 / 81, truncated. */
  speedBySlots: (free) => (free >= 81 ? 330 : Math.trunc(free * 0.012345679 * 120 + 210)),
  /** Dive strength by slots used: under 42 high, 52 medium, 62 low (`CanDive*`). */
  stuntLevel: (used) => {
    if (used < 42) return { name: 'Full', desc: 'High dives, flips that land on your feet.', rank: 3 }
    if (used < 52) return { name: 'Medium', desc: 'Shorter dives.', rank: 2 }
    if (used < 62) return { name: 'Low', desc: 'Low, short dives.', rank: 1 }
    return barely
  },
  silencerDamage: 0.775,
  swingTime: (w) => `${w.rate}`,
  /** Thrown damage by blade id: Combat Knife, Katana, Seal Knife (combat.toml `thrown`). */
  thrownDamage: { 25: '100', 34: '150', 35: '50' },
  presets: [
    { name: 'John Woo', desc: 'Akimbo Berettas with lasers and a katana. Light enough for full stunts.', loadout: '8.2-34' },
    { name: 'Run and gun', desc: 'MP5K and a Glock: fast, light, full auto.', loadout: '7.2-1' },
    { name: 'Shotgun rush', desc: 'SPAS-12, a Desert Eagle and Kevlar.', loadout: '20-12-k' },
    { name: 'Sniper', desc: 'Barrett M82A1 and a SOCOM. Heavy and slow.', loadout: '18-9.1' },
    { name: 'Knife fighter', desc: 'A katana and throwing knives, nothing else.', loadout: '34-25x5' },
  ],
  text: {
    speed: 'From 210 fully loaded to 330 empty-handed.',
    topSpeed: 'Top speed: you carry nothing.',
    kevlar: 'Kevlar vest (10 slots, $1,900)',
    cost: 'Of $30,000. Money is never short in 3.0.',
    buyNote: 'Grenades and stealth shoes are in the buy menu but the 3.0 server refuses them.',
  },
})

export const rules21 = makeRuleset({
  version: '21',
  weapons: weapons21,
  weaponById: weaponById21,
  totalSlots: 81,
  kevlarSlots: 0,
  kevlarCost: 1900,
  money: 30000,
  speedMin: 170,
  speedMax: 310,
  /** 2.1 `GetSpeedBySlots` (0x100436e0): 310 with 70 or more free, else 170 + free × 140 / 70, truncated. */
  speedBySlots: (free) => (free >= 70 ? 310 : Math.trunc(free * Math.fround(1 / 70) * 140 + 170)),
  /** 2.1 `CanDive*`: under 22 high, 42 medium, 72 low; in team rounds a high dive also needs no armour. */
  stuntLevel: (used, kevlar) => {
    if (used < 22 && !kevlar) return { name: 'Full', desc: 'High dives, flips that land on your feet.', rank: 3 }
    if (used < 42) return { name: 'Medium', desc: used < 22 ? 'Armour rules out high dives in team rounds.' : 'Shorter dives.', rank: 2 }
    if (used < 72) return { name: 'Low', desc: 'Low, short dives.', rank: 1 }
    return barely
  },
  silencerDamage: 0.8,
  /** 2.1's knives wait rate × 0.7; its katana 0.35 s, or 0.7 s for the low and back swings (melee.rs). */
  swingTime: (w) => (w.id === 34 ? '0.35–0.7' : `${Math.round(w.rate * 0.7 * 100) / 100}`),
  /** Thrown damage by blade id: the combat knife's 80 falls to 50 between 512 and 1,088 units; no katana throw. */
  thrownDamage: { 25: '80–50', 35: '50' },
  presets: [
    { name: 'John Woo', desc: 'Akimbo Berettas with lasers and a katana.', loadout: '8.2-34' },
    { name: 'Run and gun', desc: 'MP5K and a Glock: fast, light, full auto.', loadout: '7.2-1' },
    { name: 'Shotgun rush', desc: 'SPAS-12, a Desert Eagle and Kevlar (team rounds).', loadout: '20-12-k' },
    { name: 'Sniper', desc: 'Barrett M82A1 and a SOCOM. Heavy and slow.', loadout: '18-9.1' },
    { name: 'Knife fighter', desc: 'A katana and throwing knives: full stunts.', loadout: '34-25x5' },
    { name: 'Stuntman', desc: 'A silenced Ruger and five knives: top speed and full stunts.', loadout: '28-25x5' },
  ],
  text: {
    speed: 'From 170 fully loaded to 310 with 11 slots or fewer.',
    topSpeed: 'Top speed: 11 slots or fewer.',
    kevlar: 'Kevlar vest (team rounds only, no slots, $1,900)',
    cost: 'Of $30,000 in deathmatch. Team rounds start you on $3,000.',
    buyNote: 'Grenades (two a life), Kevlar and Stealth Shoes ($700) are sold in team rounds only.',
  },
})

export function rulesFor(v: Version): Ruleset {
  return v === '21' ? rules21 : rules30
}

// Shareable loadout strings: entries joined by "-", each `id[.attachment bits][xcount]`, "k" for Kevlar.
const BITS: Attachment[] = ['silencer', 'laser', 'flashlight', 'scope']

export function encodeLoadout(l: Loadout): string {
  const parts = l.entries.map((e) => {
    const bits = e.attachments.reduce((n, a) => n | (1 << BITS.indexOf(a)), 0)
    return `${e.id}${bits ? `.${bits}` : ''}${e.count > 1 ? `x${e.count}` : ''}`
  })
  if (l.kevlar) parts.push('k')
  return parts.join('-')
}
