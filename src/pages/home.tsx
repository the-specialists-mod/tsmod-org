import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import {
  ArrowRightIcon,
  CpuIcon,
  DownloadSimpleIcon,
  HandFistIcon,
  HourglassIcon,
  LinuxLogoIcon,
  PersonSimpleRunIcon,
  SwordIcon,
  TargetIcon,
  UsersThreeIcon,
  WindowsLogoIcon,
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { INSTALLER_DOWNLOADS, INSTALLER_RELEASES, RUST_RELEASES, RUST_REPO } from '@/content/links'
import { officialMaps } from '@/content/official-maps'
import { weapons } from '@/content/weapons'

const heroShots = ['1', '2', '3', '4', '5'].map((n) => `/img/shots/${n}.webp`)

const fiskCity = [
  '20241130000908_1',
  '20241130173731_1',
  '20241130173233_1',
  '20241130041554_1',
  '20241130170716_1',
  '20241130204538_1',
  '20241130204424_1',
  '20241130170934_1',
  '20241130204605_1',
].map((n) => `/img/shots/${n}.webp`)

const features = [
  { icon: PersonSimpleRunIcon, title: 'Stunts', body: 'Dive, roll, cartwheel, run up walls and flip off them. Lighter loadouts flip higher.' },
  { icon: HourglassIcon, title: 'Slow motion', body: 'Bullet time as a power-up or earned per frag. Watch the rounds drift past.' },
  { icon: HandFistIcon, title: 'Kung fu', body: 'Out of ammo? Kick the gun out of their hand. Blocks, combos and flying kicks.' },
  { icon: TargetIcon, title: `${weapons.length} weapons`, body: 'Akimbo pistols, shotguns, SMGs, rifles, a sniper rifle, and knives and katanas you can throw.' },
  { icon: UsersThreeIcon, title: 'Game modes', body: 'Deathmatch, team play, Last Man Standing, The One and Capture The Briefcase.' },
  { icon: SwordIcon, title: 'Endless content', body: 'Hundreds of community maps and nearly two thousand player models, all archived.' },
]

/** Loads the archive listings on demand so the home page bundle stays small. */
function useCounts() {
  const [counts, setCounts] = useState<{ maps: number; models: number }>()
  useEffect(() => {
    let live = true
    void Promise.all([import('@/data/maps.json'), import('@/data/custom-maps.json'), import('@/data/models.json')]).then(([archive, custom, models]) => {
      if (live) setCounts({ maps: officialMaps.length + archive.default.length + custom.default.length, models: models.default.length })
    })
    return () => {
      live = false
    }
  }, [])
  return counts
}

function HeroBackground() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % heroShots.length), 6000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {heroShots.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 size-full scale-105 object-cover transition-opacity duration-[2000ms] ${i === index ? 'opacity-60' : 'opacity-0'}`}
        />
      ))}
      <div className="scanlines absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-transparent" />
    </div>
  )
}

export function HomePage() {
  const counts = useCounts()
  return (
    <>
      <section className="relative isolate">
        <HeroBackground />
        <div className="mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-center px-4 py-24">
          <Badge variant="outline" className="mb-6 w-fit border-primary/60 text-primary">
            Free · Half-Life mod · Since 2002
          </Badge>
          <img src="/img/logo_ts.png" alt="The Specialists" className="w-full max-w-xl drop-shadow-[0_8px_24px_rgba(0,0,0,0.8)]" />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/90 sm:text-xl">
            A multiplayer action movie. Slow motion, stunts, kung fu and akimbo gunfights in the Half-Life engine.
          </p>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground italic">"Welcome to a minute in the life of a Specialist."</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link to="/play">
                <DownloadSimpleIcon data-icon="inline-start" /> Get playing
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/servers">
                Find a server <ArrowRightIcon data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl">The action movie you play</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Inspired by John Woo and The Matrix, TS rewards style: every gunfight is a choreography of dives, wall flips and slow-motion dodges.
        </p>
        <div className="mt-8 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-background/90 p-6">
              <Icon className="size-7 text-primary" weight="duotone" />
              <h3 className="mt-4 text-lg">{title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">Still loading</p>
        <h2 className="mt-2 text-3xl">TS today</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-xl">TS Installer &amp; Launcher</CardTitle>
              <CardDescription>
                One download for Windows and Linux. Installs TS into your Steam Half-Life, or sets up the free Xash3D FWGS engine with everything it needs, so you don't even
                need to own Half-Life.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li>▸ Server browser with community servers, LAN and favorites</li>
                <li>▸ Player model picker with a 3D preview</li>
                <li>▸ Key binding and game settings editors</li>
                <li>▸ Host a listen or dedicated server with bots</li>
              </ul>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Button asChild>
                <a href={INSTALLER_DOWNLOADS.windows}>
                  <WindowsLogoIcon data-icon="inline-start" /> Windows
                </a>
              </Button>
              <Button variant="secondary" asChild>
                <a href={INSTALLER_DOWNLOADS.linux}>
                  <LinuxLogoIcon data-icon="inline-start" /> Linux
                </a>
              </Button>
              <Button variant="link" asChild>
                <a href={INSTALLER_RELEASES}>Latest release on GitHub</a>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <img src="/img/rust-ts-dojo-fwgs.jpg" alt="The Rust port on Xash3D FWGS: ts_dojo, AK47 against a bot" className="aspect-video w-full object-cover" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display text-xl">
                <CpuIcon className="text-primary" /> The Specialists, in Rust
              </CardTitle>
              <CardDescription>
                A wire-compatible port of the TS 3.0 client and server libraries. Runs natively on 64-bit Linux and Windows with Xash3D FWGS, ReHLDS and the Half-Life 25th
                anniversary engine. The original 3.0 client can join its servers.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-wrap gap-2">
              <Button variant="secondary" asChild>
                <a href={RUST_RELEASES}>
                  <DownloadSimpleIcon data-icon="inline-start" /> Releases
                </a>
              </Button>
              <Button variant="link" asChild>
                <a href={RUST_REPO}>Source &amp; status</a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Community</p>
            <h2 className="mt-2 text-3xl">Fisk City Xmas 2024</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              The Fisk City roleplay community's 10-day Christmas event, one of the best yet. TS roleplay lives on in maps, models and plugins kept in the archive.
            </p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-1 md:grid-cols-4">
          {fiskCity.map((src, i) => (
            <a key={src} href={src} className={`group relative overflow-hidden ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
              <img src={src} alt="Fisk City screenshot" loading="lazy" className="aspect-video size-full object-cover transition duration-500 group-hover:scale-105" />
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-px bg-border sm:grid-cols-3">
          {[
            { n: counts?.maps, label: 'maps indexed', to: '/maps' },
            { n: counts?.models, label: 'player models archived', to: '/models' },
            { n: weapons.length, label: 'weapons in 3.0', to: '/manual?tab=weapons' },
          ].map((s) => (
            <Link key={s.label} to={s.to} className="group bg-background/90 p-8 transition-colors hover:bg-accent/40">
              <div className="font-display text-5xl text-foreground">{s.n?.toLocaleString() ?? '…'}</div>
              <div className="mt-2 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground group-hover:text-foreground">
                {s.label} <ArrowRightIcon />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
