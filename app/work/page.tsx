import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { caseStudies, caseStudyCategories } from '@/content/case-studies'
import { CaseStudyCard } from '@/components/case-study-card'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MotionVideoFallback } from '@/components/motion-video-fallback'

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Explore case studies spanning release systems, motion campaigns, commercials, pitch deck architecture, digital platforms, and world building.',
}

interface WorkPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const params = await searchParams
  const activeCategory = params.category ?? 'All'
  const filteredStudies =
    activeCategory === 'All'
      ? caseStudies
      : caseStudies.filter((study) => study.category === activeCategory)

  return (
    <div className="flex flex-col pt-24">
      <section className="pb-14 pt-8">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:items-end lg:px-8">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Case Studies</p>
            <h1 className="max-w-4xl font-serif page-header-title font-medium gradient-text-neon">Execution You Can Audit</h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              This is production work shipped for real teams, real timelines, and real outcomes.
              Each case study details the brief, the build, and the assets delivered to market.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border/50 bg-black">
            <MotionVideoFallback
              src="/case-studies/charlibereal-deathrow-campaign/chocolate-woman-motion.mp4"
              poster="/case-studies/charlibereal-deathrow-campaign/charlibereal-character-sheet.png"
              alt="Character Sheet poster fallback"
              objectClassName="object-cover object-top"
              priority
            />
          </div>
        </div>
      </section>

      <section className="section-fade py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-8 flex flex-wrap gap-2">
            {['All', ...caseStudyCategories].map((category) => {
              const isActive = category === activeCategory
              const href = category === 'All' ? '/work' : `/work?category=${encodeURIComponent(category)}`
              return (
                <Link
                  key={category}
                  href={href}
                  className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors ${
                    isActive
                      ? 'bg-foreground text-background'
                      : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {category}
                </Link>
              )
            })}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredStudies.map((study) => (
              <CaseStudyCard
                key={study.id}
                title={study.title}
                category={study.category}
                outcome={study.outcomeLine}
                href={`/work/${study.slug}`}
                cover={study.cover}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-fade bg-secondary/30 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h2 className="max-w-2xl font-serif text-3xl font-medium leading-tight md:text-4xl">Ready to build the next one?</h2>
            <p className="mt-4 max-w-lg text-base text-muted-foreground">
              We scope each engagement around your launch window, audience, and commercial goals.
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
