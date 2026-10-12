import { PageHeader } from '@/components/layout'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { controls, faq, gameModes } from '@/content/manual'

export function ManualPage() {
  return (
    <>
      <PageHeader title="Manual" kicker="How to be a Specialist">
        Controls, game modes and the official FAQ. All keys can be rebound in-game under Options, or in the launcher's Controls tab.
      </PageHeader>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[1fr_360px]">
        <section>
          <h2 className="text-2xl">FAQ</h2>
          <Accordion type="multiple" className="mt-4">
            {faq.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-sm">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <aside className="space-y-10">
          <section>
            <h2 className="text-2xl">Default controls</h2>
            <dl className="mt-4 divide-y border text-xs">
              {controls.map((c) => (
                <div key={c.key} className="grid grid-cols-[96px_1fr] gap-3 bg-background/80 px-3 py-2">
                  <dt>
                    <kbd className="border border-b-2 bg-muted px-1.5 py-0.5 text-[11px] text-foreground">{c.key}</kbd>
                  </dt>
                  <dd className="text-muted-foreground">{c.action}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section>
            <h2 className="text-2xl">Game modes</h2>
            <div className="mt-4 space-y-2">
              {gameModes.map((m) => (
                <Card key={m.name} size="sm">
                  <CardHeader>
                    <CardTitle className="font-display">{m.name}</CardTitle>
                    <CardDescription>{m.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </>
  )
}
