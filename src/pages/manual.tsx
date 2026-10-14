import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { PageHeader } from '@/components/layout'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RUST_REPO } from '@/content/links'
import { CopyText } from '@/components/copy-text'
import * as m from '@/content/manual'
import { attachmentPrices, type Attachment, type FireMode, type Weapon } from '@/content/weapons'
import { AttachmentIcon, AttachmentIcons, attachmentLabelsFor, FireModeIcon, fireModeLabels, WeaponIcons } from '@/components/weapon-icons'
import { rulesFor, type Ruleset } from '@/lib/loadout'
import { LoadoutBuilder } from '@/components/loadout-builder'
import * as kf from '@/content/kungfu'
import type { Move } from '@/content/kungfu'
import { cn } from '@/lib/utils'
import { useVersion, versions, type Version } from '@/lib/version'

const kinds: Weapon['kind'][] = ['Pistol', 'Akimbo', 'SMG', 'Rifle', 'Shotgun', 'Sniper', 'Blade', 'Grenade']

/** Everything on the page that differs between TS 3.0 and TS 2.1. */
const manual = {
  '30': {
    intro: "The numbers come from TS 3.0's own code, as decoded for the",
    faq: m.faq,
    controls: m.controls,
    controlsNote: undefined as string | undefined,
    gameModes: m.gameModes,
    gameModesNote: undefined as string | undefined,
    loadoutTitle: 'Loadout & weight',
    loadoutNote: 'Everything you carry takes slots, and slots decide how fast you run and how well you stunt.',
    loadout: m.loadout,
    weaponsNote: "Buy them from the buy menu (B) while dead or spectating. Grenades can't be bought in 3.0; they come from power-ups.",
    weaponsFootnote: 'Damage is per bullet before hit-location multipliers; shotguns fire ×pellets. Kevlar costs $1,900 and 10 slots. Kung fu is always available and takes no slots.',
    damageRules: m.damageRules,
    builderNote: 'Pick weapons, attachments and armour within your 81 slots and see what you can do with them. The link updates as you go, so you can share a build.',
    punchesNote: 'Kung fu is always in your hands (slot 0, no slots used). Punches are on Fire; holding or tapping, ducking and being airborne pick the move.',
    punches: kf.punches,
    kicksNote: 'Kicks are on Mouse2. Moving backwards, ducking, jumping and your speed pick the move; the fast ones hit harder the faster you go.',
    kicks: kf.kicks,
    blockNote: 'Time it: a block only lasts half a second.',
    blockRules: kf.blockRules,
    meleeRules: kf.meleeRules,
    bladesNote: 'Knives and the katana also block with R. Thrown blades can be picked up again.',
    blades: kf.blades,
    powerUps: m.powerUps,
    powerUpNotes: m.powerUpNotes,
    scoringNote: 'Style pays.',
    scoring: m.scoring,
    spreesNote: 'Kills without dying earn rewards and bonus points.',
    sprees: m.sprees,
    votesNote: 'Type these in chat (Y).',
    serverNote: 'For server.cfg. A map can also force its own mode.',
    serverCvars: m.serverCvars,
  },
  '21': {
    intro: "The numbers come from TS 2.1's own code (the April 2004 release), as decoded and played by the 2.1 mode of the",
    faq: m.faq21,
    controls: m.controls21,
    controlsNote: 'Your keys stay the same in 2.1 mode; some of them do less.',
    gameModes: m.gameModes21,
    gameModesNote: m.gameModesNote21,
    loadoutTitle: 'Loadout, weight & cash',
    loadoutNote: 'Weapons take slots, and slots decide how fast you run and how well you stunt. Money only runs short in team rounds, or with usecash on.',
    loadout: m.loadout21,
    weaponsNote: 'Buy them from the buy menu (B). Grenades are sold in team rounds only, two a life; elsewhere they come from power-ups.',
    weaponsFootnote:
      "Damage is per bullet before hit-location multipliers and 2.1's small random bonus: the ammo's base damage times the gun's multiplier. Shotguns fire ×pellets. Kevlar ($1,900) and Stealth Shoes ($700) take no slots and are sold in team rounds only. Kung fu is always available and takes no slots.",
    damageRules: m.damageRules21,
    builderNote:
      'Pick weapons, attachments and armour within your 81 slots and see what you can do with them, by 2.1’s rules. The link updates as you go, so you can share a build.',
    punchesNote:
      'Kung fu is always in your hands (slot 0, no slots used). Punches are on Fire, one per press; the ground, the air or a dive picks the move. Damage is the base: a hit deals 0.9 × base × your melee bar.',
    punches: kf.punches21,
    kicksNote: 'Kicks are on Mouse2, one per press. Moving backwards, ducking, jumping and your speed pick the move; most hit harder the faster you go.',
    kicks: kf.kicks21,
    blockNote: 'Kung fu blocks with R; blades parry by swinging.',
    blockRules: kf.blockRules21,
    meleeRules: kf.meleeRules21,
    bladesNote: "Thrown knives can be picked up again. The katana can't be thrown, and R does nothing with a blade.",
    blades: kf.blades21,
    powerUps: m.powerUps21,
    powerUpNotes: m.powerUpNotes21,
    scoringNote: m.scoringNote21,
    scoring: m.scoring21,
    spreesNote: 'Kills without dying earn rewards, in deathmatch and team deathmatch.',
    sprees: m.sprees21,
    votesNote: 'Type these in chat (Y). The same as in 3.0.',
    serverNote: 'For server.cfg. The map name picks team and objective rounds.',
    serverCvars: m.serverCvars21,
  },
} satisfies Record<Version, unknown>

