'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { DNAChain } from '@/components/dna-chain'
import { WorldSection } from '@/components/world-section'
import { ProgressIndicator } from '@/components/progress-indicator'
import { usePortal } from '@/components/portal-overlay'
import { useLenis } from '@/components/lenis-provider'
import type { getWorldsWithCaseStudies } from '@/content/case-studies'

interface WorkWorldsClientProps {
  worlds: ReturnType<typeof getWorldsWithCaseStudies>
}

export function WorkWorldsClient({ worlds }: WorkWorldsClientProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const { triggerPortal } = usePortal()
  const { scrollTo } = useLenis()

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches)

    updateMotionPreference()
    mediaQuery.addEventListener('change', updateMotionPreference)

    return () => mediaQuery.removeEventListener('change', updateMotionPreference)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight
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
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNodeClick = useCallback(
    (index: number) => {
      const section = sectionRefs.current[index]
      if (!section) return

      if (prefersReducedMotion) {
        scrollTo(section, { offset: -100, duration: 0 })
        setActiveIndex(index)
        return
      }

      triggerPortal(() => {
        scrollTo(section, { offset: -100, duration: 0.5 })
        setActiveIndex(index)
      })
    },
    [prefersReducedMotion, scrollTo, triggerPortal]
  )

  return (
    <div ref={containerRef} className="relative">
      <div className="flex min-h-[40vh] items-end px-4 pb-16 pt-32 md:px-8 lg:pl-32">
        <div className="mx-auto w-full max-w-6xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Case Studies
          </p>
          <h1 className="max-w-4xl font-serif text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">
            Six Worlds, One Standard
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Scroll through six case study worlds. Each world maps to a core ipxs.digital discipline and opens into detailed execution records.
          </p>
        </div>
      </div>

      <DNAChain
        worlds={worlds.map((w) => ({ id: w.id, number: w.number, title: w.title }))}
        activeIndex={activeIndex}
        onNodeClick={handleNodeClick}
      />

      <ProgressIndicator current={activeIndex + 1} total={worlds.length} />

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
