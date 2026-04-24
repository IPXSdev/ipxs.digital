import Link from 'next/link'
import { cn } from '@/lib/utils'

const primaryLinks = [
  { href: '/work', label: 'Case Studies' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Start a Project' },
]

const secondaryLinks = [
  { href: '/deck', label: 'Deck' },
  { href: '/resume', label: 'Resume' },
]

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

          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm" aria-label="Footer">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-6 flex flex-col gap-3 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div>© {year} ipxs.digital</div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {secondaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
