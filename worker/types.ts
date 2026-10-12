// Shapes returned by the Worker's /api routes, shared with the frontend.

export type Server = {
  address: string
  /** 'gs' = GoldSrc (Steam Half-Life), 'ip' = other engines such as Xash3D FWGS. */
  kind: 'gs' | 'ip'
  label?: string
  name?: string
  map?: string
  players?: number
  maxPlayers?: number
  bots?: number
  os?: string
  dedicated?: boolean
  secure?: boolean
  sources: ('list' | 'steam')[]
}

export type ServersResponse = {
  updated: string
  steam: 'ok' | 'unconfigured' | 'error'
  servers: Server[]
}
