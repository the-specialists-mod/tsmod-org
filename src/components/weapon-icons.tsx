// Small line icons for TS fire modes and gun attachments, drawn on a 24px grid in one
// style (1.75 stroke, currentColor) so they sit together in tables and the loadout builder.
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { Attachment, FireMode, Weapon } from '@/content/weapons'

type IconProps = { className?: string }

function Svg({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={cn('size-5', className)} aria-hidden>
      {children}
    </svg>
  )
}

/** A bullet pointing up, its base at y. */
function Bullet({ x, y = 20, h = 14 }: { x: number; y?: number; h?: number }) {
  const top = y - h
  return <path d={`M${x - 2} ${y}V${top + 4}Q${x - 2} ${top} ${x} ${top}Q${x + 2} ${top} ${x + 2} ${top + 4}V${y}Z`} />
}

const fireModeIcons: Record<FireMode, (p: IconProps) => React.ReactElement> = {
  semi: (p) => (
    <Svg {...p}>
      <Bullet x={12} />
      <path d="M8 20h8" />
    </Svg>
  ),
  burst: (p) => (
    <Svg {...p}>
      <Bullet x={6} />
      <Bullet x={12} />
      <Bullet x={18} />
    </Svg>
  ),
  auto: (p) => (
    <Svg {...p}>
      <Bullet x={9} y={20} h={12} />
      <Bullet x={15} y={20} h={12} />
      <path d="M3 4h18M6 7h12" />
    </Svg>
  ),
  pump: (p) => (
    <Svg {...p}>
      <rect x="8" y="4" width="8" height="12" rx="1" />
      <path d="M7 16h10v4H7z" />
      <path d="M8 8h8" />
    </Svg>
  ),
  'akimbo-semi': (p) => (
    <Svg {...p}>
      <Bullet x={8} />
      <Bullet x={16} />
      <path d="M12 4v16" strokeDasharray="2 2" />
    </Svg>
  ),
  'akimbo-auto': (p) => (
    <Svg {...p}>
      <Bullet x={5} y={20} h={11} />
      <Bullet x={10} y={20} h={11} />
      <Bullet x={14} y={20} h={11} />
      <Bullet x={19} y={20} h={11} />
      <path d="M12 3v4" />
      <path d="M3 4h6M15 4h6" />
    </Svg>
  ),
}

const attachmentIcons: Record<Attachment, (p: IconProps) => React.ReactElement> = {
  silencer: (p) => (
    <Svg {...p}>
      <path d="M2 12h4" />
      <rect x="6" y="8.5" width="14" height="7" rx="2" />
      <path d="M10 8.5v7M14 8.5v7" />
    </Svg>
  ),
  laser: (p) => (
    <Svg {...p}>
      <rect x="2" y="9" width="7" height="6" rx="1" />
      <path d="M9 12h9" strokeDasharray="2 1.5" />
      <circle cx="20.5" cy="12" r="1.5" fill="currentColor" />
    </Svg>
  ),
  flashlight: (p) => (
    <Svg {...p}>
      <rect x="2" y="9.5" width="8" height="5" rx="1" />
      <path d="M10 8.5v7l3 2V6.5z" />
      <path d="M16 7.5l5-2M16 12h5M16 16.5l5 2" />
    </Svg>
  ),
  scope: (p) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 2v6M12 16v6M2 12h6M16 12h6" />
      <circle cx="12" cy="12" r="0.75" fill="currentColor" />
    </Svg>
  ),
}

export const fireModeLabels: Record<FireMode, { name: string; desc: string }> = {
  semi: { name: 'Semi-auto', desc: 'One shot per click.' },
  burst: { name: 'Burst', desc: 'Three rounds per click.' },
  auto: { name: 'Full auto', desc: 'Fires while the trigger is held.' },
  pump: { name: 'Pump', desc: 'Pump-action: a slower, harder shot.' },
  'akimbo-semi': { name: 'Akimbo semi', desc: 'Both guns, one shot each per click.' },
  'akimbo-auto': { name: 'Akimbo auto', desc: 'Both guns firing while held.' },
}

export const attachmentLabels: Record<Attachment, { name: string; desc: string }> = {
  silencer: { name: 'Silencer', desc: 'Quieter shots: damage and kick ×0.775, spread ×0.875.' },
  laser: { name: 'Laser sight', desc: 'A red dot on target. G cycles laser, flashlight, both, off.' },
  flashlight: { name: 'Flashlight', desc: 'Lights dark corners. G cycles laser, flashlight, both, off.' },
  scope: { name: 'Scope', desc: 'Two zoom levels on the secondary attack (Mouse2).' },
}

export function FireModeIcon({ mode, className }: { mode: FireMode } & IconProps) {
  const Icon = fireModeIcons[mode]
  return <Icon className={className} />
}

export function AttachmentIcon({ attachment, className }: { attachment: Attachment } & IconProps) {
  const Icon = attachmentIcons[attachment]
  return <Icon className={className} />
}

/** An icon with a tooltip naming it; the name is also the accessible label. */
export function IconChip({ label, desc, children, muted }: { label: string; desc?: string; children: React.ReactNode; muted?: boolean }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          role="img"
          aria-label={label}
          tabIndex={0}
          className={cn('inline-flex size-7 items-center justify-center border border-black bg-black/30 text-foreground', muted && 'text-link')}
        >
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <span className="font-bold">{label}</span>
        {desc && <span className="block opacity-80">{desc}</span>}
      </TooltipContent>
    </Tooltip>
  )
}

/** Icon chips for a weapon's fire modes. */
export function WeaponIcons({ w }: { w: Weapon }) {
  return (
    <span className="inline-flex flex-wrap gap-1">
      {w.modes.map((m) => (
        <IconChip key={m} label={fireModeLabels[m].name} desc={fireModeLabels[m].desc}>
          <FireModeIcon mode={m} className="size-4" />
        </IconChip>
      ))}
    </span>
  )
}

/** Icon chips for a weapon's attachments; built-in ones are yellow, unselected ones dimmed. */
export function AttachmentIcons({ w, selected }: { w: Weapon; selected?: Attachment[] }) {
  return (
    <span className="inline-flex flex-wrap gap-1">
      {w.builtIn.map((a) => (
        <IconChip key={a} label={`${attachmentLabels[a].name} (built in)`} desc={attachmentLabels[a].desc}>
          <AttachmentIcon attachment={a} className="size-4 text-link-hover" />
        </IconChip>
      ))}
      {w.attachments.map((a) => (
        <IconChip key={a} label={attachmentLabels[a].name} desc={attachmentLabels[a].desc} muted={selected ? !selected.includes(a) : true}>
          <AttachmentIcon attachment={a} className="size-4" />
        </IconChip>
      ))}
    </span>
  )
}
