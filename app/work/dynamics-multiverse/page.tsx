import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Sparkles, Layers, Users, Eye, Target, Zap, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { caseStudies } from '@/content/case-studies'

const caseStudy = caseStudies.find(cs => cs.slug === 'dynamics-multiverse')!

export const metadata: Metadata = {
  title: `${caseStudy.title} | ${caseStudy.category} | IPXS.digital`,
  description: caseStudy.outcomeLine,
}

const methodSteps = [
  {
    icon: Target,
    title: 'Discovery and Tone Alignment',
    description: 'Define the promise of the world. Establish the creative boundaries early so every asset feels like it belongs.',
  },
  {
    icon: Layers,
    title: 'Canon Backbone',
    description: 'Origin, rules, and constraints. What is possible and what is not. Constraints create consistency. Consistency creates trust.',
  },
  {
    icon: Users,
    title: 'Faction Architecture',
    description: 'Character archetypes with motivations, flaws, visual signatures, and role definitions that make spin-offs possible.',
  },
  {
    icon: Eye,
    title: 'Conflict Mapping',
    description: 'Story engines and episodic scalability. The narrative structure that supports multiple releases without losing coherence.',
  },
  {
    icon: Zap,
    title: 'Franchise Blueprint',
    description: 'How the world expands across formats. Decks, scripts, production planning, and release strategy.',
  },
  {
    icon: Wrench,
    title: 'Packaging',
    description: 'Editing and presentation for future pitches and production teams. Business-readable structure with expansion opportunities.',
  },
]

export default function DynamicsMultiversePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative h-[50vh] min-h-[400px] w-full">
          <Image
            src={caseStudy.cover}
            alt={caseStudy.title}
            fill
            className="object-cover"
            priority
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
            {caseStudy.heroTagline}
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-6 font-serif text-2xl font-medium text-foreground md:text-3xl">The Problem</h2>
              <p className="text-muted-foreground leading-relaxed">
                {caseStudy.problem}
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">Deliverables</h3>
              <ul className="space-y-3">
                {caseStudy.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Sparkles className="mt-1 h-4 w-4 flex-shrink-0 text-accent" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Approach */}
      <section className="border-t border-border/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-8 font-serif text-2xl font-medium text-foreground md:text-3xl">The Approach</h2>
          <p className="mb-8 max-w-3xl text-muted-foreground leading-relaxed">
            {caseStudy.approach}
          </p>
        </div>
      </section>

      {/* The Solution */}
      <section className="border-t border-border/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-8 font-serif text-2xl font-medium text-foreground md:text-3xl">The Solution</h2>
          <p className="mb-8 max-w-3xl text-muted-foreground leading-relaxed">
            {caseStudy.solution}
          </p>
        </div>
      </section>

      {/* Visual System */}
      <section className="border-t border-border/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-8 font-serif text-2xl font-medium text-foreground md:text-3xl">Visual System</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudy.media.map((item, index) => (
              <div key={item.id} className="group overflow-hidden rounded-lg border border-border/50">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {item.caption && (
                  <div className="bg-card/80 p-3">
                    <p className="text-xs text-muted-foreground">{item.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="border-t border-border/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-12 font-serif text-2xl font-medium text-foreground md:text-3xl">The Pipeline</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {methodSteps.map((step, index) => (
              <div key={step.title} className="rounded-xl border border-border/50 bg-card/50 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                    <step.icon className="h-5 w-5 text-accent" />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Step {index + 1}</span>
                </div>
                <h3 className="mb-2 text-lg font-medium text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      {caseStudy.tools && (
        <section className="border-t border-border/50 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="mb-8 font-serif text-2xl font-medium text-foreground md:text-3xl">Tools Used</h2>
            <div className="flex flex-wrap gap-3">
              {caseStudy.tools.map((tool) => (
                <span key={tool} className="rounded-full border border-border/50 bg-card/50 px-4 py-2 text-sm text-foreground">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {caseStudy.results && (
        <section className="border-t border-border/50 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="mb-8 font-serif text-2xl font-medium text-foreground md:text-3xl">Results</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {caseStudy.results.map((result) => (
                <div key={result} className="flex items-start gap-3 rounded-lg border border-border/50 bg-card/50 p-4">
                  <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                  <p className="text-foreground">{result}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="border-t border-border/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 font-serif text-2xl font-medium text-foreground md:text-3xl">Full Deck Walkthrough</h2>
            <p className="mb-8 text-muted-foreground">
              The complete world-building deck is shared upon request.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link href="/contact?subject=World%20Building%20Walkthrough">
                  Book a Discovery Call
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact?subject=Request%20Dynamics%20Multiverse%20PDF">
                  Request Full PDF
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Credits */}
      <section className="border-t border-border/50 py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <div>
              <p className="text-sm text-muted-foreground">Powered by ipxs.digital</p>
              <p className="text-sm text-muted-foreground">Lead: {caseStudy.credits.lead}</p>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Case Studies
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
