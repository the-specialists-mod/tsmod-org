import { DownloadSimpleIcon, LinuxLogoIcon, WarningIcon, WindowsLogoIcon } from '@phosphor-icons/react'
import { CopyText } from '@/components/copy-text'
import { PageHeader } from '@/components/layout'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  HALF_LIFE_STEAM,
  INSTALLER_DOWNLOADS,
  INSTALLER_REPO,
  RUST_INSTALL_DOCS,
  RUST_RELEASES,
  RUST_REPO,
  TS_INSTALLER_EXE,
  TS_INSTALLER_MD5,
  TS_INTERNET_ARCHIVE,
  TS_MODDB,
  TS_RELEASE,
  XASH_FWGS,
  XASH_TS_REPO,
} from '@/content/links'

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <li className="relative border-l border-border pb-8 pl-8 last:pb-0">
      <span className="absolute -left-3.5 top-0 flex size-7 items-center justify-center bg-primary font-display text-sm text-primary-foreground">{n}</span>
      <h3 className="text-lg leading-7">{title}</h3>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </li>
  )
}

function Code({ children }: { children: string }) {
  return <pre className="overflow-x-auto border bg-black/50 p-4 text-xs leading-relaxed text-foreground/90">{children}</pre>
}

const A = (props: React.ComponentProps<'a'>) => <a className="link" {...props} />

