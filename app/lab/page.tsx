import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Globe, Layers } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Lab',
  description:
    'The ipxs.digital product lab. Custom GPT builds, AI-powered web products, and suite-based tools.',
}

const labSections = [
  {
    id: 'gpts',
    title: 'Custom GPT Builds',
    description:
      'Purpose-built AI assistants designed for specific creative and business workflows. From pitch deck architects to campaign strategists.',
    icon: Sparkles,
    status: 'Active',
    items: [
      'Pitch Deck Architect: Structures investor narratives',
      'Campaign Planner: Maps rollout strategies',
      'Copy Director: Brand voice and messaging',
      'Visual Strategist: Art direction guidance',
    ],
  },
  {
    id: 'products',
    title: 'AI-Powered Web Products',
    description:
      'Functional tools and platforms built on modern AI infrastructure. Solving real problems for creative professionals and teams.',
    icon: Globe,
    status: 'In Development',
    items: [
      'Release Kit Generator: Instant visual systems',
      'Deck Builder: Structured presentation tool',
      'Asset Manager: AI-organized media library',
      'Brief Analyzer: Project scoping assistant',
    ],
  },
  {
    id: 'suite',
    title: 'Suite-Based Roadmap',
    description:
      'A unified product ecosystem connecting our tools into cohesive workflows. One login, one system, complete creative coverage.',
    icon: Layers,
    status: 'Coming Soon',
    items: [
      'Unified dashboard across all tools',
      'Team collaboration features',
      'Client portal integration',
      'API access for custom workflows',
    ],
  },
]

export default function LabPage() {
  return (
    <div className="flex flex-col pt-24">
      {/* Header */}
      <section className="border-b border-border/50 pb-16 pt-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            The Lab
          </p>
          <h1 className="max-w-3xl font-serif text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">
            Product Studio
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Beyond client work, ipxs.digital operates as a product studio, building tools, 
            platforms, and AI-powered systems that solve problems for creative professionals.
          </p>
        </div>
      </section>

      {/* Lab Sections */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col gap-16">
            {labSections.map((section, index) => (
              <article
                key={section.id}
                className="grid gap-8 border-b border-border/50 pb-16 last:border-b-0 lg:grid-cols-2 lg:gap-16"
              >
                {/* Left column */}
                <div className="flex flex-col">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-secondary">
                      <section.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                      {section.status}
                    </span>
                  </div>
                  <span className="mb-2 font-mono text-xs text-muted-foreground/50">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="mb-4 font-serif text-2xl font-medium md:text-3xl">
                    {section.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    {section.description}
                  </p>
                </div>

                {/* Right column - Items */}
                <div className="flex flex-col gap-4 lg:pt-20">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-start gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:border-muted-foreground/30"
                    >
                      <span className="font-mono text-xs text-muted-foreground/50">
                        {String(itemIndex + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/50 bg-secondary/30 py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h2 className="max-w-2xl font-serif text-3xl font-medium leading-tight md:text-4xl">
              Interested in early access?
            </h2>
            <p className="mt-4 max-w-lg text-base text-muted-foreground">
              We&apos;re selectively opening access to lab products. Get in touch to learn more 
              or request a demo.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/contact">
                  Request Access
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
