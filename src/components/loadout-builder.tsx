import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { CheckIcon, LinkIcon, MinusIcon, PlusIcon, ShieldIcon, TrashIcon, XIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { AttachmentIcon, attachmentLabels, FireModeIcon, fireModeLabels, IconChip } from '@/components/weapon-icons'
import { weaponById, type Attachment, type FireMode, type Weapon } from '@/content/weapons'
import {
  buyable,
  decodeLoadout,
  encodeLoadout,
  entryCost,
  entrySlots,
  KEVLAR_SLOTS,
  MONEY,
  presets,
  slotsOf,
  speedBySlots,
  stuntLevel,
  thrownDamage,
  totalCost,
  TOTAL_SLOTS,
  usedSlots,
  type Entry,
  type Loadout,
} from '@/lib/loadout'
import { cn } from '@/lib/utils'

const kinds: Weapon['kind'][] = ['Pistol', 'Akimbo', 'SMG', 'Rifle', 'Shotgun', 'Sniper', 'Blade']
// One colour per loadout entry in the slot bar.
const SEGMENT = ['#a51d1d', '#b5bac8', '#c9a227', '#5f8f5f', '#6f6fb0', '#b06f9a', '#4f9aa8', '#9a6f4f']

function Stat({ label, value, note, children }: { label: string; value: React.ReactNode; note?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="border-b border-black/60 py-3 last:border-b-0">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[11px] tracking-widest text-muted-foreground uppercase">{label}</span>
        <span className="font-display text-2xl text-foreground">{value}</span>
      </div>
      {children}
      {note && <p className="mt-1 text-xs text-muted-foreground">{note}</p>}
    </div>
  )
}

function Meter({ value, max, className }: { value: number; max: number; className?: string }) {
  return (
    <div className="mt-1.5 h-2 border border-black bg-black/50">
      <div className={cn('h-full bg-link', className)} style={{ width: `${Math.min(100, (value / max) * 100)}%` }} />
    </div>
  )
}

/** Whole loadout: what it can do, at a glance. */
function Capabilities({ loadout, entries }: { loadout: Loadout; entries: { e: Entry; w: Weapon }[] }) {
  const used = usedSlots(loadout)
  const free = TOTAL_SLOTS - used
  const speed = speedBySlots(free)
  const stunts = stuntLevel(used)
  const modes = [...new Set(entries.flatMap(({ w }) => w.modes))] as FireMode[]
  const stockGuns = entries.filter(({ w }) => w.stock > 0).map(({ w }) => w)
  const blades = entries.filter(({ w }) => w.kind === 'Blade').map(({ w }) => w)
  const [copied, setCopied] = useState(false)

  return (
    <div className="panel p-4 lg:sticky lg:top-14">
      <h3 className="text-xl">Capabilities</h3>
      <Stat label="Slots" value={`${used} / ${TOTAL_SLOTS}`} note={`${free} free`}>
        <div className="mt-1.5 flex h-3 border border-black bg-black/50" aria-hidden>
          {entries.map(({ e }, i) => (
            <div key={e.id} style={{ width: `${(entrySlots(e) / TOTAL_SLOTS) * 100}%`, background: SEGMENT[i % SEGMENT.length] }} className="border-r border-black/70" />
          ))}
          {loadout.kevlar && <div style={{ width: `${(KEVLAR_SLOTS / TOTAL_SLOTS) * 100}%` }} className="border-r border-black/70 bg-[#777]" />}
        </div>
      </Stat>
      <Stat label="Run speed" value={speed} note={speed === 330 ? 'Top speed: you carry nothing.' : 'From 210 fully loaded to 330 empty-handed.'}>
        <Meter value={speed - 210} max={120} />
      </Stat>
      <Stat label="Stunts" value={stunts.name} note={stunts.desc}>
        <div className="mt-1.5 grid grid-cols-3 gap-0.5">
          {[1, 2, 3].map((r) => (
            <div key={r} className={cn('h-2 border border-black', stunts.rank >= r ? 'bg-link-hover' : 'bg-black/50')} />
          ))}
        </div>
      </Stat>
      <Stat label="Armour" value={loadout.kevlar ? 'Kevlar' : 'None'} note={loadout.kevlar ? 'A vest soaks up damage.' : undefined} />
      <Stat label="Fire modes" value={modes.length || '—'}>
        {modes.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {modes.map((m) => (
              <IconChip key={m} label={fireModeLabels[m].name} desc={fireModeLabels[m].desc}>
                <FireModeIcon mode={m} className="size-4" />
              </IconChip>
            ))}
          </div>
        )}
      </Stat>
      <Stat
        label="Close combat"
        value={1 + blades.length + (stockGuns.length ? 1 : 0)}
        note={[
          'Kung fu (always)',
          ...blades.map((b) => `${b.name} slash & throw`),
          stockGuns.length ? `gun-butt strike (${stockGuns.map((g) => g.name).join(', ')})` : '',
        ]
          .filter(Boolean)
          .join(' · ')}
      />
      <Stat label="Cost" value={`$${totalCost(loadout).toLocaleString()}`} note={`Of $${MONEY.toLocaleString()}. Money is never short in 3.0.`} />
      <Button
        variant="outline"
        size="sm"
        className="mt-3 w-full"
        onClick={() => {
          void navigator.clipboard.writeText(window.location.href).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
          })
        }}
      >
        {copied ? <CheckIcon data-icon="inline-start" /> : <LinkIcon data-icon="inline-start" />} {copied ? 'Link copied' : 'Copy link to this loadout'}
      </Button>
    </div>
  )
}

