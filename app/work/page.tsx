import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { caseStudies } from '@/content/case-studies'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Explore case studies spanning release systems, motion campaigns, commercials, pitch deck architecture, digital platforms, and world building.',
}

export default function WorkPage() {
  return (
    <div className="flex flex-col">
      {/* Hero with Character Motion Sheet */}
      <section className="relative min-h-[50vh] overflow-hidden pt-24">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover object-top"
        >
          <source src="/media/case-studies/character-motion-sheet.mov" type="video/quicktime" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-32 lg:px-8">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Case Studies
          </p>
          <h1 className="max-w-4xl font-serif page-header-title font-medium gradient-text-neon">
            Work That Ships and Wins
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Every case study represents a real engagement with measurable outcomes. From release systems that drive streams to decks that close funding rounds, this is the work.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <Link
                key={study.id}
                href={`/work/${study.slug}`}
                className="group sheen-hover gradient-border neon-glow-hover relative flex flex-col overflow-hidden rounded-lg bg-card/90 transition-all duration-300 hover:bg-secondary/55"
              >
                {/* Cover Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                  <Image
                    src={study.cover}
                    alt={study.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <Badge
                    variant="secondary"
                    className="w-fit text-xs font-normal uppercase tracking-wider"
                  >
                    {study.category}
                  </Badge>
                  <h3 className="font-serif text-lg font-medium leading-snug text-foreground">
                    {study.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {study.outcomeLine}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                    View Case Study
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h2 className="max-w-2xl font-serif text-3xl font-medium leading-tight md:text-4xl">
              Ready to build something that ships?
            </h2>
            <p className="mt-4 max-w-lg text-base text-muted-foreground">
              Every project starts with a conversation about goals, timelines, and what success looks like for you.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="gradient-border neon-glow-hover sheen-hover rounded-full px-8 text-foreground">
                <Link href="/contact">
                  Start a Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="neon-glow-hover sheen-hover rounded-full px-8">
                <Link href="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