export function PlayPage() {
  return (
    <>
      <PageHeader title="Get playing" kicker="Install">
        TS is free. The quickest way in is the community installer, which works with or without a copy of Half-Life. Prefer to do it by hand? The manual steps are below.
      </PageHeader>

      <div className="mx-auto max-w-6xl px-4">
        <Tabs defaultValue="installer">
          <TabsList className="mb-8 h-auto! flex-wrap">
            <TabsTrigger value="installer">Installer (recommended)</TabsTrigger>
            <TabsTrigger value="steam">Manual: Steam Half-Life</TabsTrigger>
            <TabsTrigger value="rust">Rust port</TabsTrigger>
            <TabsTrigger value="server">Host a server</TabsTrigger>
          </TabsList>

          <TabsContent value="installer" className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <ol className="ml-3.5">
              <Step n={1} title="Download the launcher">
                <div className="flex flex-wrap gap-2 pt-1">
                  <Button asChild>
                    <a href={INSTALLER_DOWNLOADS.windows}>
                      <WindowsLogoIcon data-icon="inline-start" /> Windows x64
                    </a>
                  </Button>
                  <Button variant="secondary" asChild>
                    <a href={INSTALLER_DOWNLOADS.linux}>
                      <LinuxLogoIcon data-icon="inline-start" /> Linux x64
                    </a>
                  </Button>
                </div>
                <p>
                  On Linux, make it executable first: <code className="text-foreground">chmod +x ts-launcher-linux-x86_64.bin</code>
                </p>
              </Step>
              <Step n={2} title="Pick how you want to play">
                <p>
                  <strong className="text-foreground">Use my Half-Life install:</strong> point it at your Half-Life folder (Steam libraries are detected automatically). TS
                  goes into its <code>ts/</code> folder.
                </p>
                <p>
                  <strong className="text-foreground">Install Xash3D FWGS:</strong> no Half-Life needed. It downloads <A href={XASH_FWGS}>Xash3D FWGS</A> and the Half-Life
                  data from <A href={XASH_TS_REPO}>xash3d-ts</A>, or copies it from a local install.
                </p>
              </Step>
              <Step n={3} title="Let it install TS 3.0">
                <p>
                  The launcher downloads the original <code>ts-3-final.exe</code>, verifies its MD5 and unpacks it natively, so nothing runs under Wine. You can also hand
                  it a local copy.
                </p>
              </Step>
              <Step n={4} title="Play">
                <p>
                  Pick a server from the built-in browser, choose your player model, set your binds, or start your own server with bots. The original DLLs and the{' '}
                  <A href={RUST_REPO}>Rust port</A> are both supported.
                </p>
              </Step>
            </ol>
            <Card size="sm" className="h-fit">
              <CardHeader>
                <CardTitle className="font-bold">ts-launcher</CardTitle>
                <CardDescription>Built with GPUI. Windows and Linux.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-muted-foreground">
                <p>It also runs headless:</p>
                <Code>{`ts-launcher install --root ~/games/ts --xash
ts-launcher play`}</Code>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <a href={INSTALLER_REPO}>README &amp; source</a>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="steam" className="max-w-3xl">
            <ol className="ml-3.5">
              <Step n={1} title="Install Half-Life from Steam">
                <p>
                  You need the original <A href={HALF_LIFE_STEAM}>Half-Life</A> (app 70), not Half-Life: Source or Half-Life 2. Run it once so its folder exists.
                </p>
              </Step>
              <Step n={2} title="Download TS 3.0">
                <div className="flex flex-wrap gap-2 pt-1">
                  <Button asChild>
                    <a href={TS_INSTALLER_EXE}>
                      <DownloadSimpleIcon data-icon="inline-start" /> ts-3-final.exe (155 MB)
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={TS_RELEASE}>Release page</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={TS_INTERNET_ARCHIVE}>Internet Archive</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={TS_MODDB}>ModDB</a>
                  </Button>
                </div>
                <p className="flex flex-wrap items-center gap-2">
                  MD5: <CopyText text={TS_INSTALLER_MD5} />
                </p>
              </Step>
              <Step n={3} title="Install into your Half-Life folder">
                <p>
                  Run the installer and point it at your Half-Life directory, e.g. <code className="text-foreground">C:\Program Files (x86)\Steam\steamapps\common\Half-Life</code>.
                  It creates a <code>ts</code> folder next to <code>valve</code>.
                </p>
              </Step>
              <Step n={4} title="Restart Steam">
                <p>The Specialists appears in your Steam library under non-Steam mods. Launch it and go.</p>
              </Step>
            </ol>
          </TabsContent>

          <TabsContent value="rust" className="grid gap-10 lg:grid-cols-[1fr_380px]">
            <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
              <p>
                <A href={RUST_REPO}>the-specialistsmod-rs</A> is a Rust port of both TS 3.0 game libraries, the server (<code>mp.dll</code> / <code>ts_i386.so</code>) and the
                client (<code>client.dll</code>), ported from a Ghidra decompilation. It is <strong className="text-foreground">wire-compatible with TS 3.0</strong>: the
                original client can join a Rust server and vice versa.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Xash3D FWGS</Badge>
                <Badge variant="secondary">ReHLDS</Badge>
                <Badge variant="secondary">HL25 HLDS</Badge>
                <Badge variant="secondary">Linux &amp; Windows</Badge>
                <Badge variant="secondary">32 &amp; 64-bit</Badge>
              </div>
              <ol className="ml-3.5">
                <Step n={1} title="Have TS 3.0 installed">
                  <p>The port only replaces the game libraries. Maps, models and sounds still come from a TS 3.0 install.</p>
                </Step>
                <Step n={2} title="Download a release for your platform">
                  <Button asChild>
                    <a href={RUST_RELEASES}>
                      <DownloadSimpleIcon data-icon="inline-start" /> Latest release
                    </a>
                  </Button>
                </Step>
                <Step n={3} title="Copy its ts/ folder over yours">
                  <p>
                    Or point the installer at the release archive, and it does it for you. Full per-engine steps: <A href={RUST_INSTALL_DOCS}>INSTALL.md</A>.
                  </p>
                </Step>
              </ol>
            </div>
            <div className="space-y-2">
              <img src="/img/rust-original-client-vs-rust-server.jpg" alt="The original TS 3.0 client connected to a Rust port server" className="border" loading="lazy" />
              <p className="text-xs text-muted-foreground">The original 3.0 client playing on a Rust port server.</p>
            </div>
          </TabsContent>

          <TabsContent value="server" className="max-w-3xl space-y-6 text-sm leading-relaxed text-muted-foreground">
            <p>
              The quickest way is the launcher's <strong className="text-foreground">Start a server</strong> screen: a listen server, or with the Linux FWGS build a dedicated
              server, with bots named from <code>ts/bots.txt</code>.
            </p>
            <p>
              TS 3.0 runs on the current Half-Life dedicated server as is. Install HLDS with steamcmd, then copy your <code>ts</code> folder next to <code>valve</code>:
            </p>
            <Code>{`steamcmd +login anonymous +app_update 90 validate +quit`}</Code>
            <p>
              The <A href={RUST_REPO}>Rust port</A> also runs on HLDS and ReHLDS. To start a dedicated server (here on Linux):
            </p>
            <Code>{`./hlds_linux -game ts +maxplayers 16 +map ts_lobby
# bots: put \`ts_bot_quota N\` or \`addbot\` lines in ts/server.cfg`}</Code>
            <Alert>
              <WarningIcon />
              <AlertTitle>The old master servers are gone</AlertTitle>
              <AlertDescription>
                To get your server listed in the launcher and on this site, open a pull request adding a <code>gs host:port</code> line to <A href={`${INSTALLER_REPO}/blob/main/servers.txt`}>servers.txt</A>.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
