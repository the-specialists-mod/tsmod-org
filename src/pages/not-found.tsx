import { Link } from 'react-router'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-start px-4 py-32">
      <p className="font-display text-7xl text-primary">*Click*</p>
      <h1 className="mt-4 text-3xl">Out of ammo.</h1>
      <p className="mt-2 text-sm text-muted-foreground">There's nothing at this address.</p>
      <Button className="mt-8" asChild>
        <Link to="/">Reload and head home</Link>
      </Button>
    </div>
  )
}
