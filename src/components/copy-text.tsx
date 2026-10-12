import { useState } from 'react'
import { CheckIcon, CopyIcon } from '@phosphor-icons/react'

export function CopyText({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground ${className ?? ''}`}
      onClick={() => {
        void navigator.clipboard.writeText(text).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        })
      }}
      title="Copy"
    >
      <span className="break-all">{text}</span>
      {copied ? <CheckIcon className="shrink-0 text-primary" /> : <CopyIcon className="shrink-0" />}
    </button>
  )
}
