import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { CaseStudyCard } from '@/components/case-study-card'
import { ArrowRight, Zap, Layers, Shield } from 'lucide-react'
import { DropSection } from '@/components/drop-section'
import { caseStudies } from '@/content/case-studies'
import { MotionVideoFallback } from '@/components/motion-video-fallback'

const featuredCaseStudies = [
  caseStudies.find((cs) => cs.slug === 'emory-capital'),
  caseStudies.find((cs) => cs.slug === 'keith-collins-rugs'),
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
    title: 'AI integrated with production discipline',
    description: 'Automation supports speed while editorial standards protect quality, consistency, and ownership.',
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Full bleed video starting at navbar */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
        {/* Full-width video container - no padding, spans edge to edge */}
        <div className="absolute inset-x-0 top-0 h-[70vh] w-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/media/hero/ipxsdigital-motion-logo-fallback.jpeg"
            className="h-full w-full object-cover object-center"
          >
            <source src="/media/hero/ipxsdigital-motion-logo-master.mp4" type="video/mp4" />
            <source src="/media/hero/ipxsdigital-motion-logo-master.mov" type="video/quicktime" />
          </video>
          
          {/* Bottom fade to blend into content - only bottom edge needed since video bleeds off other edges */}
          <div 
            className="pointer-events-none absolute inset-x-0 bottom-0 h-48"
            style={{ background: 'linear-gradient(to top, hsl(var(--background)) 0%, transparent 100%)' }}
          />
        </div>

        {/* Content positioned below video area - pushed down to avoid overlap */}
        <div className="relative z-10 mx-auto mt-[72vh] max-w-4xl px-4 text-center">
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
          <div className="relative mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden rounded-2xl bg-black">
            <MotionVideoFallback
              mp4Src="/media/case-studies/charlie-bereal-energy-motion-art.mp4"
              movSrc="/media/case-studies/charlie-bereal-energy-motion-art.mov"
              poster="/media/case-studies/charlie-bereal-energy-fallback.png"
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

      <section className="overflow-hidden py-8">
        <div className="flex animate-scroll-slow gap-4">
          {[
            { src: '/case-studies/dynamics-multiverse/cover.jpg', alt: 'The Dynamics Multiverse world building' },
            { src: '/case-studies/keith-collins-rugs/stills/ali-rug.jpg', alt: 'Keith Collins Rugs Ali artwork' },
            { src: '/case-studies/charlibereal-deathrow-campaign/chocolate-woman-cover.jpg', alt: 'CharliBereal Chocolate Woman cover' },
            { src: '/case-studies/pitch-decks/covers/xia.jpg', alt: 'xIa pitch deck cover' },
            { src: '/case-studies/dynamics-multiverse/still-06.png', alt: 'Generative lore system' },
            { src: '/case-studies/keith-collins-rugs/stills/tiger-on-rug.jpg', alt: 'Tiger on rug street scene' },
            { src: '/case-studies/emory-capital/hero.jpeg', alt: 'Emory Capital brand identity' },
            { src: '/case-studies/charlibereal-deathrow-campaign/together-video-treatment.png', alt: 'Together video treatment' },
          ].map((img, i) => (
            <div key={i} className="relative h-48 w-72 shrink-0 overflow-hidden rounded-lg md:h-64 md:w-96">
              <Image src={img.src} alt={img.alt} fill className="object-cover object-top" sizes="(max-width: 768px) 288px, 384px" />
            </div>
          ))}
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
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Featured Case Studies</p>
              <h2 className="font-serif text-3xl font-medium leading-tight md:text-4xl">Selected Work</h2>
            </div>
            <Link href="/work" className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground">
              View All Case Studies
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Featured Motion Highlight - Character Motion Sheet (wide) */}
          <div className="mb-12">
            <Link href="/work/dynamics-multiverse" className="group block">
              <div className="relative aspect-video overflow-hidden rounded-xl bg-white">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/media/case-studies/character-motion-sheet-fallback.png"
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                >
                  <source src="/media/case-studies/character-motion-sheet-wide.mov" type="video/quicktime" />
                </video>
              </div>
              {/* Caption below video - no overlap */}
              <div className="mt-4 px-2">
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Character Design and Motion
                </p>
                <h3 className="font-serif text-2xl font-medium text-foreground md:text-3xl">
                  Character Motion Sheet
                </h3>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
                  Animated character system designed for social content, merchandise, and brand storytelling across platforms.
                </p>
              </div>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      </section>

      <DropSection />
    </div>
  )
}
