import Link from 'next/link'

const footerLinks = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/deck', label: 'Deck' },
  { href: '/resume', label: 'Resume' },
  { href: '/lab', label: 'Lab' },
  { href: '/contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-xl font-medium tracking-tight transition-opacity hover:opacity-70"
            >
              <span className="font-serif italic">ipxs</span>
              <span className="text-muted-foreground">.digital</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Entertainment Creative Technology Studio building AI-powered release ecosystems.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap gap-x-12 gap-y-4">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col gap-4 border-t border-border/50 pt-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            Powered by{' '}
            <span className="font-serif italic text-foreground">ipxs</span>
            <span>.digital</span>
          </p>
          <p>
            Founded by{' '}
            <span className="text-foreground">Darion R. Harris</span>{' '}
            <span className="text-muted-foreground/70">(LightGod)</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