function EntryCard({
  entry,
  weapon,
  color,
  free,
  onChange,
  onRemove,
}: {
  entry: Entry
  weapon: Weapon
  color: string
  free: number
  onChange: (e: Entry) => void
  onRemove: () => void
}) {
  // The single gun this entry is (or pairs up from), and its pair if it has one.
  const single = weapon.singleId != null ? weaponById.get(weapon.singleId)! : weapon
  const pair = single.pairId != null ? weaponById.get(single.pairId) : undefined
  const isPair = weapon.singleId != null
  const silenced = entry.attachments.includes('silencer') || weapon.builtIn.includes('silencer')
  const damage = Math.round(weapon.damage * (silenced ? 0.775 : 1) * 10) / 10
  const canPair = pair && !isPair && free >= slotsOf(pair) - slotsOf(weapon)

  return (
    <li className="panel flex flex-col gap-3 p-4" style={{ boxShadow: `inset 3px 0 0 ${color}, inset 0 0 0 1px #474747` }}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-bold text-foreground">
            {weapon.name}
            {weapon.stack && entry.count > 1 && <span className="text-muted-foreground"> ×{entry.count}</span>}
          </p>
          <p className="text-[11px] text-muted-foreground">
            {weapon.kind}
            {isPair && ` · 2× ${single.name}`} · {entrySlots(entry)} slots · ${entryCost(entry).toLocaleString()}
          </p>
        </div>
        <Button variant="ghost" size="icon-sm" onClick={onRemove} aria-label={`Remove ${weapon.name}`}>
          <TrashIcon />
        </Button>
      </div>

      <dl className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <dt className="text-muted-foreground">Damage</dt>
          <dd className="text-foreground">
            {damage}
            {weapon.pellets && ` ×${weapon.pellets}`}
            {silenced && weapon.kind !== 'Blade' && <span className="text-muted-foreground"> (silenced)</span>}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">{weapon.kind === 'Blade' ? 'Swing every' : 'Max rate'}</dt>
          <dd className="text-foreground">{weapon.kind === 'Blade' ? `${weapon.rate}s` : `${Math.round(60 / weapon.rate)}/min`}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">{weapon.kind === 'Blade' ? 'Thrown' : 'Clip'}</dt>
          <dd className="text-foreground">{weapon.kind === 'Blade' ? (thrownDamage[weapon.id] ?? '—') : (weapon.clip ?? '—')}</dd>
        </div>
      </dl>

      {weapon.modes.length > 0 && (
        <div className="flex flex-wrap items-center gap-1">
          {weapon.modes.map((m) => (
            <IconChip key={m} label={fireModeLabels[m].name} desc={fireModeLabels[m].desc}>
              <FireModeIcon mode={m} className="size-4" />
            </IconChip>
          ))}
        </div>
      )}

      {(weapon.attachments.length > 0 || weapon.builtIn.length > 0) && (
        <div className="flex flex-wrap items-center gap-1">
          {weapon.builtIn.map((a) => (
            <IconChip key={a} label={`${attachmentLabels[a].name} (built in)`} desc={attachmentLabels[a].desc}>
              <AttachmentIcon attachment={a} className="size-4 text-link-hover" />
            </IconChip>
          ))}
          {weapon.attachments.map((a: Attachment) => {
            const on = entry.attachments.includes(a)
            return (
              <button
                key={a}
                type="button"
                aria-pressed={on}
                title={`${on ? 'Remove' : 'Add'} ${attachmentLabels[a].name}`}
                onClick={() => onChange({ ...entry, attachments: on ? entry.attachments.filter((x) => x !== a) : [...entry.attachments, a] })}
                className={cn(
                  'inline-flex h-7 items-center gap-1 border border-black px-1.5 text-[11px] transition-colors',
                  on ? 'bg-link-hover/20 text-link-hover' : 'bg-black/30 text-link hover:text-foreground',
                )}
              >
                <AttachmentIcon attachment={a} className="size-4" />
                {attachmentLabels[a].name}
              </button>
            )
          })}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 text-xs">
        {pair && (
          <button
            type="button"
            aria-pressed={isPair}
            disabled={!isPair && !canPair}
            onClick={() => onChange({ ...entry, id: isPair ? single.id : pair.id })}
            className={cn(
              'inline-flex h-7 items-center gap-1.5 border border-black px-2 transition-colors disabled:opacity-40',
              isPair ? 'bg-primary text-primary-foreground' : 'bg-black/30 text-muted-foreground hover:text-foreground',
            )}
          >
            {isPair ? <CheckIcon /> : <PlusIcon />} Akimbo pair{!isPair && ` (+${slotsOf(single)} slots)`}
          </button>
        )}
        {weapon.stack && (
          <span className="inline-flex items-center border border-black bg-black/30">
            <Button variant="ghost" size="icon-xs" aria-label="One fewer" disabled={entry.count <= 1} onClick={() => onChange({ ...entry, count: entry.count - 1 })}>
              <MinusIcon />
            </Button>
            <span className="w-6 text-center text-foreground">{entry.count}</span>
            <Button variant="ghost" size="icon-xs" aria-label="One more" disabled={free < weapon.slots} onClick={() => onChange({ ...entry, count: entry.count + 1 })}>
              <PlusIcon />
            </Button>
          </span>
        )}
      </div>
    </li>
  )
}

export function LoadoutBuilder() {
  const [params, setParams] = useSearchParams()
  const loadout = useMemo(() => decodeLoadout(params.get('l')), [params])
  const [kind, setKind] = useState<Weapon['kind']>('Pistol')

  const setLoadout = (l: Loadout) =>
    setParams(
      (p) => {
        const code = encodeLoadout(l)
        if (code) p.set('l', code)
        else p.delete('l')
        return p
      },
      { replace: true, preventScrollReset: true },
    )

  const entries = loadout.entries.map((e) => ({ e, w: weaponById.get(e.id)! }))
  const used = usedSlots(loadout)
  const free = TOTAL_SLOTS - used
  const owned = new Set(entries.flatMap(({ w }) => [w.id, w.singleId, w.pairId]))
  const update = (i: number, e: Entry) => {
    const next = { ...loadout, entries: loadout.entries.map((x, j) => (j === i ? e : x)) }
    if (usedSlots(next) <= TOTAL_SLOTS) setLoadout(next)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-8">
        <div>
          <p className="mb-2 text-xs font-bold text-foreground">Start from a preset</p>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((p) => (
              <button
                key={p.name}
                type="button"
                title={p.desc}
                onClick={() => setLoadout(decodeLoadout(p.loadout))}
                className={cn(
                  'border border-black px-2.5 py-1 text-xs transition-colors',
                  encodeLoadout(loadout) === p.loadout ? 'bg-primary text-primary-foreground' : 'bg-black/30 text-muted-foreground hover:text-foreground',
                )}
              >
                {p.name}
              </button>
            ))}
            {loadout.entries.length + (loadout.kevlar ? 1 : 0) > 0 && (
              <button
                type="button"
                onClick={() => setLoadout({ entries: [], kevlar: false })}
                className="inline-flex items-center gap-1 border border-black bg-black/30 px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <XIcon /> Clear
              </button>
            )}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-foreground">Add weapons</p>
          <div className="mb-2 flex flex-wrap gap-1">
            {kinds.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setKind(k)}
                className={cn('border px-2.5 py-1 text-xs transition-colors', kind === k ? 'border-primary bg-primary text-primary-foreground' : 'border-black bg-black/30 text-muted-foreground hover:text-foreground')}
              >
                {k}
              </button>
            ))}
          </div>
          <ul className="panel divide-y divide-black/60">
            {buyable
              .filter((w) => w.kind === kind)
              .map((w) => {
                const has = owned.has(w.id)
                const fits = free >= slotsOf(w)
                return (
                  <li key={w.id} className="flex items-center gap-3 px-3 py-2 text-xs">
                    <span className="min-w-0 flex-1 truncate text-foreground">{w.name}</span>
                    <span className="hidden gap-0.5 sm:flex">
                      {w.modes.map((m) => (
                        <FireModeIcon key={m} mode={m} className="size-4 text-muted-foreground" />
                      ))}
                    </span>
                    <span className="w-14 text-right text-muted-foreground">{slotsOf(w)} slots</span>
                    <Button
                      size="xs"
                      variant={has ? 'secondary' : 'default'}
                      disabled={has || !fits}
                      onClick={() => setLoadout({ ...loadout, entries: [...loadout.entries, { id: w.id, attachments: [], count: 1 }] })}
                      title={has ? 'Already in your loadout' : !fits ? `Needs ${slotsOf(w)} free slots` : undefined}
                    >
                      {has ? <CheckIcon data-icon="inline-start" /> : <PlusIcon data-icon="inline-start" />}
                      {has ? 'Added' : 'Add'}
                    </Button>
                  </li>
                )
              })}
          </ul>
          <label className="mt-3 flex w-fit cursor-pointer items-center gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              className="accent-primary"
              checked={loadout.kevlar}
              disabled={!loadout.kevlar && free < KEVLAR_SLOTS}
              onChange={(e) => setLoadout({ ...loadout, kevlar: e.target.checked })}
            />
            <ShieldIcon className="text-foreground" /> Kevlar vest (10 slots, $1,900)
          </label>
          <p className="mt-2 text-[11px] text-muted-foreground">Grenades and stealth shoes are in the buy menu but the 3.0 server refuses them.</p>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-foreground">Your loadout</p>
          {entries.length === 0 ? (
            <p className="panel p-6 text-center text-sm text-muted-foreground">Nothing yet: you'd fight with kung fu alone, at full speed. Pick a preset or add weapons.</p>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2">
              {entries.map(({ e, w }, i) => (
                <EntryCard
                  key={e.id}
                  entry={e}
                  weapon={w}
                  color={SEGMENT[i % SEGMENT.length]}
                  free={free}
                  onChange={(next) => update(i, next)}
                  onRemove={() => setLoadout({ ...loadout, entries: loadout.entries.filter((_, j) => j !== i) })}
                />
              ))}
            </ul>
          )}
        </div>
      </div>

      <Capabilities loadout={loadout} entries={entries} />
    </div>
  )
}
