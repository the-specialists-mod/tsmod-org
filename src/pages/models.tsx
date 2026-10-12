import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { MagnifyingGlassIcon, UserIcon } from '@phosphor-icons/react'
import { PageHeader } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MODEL_GOLDMINE_REPO, INSTALLER_REPO } from '@/content/links'
import { stockModels } from '@/content/official-maps'
import { formatBytes, matches } from '@/lib/format'
import models from '@/data/models.json'

const PAGE = 96

function Preview({ src, alt }: { src: string | null; alt: string }) {
  return (
    <div className="flex aspect-[164/200] items-center justify-center bg-gradient-to-b from-muted/60 to-background">
      {src ? (
        <img src={src} alt={alt} loading="lazy" className="size-full object-cover" />
      ) : (
        <UserIcon className="size-12 text-muted-foreground/30" weight="fill" />
      )}
    </div>
  )
}

export function ModelsPage() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const tab = params.get('tab') ?? 'archive'
  const [onlyPreviews, setOnlyPreviews] = useState(false)
  const [limit, setLimit] = useState(PAGE)

  const update = (key: string, value: string) => {
    setLimit(PAGE)
    setParams(
      (p) => {
        if (value) p.set(key, value)
        else p.delete(key)
        return p
      },
      { replace: true },
    )
  }

  const archive = useMemo(() => models.filter((m) => (!onlyPreviews || m.preview) && matches(q, m.name)), [q, onlyPreviews])
  const stock = stockModels.filter((m) => matches(q, m.name, m.title, m.author))

  return (
    <>
      <PageHeader title="Player models" kicker="Dress for the occasion">
        The seven models that ship with TS, and the {models.length.toLocaleString()} community models in the{' '}
        <a href={MODEL_GOLDMINE_REPO} className="text-foreground underline underline-offset-4">
          model goldmine
        </a>
        . A model lives in <code className="text-foreground">ts/models/player/&lt;name&gt;/&lt;name&gt;.mdl</code>; the{' '}
        <a href={INSTALLER_REPO} className="text-foreground underline underline-offset-4">
          launcher
        </a>{' '}
        can add and preview them in 3D.
      </PageHeader>

      <div className="mx-auto max-w-6xl px-4">
        <Tabs value={tab} onValueChange={(v) => update('tab', v === 'archive' ? '' : v)}>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <TabsList className="h-auto! flex-wrap">
              <TabsTrigger value="archive">Goldmine ({archive.length.toLocaleString()})</TabsTrigger>
              <TabsTrigger value="stock">Stock ({stock.length})</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-3">
              {tab === 'archive' && (
                <label className="flex items-center gap-2 text-xs whitespace-nowrap text-muted-foreground">
                  <input type="checkbox" checked={onlyPreviews} onChange={(e) => (setOnlyPreviews(e.target.checked), setLimit(PAGE))} className="accent-primary" />
                  With preview
                </label>
              )}
              <div className="relative w-full sm:w-64">
                <MagnifyingGlassIcon className="absolute top-1/2 left-2.5 -translate-y-1/2 text-muted-foreground" />
                <Input value={q} onChange={(e) => update('q', e.target.value)} placeholder="Search models…" className="pl-8" aria-label="Search models" />
              </div>
            </div>
          </div>

          <TabsContent value="archive">
            {archive.length === 0 ? (
              <p className="py-16 text-center text-sm text-muted-foreground">No models match that search.</p>
            ) : (
              <>
                <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6">
                  {archive.slice(0, limit).map((m) => (
                    <li key={m.name}>
                      <a
                        href={`${MODEL_GOLDMINE_REPO}/tree/main/models/player/${encodeURIComponent(m.name)}`}
                        className="group block border bg-card transition-colors hover:border-primary"
                      >
                        <Preview src={m.preview} alt={m.name} />
                        <div className="flex items-center justify-between gap-1 p-2 text-xs">
                          <span className="truncate text-foreground" title={m.name}>
                            {m.name}
                          </span>
                          <span className="shrink-0 text-[10px] text-muted-foreground">{formatBytes(m.size)}</span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
                {limit < archive.length && (
                  <div className="mt-8 flex justify-center">
                    <Button variant="outline" onClick={() => setLimit((l) => l + PAGE * 2)}>
                      Show more ({(archive.length - limit).toLocaleString()} left)
                    </Button>
                  </div>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="stock">
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {stock.map((m) => (
                <li key={m.name} className="border bg-card">
                  <Preview src={`/previews/stock/${m.name}.jpg`} alt={m.title} />
                  <div className="space-y-1 p-3">
                    <h3 className="text-base text-foreground">{m.title}</h3>
                    <p className="text-[11px] text-muted-foreground">
                      <code>{m.name}</code> · model by {m.author} · skin by {m.skins}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-muted-foreground">Included with TS 3.0. Team play modes override your choice with team models.</p>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
