import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ExternalLink, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Placeholder case study data structure for future use
const placeholderCaseStudy = {
  title: 'Case Study Title',
  category: 'Category',
  outcome: 'One line outcome that summarizes the impact and results of this project.',
  heroImage: null,
  deliverables: [
    'Cover Art',
    'Motion Assets',
    'Social Templates',
    'Visualizer',
    'Rollout Kit',
  ],
  pipeline: [
    { phase: 'Brief', description: 'Initial discovery and creative brief development.' },
    { phase: 'Strategy', description: 'Strategic direction and concept development.' },
    { phase: 'Production', description: 'Design execution and asset creation.' },
    { phase: 'Delivery', description: 'Final assets and format specifications.' },
    { phase: 'Distribution', description: 'Platform optimization and rollout support.' },
  ],
  proofLinks: [
    { label: 'Spotify', url: '#' },
    { label: 'Apple Music', url: '#' },
    { label: 'YouTube', url: '#' },
  ],
  media: [
    { type: 'image', src: null, caption: 'Cover artwork' },
    { type: 'image', src: null, caption: 'Social assets' },
    { type: 'image', src: null, caption: 'Motion stills' },
    { type: 'video', src: null, caption: 'Visualizer preview' },
  ],
  credits: {
    studio: 'ipxs.digital',
    lead: 'Darion R. Harris (LightGod)',
  },
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const title = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title: `${title} | Case Studies`,
    description: placeholderCaseStudy.outcome,
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const caseStudy = {
    ...placeholderCaseStudy,
    title: slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
  }

  return (
    <article className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[75vh] items-end overflow-hidden">
        {/* Layered background */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 via-background/80 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,200,100,0.08),transparent)]" />

        {/* Hero image placeholder */}
        <div className="absolute inset-0 bg-muted/10" />

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-40 lg:px-8">
          {/* Back link */}
          <Link
            href="/work"
            className="group mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Case Studies
          </Link>

          {/* Category tag */}
          <span className="mb-5 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-accent">
            {caseStudy.category}
          </span>

          {/* Title */}
          <h1 className="mb-6 max-w-4xl font-serif text-4xl font-medium leading-[1.1] md:text-5xl lg:text-6xl xl:text-7xl">
            {caseStudy.title}
          </h1>

          {/* Outcome */}
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {caseStudy.outcome}
          </p>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="border-t border-border/30 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
                Deliverables
              </p>
              <h2 className="font-serif text-3xl font-medium md:text-4xl">
                What We Built
              </h2>
            </div>

            <div className="lg:col-span-8">
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {caseStudy.deliverables.map((item, index) => (
                  <li
                    key={index}
                    className="group flex items-center gap-4 rounded-lg border border-border/30 bg-card/30 px-5 py-4 transition-all duration-300 hover:border-accent/30 hover:bg-card/50"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 font-mono text-xs font-medium text-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pipeline Section */}
      <section className="border-t border-border/30 bg-secondary/20 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-14">
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
              Pipeline
            </p>
            <h2 className="font-serif text-3xl font-medium md:text-4xl">
              How We Got There
            </h2>
          </div>

          {/* Pipeline steps */}
          <div className="relative grid gap-4 md:grid-cols-5">
            {/* Connecting line (desktop) */}
            <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-border/50 to-transparent md:block" />

            {caseStudy.pipeline.map((step, index) => (
              <div
                key={step.phase}
                className="group relative flex flex-col rounded-xl border border-border/30 bg-card/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:bg-card/60"
              >
                {/* Step number */}
                <div className="relative mb-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-mono text-sm font-medium text-accent transition-all duration-300 group-hover:border-accent/50 group-hover:shadow-[0_0_20px_rgba(255,200,100,0.2)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="mb-2 text-base font-medium">{step.phase}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Section */}
      <section className="border-t border-border/30 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-14">
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
              Work
            </p>
            <h2 className="font-serif text-3xl font-medium md:text-4xl">
              The Output
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {caseStudy.media.map((item, index) => (
              <div
                key={index}
                className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-border/30 bg-muted/20 transition-all duration-500 hover:border-accent/30 hover:shadow-[0_0_40px_rgba(255,200,100,0.05)]"
              >
                {/* Placeholder for actual media */}
                <div className="flex h-full items-center justify-center">
                  {item.type === 'video' ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-accent/10 transition-all duration-300 group-hover:scale-110 group-hover:border-accent/50 group-hover:shadow-[0_0_30px_rgba(255,200,100,0.3)]">
                        <Play className="ml-1 h-6 w-6 text-accent" />
                      </div>
                      <span className="text-xs text-muted-foreground">Click to Play</span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Image Placeholder</span>
                  )}
                </div>

                {/* Hover overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof Links Section */}
      <section className="border-t border-border/30 bg-secondary/20 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
                Live
              </p>
              <h2 className="font-serif text-3xl font-medium md:text-4xl">
                See It in the Wild
              </h2>
            </div>

            <div className="flex items-center lg:col-span-8">
              <div className="flex flex-wrap gap-3">
                {caseStudy.proofLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/5 px-6 py-3 text-sm font-medium transition-all duration-300 hover:border-accent/60 hover:bg-accent/10 hover:shadow-[0_0_20px_rgba(255,200,100,0.15)]"
                  >
                    <span className="text-foreground">{link.label}</span>
                    <ExternalLink className="h-3.5 w-3.5 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credits Section */}
      <section className="border-t border-border/30 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
                Credits
              </p>
              <h2 className="font-serif text-3xl font-medium md:text-4xl">
                Powered By
              </h2>
            </div>

            <div className="lg:col-span-8">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-5 border-l-2 border-accent pl-5">
                  <span className="min-w-[100px] text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Studio
                  </span>
                  <span className="text-base font-medium">{caseStudy.credits.studio}</span>
                </div>
                <div className="flex items-center gap-5 border-l-2 border-border/50 pl-5">
                  <span className="min-w-[100px] text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Creative Lead
                  </span>
                  <span className="text-base font-medium">{caseStudy.credits.lead}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Powered by credit line */}
      <section className="border-t border-border/30 py-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-border/50" />
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground/60">
              Powered by ipxs.digital
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-border/50" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/30 bg-secondary/20 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
              Next Step
            </p>
            <h2 className="mb-8 max-w-2xl font-serif text-3xl font-medium md:text-4xl lg:text-5xl">
              Ready to build something like this?
            </h2>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-10">
                <Link href="/contact">
                  Start a Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-border/50 px-10">
                <Link href="/work">View More Case Studies</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
