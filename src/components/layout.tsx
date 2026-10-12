import { Link, NavLink, Outlet, ScrollRestoration, useNavigation } from 'react-router'
import { DiscordLogoIcon, GithubLogoIcon } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { ARCHIVE_ORG, DISCORD, HALF_LIFE_STEAM, MOD_ORG, OFFICIAL_SITE_WAYBACK, SITE_REPO, STEAM_GROUP } from '@/content/links'

const nav = [
  { to: '/', label: 'Home', end: true },
  { to: '/play', label: 'Play' },
  { to: '/servers', label: 'Servers' },
  { to: '/maps', label: 'Maps' },
  { to: '/models', label: 'Models' },
  { to: '/manual', label: 'Manual' },
  { to: '/history', label: 'History' },
  { to: '/resources', label: 'Resources' },
]

// Laid out like specialistsmod.net in 2007: the film-strip header art over a
// brushed-metal button bar (NavBar), on a grunge column in the middle of a black page.
function Banner() {
  return (
    <header>
      <div className="relative">
        <Link to="/" aria-label="The Specialists home">
          <img
            src="/img/2007/header-art.jpg"
            alt="The Specialists"
            width={790}
            height={243}
            className="mx-auto block h-auto w-full max-w-[790px] [mask-image:linear-gradient(to_right,transparent,#000_4%,#000_96%,transparent)]"
          />
        </Link>
        <div className="absolute top-2 right-2 flex gap-1">
          {[
            { href: HALF_LIFE_STEAM, label: 'Half-Life on Steam', icon: <img src="/img/logo_hl.png" alt="" className="size-5" /> },
            { href: DISCORD, label: 'Discord', icon: <DiscordLogoIcon className="size-5" /> },
            { href: MOD_ORG, label: 'GitHub', icon: <GithubLogoIcon className="size-5" /> },
          ].map((l) => (
            <a key={l.label} href={l.href} aria-label={l.label} className="flex size-8 items-center justify-center border border-black bg-black/60 text-[#ddd] hover:text-link-hover">
              {l.icon}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}

function NavBar() {
  return (
    <nav className="metal-bar sticky top-0 z-40 border-y border-black shadow-[0_2px_6px_#000]">
      <div className="mx-auto flex h-[41px] max-w-[1040px] items-stretch overflow-x-auto [scrollbar-width:none] sm:justify-center">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn('stencil hover:stencil-lit flex shrink-0 items-center px-2.5 text-lg transition-[color,text-shadow] sm:px-3.5 sm:text-xl', isActive && 'stencil-lit')
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-black bg-[#232323] shadow-[inset_0_1px_0_#444]">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-8 text-xs text-muted-foreground sm:grid-cols-3">
        <div className="space-y-2">
          <img src="/img/logo_ts.png" alt="The Specialists" className="h-7 w-auto" />
          <p>The Specialists is a free multiplayer action movie mod for Half-Life, made by Morfeo, John_Matrix and a worldwide team, kept alive by its community.</p>
        </div>
        <div className="space-y-2">
          <p className="font-bold text-foreground">Community</p>
          <ul className="space-y-1">
            <li>
              <a className="link" href={DISCORD}>Discord</a> · <a className="link" href={STEAM_GROUP}>Steam group</a>
            </li>
            <li>
              <a className="link" href={MOD_ORG}>the-specialists-mod on GitHub</a>
            </li>
            <li>
              <a className="link" href={ARCHIVE_ORG}>The Specialists Archive</a>
            </li>
            <li>
              <a className="link" href={OFFICIAL_SITE_WAYBACK}>specialistsmod.net (2007)</a>
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <p className="font-bold text-foreground">This site</p>
          <p>
            Anyone can contribute with a pull request on{' '}
            <a className="link" href={SITE_REPO}>
              GitHub
            </a>
            . The Specialists and Half-Life belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  )
}

export function Layout() {
  const navigation = useNavigation()
  return (
    <div className="min-h-screen bg-black">
      <div className="grunge mx-auto flex min-h-screen max-w-[1040px] flex-col shadow-[0_0_0_1px_#000,0_0_60px_#000]">
        <Banner />
        <NavBar />
        <div className={cn('h-0.5 bg-link-hover transition-opacity', navigation.state === 'loading' ? 'animate-pulse opacity-100' : 'opacity-0')} />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <ScrollRestoration />
    </div>
  )
}

export function PageHeader({ title, children, kicker }: { title: string; kicker?: string; children?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 pb-6">
      <div className="panel px-6 py-6">
        {kicker && <p className="mb-1 text-xs font-bold tracking-[0.2em] text-link uppercase">{kicker}</p>}
        <h1 className="text-4xl text-foreground sm:text-5xl">{title}</h1>
        {children && <div className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{children}</div>}
      </div>
    </div>
  )
}
