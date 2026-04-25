import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CaseStudyCard } from '@/components/case-study-card'
import { ArrowRight, Zap, Layers, Shield } from 'lucide-react'
import { DropSection } from '@/components/drop-section'
import { caseStudies } from '@/content/case-studies'
import { MotionVideoFallback } from '@/components/motion-video-fallback'
import { TrustedLogoScroller, type MarqueeItem } from '@/components/trusted-logo-scroller'

const featuredCaseStudies = [
  caseStudies.find((cs) => cs.slug === 'dynamics-multiverse'),
  caseStudies.find((cs) => cs.slug === 'prissy-vandross-original-ip'),
  caseStudies.find((cs) => cs.slug === 'charlibereal-deathrow-campaign'),
].filter(Boolean) as typeof caseStudies

const pillars = [
  {
    title: 'Release Systems',
    description: 'Cover art, motion, and rollout assets planned as one launch system with channel-ready outputs.',
    icon: Layers,
  },
  {
    title: 'Motion and Ads',
    description: 'Commercial-grade visual storytelling for social, paid media, and narrative campaign moments.',
    icon: Zap,
  },
  {
    title: 'Platforms and Decks',
    description: 'Digital products and investor-facing narratives built for confidence, speed, and close rate.',
    icon: Shield,
  },
]

const whyUs = [
  {
    title: 'Senior execution from day one',
    description: 'Strategy, design, motion, and technical build are led by experienced operators who ship.',
  },
  {
    title: 'Campaign architecture, not isolated assets',
    description: 'Every output is connected so release momentum builds across touchpoints instead of fragmenting.',
  },
  {
    title: 'AI workflows built into production',
    description: 'Custom AI-assisted pipelines reduce turn time while keeping quality control at a premium standard.',
  },
]

