'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

const navItems = [
  { href: '/work', label: 'Case Studies' },
  { href: '/services', label: 'Services' },
]

export function Navigation() {
  return (
    <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="font-serif text-lg tracking-tight">
          ipxs.digital
        </Link>

        <nav className="hidden items-center gap-8 text-sm md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn('text-muted-foreground transition-colors hover:text-foreground')}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild className="rounded-full px-6">
            <Link href="/contact">Start a Project</Link>
          </Button>
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm border-border/40 bg-background/95 p-0 backdrop-blur-xl">
              <div className="p-5">
                <div className="relative mb-6 aspect-video overflow-hidden rounded-2xl border border-border/40 bg-card/70">
                  <Image
                    src="/case-studies/charlibereal-deathrow-campaign/together-cover.png"
                    alt="ipxs hero fallback"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 90vw, 360px"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-xl border border-border/60 bg-card/70 px-4 py-3 text-sm text-foreground shadow-sm backdrop-blur transition-all hover:border-accent/60 hover:bg-accent/10"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Button asChild className="h-11 rounded-xl bg-gradient-to-r from-indigo-500/90 to-violet-500/90 shadow-[0_10px_26px_rgba(99,102,241,0.35)]">
                    <Link href="/contact">Start a Project</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
