// Cloudflare Worker: serves the built SPA from static assets and answers /api/*.
//
// GET /api/servers merges the community server list (servers.txt in the
// installer repo, the same list the launcher uses) with Steam's master server
// when a STEAM_API_KEY secret is configured. Workers can't send UDP, so
// servers aren't queried directly (A2S); live name/map/players come from Steam.

import type { Server, ServersResponse } from './types'

export interface Env {
  ASSETS: Fetcher
  STEAM_API_KEY?: string
}

const SERVERS_TXT_URL = 'https://raw.githubusercontent.com/the-specialists-mod/tsmod-launcher/main/servers.txt'
const CACHE_SECONDS = 60

/** Parses servers.txt: `gs host:port` / `ip host:port`, with the preceding `#` comment as a label. */
function parseServersTxt(text: string): Server[] {
  const servers: Server[] = []
  let comment: string | undefined
  for (const raw of text.split('\n')) {
    const line = raw.trim()
    if (!line) {
      comment = undefined
      continue
    }
    if (line.startsWith('#')) {
      comment = line.replace(/^#+\s*/, '') || undefined
      continue
    }
    const m = line.match(/^(gs|ip)\s+(\S+:\d+)/)
    if (m) servers.push({ kind: m[1] as Server['kind'], address: m[2], label: comment, sources: ['list'] })
    comment = undefined
  }
  return servers
}

type SteamServer = {
  addr: string
  name: string
  map: string
  players: number
  max_players: number
  bots: number
  os: string
  dedicated: boolean
  secure: boolean
}

async function steamServers(key: string): Promise<SteamServer[]> {
  const url = new URL('https://api.steampowered.com/IGameServersService/GetServerList/v1/')
  url.searchParams.set('key', key)
  url.searchParams.set('filter', '\\appid\\70\\gamedir\\ts')
  url.searchParams.set('limit', '500')
  const res = await fetch(url, { cf: { cacheTtl: CACHE_SECONDS } })
  if (!res.ok) throw new Error(`steam ${res.status}`)
  const json = (await res.json()) as { response?: { servers?: SteamServer[] } }
  return json.response?.servers ?? []
}

/** Resolves a hostname to IPv4 via DNS-over-HTTPS, so list entries can be matched to Steam's IPs. */
async function resolveA(host: string): Promise<string | undefined> {
  if (/^\d+\.\d+\.\d+\.\d+$/.test(host)) return host
  try {
    const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(host)}&type=A`, {
      headers: { accept: 'application/dns-json' },
    })
    const json = (await res.json()) as { Answer?: { type: number; data: string }[] }
    return json.Answer?.find((a) => a.type === 1)?.data
  } catch {
    return undefined
  }
}

async function buildServers(env: Env): Promise<ServersResponse> {
  const listRes = await fetch(SERVERS_TXT_URL, { cf: { cacheTtl: 300 } })
  const listed = listRes.ok ? parseServersTxt(await listRes.text()) : []

  let steam: ServersResponse['steam'] = env.STEAM_API_KEY ? 'ok' : 'unconfigured'
  let fromSteam: SteamServer[] = []
  if (env.STEAM_API_KEY) {
    try {
      fromSteam = await steamServers(env.STEAM_API_KEY)
    } catch {
      steam = 'error'
    }
  }

  const byAddr = new Map<string, Server>()
  for (const s of fromSteam) {
    byAddr.set(s.addr, {
      kind: 'gs',
      address: s.addr,
      name: s.name,
      map: s.map,
      players: s.players,
      maxPlayers: s.max_players,
      bots: s.bots,
      os: s.os === 'l' ? 'Linux' : s.os === 'w' ? 'Windows' : undefined,
      dedicated: s.dedicated,
      secure: s.secure,
      sources: ['steam'],
    })
  }
  const merged: Server[] = []
  for (const entry of listed) {
    const [host, port] = entry.address.split(':')
    const ip = await resolveA(host)
    const live = ip ? byAddr.get(`${ip}:${port}`) : undefined
    if (live) {
      byAddr.delete(live.address)
      merged.push({ ...live, address: entry.address, kind: entry.kind, label: entry.label, sources: ['list', 'steam'] })
    } else {
      merged.push(entry)
    }
  }
  merged.push(...byAddr.values())
  merged.sort((a, b) => (b.players ?? -1) - (a.players ?? -1))
  return { updated: new Date().toISOString(), steam, servers: merged }
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/api/servers') {
      const cache = caches.default
      const key = new Request(url.origin + url.pathname)
      const hit = await cache.match(key)
      if (hit) return hit
      const body = await buildServers(env)
      const res = Response.json(body, {
        headers: { 'cache-control': `public, max-age=${CACHE_SECONDS}`, 'access-control-allow-origin': '*' },
      })
      ctx.waitUntil(cache.put(key, res.clone()))
      return res
    }

    if (url.pathname.startsWith('/api/')) {
      return Response.json({ error: 'not found' }, { status: 404 })
    }

    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
