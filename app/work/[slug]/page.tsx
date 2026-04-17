import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Placeholder case study data structure for future use
const placeholderCaseStudy = {
  title: 'Case Study Title',
  category: 'Category',
  outcome: 'One line outcome that summarizes the impact and results of this project.',
  heroImage: null, // Placeholder for hero image
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
  // In production, fetch actual case study data based on slug
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
  // In production, fetch actual case study data based on slug
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
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        {/* Background placeholder */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-background to-background" />
        
        {/* Hero image placeholder */}
        <div className="absolute inset-0 bg-muted/20" />

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-32 lg:px-8">
          {/* Back link */}
          <Link
            href="/work"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Case Studies
          </Link>

          {/* Category tag */}
          <span className="mb-4 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            {caseStudy.category}
          </span>

          {/* Title */}
          <h1 className="mb-6 max-w-4xl font-serif text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">
            {caseStudy.title}
          </h1>

          {/* Outcome */}
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {caseStudy.outcome}
          </p>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="border-t border-border/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Deliverables
              </p>
              <h2 className="font-serif text-2xl font-medium md:text-3xl">
                What We Built
              </h2>
            </div>

            <div className="lg:col-span-2">
              <ul className="grid gap-3 sm:grid-cols-2">
                {caseStudy.deliverables.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/50 px-4 py-3"
                  >
                    <span className="font-mono text-xs text-accent">
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
      <section className="border-t border-border/50 bg-secondary/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Pipeline
            </p>
            <h2 className="font-serif text-2xl font-medium md:text-3xl">
              How We Got There
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            {caseStudy.pipeline.map((step, index) => (
              <div
                key={step.phase}
                className="relative flex flex-col gap-4 rounded-lg border border-border/50 bg-card/50 p-5"
              >
                {/* Connector line (hidden on last item) */}
                {index < caseStudy.pipeline.length - 1 && (
                  <div className="absolute -right-2 top-1/2 hidden h-px w-4 bg-border/50 md:block" />
                )}
                
                <span className="font-mono text-xs text-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="mb-2 font-medium">{step.phase}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Section */}
      <section className="border-t border-border/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Work
            </p>
            <h2 className="font-serif text-2xl font-medium md:text-3xl">
              The Output
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {caseStudy.media.map((item, index) => (
              <div
                key={index}
                className="group relative aspect-video overflow-hidden rounded-lg border border-border/50 bg-muted/50"
              >
                {/* Placeholder for actual media */}
                <div className="flex h-full items-center justify-center">
                  <span className="text-sm text-muted-foreground">
                    {item.type === 'video' ? 'Video' : 'Image'} Placeholder
                  </span>
                </div>
                
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                  <p className="text-sm text-muted-foreground">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof Links Section */}
      <section className="border-t border-border/50 bg-secondary/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Live
              </p>
              <h2 className="font-serif text-2xl font-medium md:text-3xl">
                See It in the Wild
              </h2>
            </div>

            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-3">
                {caseStudy.proofLinks.map((link, index) => (
                  <a
                    key={index}
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
          </div>
        </div>
      </section>

      {/* Credits Section */}
      <section className="border-t border-border/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Credits
              </p>
              <h2 className="font-serif text-2xl font-medium md:text-3xl">
                Powered By
              </h2>
            </div>

            <div className="lg:col-span-2">
              <div className="flex flex-col gap-4">
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

      {/* CTA Section */}
      <section className="border-t border-border/50 bg-secondary/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h2 className="mb-6 max-w-2xl font-serif text-2xl font-medium md:text-3xl lg:text-4xl">
              Ready to build something like this?
            </h2>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
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