function VersionSwitch({ version, onChange }: { version: Version; onChange: (v: Version) => void }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <span className="text-xs font-bold tracking-[0.2em] text-link uppercase" id="version-label">
        Game version
      </span>
      <div role="radiogroup" aria-labelledby="version-label" className="inline-flex gap-1 border border-black bg-[#1c1c1c] p-1 shadow-[inset_0_0_0_1px_#3a3a3a]">
        {versions.map((v) => (
          <button
            key={v.id}
            type="button"
            role="radio"
            aria-checked={version === v.id}
            onClick={() => onChange(v.id)}
            className={cn(
              'border border-transparent px-4 py-1.5 font-display text-base tracking-wider whitespace-nowrap uppercase transition-all',
              version === v.id ? 'metal-bar stencil-lit border-black shadow-[0_1px_4px_#000]' : 'text-[#a9a9a9] hover:bg-white/5 hover:text-white',
            )}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function Ts21Note() {
  return (
    <div className="panel mb-8 grid gap-3 p-4 text-xs leading-relaxed text-muted-foreground sm:grid-cols-[auto_1fr] sm:gap-6">
      <div>
        <p className="font-bold text-foreground">Playing 2.1 on a server</p>
        <p className="mt-1 border border-black bg-black/40 px-2 py-1">
          <CopyText text="ts_gameplay 21" className="text-foreground" />
        </p>
      </div>
      <div className="space-y-1.5">
        <p>
          The{' '}
          <a href={RUST_REPO} className="link">
            Rust port
          </a>{' '}
          plays TS 2.1's rules on a TS 3.0 server: set <code className="text-foreground">ts_gameplay 21</code> in the console or server.cfg, and{' '}
          <code className="text-foreground">ts_gameplay 30</code> to go back. Changing it reloads the current map, so the map starts fresh under the new
          rules.
        </p>
        <p>
          Players need the port's client, which the launcher installs. A server in 2.1 mode turns the original TS 3.0 client away with "Invalid Version: Running
          2.1 mode. Upgrade to the rust port at tsmod.org". The port's weapon select menu shows which rules the server runs and the game's version.
        </p>
      </div>
    </div>
  )
}

function StatTiles({ items }: { items: { label: string; value: string; note?: string }[] }) {
  return (
    <dl className={cn('grid border-t border-l sm:grid-cols-2', items.length % 4 === 0 ? 'lg:grid-cols-4' : 'lg:grid-cols-3')}>
      {items.map((i) => (
        <div key={i.label} className="border-r border-b bg-background/90 p-5">
          <dt className="text-xs uppercase tracking-widest text-muted-foreground">{i.label}</dt>
          <dd className="mt-1 font-display text-3xl text-foreground">{i.value}</dd>
          {i.note && <dd className="mt-1 text-xs text-muted-foreground">{i.note}</dd>}
        </div>
      ))}
    </dl>
  )
}

function Section({ title, children, note }: { title: string; note?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl">{title}</h2>
      {note && <p className="mt-1 max-w-3xl text-xs leading-relaxed text-muted-foreground">{note}</p>}
      <div className="mt-4">{children}</div>
    </section>
  )
}

function MoveTable({ moves }: { moves: Move[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Move</TableHead>
          <TableHead>Input</TableHead>
          <TableHead className="hidden md:table-cell">When</TableHead>
          <TableHead className="text-right">Damage</TableHead>
          <TableHead className="hidden text-right sm:table-cell">Recovery (s)</TableHead>
          <TableHead className="hidden text-right lg:table-cell">Reach</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {moves.map((m) => (
          <TableRow key={m.name}>
            <TableCell className="align-top">
              <span className="font-bold text-foreground">{m.name}</span>
              {m.note && <span className="mt-0.5 block max-w-xs text-[11px] whitespace-normal text-muted-foreground">{m.note}</span>}
            </TableCell>
            <TableCell className="align-top">
              <kbd className="inline-block border border-b-2 border-black bg-muted px-1.5 py-0.5 text-[11px] whitespace-normal text-foreground">{m.input}</kbd>
              <span className="mt-1 block text-[11px] whitespace-normal text-muted-foreground md:hidden">{m.when}</span>
            </TableCell>
            <TableCell className="hidden align-top whitespace-normal text-muted-foreground md:table-cell">{m.when}</TableCell>
            <TableCell className="text-right align-top text-foreground">{m.damage}</TableCell>
            <TableCell className="hidden text-right align-top text-muted-foreground sm:table-cell">{m.recovery}</TableCell>
            <TableCell className="hidden text-right align-top text-muted-foreground lg:table-cell">{m.reach}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function IconLegend({ version }: { version: Version }) {
  const attachmentLabels = attachmentLabelsFor(version)
  return (
    <div className="panel mt-4 grid gap-4 p-4 text-xs sm:grid-cols-2">
      <div>
        <p className="mb-2 font-bold text-foreground">
          Fire modes <span className="font-normal text-muted-foreground">(F switches)</span>
        </p>
        <ul className="space-y-1.5">
          {(Object.keys(fireModeLabels) as FireMode[]).map((m) => (
            <li key={m} className="flex items-center gap-2 text-muted-foreground">
              <FireModeIcon mode={m} className="size-4 shrink-0 text-foreground" />
              <span>
                <span className="text-foreground">{fireModeLabels[m].name}</span>: {fireModeLabels[m].desc}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="mb-2 font-bold text-foreground">Attachments</p>
        <ul className="space-y-1.5">
          {(Object.keys(attachmentLabels) as Attachment[]).map((a) => (
            <li key={a} className="flex items-center gap-2 text-muted-foreground">
              <AttachmentIcon attachment={a} className="size-4 shrink-0 text-link" />
              <span>
                <span className="text-foreground">{attachmentLabels[a].name}</span> (${attachmentPrices[a]}): {attachmentLabels[a].desc}
              </span>
            </li>
          ))}
          <li className="flex items-center gap-2 text-muted-foreground">
            <AttachmentIcon attachment="scope" className="size-4 shrink-0 text-link-hover" />
            <span>Yellow: built into the gun.</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

/** Damage to one decimal: 2.1's is the ammo's base damage times a multiplier. */
const fmtDamage = (d: number) => Math.round(d * 10) / 10

function WeaponTable({ rules: r, footnote }: { rules: Ruleset; footnote: string }) {
  const [kind, setKind] = useState<Weapon['kind'] | 'All'>('All')
  const list = kind === 'All' ? r.weapons : r.weapons.filter((w) => w.kind === kind)
  const labels = attachmentLabelsFor(r.version)
  return (
    <>
      <div className="mb-4 flex flex-wrap gap-1">
        {(['All', ...kinds] as const).map((k) => (
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Weapon</TableHead>
            <TableHead className="text-right">Slots</TableHead>
            <TableHead className="text-right">Damage</TableHead>
            <TableHead className="hidden text-right sm:table-cell">Clip</TableHead>
            <TableHead className="hidden md:table-cell">Fire modes</TableHead>
            <TableHead className="hidden lg:table-cell">Attachments</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((w) => {
            const single = w.singleId != null ? r.weaponById.get(w.singleId) : undefined
            return (
              <TableRow key={w.id}>
                <TableCell>
                  <span className="text-foreground">{w.name}</span>
                  <span className="ml-2 text-[10px] text-muted-foreground">{single ? `2× ${single.name}` : w.kind}</span>
                  {w.pairId != null && (
                    <Badge variant="outline" className="ml-2 text-[10px]">
                      akimbo pair
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right text-foreground">{r.slotsOf(w)}</TableCell>
                <TableCell className="text-right whitespace-nowrap">
                  {fmtDamage(w.damage)}
                  {w.pellets && <span className="text-muted-foreground"> ×{w.pellets}</span>}
                </TableCell>
                <TableCell className="hidden text-right text-muted-foreground sm:table-cell">{w.clip ?? '—'}</TableCell>
                <TableCell className="hidden md:table-cell">{w.modes.length ? <WeaponIcons w={w} /> : <span className="text-muted-foreground">—</span>}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  {w.attachments.length + w.builtIn.length ? <AttachmentIcons w={w} labels={labels} /> : <span className="text-muted-foreground">—</span>}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <IconLegend version={r.version} />
      <p className="mt-3 text-xs text-muted-foreground">{footnote}</p>
    </>
  )
}

export function ManualPage() {
  const [params, setParams] = useSearchParams()
  const [version, setVersion] = useVersion()
  const c = manual[version]
  const rules = rulesFor(version)
  const tab = params.get('tab') ?? 'basics'
  const setTab = (v: string) =>
    setParams(
      (p) => {
        if (v === 'basics') p.delete('tab')
        else p.set('tab', v)
        return p
      },
      { replace: true, preventScrollReset: true },
    )

  return (
    <>
      <PageHeader title="Manual" kicker="How to be a Specialist">
        Controls, weapons, power-ups and rules. {c.intro}{' '}
        <a href={RUST_REPO} className="link">
          Rust port
        </a>
        . All keys can be rebound in-game under Options, or in the launcher's Controls tab.
        <VersionSwitch version={version} onChange={setVersion} />
      </PageHeader>

      <div className="mx-auto max-w-6xl px-4">
        {version === '21' && <Ts21Note />}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="weapons">Weapons</TabsTrigger>
            <TabsTrigger value="loadout">Loadout builder</TabsTrigger>
            <TabsTrigger value="kungfu">Kung fu</TabsTrigger>
            <TabsTrigger value="powerups">Power-ups &amp; scoring</TabsTrigger>
            <TabsTrigger value="modes">Modes &amp; servers</TabsTrigger>
          </TabsList>

          <TabsContent value="basics" className="grid gap-12 lg:grid-cols-[1fr_360px]">
            <Section title="FAQ">
              <Accordion type="multiple">
                {c.faq.map((f) => (
                  <AccordionItem key={f.q} value={f.q}>
                    <AccordionTrigger className="text-sm">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Section>
            <Section title="Default controls" note={c.controlsNote}>
              <dl className="divide-y border text-xs">
                {c.controls.map((b) => (
                  <div key={b.key} className="grid grid-cols-[96px_1fr] gap-3 bg-background/80 px-3 py-2">
                    <dt>
                      <kbd className="border border-b-2 bg-muted px-1.5 py-0.5 text-[11px] text-foreground">{b.key}</kbd>
                    </dt>
                    <dd className="text-muted-foreground">{b.action}</dd>
                  </div>
                ))}
              </dl>
            </Section>
          </TabsContent>

          <TabsContent value="weapons" className="space-y-12">
            <Section title={c.loadoutTitle} note={c.loadoutNote}>
              <StatTiles items={c.loadout} />
            </Section>
            <Section title={`Weapons (${rules.weapons.length})`} note={c.weaponsNote}>
              <WeaponTable key={version} rules={rules} footnote={c.weaponsFootnote} />
            </Section>
            <Section title="Damage">
              <StatTiles items={c.damageRules} />
            </Section>
          </TabsContent>

          <TabsContent value="loadout">
            <Section title="Loadout builder" note={c.builderNote}>
              <LoadoutBuilder rules={rules} />
            </Section>
          </TabsContent>

          <TabsContent value="kungfu" className="space-y-12">
            <Section title="Punches" note={c.punchesNote}>
              <MoveTable moves={c.punches} />
            </Section>
            <Section title="Kicks" note={c.kicksNote}>
              <MoveTable moves={c.kicks} />
            </Section>
            <Section title="Blocking" note={c.blockNote}>
              <StatTiles items={c.blockRules} />
            </Section>
            <Section title="How hits work">
              <StatTiles items={c.meleeRules} />
            </Section>
            <Section title="Blades and gun butts" note={c.bladesNote}>
              <MoveTable moves={c.blades} />
            </Section>
          </TabsContent>

          <TabsContent value="powerups" className="space-y-12">
            <Section title="Power-ups" note={c.powerUpNotes}>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {c.powerUps.map((p) => (
                  <Card key={p.name} size="sm">
                    <CardHeader>
                      <CardTitle className="font-bold">{p.name}</CardTitle>
                      <CardDescription>{p.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </Section>
            <div className="grid gap-12 lg:grid-cols-2">
              <Section title="Scoring" note={c.scoringNote}>
                <Table>
                  <TableBody>
                    {c.scoring.map((s) => (
                      <TableRow key={s.what}>
                        <TableCell>{s.what}</TableCell>
                        <TableCell className="text-right font-display text-lg text-foreground">{s.points}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Section>
              <Section title="Killing sprees" note={c.spreesNote}>
                <Table>
                  <TableBody>
                    {c.sprees.map((s) => (
                      <TableRow key={s.kills}>
                        <TableCell className="font-display text-lg text-primary">
                          {s.kills}
                          {s.kills === 10 ? '+' : ''}
                        </TableCell>
                        <TableCell className="text-right">{s.reward}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Section>
            </div>
          </TabsContent>

          <TabsContent value="modes" className="space-y-12">
            <Section title="Game modes" note={c.gameModesNote}>
              <div className="grid gap-2 sm:grid-cols-2">
                {c.gameModes.map((g) => (
                  <Card key={g.name} size="sm">
                    <CardHeader>
                      <CardTitle className="font-bold">{g.name}</CardTitle>
                      <CardDescription>{g.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </Section>
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
              <Section title="Chat votes" note={c.votesNote}>
                <dl className="divide-y border text-xs">
                  {m.votes.map((v) => (
                    <div key={v.cmd} className="bg-background/80 px-3 py-2">
                      <dt>
                        <code className="text-foreground">{v.cmd}</code>
                      </dt>
                      <dd className="mt-0.5 text-muted-foreground">{v.desc}</dd>
                    </div>
                  ))}
                </dl>
              </Section>
              <Section title="Server settings" note={c.serverNote}>
                <dl className="divide-y border text-xs">
                  {c.serverCvars.map((v) => (
                    <div key={v.cvar} className="grid gap-1 bg-background/80 px-3 py-2 sm:grid-cols-[180px_1fr] sm:gap-3">
                      <dt>
                        <code className="text-foreground">{v.cvar}</code>
                      </dt>
                      <dd className="text-muted-foreground">{v.desc}</dd>
                    </div>
                  ))}
                </dl>
              </Section>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
