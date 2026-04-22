import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Sparkles, Layers, Users, Eye, Target, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'The Dynamics Multiverse | World Building | IPXS.digital',
  description: 'A franchise-scale story universe engineered for expansion across film, series, games, music visuals, and brand collaborations.',
}

const deliverables = [
  'World Bible and canon rules',
  'Franchise architecture and expansion lanes',
  'Visual language and brand identity direction',
  'Character systems and trait classifications',
  'Pitch-ready presentation structure',
  'Cover assets and stills for web and marketing',
]

const methodSteps = [
  {
    icon: Target,
    title: 'Discovery and Direction',
    description: 'Align on the world\'s purpose, tone, and the type of audience it is meant to build. This establishes the creative boundaries early so every asset feels like it belongs.',
  },
  {
    icon: Layers,
    title: 'Canon Rules',
    description: 'Define what is possible and what is not. Constraints create consistency. Consistency creates trust. Trust builds fandom.',
  },
  {
    icon: Users,
    title: 'Character Systems',
    description: 'Design characters as modular story engines with motivations, flaws, visual signatures, and role definitions that make spin-offs possible.',
  },
  {
    icon: Eye,
    title: 'Visual Language',
    description: 'Build an art direction system that translates into decks, key art, poster directions, UI, web presence, and short-form rollout assets.',
  },
  {
    icon: Zap,
    title: 'Pitch Readiness',
    description: 'Package the output so it can be used in real conversations: clear narrative summary, business-readable structure, and expansion opportunities.',
  },
]

const gallery = [
  { src: '/case-studies/dynamics-multiverse/cover.jpg', alt: 'The Ultraviolet Multiverse overview', caption: '333 traits, 22 classifications, and a complete multiversal vernacular index.' },
  { src: '/case-studies/dynamics-multiverse/still-01.png', alt: 'Thysporinite 963', caption: 'Trait Class 1: The Elder DNA, rarest substance in the Multiverse.' },
  { src: '/case-studies/dynamics-multiverse/still-02.jpg', alt: 'Lux trait type', caption: 'Trait Class 3: The light that Dynamic beings naturally produce.' },
  { src: '/case-studies/dynamics-multiverse/still-03.jpg', alt: 'Damu trait type', caption: 'Trait Class 4: The Divine Antibodies unique to each galaxy.' },
  { src: '/case-studies/dynamics-multiverse/still-04.png', alt: 'Mode of Travel', caption: 'Trait Class 2: Multiversal conveyance and wormhole networks.' },
  { src: '/case-studies/dynamics-multiverse/still-05.png', alt: 'Via Lactea', caption: 'Trait Class 7: The 11 Primary Galaxies and 33 Dynamic Planets.' },
  { src: '/case-studies/dynamics-multiverse/still-06.png', alt: 'Generative Lore', caption: 'Interactive character backstory generation system.' },
  { src: '/case-studies/dynamics-multiverse/still-07.png', alt: 'Character design 1', caption: 'Ornate armor with organic and metallic fusion.' },
  { src: '/case-studies/dynamics-multiverse/still-08.png', alt: 'Character design 2', caption: 'Botanical integration with advanced technology.' },
  { src: '/case-studies/dynamics-multiverse/still-09.png', alt: 'Character design 3', caption: 'Celestial markings and jeweled armor systems.' },
]