const marqueeItems: MarqueeItem[] = [
  { kind: 'project', name: 'Dynamics Multiverse', src: '/case-studies/dynamics-multiverse/cover.jpg', fit: 'cover' },
  { kind: 'logo', name: 'Tubi', src: '/media/logos/tubi.svg', shape: 'rect', fit: 'contain', bg: 'transparent' },
  { kind: 'project', name: 'Charlie Energy', src: '/case-studies/charlibereal-deathrow-campaign/chocolate-woman-cover.jpg', fit: 'cover' },
  { kind: 'logo', name: 'x|a', src: '/media/logos/xa.svg', shape: 'rect', fit: 'contain', bg: 'transparent' },
  { kind: 'project', name: 'Character Motion Sheet', src: '/case-studies/charlibereal-deathrow-campaign/charlibereal-character-sheet.png', fit: 'cover' },
  { kind: 'logo', name: 'Delicious Vinyl', src: '/media/logos/delicious-vinyl.svg', shape: 'rect', fit: 'contain', bg: 'transparent' },
  { kind: 'project', name: 'Emory Capital', src: '/case-studies/emory-capital/hero.jpeg', fit: 'cover' },
  { kind: 'logo', name: 'Delicious Vinyl Island', src: '/media/logos/delicious-vinyl-island.svg', shape: 'rect', fit: 'contain', bg: 'transparent' },
  { kind: 'project', name: 'Pitch Decks', src: '/case-studies/pitch-decks/covers/xia.jpg', fit: 'cover' },
  { kind: 'logo', name: 'Death Row', src: '/media/logos/death-row-records.svg', shape: 'rect', fit: 'contain', bg: 'transparent' },
  { kind: 'project', name: 'Keith Collins Rugs', src: '/case-studies/keith-collins-rugs/posters/keith-collins-rugs-poster.jpg', fit: 'cover' },
  { kind: 'logo', name: 'Emory Capital', src: '/media/logos/emory-capital.svg', shape: 'circle', fit: 'contain', bg: 'card' },
  { kind: 'logo', name: 'Rockwell', src: '/media/logos/rockwell.svg', shape: 'rect', fit: 'contain', bg: 'transparent' },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="pt-16">
        <div className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-black">
          <MotionVideoFallback
            primarySrc="/media/hero/ipxsdigital-motion-logo-master.mov"
            primaryType="video/quicktime"
            secondarySrc="/media/hero/ipxsdigital-motion-logo-master.mp4"
            secondaryType="video/mp4"
            poster="/media/hero/ipxsdigital-motion-logo-master-fallback.jpeg"
            alt="ipxs.digital motion logo poster"
            fit="cover"
            objectPosition="top"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/25 to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-6 pt-10 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="headline-display font-serif font-medium tracking-tight">
              <span className="block text-foreground">Storytelling That Converts Attention.</span>
              <span className="mt-1 block gradient-text-neon">Design Systems That Carry the Release.</span>
            </h1>
            <p className="mt-7 text-base leading-relaxed text-muted-foreground md:text-lg">
              ipxs.digital builds entertainment-facing creative technology systems that connect art direction, motion,
              campaign assets, and digital product execution into one launch engine.
              Founded and led by Darion R. Harris (LightGod), the studio operates where premium creative and technical delivery meet.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="gradient-border neon-glow-hover sheen-hover rounded-full px-8 text-foreground">
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
      </section>

      <section className="section-fade bg-secondary/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-16 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">What We Build</p>
            <h2 className="font-serif text-3xl font-medium leading-tight md:text-4xl">Creative Systems Designed for Real Deadlines</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <article
                key={pillar.title}
                className="group sheen-hover gradient-border neon-glow-hover flex flex-col gap-6 rounded-lg bg-card/80 p-8 transition-all duration-300 hover:bg-secondary/55"
              >
                <div className={`icon-3d-neon ${index === 0 ? 'icon-3d-neon-cyan' : index === 1 ? 'icon-3d-neon-magenta' : 'icon-3d-neon-violet'}`}>
                  <pillar.icon className="h-5 w-5 text-foreground" />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-serif text-xl font-medium">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TrustedLogoScroller items={marqueeItems} />

      <section className="section-fade py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-2 lg:items-center lg:px-8">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
            <MotionVideoFallback
              primarySrc="/media/case-studies/charlie-bereal-energy-motion-art.mp4"
              primaryType="video/mp4"
              secondarySrc="/media/case-studies/charlie-bereal-energy-motion-art.mov"
              secondaryType="video/quicktime"
              poster="/media/case-studies/charlie-bereal-energy-motion-art-fallback.png"
              alt="Charlie Bereal Energy motion poster"
              fit="contain"
              objectPosition="top"
            />
          </div>
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Featured Motion</p>
            <h2 className="font-serif text-3xl font-medium leading-tight md:text-4xl">Charlie Bereal Energy</h2>
            <p className="mt-4 text-base text-muted-foreground">
              Motion-first campaign artwork built for streaming placements, social circulation, and repeat visual recall.
            </p>
          </div>
        </div>
      </section>

      <section className="section-fade py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Why ipxs.digital</p>
              <h2 className="font-serif text-3xl font-medium leading-tight md:text-4xl">Built for Teams That Need Precision and Pace</h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                We combine creative direction with technical production so teams can move from brief to market without losing quality,
                momentum, or narrative clarity.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {whyUs.map((item, index) => (
                <div key={item.title} className="flex gap-6 border-l-2 border-border pl-6 transition-colors hover:border-foreground">
                  <span className="font-mono text-sm text-muted-foreground/50">{String(index + 1).padStart(2, '0')}</span>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium text-foreground">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-fade bg-secondary/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Featured Case Studies</p>
              <h2 className="font-serif text-3xl font-medium leading-tight md:text-4xl">Selected Work</h2>
            </div>
            <Link href="/work" className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground">
              View All Case Studies
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mb-8 grid gap-6 lg:grid-cols-[280px_1fr]">
            <div className="rounded-xl border border-border/50 bg-card/80 p-4">
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">Character Motion Sheet</p>
              <div className="relative mx-auto aspect-[9/16] w-full max-w-[220px] overflow-hidden rounded-lg bg-black">
                <MotionVideoFallback
                  primarySrc="/media/case-studies/character-motion-sheet.mp4"
                  primaryType="video/mp4"
                  secondarySrc="/media/case-studies/character-motion-sheet.mov"
                  secondaryType="video/quicktime"
                  poster="/media/case-studies/character-motion-sheet-fallback.png"
                  alt="Character Motion Sheet video"
                  fit="contain"
                  objectPosition="top"
                />
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featuredCaseStudies.map((study) => (
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
        </div>
      </section>

      <DropSection />
    </div>
  )
}
