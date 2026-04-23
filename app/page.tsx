import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { CaseStudyCard } from '@/components/case-study-card'
import { ArrowRight, Zap, Layers, Shield } from 'lucide-react'
import { DropSection } from '@/components/drop-section'
import { caseStudies } from '@/content/case-studies'

// Select featured case studies (first from different categories for variety)
const featuredCaseStudies = [
  caseStudies.find(cs => cs.slug === 'dynamics-multiverse'),
  caseStudies.find(cs => cs.slug === 'keith-collins-rugs'),
  caseStudies.find(cs => cs.slug === 'charlibereal-deathrow-campaign'),
].filter(Boolean) as typeof caseStudies

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



export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden pt-24">
        {/* Motion Logo */}
        <div className="relative mx-auto w-full max-w-3xl px-4">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full"
          >
            <source src="/media/hero/ipxsdigital-motion-logo-master.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Caption below motion logo */}
        <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-20 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Headline */}
            <h1 className="headline-display max-w-4xl font-serif font-medium tracking-tight">
              <span className="block text-foreground">Storytelling That Delivers.</span>
              <span className="mt-1 block gradient-text-neon">Design That Wins.</span>
            </h1>

            {/* Subhead */}
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Premium creative infrastructure for entertainment. Release systems, motion campaigns, 
              pitch decks, and digital platforms engineered to ship fast and perform at scale.
            </p>

            {/* Founder line */}
            <p className="mt-6 text-sm text-muted-foreground/70">
              Founded and led by{' '}
              <span className="text-foreground">Darion R. Harris</span>
              <span className="text-muted-foreground/50"> (LightGod)</span>
              , Founder and Lead Creative Technologist.
            </p>

            {/* CTAs */}
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
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

      {/* Visual Showcase Strip */}
      <section className="overflow-hidden py-8">
        <div className="flex animate-scroll-slow gap-4">
          {[
            { src: '/case-studies/dynamics-multiverse/cover.jpg', alt: 'The Dynamics Multiverse world building' },
            { src: '/case-studies/keith-collins-rugs/stills/ali-rug.jpg', alt: 'Keith Collins Rugs Ali artwork' },
            { src: '/case-studies/charlibereal-deathrow-campaign/chocolate-woman-cover.jpg', alt: 'CharliBereal Chocolate Woman cover' },
            { src: '/case-studies/pitch-decks/covers/xia.jpg', alt: 'xIa pitch deck cover' },
            { src: '/case-studies/dynamics-multiverse/still-06.png', alt: 'Generative Lore system' },
            { src: '/case-studies/keith-collins-rugs/stills/tiger-on-rug.jpg', alt: 'Tiger on rug street scene' },
            { src: '/case-studies/emory-capital/hero.jpeg', alt: 'Emory Capital brand identity' },
            { src: '/case-studies/charlibereal-deathrow-campaign/together-video-treatment.png', alt: 'Together video treatment' },
          ].map((img, i) => (
            <div key={i} className="relative h-48 w-72 shrink-0 overflow-hidden rounded-lg md:h-64 md:w-96">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 288px, 384px"
              />
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {[
            { src: '/case-studies/dynamics-multiverse/cover.jpg', alt: 'The Dynamics Multiverse world building' },
            { src: '/case-studies/keith-collins-rugs/stills/ali-rug.jpg', alt: 'Keith Collins Rugs Ali artwork' },
            { src: '/case-studies/charlibereal-deathrow-campaign/chocolate-woman-cover.jpg', alt: 'CharliBereal Chocolate Woman cover' },
            { src: '/case-studies/pitch-decks/covers/xia.jpg', alt: 'xIa pitch deck cover' },
          ].map((img, i) => (
            <div key={`dup-${i}`} className="relative h-48 w-72 shrink-0 overflow-hidden rounded-lg md:h-64 md:w-96">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 288px, 384px"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Trusted Partners Marquee */}
      <section className="border-t border-border/50 py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Trusted Partners and Collaborators
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-slow items-center gap-16">
            {[
              { src: '/media/partners/death-row-records-logo.png', alt: 'Death Row Records', height: 'h-12' },
              { src: '/media/partners/delicious-vinyl-logo.webp', alt: 'Delicious Vinyl', height: 'h-10' },
              { src: '/media/partners/delicious-vinyl-island-logo.webp', alt: 'Delicious Vinyl Island', height: 'h-10' },
              { src: '/media/partners/emory-capital-logo.png', alt: 'Emory Capital', height: 'h-14' },
              { src: '/media/partners/the-rockwell-logo.webp', alt: 'The Rockwell', height: 'h-12' },
              { src: '/media/partners/xyion-logo.png', alt: 'Xyion', height: 'h-8' },
              { src: '/media/partners/xia-logo.png', alt: 'x|a', height: 'h-10' },
              { src: '/media/partners/a-family-business.jpg', alt: 'A Family Business', height: 'h-14' },
            ].map((logo, i) => (
              <div key={i} className={`relative ${logo.height} w-auto shrink-0 opacity-70 transition-opacity hover:opacity-100`}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={160}
                  height={56}
                  className="h-full w-auto object-contain brightness-0 invert"
                />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {[
              { src: '/media/partners/death-row-records-logo.png', alt: 'Death Row Records', height: 'h-12' },
              { src: '/media/partners/delicious-vinyl-logo.webp', alt: 'Delicious Vinyl', height: 'h-10' },
              { src: '/media/partners/delicious-vinyl-island-logo.webp', alt: 'Delicious Vinyl Island', height: 'h-10' },
              { src: '/media/partners/emory-capital-logo.png', alt: 'Emory Capital', height: 'h-14' },
              { src: '/media/partners/the-rockwell-logo.webp', alt: 'The Rockwell', height: 'h-12' },
              { src: '/media/partners/xyion-logo.png', alt: 'Xyion', height: 'h-8' },
              { src: '/media/partners/xia-logo.png', alt: 'x|a', height: 'h-10' },
              { src: '/media/partners/a-family-business.jpg', alt: 'A Family Business', height: 'h-14' },
            ].map((logo, i) => (
              <div key={`dup-${i}`} className={`relative ${logo.height} w-auto shrink-0 opacity-70 transition-opacity hover:opacity-100`}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={160}
                  height={56}
                  className="h-full w-auto object-contain brightness-0 invert"
                />
              </div>
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
            {featuredCaseStudies.map((study) => (
              <CaseStudyCard
                key={study.id}
                title={study.title}
                category={study.category}
                outcome={study.outcomeLine}
                cover={study.cover}
                href={`/work/${study.slug}`}
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
              <Button asChild size="lg" className="gradient-border neon-glow-hover sheen-hover rounded-full px-8 text-foreground">
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
