import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { PageHeader } from '@/components/layout'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RUST_REPO } from '@/content/links'
import { controls, damageRules, faq, gameModes, loadout, powerUpNotes, powerUps, scoring, serverCvars, sprees, votes } from '@/content/manual'
import { attachmentPrices, weaponById, weapons, type Attachment, type FireMode, type Weapon } from '@/content/weapons'
import { AttachmentIcon, AttachmentIcons, attachmentLabels, FireModeIcon, fireModeLabels, WeaponIcons } from '@/components/weapon-icons'
import { slotsOf } from '@/lib/loadout'
import { LoadoutBuilder } from '@/components/loadout-builder'
import { blades, blockRules, kicks, meleeRules, punches, type Move } from '@/content/kungfu'
import { cn } from '@/lib/utils'

const kinds: Weapon['kind'][] = ['Pistol', 'Akimbo', 'SMG', 'Rifle', 'Shotgun', 'Sniper', 'Blade', 'Grenade']

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

function IconLegend() {
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

function WeaponTable() {
  const [kind, setKind] = useState<Weapon['kind'] | 'All'>('All')
  const list = kind === 'All' ? weapons : weapons.filter((w) => w.kind === kind)
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
            const single = w.singleId != null ? weaponById.get(w.singleId) : undefined
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
                <TableCell className="text-right text-foreground">{slotsOf(w)}</TableCell>
                <TableCell className="text-right whitespace-nowrap">
                  {w.damage}
                  {w.pellets && <span className="text-muted-foreground"> ×{w.pellets}</span>}
                </TableCell>
                <TableCell className="hidden text-right text-muted-foreground sm:table-cell">{w.clip ?? '—'}</TableCell>
                <TableCell className="hidden md:table-cell">{w.modes.length ? <WeaponIcons w={w} /> : <span className="text-muted-foreground">—</span>}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  {w.attachments.length + w.builtIn.length ? <AttachmentIcons w={w} /> : <span className="text-muted-foreground">—</span>}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <IconLegend />
      <p className="mt-3 text-xs text-muted-foreground">
        Damage is per bullet before hit-location multipliers; shotguns fire ×pellets. Kevlar costs $1,900 and 10 slots. Kung fu is always available and takes no slots.
      </p>
    </>
  )
}

export function ManualPage() {
  const [params, setParams] = useSearchParams()
  const tab = params.get('tab') ?? 'basics'
  const setTab = (v: string) =>
    setParams(
      (p) => {
        if (v === 'basics') p.delete('tab')
        else p.set('tab', v)
        return p
      },
      { replace: true },
    )

  return (
    <>
      <PageHeader title="Manual" kicker="How to be a Specialist">
        Controls, weapons, power-ups and rules. The numbers come from TS 3.0's own code, as decoded for the{' '}
        <a href={RUST_REPO} className="link">
          Rust port
        </a>
        . All keys can be rebound in-game under Options, or in the launcher's Controls tab.
      </PageHeader>

      <div className="mx-auto max-w-6xl px-4">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-8 h-auto! flex-wrap">
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
                {faq.map((f) => (
                  <AccordionItem key={f.q} value={f.q}>
                    <AccordionTrigger className="text-sm">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Section>
            <Section title="Default controls">
              <dl className="divide-y border text-xs">
                {controls.map((c) => (
                  <div key={c.key} className="grid grid-cols-[96px_1fr] gap-3 bg-background/80 px-3 py-2">
                    <dt>
                      <kbd className="border border-b-2 bg-muted px-1.5 py-0.5 text-[11px] text-foreground">{c.key}</kbd>
                    </dt>
                    <dd className="text-muted-foreground">{c.action}</dd>
                  </div>
                ))}
              </dl>
            </Section>
          </TabsContent>

          <TabsContent value="weapons" className="space-y-12">
            <Section title="Loadout & weight" note="Everything you carry takes slots, and slots decide how fast you run and how well you stunt.">
              <StatTiles items={loadout} />
            </Section>
            <Section title={`Weapons (${weapons.length})`} note="Buy them from the buy menu (B) while dead or spectating. Grenades can't be bought in 3.0; they come from power-ups.">
              <WeaponTable />
            </Section>
            <Section title="Damage">
              <StatTiles items={damageRules} />
            </Section>
          </TabsContent>

          <TabsContent value="loadout">
            <Section
              title="Loadout builder"
              note="Pick weapons, attachments and armour within your 81 slots and see what you can do with them. The link updates as you go, so you can share a build."
            >
              <LoadoutBuilder />
            </Section>
          </TabsContent>

          <TabsContent value="kungfu" className="space-y-12">
            <Section
              title="Punches"
              note="Kung fu is always in your hands (slot 0, no slots used). Punches are on Fire; holding or tapping, ducking and being airborne pick the move."
            >
              <MoveTable moves={punches} />
            </Section>
            <Section title="Kicks" note="Kicks are on Mouse2. Moving backwards, ducking, jumping and your speed pick the move; the fast ones hit harder the faster you go.">
              <MoveTable moves={kicks} />
            </Section>
            <Section title="Blocking" note="Time it: a block only lasts half a second.">
              <StatTiles items={blockRules} />
            </Section>
            <Section title="How hits work">
              <StatTiles items={meleeRules} />
            </Section>
            <Section title="Blades and gun butts" note="Knives and the katana also block with R. Thrown blades can be picked up again.">
              <MoveTable moves={blades} />
            </Section>
          </TabsContent>

          <TabsContent value="powerups" className="space-y-12">
            <Section title="Power-ups" note={powerUpNotes}>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {powerUps.map((p) => (
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
              <Section title="Scoring" note="Style pays.">
                <Table>
                  <TableBody>
                    {scoring.map((s) => (
                      <TableRow key={s.what}>
                        <TableCell>{s.what}</TableCell>
                        <TableCell className="text-right font-display text-lg text-foreground">{s.points}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Section>
              <Section title="Killing sprees" note="Kills without dying earn rewards and bonus points.">
                <Table>
                  <TableBody>
                    {sprees.map((s) => (
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
            <Section title="Game modes">
              <div className="grid gap-2 sm:grid-cols-2">
                {gameModes.map((m) => (
                  <Card key={m.name} size="sm">
                    <CardHeader>
                      <CardTitle className="font-bold">{m.name}</CardTitle>
                      <CardDescription>{m.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </Section>
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
              <Section title="Chat votes" note="Type these in chat (Y).">
                <dl className="divide-y border text-xs">
                  {votes.map((v) => (
                    <div key={v.cmd} className="bg-background/80 px-3 py-2">
                      <dt>
                        <code className="text-foreground">{v.cmd}</code>
                      </dt>
                      <dd className="mt-0.5 text-muted-foreground">{v.desc}</dd>
                    </div>
                  ))}
                </dl>
              </Section>
              <Section title="Server settings" note="For server.cfg. A map can also force its own mode.">
                <dl className="divide-y border text-xs">
                  {serverCvars.map((c) => (
                    <div key={c.cvar} className="grid gap-1 bg-background/80 px-3 py-2 sm:grid-cols-[180px_1fr] sm:gap-3">
                      <dt>
                        <code className="text-foreground">{c.cvar}</code>
                      </dt>
                      <dd className="text-muted-foreground">{c.desc}</dd>
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
