'use client'

import { forwardRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

interface CaseStudyTile {
  id: string
  slug: string
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
}

const worldGradients: Record<string, string> = {
  'music-release-systems': 'from-fuchsia-500/10 via-background to-background',
  'motion-social-ads': 'from-cyan-400/10 via-background to-background',
  commercials: 'from-amber-400/10 via-background to-background',
  'pitch-deck-architecture': 'from-violet-500/10 via-background to-background',
  'websites-mvp-platforms': 'from-emerald-400/10 via-background to-background',
  'institutional-investor-systems': 'from-sky-400/10 via-background to-background',
}

const posterDataUri =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23111111"/><stop offset="100%" stop-color="%23222222"/></linearGradient></defs><rect width="800" height="600" fill="url(%23g)"/></svg>'

export const WorldSection = forwardRef<HTMLElement, WorldSectionProps>(
  ({ id, number, title, outcome, caseStudies, isActive }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        data-world={id}
        className="relative flex min-h-screen snap-start flex-col justify-center overflow-hidden px-4 py-24 md:px-8 lg:pl-32"
      >
        <div
          className={cn(
            'pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent opacity-0 transition-opacity duration-700',
            isActive && 'opacity-100'
          )}
          aria-hidden="true"
        />
        <div
          className={cn(
            'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-700',
            worldGradients[id] ?? 'from-accent/5 via-background to-background',
            isActive && 'opacity-100'
          )}
          aria-hidden="true"
        />

        <div
          className={cn(
            'relative mx-auto max-w-6xl transition-all duration-700',
            isActive ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-80'
          )}
        >
          <div className="mb-8 flex items-center gap-4">
            <span className="font-mono text-sm text-accent">{number}</span>
            <div className="h-px flex-1 max-w-16 bg-border" />
          </div>

          <h2 className="mb-6 max-w-3xl font-serif text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">
            {title}
          </h2>

          <p className="mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {outcome}
          </p>

          <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:max-w-5xl lg:grid-cols-3 xl:grid-cols-4">
            {caseStudies.map((caseStudy) => (
              <Link
                key={caseStudy.id}
                href={`/work/${caseStudy.slug}`}
                className="group relative overflow-hidden rounded-lg border border-border/50 bg-card/50 p-5 transition-all duration-300 hover:border-accent/30 hover:bg-card"
              >
                <img
                  src={posterDataUri}
                  alt=""
                  className="mb-4 aspect-[4/3] w-full rounded object-cover opacity-75"
                  loading="lazy"
                  decoding="async"
                  aria-hidden="true"
                />

                <span className="mb-2 inline-block rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                  {caseStudy.category}
                </span>

                <h3 className="mb-2 text-base font-medium leading-snug transition-colors group-hover:text-accent">
                  {caseStudy.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {caseStudy.outcome}
                </p>

                <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
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
