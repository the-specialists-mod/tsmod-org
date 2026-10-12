import { PageHeader } from '@/components/layout'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router'
import { HARBURP_REPO, OFFICIAL_SITE_WAYBACK, OLD_SITE_REPO, TS_PLUGINS_REPO, TSRP_HISTORY } from '@/content/links'
import { changelog30, credits, introStory, news, timeline, tsrp } from '@/content/history'

export function HistoryPage() {
  return (
    <>
      <PageHeader title="History" kicker="Since 2002">
        From two Italian modders to a community that refuses to let it die. Much of this page comes from the{' '}
        <a href={OFFICIAL_SITE_WAYBACK} className="link">
          original specialistsmod.net
        </a>
        , preserved in the{' '}
        <a href={OLD_SITE_REPO} className="link">
          archive
        </a>
        .
      </PageHeader>

      <div className="mx-auto max-w-6xl space-y-20 px-4">
        <section className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-2xl">Introduction</h2>
            <p className="mt-2 text-xs text-muted-foreground">From the official site, 2007.</p>
          </div>
          <div className="space-y-4 border-l-2 border-primary pl-6 text-sm leading-relaxed text-foreground/85">
            {introStory.map((p, i) =>
              p.length < 20 ? (
                <p key={i} className="font-display text-lg text-primary">
                  {p}
                </p>
              ) : (
                <p key={i}>{p}</p>
              ),
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl">Timeline</h2>
          <ol className="mt-8 grid gap-px bg-border md:grid-cols-2">
            {timeline.map((t) => (
              <li key={t.title} className="bg-background/90 p-6">
                <p className="text-xs uppercase tracking-widest text-primary">{t.date}</p>
                <h3 className="mt-2 text-lg">{t.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-2xl">What's new in 3.0</h2>
            <p className="mt-2 text-xs text-muted-foreground">Released June 21, 2007.</p>
          </div>
          <ul className="grid gap-2 text-sm sm:grid-cols-2">
            {changelog30.map((c) => (
              <li key={c} className="border bg-background/80 px-3 py-2 text-foreground/85">
                <span className="mr-2 text-primary">▸</span>
                {c}
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-2xl">TSRP: roleplay</h2>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              For years TS roleplay drew more players than deathmatch. Condensed from the{' '}
              <a href={TSRP_HISTORY} className="link">
                TSRP wiki
              </a>{' '}
              (2017), which notes that much of the history is still unrecorded.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Play the maps:{' '}
              <Link to="/maps?tab=archive&q=westminster" className="link">
                tsrp_westminster
              </Link>
              ,{' '}
              <Link to="/maps?tab=archive&q=mecklenburg" className="link">
                Mecklenburg
              </Link>
              ,{' '}
              <Link to="/maps?tab=archive&q=tsrp" className="link">
                all tsrp_ maps
              </Link>
              .
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Run a server: the archive keeps the{' '}
              <a href={TS_PLUGINS_REPO} className="link">
                Apollo RP plugin sources
              </a>{' '}
              and{' '}
              <a href={HARBURP_REPO} className="link">
                HarbuRP v2
              </a>
              .
            </p>
          </div>
          <div className="space-y-8">
            {tsrp.map((c) => (
              <div key={c.title}>
                <h3 className="text-lg">{c.title}</h3>
                <div className="mt-2 space-y-3 text-sm leading-relaxed text-foreground/80">
                  {c.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl">From the news archive</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {news.map((n) => (
              <Card key={n.title}>
                <CardHeader>
                  <CardTitle className="font-bold text-lg">{n.title}</CardTitle>
                  <CardDescription>
                    {n.author} · {n.date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-xs leading-relaxed text-muted-foreground">
                  {n.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl">The team</h2>
          <p className="mt-2 text-xs text-muted-foreground">Credits as listed on the official site.</p>
          <div className="mt-6 columns-1 gap-8 sm:columns-2 lg:columns-3">
            {credits.map((g) => (
              <div key={g.role} className="mb-6 break-inside-avoid">
                <Badge variant="outline" className="mb-2 border-primary/50 text-primary">
                  {g.role}
                </Badge>
                <ul className="space-y-0.5 text-xs text-foreground/80">
                  {g.people.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
