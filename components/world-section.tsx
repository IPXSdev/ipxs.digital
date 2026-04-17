'use client'

import { forwardRef } from 'react'
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
}

export const WorldSection = forwardRef<HTMLElement, WorldSectionProps>(
  ({ id, number, title, outcome, caseStudies, isActive }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        data-world={id}
        className="relative flex min-h-screen snap-start flex-col justify-center px-4 py-24 md:px-8 lg:pl-32"
      >
        {/* Background gradient */}
        <div
          className={cn(
            'pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent opacity-0 transition-opacity duration-700',
            isActive && 'opacity-100'
          )}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl">
          {/* World number */}
          <div className="mb-8 flex items-center gap-4">
            <span className="font-mono text-sm text-accent">{number}</span>
            <div className="h-px flex-1 max-w-16 bg-border" />
          </div>

          {/* Title */}
          <h2 className="mb-6 max-w-3xl font-serif text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">
            {title}
          </h2>

          {/* Outcome statement */}
          <p className="mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {outcome}
          </p>

          {/* Case Study tiles */}
          <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:max-w-5xl lg:grid-cols-3 xl:grid-cols-4">
            {caseStudies.map((caseStudy) => (
              <Link
                key={caseStudy.id}
                href={`/work/${caseStudy.id}`}
                className="group relative overflow-hidden rounded-lg border border-border/50 bg-card/50 p-5 transition-all duration-300 hover:border-accent/30 hover:bg-card"
                data-cursor="Enter"
              >
                {/* Placeholder image area */}
                <div className="mb-4 aspect-[4/3] w-full rounded bg-muted/50" />
                
                {/* Category tag */}
                <span className="mb-2 inline-block rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                  {caseStudy.category}
                </span>
                
                <h3 className="mb-2 text-base font-medium leading-snug transition-colors group-hover:text-accent">
                  {caseStudy.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {caseStudy.outcome}
                </p>

                {/* CTA */}
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
