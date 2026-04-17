'use client'

import { forwardRef, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

interface CaseStudyTile {
  id: string
  title: string
  category: string
  outcome: string
}

interface WorldSectionProps {
  id: string
  number: string
  title: string
  outcome: string
  caseStudies: CaseStudyTile[]
  isActive?: boolean
  worldIndex?: number
}

// Unique gradient configs per world for distinct visual identity
const worldGradients = [
  { from: 'from-amber-500/[0.03]', via: 'via-orange-500/[0.02]', hue: 'amber' },
  { from: 'from-cyan-500/[0.03]', via: 'via-blue-500/[0.02]', hue: 'cyan' },
  { from: 'from-violet-500/[0.03]', via: 'via-purple-500/[0.02]', hue: 'violet' },
  { from: 'from-emerald-500/[0.03]', via: 'via-teal-500/[0.02]', hue: 'emerald' },
  { from: 'from-rose-500/[0.03]', via: 'via-pink-500/[0.02]', hue: 'rose' },
  { from: 'from-sky-500/[0.03]', via: 'via-indigo-500/[0.02]', hue: 'sky' },
]

export const WorldSection = forwardRef<HTMLElement, WorldSectionProps>(
  ({ id, number, title, outcome, caseStudies, isActive, worldIndex = 0 }, ref) => {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLElement | null>(null)
    const gradient = worldGradients[worldIndex % worldGradients.length]

    // Combine refs
    const setRefs = (el: HTMLElement | null) => {
      sectionRef.current = el
      if (typeof ref === 'function') {
        ref(el)
      } else if (ref) {
        ref.current = el
      }
    }

    // Intersection observer for entrance animations
    useEffect(() => {
      const el = sectionRef.current
      if (!el) return

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) {
        setIsVisible(true)
        return
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        },
        { threshold: 0.2 }
      )

      observer.observe(el)
      return () => observer.disconnect()
    }, [])

    return (
      <section
        ref={setRefs}
        id={id}
        data-world={id}
        className="relative flex min-h-screen snap-start flex-col justify-center px-4 py-24 md:px-8 lg:pl-32"
      >
        {/* World-specific background gradient */}
        <div
          className={cn(
            'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-1000',
            gradient.from,
            gradient.via,
            'to-transparent',
            isActive && 'opacity-100'
          )}
          aria-hidden="true"
        />

        {/* Subtle radial glow on active */}
        <div
          className={cn(
            'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700',
            isActive && 'opacity-100'
          )}
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,200,100,0.02) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl">
          {/* World number with enhanced treatment */}
          <div
            className={cn(
              'mb-8 flex items-center gap-4 opacity-0 transition-all duration-700',
              isVisible && 'translate-y-0 opacity-100',
              !isVisible && 'translate-y-4'
            )}
            style={{ transitionDelay: '100ms' }}
          >
            <span className="relative font-mono text-sm text-accent">
              {number}
              <span
                className={cn(
                  'absolute -inset-2 rounded-full bg-accent/10 opacity-0 blur-sm transition-opacity duration-500',
                  isActive && 'opacity-100'
                )}
              />
            </span>
            <div className="h-px flex-1 max-w-20 bg-gradient-to-r from-border to-transparent" />
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground/60">
              World
            </span>
          </div>

          {/* Title with staggered entrance */}
          <h2
            className={cn(
              'mb-6 max-w-3xl font-serif text-4xl font-medium leading-tight opacity-0 transition-all duration-700 md:text-5xl lg:text-6xl',
              isVisible && 'translate-y-0 opacity-100',
              !isVisible && 'translate-y-6'
            )}
            style={{ transitionDelay: '200ms' }}
          >
            {title}
          </h2>

          {/* Outcome statement */}
          <p
            className={cn(
              'mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground opacity-0 transition-all duration-700 md:text-xl',
              isVisible && 'translate-y-0 opacity-100',
              !isVisible && 'translate-y-6'
            )}
            style={{ transitionDelay: '300ms' }}
          >
            {outcome}
          </p>

          {/* Case Study tiles with staggered entrance */}
          <div
            className={cn(
              'mb-12 grid gap-4 opacity-0 transition-all duration-700 sm:grid-cols-2 lg:max-w-5xl lg:grid-cols-3 xl:grid-cols-4',
              isVisible && 'translate-y-0 opacity-100',
              !isVisible && 'translate-y-8'
            )}
            style={{ transitionDelay: '400ms' }}
          >
            {caseStudies.map((caseStudy, idx) => (
              <Link
                key={caseStudy.id}
                href={`/work/${caseStudy.id}`}
                className="group relative overflow-hidden rounded-lg border border-border/40 bg-card/30 p-5 backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:bg-card/60 hover:shadow-[0_0_30px_rgba(255,200,100,0.05)]"
                data-cursor="Enter"
                style={{ transitionDelay: `${450 + idx * 50}ms` }}
              >
                {/* Shimmer effect on hover */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
                </div>

                {/* Placeholder image area */}
                <div className="mb-4 aspect-[4/3] w-full overflow-hidden rounded bg-muted/30">
                  <div className="h-full w-full bg-gradient-to-br from-muted/50 to-muted/20 transition-transform duration-500 group-hover:scale-105" />
                </div>

                {/* Category tag */}
                <span className="mb-2 inline-block rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent">
                  {caseStudy.category}
                </span>

                <h3 className="mb-2 text-base font-medium leading-snug transition-colors group-hover:text-accent">
                  {caseStudy.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {caseStudy.outcome}
                </p>

                {/* CTA */}
                <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  <span>View Case Study</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    )
  }
)

WorldSection.displayName = 'WorldSection'
