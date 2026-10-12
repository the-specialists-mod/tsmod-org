import { useEffect } from 'react'
import { CaretLeftIcon, CaretRightIcon, XIcon } from '@phosphor-icons/react'
import { Dialog } from 'radix-ui'

export type LightboxImage = { src: string; caption: string }

/** Full-size image viewer over the page; arrow keys step through `images`. */
export function Lightbox({ images, index, onIndexChange }: { images: LightboxImage[]; index: number | null; onIndexChange: (i: number | null) => void }) {
  const image = index != null ? images[index] : undefined
  const step = (d: number) => index != null && onIndexChange((index + d + images.length) % images.length)

  useEffect(() => {
    if (index == null || images.length < 2) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') step(-1)
      if (e.key === 'ArrowRight') step(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const navButton = 'absolute top-1/2 -translate-y-1/2 border border-black bg-black/70 p-2 text-foreground hover:text-link-hover'

  return (
    <Dialog.Root open={!!image} onOpenChange={(open) => !open && onIndexChange(null)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/85 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex items-center justify-center p-4 outline-none sm:p-10"
          onClick={(e) => e.target === e.currentTarget && onIndexChange(null)}
        >
          {image && (
            <figure className="panel relative flex max-h-full max-w-6xl flex-col p-2">
              <img src={image.src} alt={image.caption} className="min-h-0 max-h-[calc(100vh-9rem)] w-auto border border-black object-contain" />
              <figcaption className="mt-2 flex items-center justify-between gap-4 px-1 text-xs text-foreground/85">
                <Dialog.Title className="font-sans text-xs font-normal normal-case tracking-normal">{image.caption}</Dialog.Title>
                {images.length > 1 && (
                  <span className="shrink-0 text-muted-foreground">
                    {index! + 1} / {images.length}
                  </span>
                )}
              </figcaption>
              <Dialog.Description className="sr-only">Screenshot viewer. Use the arrow keys to step through, Escape to close.</Dialog.Description>
              {images.length > 1 && (
                <>
                  <button type="button" aria-label="Previous screenshot" onClick={() => step(-1)} className={`${navButton} left-3`}>
                    <CaretLeftIcon className="size-5" />
                  </button>
                  <button type="button" aria-label="Next screenshot" onClick={() => step(1)} className={`${navButton} right-3`}>
                    <CaretRightIcon className="size-5" />
                  </button>
                </>
              )}
              <Dialog.Close aria-label="Close" className="absolute -top-3 -right-3 border border-black bg-[#333] p-1.5 text-foreground hover:text-link-hover">
                <XIcon className="size-4" />
              </Dialog.Close>
            </figure>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
