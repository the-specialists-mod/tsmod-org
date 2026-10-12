// TS 3.0 loadout rules, from the Rust port (the-specialistsmod-rs: shared/src/ts.rs
// speed_by_slots, server weapons/inventory.rs, docs/implementation/movement.md).
import { attachmentPrices, weaponById, weapons, type Attachment, type Weapon } from '@/content/weapons'

export const TOTAL_SLOTS = 81
export const KEVLAR_SLOTS = 10
export const KEVLAR_COST = 1900
export const MONEY = 30000

/** Thrown damage by blade id: Combat Knife, Katana, Seal Knife (combat.toml `thrown`). */
export const thrownDamage: Record<number, number> = { 25: 100, 34: 150, 35: 50 }

/** Slots a weapon takes: an akimbo pair is two of its single gun. */
export function slotsOf(w: Weapon): number {
  const single = w.singleId != null ? weaponById.get(w.singleId) : undefined
  return single ? single.slots * 2 : w.slots
}

/** `GetSpeedBySlots`: 330 with nothing carried, else 210 + free × 120 / 81, truncated. */
export function speedBySlots(free: number): number {
  if (free >= TOTAL_SLOTS) return 330
  return Math.trunc(free * 0.012345679 * 120 + 210)
}

export type StuntLevel = { name: string; desc: string; rank: number }

/** Dive strength by slots used: under 42 high, 52 medium, 62 low (`CanDive*`). */
export function stuntLevel(used: number): StuntLevel {
  if (used < 42) return { name: 'Full', desc: 'High dives, flips that land on your feet.', rank: 3 }
  if (used < 52) return { name: 'Medium', desc: 'Shorter dives.', rank: 2 }
  if (used < 62) return { name: 'Low', desc: 'Low, short dives.', rank: 1 }
  return { name: 'Barely', desc: 'Too heavy: dives barely leave the ground.', rank: 0 }
}

export type Entry = {
  /** Weapon id; for an akimbo pair, the pair's id. */
  id: number
  attachments: Attachment[]
  /** For stackable items (knives): how many. */
  count: number
}

export type Loadout = { entries: Entry[]; kevlar: boolean }

export const emptyLoadout: Loadout = { entries: [], kevlar: false }

export function entrySlots(e: Entry): number {
  const w = weaponById.get(e.id)
  if (!w) return 0
  return slotsOf(w) * (w.stack ? e.count : 1)
}

export function entryCost(e: Entry): number {
  const w = weaponById.get(e.id)
  if (!w) return 0
  const single = w.singleId != null ? weaponById.get(w.singleId) : undefined
  const base = single ? single.cost * 2 : w.cost
  return base * (w.stack ? e.count : 1) + e.attachments.reduce((n, a) => n + attachmentPrices[a], 0)
}

export function usedSlots(l: Loadout): number {
  return l.entries.reduce((n, e) => n + entrySlots(e), 0) + (l.kevlar ? KEVLAR_SLOTS : 0)
}

export function totalCost(l: Loadout): number {
  return l.entries.reduce((n, e) => n + entryCost(e), 0) + (l.kevlar ? KEVLAR_COST : 0)
}

/** Weapons the buy menu sells: no grenades in 3.0, and pairs are picked as an option on the single gun. */
export const buyable = weapons.filter((w) => w.kind !== 'Grenade' && w.singleId == null)

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

export function decodeLoadout(s: string | null): Loadout {
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
  return usedSlots(l) <= TOTAL_SLOTS ? l : emptyLoadout
}

export const presets: { name: string; desc: string; loadout: string }[] = [
  { name: 'John Woo', desc: 'Akimbo Berettas with lasers and a katana. Light enough for full stunts.', loadout: '8.2-34' },
  { name: 'Run and gun', desc: 'MP5K and a Glock: fast, light, full auto.', loadout: '7.2-1' },
  { name: 'Shotgun rush', desc: 'SPAS-12, a Desert Eagle and Kevlar.', loadout: '20-12-k' },
  { name: 'Sniper', desc: 'Barrett M82A1 and a SOCOM. Heavy and slow.', loadout: '18-9.1' },
  { name: 'Knife fighter', desc: 'A katana and throwing knives, nothing else.', loadout: '34-25x5' },
]
