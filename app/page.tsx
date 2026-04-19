import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CaseStudyCard } from '@/components/case-study-card'
import { ArrowRight, Zap, Layers, Shield } from 'lucide-react'
import { DropSection } from '@/components/drop-section'

const pillars = [
  {
    title: 'Release Systems',
    description: 'Cover art, motion, and complete rollout kits engineered for maximum impact.',
    icon: Layers,
  },
  {
    title: 'Motion & Ads',
    description: 'Social campaigns, commercials, trailers, and visualizers that move culture.',
    icon: Zap,
  },
  {
    title: 'Platforms & Decks',
    description: 'Artist sites, investor-ready decks, and MVP portals built for scale.',
    icon: Shield,
  },
]

const whyUs = [
  {
    title: 'Premium output at speed',
    description: 'High-end creative delivered on aggressive timelines without compromise.',
  },
  {
    title: 'Systems, not one-offs',
    description: 'Scalable frameworks that grow with your brand and catalog.',
  },
  {
    title: 'Rights-aware AI production',
    description: 'Thoughtful integration of AI tools with proper consideration for ownership.',
  },
]

const placeholderCaseStudies = [
  {
    title: 'Campaign System for Major Label Release',
    category: 'Release System',
    outcome: 'Complete visual ecosystem for platinum-certified debut.',
  },
  {
    title: 'Artist Platform & Digital Experience',
    category: 'Platform Build',
    outcome: 'Immersive web experience driving 2M+ unique visitors.',
  },
  {
    title: 'Motion Campaign for Festival Launch',
    category: 'Motion + Social',
    outcome: 'Social-first campaign generating 50M impressions.',
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 pt-32 pb-20 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Eyebrow */}
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Entertainment Creative Technology Studio
            </p>

            {/* Headline */}
            <h1 className="max-w-4xl font-serif text-4xl font-medium leading-[1.2] tracking-tight md:text-6xl md:leading-[1.15] lg:text-7xl text-balance">
              <span className="block">Storytelling That Delivers.</span>
              <span className="block text-muted-foreground">Design That Wins.</span>
            </h1>

            {/* Subhead */}
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              ipxs.digital is an entertainment-focused creative technology studio building AI-powered 
              release ecosystems. Cover art, motion, campaigns, decks, and digital experiences, 
              engineered to ship fast and look expensive.
            </p>

            {/* Founder line */}
            <p className="mt-6 text-sm text-muted-foreground/70">
              Founded and led by{' '}
              <span className="text-foreground">Darion R. Harris</span>
              <span className="text-muted-foreground/50"> (LightGod)</span>
              , Founder & Lead Creative Technologist.
            </p>

            {/* CTAs */}
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="gradient-border neon-glow-hover sheen-hover rounded-full px-8">
                <Link href="/work">
                  View Case Studies
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="neon-glow-hover sheen-hover rounded-full px-8">
                <Link href="/contact">Start a Project</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator removed */}
      </section>

      {/* What We Build Section */}
      <section className="border-t border-border/50 bg-secondary/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-16 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              What We Build
            </p>
            <h2 className="font-serif text-3xl font-medium leading-tight md:text-4xl">
              Three Pillars of Creative Output
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article
                key={pillar.title}
                className="group sheen-hover gradient-border neon-glow-hover flex flex-col gap-6 rounded-lg bg-card/80 p-8 transition-all duration-300 hover:bg-secondary/55"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-secondary transition-colors group-hover:border-muted-foreground/30">
                  <pillar.icon className="h-5 w-5 text-foreground" />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-serif text-xl font-medium">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why ipxs.digital Section */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Why ipxs.digital
              </p>
              <h2 className="font-serif text-3xl font-medium leading-tight md:text-4xl">
                Built Different,{' '}
                <span className="text-muted-foreground">By Design</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                We combine creative direction with technical execution to deliver work that performs 
                across every touchpoint. No handoffs, no dilution. Just premium output at velocity.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {whyUs.map((item, index) => (
                <div
                  key={item.title}
                  className="flex gap-6 border-l-2 border-border pl-6 transition-colors hover:border-foreground"
                >
                  <span className="font-mono text-sm text-muted-foreground/50">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium text-foreground">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="border-t border-border/50 bg-secondary/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Featured Case Studies
              </p>
              <h2 className="font-serif text-3xl font-medium leading-tight md:text-4xl">
                Selected Case Studies
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
            >
              View All Case Studies
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {placeholderCaseStudies.map((study) => (
              <CaseStudyCard
                key={study.title}
                title={study.title}
                category={study.category}
                outcome={study.outcome}
                isPlaceholder
              />
            ))}
          </div>
        </div>
      </section>

      <DropSection />

      {/* CTA Band */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h2 className="max-w-3xl font-serif text-3xl font-medium leading-tight md:text-4xl lg:text-5xl">
              {"Let's build your next release, campaign, or platform."}
            </h2>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="gradient-border neon-glow-hover sheen-hover rounded-full px-8">
                <Link href="/contact">
                  Start a Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="neon-glow-hover sheen-hover rounded-full px-8">
                <Link href="/deck">View the Deck</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
