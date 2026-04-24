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
            <SheetContent side="right" className="w-80">
              {/* Large Logo/Favicon */}
              <div className="mb-8 mt-4 flex justify-center">
                <Image
                  src="/favicon.ico"
                  alt="ipxs.digital"
                  width={80}
                  height={80}
                  className="rounded-xl"
                />
              </div>
              
              {/* 3D Neon Button Navigation */}
              <div className="flex flex-col gap-4">
                <Link
                  href="/work"
                  className="mobile-nav-btn-cyan flex items-center justify-center rounded-full px-6 py-4 text-center font-medium text-foreground transition-all"
                >
                  Case Studies
                </Link>
                <Link
                  href="/services"
                  className="mobile-nav-btn-magenta flex items-center justify-center rounded-full px-6 py-4 text-center font-medium text-foreground transition-all"
                >
                  Services
                </Link>
                <Link
                  href="/contact"
                  className="mobile-nav-btn-violet flex items-center justify-center rounded-full px-6 py-4 text-center font-medium text-white transition-all"
                >
                  Start a Project
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
