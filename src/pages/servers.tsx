import { useCallback, useEffect, useState } from 'react'
import { ArrowClockwiseIcon, GameControllerIcon, InfoIcon, WarningIcon } from '@phosphor-icons/react'
import type { ServersResponse } from '../../worker/types'
import { CopyText } from '@/components/copy-text'
import { PageHeader } from '@/components/layout'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { INSTALLER_REPO, SERVERS_TXT } from '@/content/links'

type State = { status: 'loading' } | { status: 'error'; message: string } | { status: 'ok'; data: ServersResponse }

export function ServersPage() {
  const [state, setState] = useState<State>({ status: 'loading' })

  const fetchServers = useCallback(async () => {
    try {
      const res = await fetch('/api/servers')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setState({ status: 'ok', data: (await res.json()) as ServersResponse })
    } catch (err) {
      setState({ status: 'error', message: err instanceof Error ? err.message : String(err) })
    }
  }, [])

  useEffect(() => {
    // fetchServers only sets state after its request settles, never synchronously.
    // oxlint-disable-next-line react/set-state-in-effect
    void fetchServers()
  }, [fetchServers])

  const load = () => {
    setState({ status: 'loading' })
    void fetchServers()
  }

  const data = state.status === 'ok' ? state.data : undefined
  const players = data?.servers.reduce((n, s) => n + (s.players ?? 0), 0) ?? 0

  return (
    <>
      <PageHeader title="Servers" kicker="Find a fight">
        Community servers from the{' '}
        <a href={SERVERS_TXT} className="link">
          launcher's server list
        </a>
        , plus every TS server Steam knows about. Copy an address and use <code className="text-foreground">connect &lt;address&gt;</code> in the console, or join from the{' '}
        <a href={INSTALLER_REPO} className="link">
          launcher
        </a>
        's server browser.
      </PageHeader>

      <div className="mx-auto max-w-6xl space-y-6 px-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-muted-foreground">
            {data && (
              <>
                {data.servers.length} server{data.servers.length === 1 ? '' : 's'}
                {data.steam === 'ok' && <> · {players} player{players === 1 ? '' : 's'} online</>} · updated {new Date(data.updated).toLocaleTimeString()}
              </>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={load} disabled={state.status === 'loading'}>
            <ArrowClockwiseIcon data-icon="inline-start" className={state.status === 'loading' ? 'animate-spin' : ''} /> Refresh
          </Button>
        </div>

        {data?.steam === 'unconfigured' && (
          <Alert>
            <InfoIcon />
            <AlertTitle>Live status unavailable</AlertTitle>
            <AlertDescription>
              Player counts and maps come from Steam's master server, which needs a Steam Web API key on this site. Listed servers are shown without live details.
            </AlertDescription>
          </Alert>
        )}
        {data?.steam === 'error' && (
          <Alert variant="destructive">
            <WarningIcon />
            <AlertTitle>Steam didn't answer</AlertTitle>
            <AlertDescription>Showing the community list only. Try refreshing in a minute.</AlertDescription>
          </Alert>
        )}
        {state.status === 'error' && (
          <Alert variant="destructive">
            <WarningIcon />
            <AlertTitle>Couldn't load servers</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Server</TableHead>
              <TableHead className="hidden md:table-cell">Map</TableHead>
              <TableHead className="text-right">Players</TableHead>
              <TableHead className="hidden sm:table-cell">Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {state.status === 'loading' &&
              Array.from({ length: 3 }, (_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={4}>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                </TableRow>
              ))}
            {data?.servers.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                  No servers found right now.
                </TableCell>
              </TableRow>
            )}
            {data?.servers.map((s) => (
              <TableRow key={s.address}>
                <TableCell>
                  <div className="flex items-center gap-2 text-foreground">
                    <GameControllerIcon className="shrink-0 text-primary" />
                    <span className="truncate">{s.name ?? s.label ?? s.address}</span>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1 pl-6">
                    {s.name && s.label && <span className="text-[11px] text-muted-foreground">{s.label}</span>}
                    {s.kind === 'ip' && <Badge variant="outline">Xash3D</Badge>}
                    {s.sources.includes('list') && <Badge variant="secondary">community list</Badge>}
                    {s.os && <Badge variant="outline">{s.os}</Badge>}
                  </div>
                  <CopyText text={s.address} className="mt-1 pl-6 sm:hidden" />
                </TableCell>
                <TableCell className="hidden text-muted-foreground md:table-cell">{s.map ?? '—'}</TableCell>
                <TableCell className="text-right whitespace-nowrap">
                  {s.players !== undefined ? (
                    <>
                      <span className="text-foreground">{s.players - (s.bots ?? 0)}</span>
                      <span className="text-muted-foreground">/{s.maxPlayers}</span>
                      {!!s.bots && <span className="block text-[10px] text-muted-foreground">+{s.bots} bots</span>}
                    </>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <CopyText text={s.address} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <p className="text-xs text-muted-foreground">
          Run a server? Get it listed by opening a pull request that adds <code className="text-foreground">gs host:port</code> to{' '}
          <a href={SERVERS_TXT} className="link">
            servers.txt
          </a>
          .
        </p>
      </div>
    </>
  )
}
