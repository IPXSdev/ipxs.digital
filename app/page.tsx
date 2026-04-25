import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { CaseStudyCard } from '@/components/case-study-card'
import { ArrowRight, Zap, Layers, Shield } from 'lucide-react'
import { DropSection } from '@/components/drop-section'
import { caseStudies } from '@/content/case-studies'
import { MotionVideoFallback } from '@/components/motion-video-fallback'

const homepageFeaturedHeroSlug = 'keith-collins-rugs'
const homepageSelectedWorkSlugs = [
  'pitch-decks',
  'prissy-vandross-original-ip',
  'charlibereal-deathrow-campaign',
] as const

const selectedWorkCards = homepageSelectedWorkSlugs
  .map((slug) => {
    const study = caseStudies.find((item) => item.slug === slug)
    if (!study) return null

    if (slug === 'pitch-decks') {
      return {
        ...study,
        title: 'x|a Deck',
        cover: '/case-studies/pitch-decks/covers/xia.jpg',
        outcomeLine: 'Investor narrative and visual architecture designed to position x|a with confidence in the room.',
      }
    }

    return study
  })
  .filter(Boolean)

const featuredHeroStudy = caseStudies.find((study) => study.slug === homepageFeaturedHeroSlug)

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

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="pt-16">
        <div className="relative h-[calc(100vh-4rem)] w-screen overflow-hidden bg-black">
          <MotionVideoFallback
            primarySrc="/media/hero/ipxsdigital-motion-logo-master.mov"
            primaryType="video/quicktime"
            secondarySrc="/media/hero/ipxsdigital-motion-logo-master.mp4"
            secondaryType="video/mp4"
            poster="/media/hero/ipxsdigital-motion-logo-master-fallback.jpeg"
            alt="ipxs.digital motion logo"
            fit="cover"
            objectPosition="top"
            priority
            className="absolute inset-0"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/25 to-transparent" />
        </div>
      </section>

      <section className="section-fade py-10">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
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
                  <p className="text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-fade py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-2 lg:items-center lg:px-8">
          <div className="relative mx-auto aspect-[9/16] w-full max-w-[420px] overflow-hidden rounded-2xl bg-black">
            <MotionVideoFallback
              primarySrc="/media/case-studies/charlie-bereal-energy-motion-art.mp4"
              primaryType="video/mp4"
              secondarySrc="/media/case-studies/charlie-bereal-energy-motion-art.mov"
              secondaryType="video/quicktime"
              poster="/media/case-studies/charlie-bereal-energy-fallback.png"
              alt="Charlie Bereal Energy motion poster"
              fit="contain"
              objectPosition="center"
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
          {featuredHeroStudy ? (
            <article className="relative overflow-hidden rounded-2xl border border-border/40 bg-black">
              <div className="relative h-[58vh] min-h-[420px] w-full">
                <Image src={featuredHeroStudy.cover} alt={featuredHeroStudy.title} fill className="object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent" />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-secondary/30" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">Featured Header Case Study</p>
                <h3 className="font-serif text-2xl font-medium text-foreground md:text-3xl">{featuredHeroStudy.title}</h3>
                <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">{featuredHeroStudy.outcomeLine}</p>
                <Button asChild className="mt-5 rounded-full px-6">
                  <Link href={`/work/${featuredHeroStudy.slug}`}>View Case Study</Link>
                </Button>
              </div>
            </article>
          ) : null}

          <div className="mt-12 mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Featured Case Studies</p>
              <h2 className="font-serif text-3xl font-medium leading-tight md:text-4xl">Selected Work</h2>
            </div>
            <Link href="/work" className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground">
              View All Case Studies
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {selectedWorkCards.map((study) => (
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

      <DropSection />
    </div>
  )
}
