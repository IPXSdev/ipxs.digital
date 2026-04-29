import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="section-fade section-fade-soft bg-background/70 pb-8 pt-10 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              href="/"
              className={cn(
                'text-base font-semibold tracking-tight',
                'text-foreground hover:text-foreground/90'
              )}
            >
              ipxs.digital
            </Link>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              Entertainment creative technology studio for releases, campaigns, and digital products built to close.
            </p>
          </div>

        </div>

        <div className="mt-6 flex flex-col gap-3 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div>© {year} ipxs.digital</div>
        </div>
      </div>
    </footer>
  )
}
