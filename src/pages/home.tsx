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
import { INSTALLER_DOWNLOADS, INSTALLER_RELEASES, OFFICIAL_SITE_WAYBACK, RUST_RELEASES, RUST_REPO } from '@/content/links'
import { officialMaps } from '@/content/official-maps'
import { weapons } from '@/content/weapons'

// TS 3.0 screenshots from the mod's ModDB gallery (media.moddb.com/images/mods/1/1/144/).
const heroShots = ['22765', '22767', '22763'].map((n) => `/img/moddb/${n}.jpg`)

// The six screenshots from Schmung's "Media Ahoy!" news post on specialistsmod.net
// (Apr 24, 2007), with his captions. Only the post's 320x240 thumbnails survive in the
// archive; the full-size images were never captured.
const mediaAhoy = [
  { n: 1, map: 'ts_hammertime', caption: 'First up, a shot of newly redecorated Hammertime.' },
  {
    n: 2,
    map: 'ts_hammertime',
    caption: 'This time castor is delivering a rather painful kick that appears to have gotten the better of hitman.',
  },
  {
    n: 3,
    map: 'ts_gpc',
    caption: 'Now to that old favourite GPC, where, despite aiming at a pipe, one of our RC testers has managed to kill someone with a shotgun. Good for him.',
  },
  { n: 4, map: 'ts_antrodome', caption: 'Antro next, for a spot of Skorpion rage. … this fellow is using free full and is spitting bullets from both guns at once.' },
  {
    n: 5,
    map: 'ts_neobaroque',
    caption: "To NeoBaroque next, another map that's had a facelift. Though … at no point … have I ever felt the need to add a thunderstorm to my house.",
  },
  { n: 6, map: 'ts_neobaroque', caption: 'One of our RC testers apparently hates windows, as you can see from the glass cascading down upon him.' },
]

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
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
    </div>
  )
}

export function HomePage() {
  const counts = useCounts()
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-8">
        <div className="panel relative isolate overflow-hidden">
        <HeroBackground />
        <div className="flex min-h-[440px] flex-col justify-center px-6 py-14 sm:px-10">
          <Badge variant="outline" className="mb-5 w-fit border-link-hover/60 bg-black/50 text-link-hover">
            Free · Half-Life mod · Since 2002
          </Badge>
          <h1 className="max-w-xl text-5xl leading-none text-white sm:text-6xl">A multiplayer action movie</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/90 sm:text-lg">
            Slow motion, stunts, kung fu and akimbo gunfights in the Half-Life engine.
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
              <CardTitle className="font-bold text-xl">TS Installer &amp; Launcher</CardTitle>
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
              <CardTitle className="flex items-center gap-2 font-bold text-xl">
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
        <p className="text-xs uppercase tracking-[0.3em] text-primary">From the archive</p>
        <h2 className="mt-2 text-3xl">Media Ahoy!</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Schmung on specialistsmod.net, April 24, 2007, as the 3.0 release candidates went out: "As promised, some more media."{' '}
          <a href={OFFICIAL_SITE_WAYBACK} className="link">
            Read the original
          </a>
          .
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mediaAhoy.map((m) => (
            <li key={m.n} className="panel flex flex-col p-2">
              <img
                src={`/img/2007/media-ahoy/upd_24_${m.n}.jpg`}
                alt={`${m.map} in a TS 3.0 release candidate, 2007`}
                width={320}
                height={240}
                loading="lazy"
                className="aspect-[4/3] w-full border border-black object-cover"
              />
              <p className="mt-2 px-1 text-xs leading-relaxed text-foreground/85 italic">"{m.caption}"</p>
              <Link to={`/maps?q=${m.map}`} className="link mt-auto self-start px-1 pt-2 pb-1 text-[11px] not-italic">
                {m.map}
              </Link>
            </li>
          ))}
        </ul>
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
