import { useSearchParams } from 'react-router'
import { DownloadSimpleIcon, MagnifyingGlassIcon } from '@phosphor-icons/react'
import { PageHeader } from '@/components/layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { CUSTOM_MAPS_BASE_URL, MAP_RESOURCES_REPO, RAW_MAP_RESOURCES } from '@/content/links'
import { officialMaps } from '@/content/official-maps'
import { formatBytes, matches } from '@/lib/format'
import archiveMaps from '@/data/maps.json'
import customMaps from '@/data/custom-maps.json'

type CustomMap = (typeof customMaps)[number] & { title?: string; author?: string }

function Empty() {
  return (
    <TableRow>
      <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
        No maps match that search.
      </TableCell>
    </TableRow>
  )
}

function DownloadButton({ href, label }: { href: string; label: string }) {
  return (
    <Button variant="ghost" size="icon-sm" asChild>
      <a href={href} aria-label={label} download>
        <DownloadSimpleIcon />
      </a>
    </Button>
  )
}

export function MapsPage() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const tab = params.get('tab') ?? 'official'
  const update = (key: string, value: string) =>
    setParams(
      (p) => {
        if (value) p.set(key, value)
        else p.delete(key)
        return p
      },
      { replace: true, preventScrollReset: true },
    )

  const official = officialMaps.filter((m) => matches(q, m.name, m.title, m.author))
  const custom = (customMaps as CustomMap[]).filter((m) => matches(q, m.name, m.title, m.author))
  const archive = archiveMaps.filter((m) => matches(q, m.name))

  return (
    <>
      <PageHeader title="Maps" kicker="Where the action happens">
        The 29 maps that ship with TS 3.0, community maps packaged with everything they need, and the community archive of{' '}
        <a href={MAP_RESOURCES_REPO} className="link">
          map-resources
        </a>
        . Custom maps go in <code className="text-foreground">ts/maps</code>; the zips below are laid out to extract straight into your <code className="text-foreground">ts</code>{' '}
        folder.
      </PageHeader>

      <div className="mx-auto max-w-6xl px-4">
        <Tabs value={tab} onValueChange={(v) => update('tab', v === 'official' ? '' : v)}>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <TabsList>
              <TabsTrigger value="official">Official ({official.length})</TabsTrigger>
              <TabsTrigger value="community">Community ({custom.length})</TabsTrigger>
              <TabsTrigger value="archive">Archive ({archive.length})</TabsTrigger>
            </TabsList>
            <div className="relative sm:w-72">
              <MagnifyingGlassIcon className="absolute top-1/2 left-2.5 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => update('q', e.target.value)} placeholder="Search maps…" className="pl-8" aria-label="Search maps" />
            </div>
          </div>

          <TabsContent value="official">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Map</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Author</TableHead>
                  <TableHead className="hidden lg:table-cell">Notes</TableHead>
                  <TableHead className="text-right">Mode</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {official.length === 0 && <Empty />}
                {official.map((m) => (
                  <TableRow key={m.name}>
                    <TableCell className="font-medium text-foreground">{m.name}</TableCell>
                    <TableCell>{m.title}</TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">{m.author ?? 'Unknown'}</TableCell>
                    <TableCell className="hidden max-w-xs truncate text-muted-foreground lg:table-cell">{m.note}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={m.mode === 'Deathmatch' ? 'secondary' : 'default'}>{m.mode === 'Deathmatch' ? 'DM' : 'CTB'}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="mt-4 text-xs text-muted-foreground">Included with every TS 3.0 install, so there's nothing to download.</p>
          </TabsContent>

          <TabsContent value="community">
            <p className="mb-4 border-l-2 border-primary bg-accent/30 px-4 py-3 text-xs text-muted-foreground">
              Collected from long-running community installs and packaged with their textures, models, sounds and skies. Extract a zip into your{' '}
              <code className="text-foreground">ts</code> folder.
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Map</TableHead>
                  <TableHead className="hidden md:table-cell">Title / author</TableHead>
                  <TableHead className="text-right">Files</TableHead>
                  <TableHead className="text-right">Size</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {custom.length === 0 && <Empty />}
                {custom.map((m) => (
                  <TableRow key={m.name}>
                    <TableCell className="font-medium text-foreground">
                      <span className="flex items-center gap-2">
                        {m.name}
                        {!m.complete && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="outline" className="text-[10px]">
                                partial
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>Some referenced files (sounds, skybox or textures) weren't found. The map loads, but may look or sound off.</TooltipContent>
                          </Tooltip>
                        )}
                      </span>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {[m.title, m.author].filter(Boolean).join(' · ') || '—'}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">{m.files}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{formatBytes(m.zipSize)}</TableCell>
                    <TableCell className="text-right">
                      <DownloadButton href={`${CUSTOM_MAPS_BASE_URL}/${m.zip}`} label={`Download ${m.name}`} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="archive">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Map</TableHead>
                  <TableHead className="hidden sm:table-cell">Notes</TableHead>
                  <TableHead className="text-right">BSP size</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {archive.length === 0 && <Empty />}
                {archive.map((m) => (
                  <TableRow key={m.path}>
                    <TableCell className="font-medium text-foreground">{m.name}</TableCell>
                    <TableCell className="hidden space-x-1 sm:table-cell">
                      {m.entmap && <Badge variant="outline">entmap</Badge>}
                      {m.res && <Badge variant="secondary">.res</Badge>}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">{formatBytes(m.size)}</TableCell>
                    <TableCell className="text-right">
                      <DownloadButton href={`${RAW_MAP_RESOURCES}/${m.path.split('/').map(encodeURIComponent).join('/')}`} label={`Download ${m.name}.bsp`} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="mt-4 text-xs text-muted-foreground">
              Downloads are the BSP only. Textures (WADs), skies, models and sounds live alongside them in{' '}
              <a href={MAP_RESOURCES_REPO} className="link">
                map-resources
              </a>
              ; a map's <code>.res</code> file lists what it needs.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