export default function DynamicsMultiversePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative h-[50vh] min-h-[400px] w-full">
          <Image
            src="/case-studies/dynamics-multiverse/cover.jpg"
            alt="The Dynamics Multiverse"
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
            World Building
          </span>

          <h1 className="mb-4 max-w-4xl font-serif text-3xl font-medium gradient-text-neon md:text-4xl lg:text-5xl">
            The Dynamics Multiverse
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            A franchise-scale story universe engineered for expansion across film, series, games, music visuals, and brand collaborations.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-6 font-serif text-2xl font-medium text-foreground md:text-3xl">Overview</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The Dynamics Multiverse is a franchise-scale story universe designed for expansion across film, series, games, music visuals, and brand collaborations. The assignment was not just to invent a world, but to engineer a world that can survive production, scale into multiple releases, and stay consistent across mediums.
                </p>
                <p>
                  IPXS built the world like a product. We defined the rules, the visual language, the character systems, and the release architecture so the universe can grow without losing its identity.
                </p>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">Deliverables</h3>
              <ul className="space-y-3">
                {deliverables.map((item) => (
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

      {/* The Objective */}
      <section className="border-t border-border/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-8 font-serif text-2xl font-medium text-foreground md:text-3xl">The Objective</h2>
          <p className="mb-8 max-w-3xl text-muted-foreground">
            Build a complete world-building foundation that supports:
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'Multi-title storytelling with consistent canon',
              'Character arcs that can carry spin-offs',
              'A visual identity that stays recognizable across posters, trailers, decks, and social',
              'A pitch-ready structure that investors and partners can understand quickly',
              'A roadmap for releasing content without rebuilding the world every time',
            ].map((item) => (
              <div key={item} className="rounded-lg border border-border/50 bg-card/50 p-4">
                <p className="text-sm text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Built */}
      <section className="border-t border-border/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-12 font-serif text-2xl font-medium text-foreground md:text-3xl">What We Built</h2>
          
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-xl border border-border/50 bg-card/50 p-6 lg:p-8">
              <h3 className="mb-4 text-xl font-medium text-foreground">The World Bible</h3>
              <p className="mb-4 text-muted-foreground">A structured foundation that defines:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>The universe premise and core themes</li>
                <li>Canon rules and constraints that keep continuity tight</li>
                <li>Faction logic and power dynamics</li>
                <li>Setting logic and environment rules</li>
                <li>Expansion lanes for future titles</li>
              </ul>
              <p className="mt-4 text-sm italic text-accent">This is the part most people skip. We treat it as the operating system for the franchise.</p>
            </div>
            
            <div className="rounded-xl border border-border/50 bg-card/50 p-6 lg:p-8">
              <h3 className="mb-4 text-xl font-medium text-foreground">Franchise Architecture</h3>
              <p className="mb-4 text-muted-foreground">We organized the universe as a scalable ecosystem:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>A core narrative spine that anchors the brand</li>
                <li>Multiple story lanes for spin-offs</li>
                <li>A repeatable method for introducing new characters and locations</li>
                <li>A release strategy that supports episodic content and flagship films</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Visual System */}
      <section className="border-t border-border/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-8 font-serif text-2xl font-medium text-foreground md:text-3xl">Visual System</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item, index) => (
              <div key={index} className="group overflow-hidden rounded-lg border border-border/50">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="bg-card/80 p-3">
                  <p className="text-xs text-muted-foreground">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The IPXS Method */}
      <section className="border-t border-border/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-12 font-serif text-2xl font-medium text-foreground md:text-3xl">The IPXS Method</h2>
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

      {/* Why AI Was Used */}
      <section className="border-t border-border/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 font-serif text-2xl font-medium text-foreground md:text-3xl">Why AI Was Used</h2>
            <p className="text-muted-foreground">
              This world was designed to move fast without sacrificing taste. AI-assisted creation allowed us to rapidly explore visual directions, story permutations, and presentation formats, while keeping creative control in-house. The result is not random generation. It is authored direction executed at speed.
            </p>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="border-t border-border/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-8 font-serif text-2xl font-medium text-foreground md:text-3xl">Outcomes</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              'A franchise-ready universe that can support multiple releases',
              'A consistent identity system that reduces future production friction',
              'A repeatable workflow for expanding the world without breaking canon',
              'A pitch-friendly package that translates creative vision into business clarity',
            ].map((outcome) => (
              <div key={outcome} className="flex items-start gap-3 rounded-lg border border-border/50 bg-card/50 p-4">
                <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                <p className="text-foreground">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 font-serif text-2xl font-medium text-foreground md:text-3xl">Full Deck Walkthrough</h2>
            <p className="mb-8 text-muted-foreground">
              The full world-building deck is shared upon request.
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
              <p className="text-sm text-muted-foreground">Lead: Darion R. Harris (LightGod)</p>
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
