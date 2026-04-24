import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  caseStudies,
  getCaseStudyBySlug,
} from '@/content/case-studies'
import { CaseStudyMediaView } from '@/components/work/case-study-media'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({ slug: caseStudy.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found | Case Studies',
      description: 'The requested case study does not exist.',
    }
  }

  return {
    title: `${caseStudy.title} | Case Studies`,
    description: caseStudy.outcomeLine,
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  if (!caseStudy) {
    notFound()
  }

  return (
    <article className="flex flex-col">
      <section className="relative overflow-hidden">
        {/* Hero Image */}
        <div className="relative h-[50vh] min-h-[400px] w-full">
          <Image
            src={caseStudy.cover}
            alt={caseStudy.title}
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 -mt-32 lg:px-8">
          <Link
            href="/work"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Case Studies
          </Link>

          <span className="mb-4 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            {caseStudy.category}
          </span>

          <h1 className="mb-4 max-w-4xl font-serif text-3xl font-medium gradient-text-neon md:text-4xl lg:text-5xl">
            {caseStudy.title}
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {caseStudy.outcomeLine}
          </p>
        </div>
      </section>

      <section className="section-fade py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Deliverables */}
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Deliverables
              </p>
              <h2 className="mb-6 font-serif text-xl font-medium md:text-2xl">What We Built</h2>
              <ul className="grid gap-2">
                {caseStudy.deliverables.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/50 px-4 py-2.5"
                  >
                    <span className="font-mono text-xs text-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pipeline */}
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Pipeline
              </p>
              <h2 className="mb-6 font-serif text-xl font-medium md:text-2xl">How We Got There</h2>
              <div className="grid gap-2">
                {caseStudy.pipelineSteps.map((step, index) => (
                  <div
                    key={step.phase}
                    className="flex items-start gap-3 rounded-lg border border-border/50 bg-card/50 px-4 py-2.5"
                  >
                    <span className="font-mono text-xs text-accent pt-0.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <span className="text-sm font-medium">{step.phase}</span>
                      <span className="mx-2 text-muted-foreground/50">·</span>
                      <span className="text-sm text-muted-foreground">{step.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-fade py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-8">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Case Study Media
            </p>
            <h2 className="font-serif text-xl font-medium md:text-2xl">The Output</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {caseStudy.media.map((item) => (
              <div key={item.id}>
                <CaseStudyMediaView item={item} />
                <p className="mt-2 text-sm text-muted-foreground">{item.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-fade bg-secondary/30 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Links */}
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Live</p>
              <h2 className="mb-6 font-serif text-xl font-medium md:text-2xl">See It in the Wild</h2>
              <div className="flex flex-wrap gap-3">
                {caseStudy.proofLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-all hover:border-accent/50 hover:bg-accent/10"
                  >
                    {link.label}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Credits */}
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Credits
              </p>
              <h2 className="mb-6 font-serif text-xl font-medium md:text-2xl">Powered By</h2>
              <div className="flex flex-col gap-3">
                <div className="flex items-baseline gap-4 border-l-2 border-accent pl-4">
                  <span className="text-sm text-muted-foreground">Studio</span>
                  <span className="font-medium">{caseStudy.credits.studio}</span>
                </div>
                <div className="flex items-baseline gap-4 border-l-2 border-border pl-4">
                  <span className="text-sm text-muted-foreground">Creative Lead</span>
                  <span className="font-medium">{caseStudy.credits.lead}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-fade py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h2 className="mb-5 max-w-2xl font-serif text-xl font-medium md:text-2xl">
              Ready to build something like this?
            </h2>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/contact">
                  Start a Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href="/work">View More Case Studies</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
