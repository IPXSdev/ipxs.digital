'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { usePortal } from './portal-overlay'
import { Grid3X3, X } from 'lucide-react'

const worlds = [
  { id: 'music-release-systems', number: '01', title: 'Music Release Systems' },
  { id: 'motion-social', number: '02', title: 'Motion + Social Ads' },
  { id: 'commercials', number: '03', title: 'Commercials' },
  { id: 'pitch-decks', number: '04', title: 'Pitch Deck Architecture' },
  { id: 'websites', number: '05', title: 'Websites / MVP Platforms' },
  { id: 'institutional', number: '06', title: 'Institutional / Investor Systems' },
]

export function PortalMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { triggerPortal } = usePortal()
  const isWorkPage = pathname === '/work'

  const handleWorldClick = (worldId: string) => {
    setIsOpen(false)

    if (isWorkPage) {
      // Scroll to section on /work page
      triggerPortal(() => {
        const section = document.getElementById(worldId)
        section?.scrollIntoView({ behavior: 'smooth' })
      })
    } else {
      // Navigate to /work page with hash
      triggerPortal(() => {
        router.push(`/work#${worldId}`)
      })
    }
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed z-[100] flex h-12 w-12 items-center justify-center rounded-full border border-border/50 bg-background/80 backdrop-blur-xl transition-all hover:border-accent/50 hover:bg-card',
          // Desktop: top-right area (avoiding main nav)
          'right-4 top-20 md:right-8 md:top-24',
          // Mobile: bottom-right
          'max-md:bottom-24 max-md:top-auto',
          isOpen && 'border-accent bg-card'
        )}
        aria-label={isOpen ? 'Close portal menu' : 'Open portal menu'}
        data-cursor="Open"
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Grid3X3 className="h-5 w-5" />
        )}
      </button>

      {/* Portal menu overlay */}
      <div
        className={cn(
          'fixed inset-0 z-[99] flex items-center justify-center bg-background/95 backdrop-blur-xl transition-all duration-300',
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <div className="w-full max-w-2xl px-4">
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Case Studies
            </p>
            <h2 className="font-serif text-2xl font-medium md:text-3xl">
              Jump to a Category
            </h2>
          </div>

          <div className="space-y-2">
            {worlds.map((world, index) => (
              <button
                key={world.id}
                onClick={() => handleWorldClick(world.id)}
                className={cn(
                  'group flex w-full items-center gap-4 rounded-lg border border-border/50 bg-card/50 p-4 text-left transition-all hover:border-accent/30 hover:bg-card md:p-6',
                  'transform transition-all duration-300',
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                )}
                style={{
                  transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                }}
                data-cursor="Enter"
              >
                <span className="font-mono text-sm text-accent">{world.number}</span>
                <span className="flex-1 text-lg font-medium transition-colors group-hover:text-accent md:text-xl">
                  {world.title}
                </span>
                <span className="text-sm text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  Enter
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
