import { useSearchParams } from 'react-router'

/** The game version the Manual describes: TS 3.0 (the default) or TS 2.1, as `?v=21`. */
export type Version = '30' | '21'

export const versions: { id: Version; label: string }[] = [
  { id: '30', label: 'TS 3.0' },
  { id: '21', label: 'TS 2.1' },
]

export function useVersion(): [Version, (v: Version) => void] {
  const [params, setParams] = useSearchParams()
  const version: Version = params.get('v') === '21' ? '21' : '30'
  const setVersion = (v: Version) =>
    setParams(
      (p) => {
        if (v === '30') p.delete('v')
        else p.set('v', v)
        return p
      },
      { replace: true, preventScrollReset: true },
    )
  return [version, setVersion]
}
