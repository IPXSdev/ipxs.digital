import Link from 'next/link'
import { cn } from '@/lib/utils'

const primaryLinks = [
  { href: '/work', label: 'Case Studies' },
  { href: '/services', label: 'Services' },
  { href: '/lab', label: 'Lab' },
  { href: '/contact', label: 'Contact' },
]

const secondaryLinks = [
  { href: '/deck', label: 'Deck' },
  { href: '/resume', label: 'Resume' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 bg-background/70 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5">
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
              Entertainment Creative Technology Studio building AI-powered release ecosystems.
            </p>
          </div>

          <nav className="md:col-span-7 md:flex md:justify-end" aria-label="Footer">
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-border/30 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div>© {year} ipxs.digital</div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {secondaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-foreground transition-colors"
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
