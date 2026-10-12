import { ArrowSquareOutIcon } from '@phosphor-icons/react'
import { PageHeader } from '@/components/layout'
import { Badge } from '@/components/ui/badge'
import { archiveCategories, archiveRepos } from '@/content/archive'
import { ARCHIVE_ORG, DECOMP_REPO, DISCORD, INSTALLER_REPO, MOD_ORG, RUST_REPO, STEAM_GROUP, TSMOD_NET } from '@/content/links'
import repos from '@/data/archive-repos.json'

type Resource = { name: string; href: string; desc: string; badges?: string[]; updated?: string }

const activeProjects: Resource[] = [
  { name: 'tsmod-installer', href: INSTALLER_REPO, desc: 'Cross-platform installer and launcher: server browser, model picker, controls, settings, hosting.' },
  { name: 'the-specialistsmod-rs', href: RUST_REPO, desc: 'Wire-compatible Rust port of the TS 3.0 client and server libraries.' },
  { name: 'the-specialists-decomp', href: DECOMP_REPO, desc: 'Ghidra decompilation and documentation of the TS 3.0 binaries, the reference for the port.' },
  { name: 'tsmod.net', href: TSMOD_NET, desc: 'Community hub run by Retro LAN: a mod download, live player stats for its srv.tsmod.net server, media, and the FAQ and manual.' },
  { name: 'the-specialists-mod', href: MOD_ORG, desc: 'The GitHub organisation for all of the above, and this website.' },
]

const community: Resource[] = [
  { name: 'Discord', href: DISCORD, desc: 'Find games, share maps, get help. Got old maps, models or files for the archive? Bring them here.' },
  { name: 'The Specialists Forum [TSF]', href: STEAM_GROUP, desc: 'The Steam group, running since 2007. Find people to play with and add them as friends.' },
]

function archiveGroups() {
  const groups = new Map<string, Resource[]>(archiveCategories.map((c) => [c.title, []]))
  const other: Resource[] = []
  for (const r of repos) {
    const [category, override] = archiveRepos[r.name] ?? []
    const resource: Resource = {
      name: r.name,
      href: `${ARCHIVE_ORG}/${r.name}`,
      desc: override ?? r.description ?? '',
      badges: [r.fork && 'mirror', r.archived && 'read-only'].filter((b): b is string => !!b),
      updated: r.pushed,
    }
    ;(category && groups.get(category) ? groups.get(category)! : other).push(resource)
  }
  const result = archiveCategories.map((c) => ({ ...c, items: groups.get(c.title)! }))
  if (other.length) result.push({ title: 'Other', blurb: 'Recently added to the archive.', items: other })
  return result
}

function ResourceGrid({ items }: { items: Resource[] }) {
  return (
    <ul className="mt-6 grid border-t border-l sm:grid-cols-2 lg:grid-cols-3">
      {items.map((r) => (
        <li key={r.href} className="border-r border-b bg-background/90">
          <a href={r.href} className="group flex h-full flex-col gap-2 p-5 transition-colors hover:bg-accent/40">
            <span className="flex items-center justify-between gap-2 text-sm text-foreground">
              <span className="truncate">{r.name}</span>
              <ArrowSquareOutIcon className="shrink-0 text-muted-foreground group-hover:text-primary" />
            </span>
            {r.desc && <span className="text-xs leading-relaxed text-muted-foreground">{r.desc}</span>}
            {(r.badges?.length || r.updated) && (
              <span className="mt-auto flex flex-wrap items-center gap-1.5 pt-1 text-[10px] text-muted-foreground">
                {r.badges?.map((b) => (
                  <Badge key={b} variant="outline" className="text-[10px]">
                    {b}
                  </Badge>
                ))}
                {r.updated && <span>updated {r.updated}</span>}
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  )
}

export function ResourcesPage() {
  const groups = archiveGroups()
  return (
    <>
      <PageHeader title="Resources" kicker="Build, mod, preserve">
        Everything you need to make maps, models and plugins for TS, or to dig into how it works. Most of it lives in{' '}
        <a href={ARCHIVE_ORG} className="text-foreground underline underline-offset-4">
          The Specialists Archive
        </a>
        , a community effort to save every file, tool and web page the mod has left behind. Repos marked <em>mirror</em> are copies of upstream tools, kept so they
        can't disappear.
      </PageHeader>
      <div className="mx-auto max-w-6xl space-y-14 px-4">
        <section>
          <h2 className="text-2xl">Active projects</h2>
          <p className="mt-1 text-xs text-muted-foreground">Where TS is developed and played today.</p>
          <ResourceGrid items={activeProjects} />
        </section>

        <section className="space-y-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">The Specialists Archive</p>
            <h2 className="mt-2 text-3xl">
              {repos.length} repositories of TS history and tooling
            </h2>
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <h3 className="text-xl">{g.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{g.blurb}</p>
              <ResourceGrid items={g.items} />
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-2xl">Community</h2>
          <p className="mt-1 text-xs text-muted-foreground">Come say hello. We don't bite.</p>
          <ResourceGrid items={community} />
        </section>
      </div>
    </>
  )
}
