'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { DNAChain } from '@/components/dna-chain'
import { WorldSection } from '@/components/world-section'
import { ProgressIndicator } from '@/components/progress-indicator'
import { usePortal } from '@/components/portal-overlay'
import { useLenis } from '@/components/lenis-provider'

interface CaseStudy {
  id: string
  title: string
  category: string
  outcome: string
}

interface World {
  id: string
  number: string
  title: string
  outcome: string
  caseStudies: CaseStudy[]
}

interface WorkWorldsClientProps {
  worlds: World[]
}

export function WorkWorldsClient({ worlds }: WorkWorldsClientProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const { triggerPortal } = usePortal()
  const { scrollTo } = useLenis()

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight

      // Find which section is most visible
      let closestIndex = 0
      let closestDistance = Infinity

      sectionRefs.current.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect()
          const sectionCenter = rect.top + rect.height / 2
          const viewportCenter = viewportHeight / 2
          const distance = Math.abs(sectionCenter - viewportCenter)

          if (distance < closestDistance) {
            closestDistance = distance
            closestIndex = index
          }
        }
      })

      setActiveIndex(closestIndex)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle DNA node click with portal transition
  const handleNodeClick = useCallback(
    (index: number) => {
      const section = sectionRefs.current[index]
      if (section) {
        triggerPortal(() => {
          scrollTo(section, { offset: -100, duration: 0.5 })
          setActiveIndex(index)
        })
      }
    },
    [triggerPortal, scrollTo]
  )

  return (
    <div ref={containerRef} className="relative">
      {/* Page header */}
      <div className="flex min-h-[40vh] items-end px-4 pb-16 pt-32 md:px-8 lg:pl-32">
        <div className="mx-auto w-full max-w-6xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Case Studies
          </p>
          <h1 className="max-w-4xl font-serif text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">
            Work That Speaks for Itself
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Explore our case studies across six categories. Each world represents a distinct discipline where we deliver premium creative output.
          </p>
        </div>
      </div>

      {/* DNA Chain navigation */}
      <DNAChain
        worlds={worlds.map((w) => ({ id: w.id, number: w.number, title: w.title }))}
        activeIndex={activeIndex}
        onNodeClick={handleNodeClick}
      />

      {/* Progress indicator */}
      <ProgressIndicator current={activeIndex + 1} total={worlds.length} />

      {/* Soft snap scroll container */}
      <div className="snap-y snap-proximity">
        {worlds.map((world, index) => (
          <WorldSection
            key={world.id}
            ref={(el) => {
              sectionRefs.current[index] = el
            }}
            {...world}
            isActive={index === activeIndex}
          />
        ))}
      </div>
    </div>
  )
}
