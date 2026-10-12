import { useState } from 'react'
import { Link, NavLink, Outlet, ScrollRestoration, useNavigation } from 'react-router'
import { DiscordLogoIcon, GithubLogoIcon, ListIcon } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { ARCHIVE_ORG, DISCORD, HALF_LIFE_STEAM, MOD_ORG, OFFICIAL_SITE_WAYBACK, SITE_REPO } from '@/content/links'

const nav = [
  { to: '/play', label: 'Play' },
  { to: '/servers', label: 'Servers' },
  { to: '/maps', label: 'Maps' },
  { to: '/models', label: 'Models' },
  { to: '/manual', label: 'Manual' },
  { to: '/history', label: 'History' },
  { to: '/resources', label: 'Resources' },
]

function NavItems({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  return (
    <nav className={className}>
      {nav.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'px-3 py-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground',
              isActive && 'text-foreground shadow-[inset_0_-2px_0_var(--primary)]',
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <div className="flex shrink-0 items-center gap-2">
          <a href={HALF_LIFE_STEAM} className="hidden sm:block" aria-label="Half-Life on Steam">
            <img src="/img/logo_hl.png" alt="" className="size-9" />
          </a>
          <Link to="/" aria-label="The Specialists home">
            <img src="/img/logo_ts.png" alt="The Specialists" className="h-8 w-auto sm:h-9" />
          </Link>
        </div>
        <NavItems className="ml-auto hidden items-center lg:flex" />
        <div className="ml-auto flex items-center gap-1 lg:ml-2">
          <Button variant="ghost" size="icon" asChild>
            <a href={DISCORD} aria-label="Discord">
              <DiscordLogoIcon className="size-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex">
            <a href={MOD_ORG} aria-label="GitHub">
              <GithubLogoIcon className="size-5" />
            </a>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <ListIcon className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle className="font-display">Menu</SheetTitle>
              </SheetHeader>
              <NavItems className="flex flex-col px-2" onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-24 border-t bg-background/90">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-xs text-muted-foreground sm:grid-cols-3">
        <div className="space-y-2">
          <img src="/img/logo_ts.png" alt="The Specialists" className="h-7 w-auto opacity-80" />
          <p>The Specialists is a free multiplayer action movie mod for Half-Life, made by Morfeo, John_Matrix and a worldwide team, kept alive by its community.</p>
        </div>
        <div className="space-y-2">
          <p className="font-display text-sm text-foreground">Community</p>
          <ul className="space-y-1">
            <li><a className="hover:text-foreground" href={DISCORD}>Discord</a></li>
            <li><a className="hover:text-foreground" href={MOD_ORG}>the-specialists-mod on GitHub</a></li>
            <li><a className="hover:text-foreground" href={ARCHIVE_ORG}>The Specialists Archive</a></li>
            <li><a className="hover:text-foreground" href={OFFICIAL_SITE_WAYBACK}>specialistsmod.net (2007)</a></li>
          </ul>
        </div>
        <div className="space-y-2">
          <p className="font-display text-sm text-foreground">This site</p>
          <p>
            Anyone can contribute with a pull request on <a className="underline hover:text-foreground" href={SITE_REPO}>GitHub</a>. The Specialists and Half-Life belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  )
}

export function Layout() {
  const navigation = useNavigation()
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className={cn('h-0.5 bg-primary transition-opacity', navigation.state === 'loading' ? 'animate-pulse opacity-100' : 'opacity-0')} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}

export function PageHeader({ title, children, kicker }: { title: string; kicker?: string; children?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-14 pb-8">
      {kicker && <p className="mb-2 text-xs uppercase tracking-[0.3em] text-primary">{kicker}</p>}
      <h1 className="text-4xl text-foreground sm:text-5xl">{title}</h1>
      {children && <div className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{children}</div>}
      <Separator className="mt-8" />
    </div>
  )
}
