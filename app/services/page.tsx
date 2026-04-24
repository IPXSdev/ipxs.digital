import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Premium creative services from ipxs.digital. Release systems, motion kits, commercials, pitch decks, websites, and MVP platforms.',
}

const services = [
  {
    id: 'release-system',
    title: 'Release System',
    description:
      'Complete visual ecosystem for an album, EP, or single launch with assets engineered to perform on streaming, social, and press.',
    deliverables: [
      'Cover art across all platform aspect ratios',
      'Motion cover and visualizer loop',
      'Social rollout pack for stories, posts, and headers',
      'Press-ready promotional kit',
      'Color and type direction for campaign consistency',
    ],
    timeline: '2-4 weeks',
  },
  {
    id: 'motion-social-kit',
    title: 'Motion + Social Kit',
    description:
      'Scroll-stopping campaign content developed for speed and conversion across paid, organic, and artist-owned channels.',
    deliverables: [
      'Campaign concept and visual direction',
      '6-12 motion assets from 15-60 seconds',
      'Platform-optimized export sets',
      'Static companion posts for continuity',
      'Performance-ready handoff package',
    ],
    timeline: '1-3 weeks',
  },
  {
    id: 'commercial-spot',
    title: 'Commercial Spot',
    description:
      'Brand and artist spots developed from concept through delivery with cinematic polish and measurable campaign utility.',
    deliverables: [
      'Creative concept and storyboard',
      '30-60 second hero spot',
      '15 second and 6 second cutdowns',
      'Platform-specific distribution variants',
      'Color and audio finishing',
    ],
    timeline: '1-4 weeks',
  },
  {
    id: 'pitch-deck',
    title: 'Pitch Deck Architecture',
    description:
      'Investor-facing decks designed to clarify thesis, strengthen narrative flow, and improve confidence in the room.',
    deliverables: [
      'Narrative architecture and sequencing',
      '20-40 slide presentation design',
      'Data visualization and proof framing',
      'Presenter notes and coaching support',
      'Source files and reusable templates',
    ],
    timeline: '2-3 weeks',
  },
  {
    id: 'artist-website',
    title: 'Artist/Brand Website',
    description:
      'Premium digital presence built to convert attention into action, from artist rollouts to brand storytelling.',
    deliverables: [
      'UX strategy and wireframe direction',
      'Custom design across key pages',
      'Responsive front-end development',
      'CMS integration',
      'Performance tuning before launch',
    ],
    timeline: '1-2 weeks',
  },
  {
    id: 'mvp-platform',
    title: 'MVP Platform Build',
    description:
      'Launch-ready product builds that turn concepts into functional experiences teams can test, demo, and scale.',
    deliverables: [
      'Product strategy and scope definition',
      'UX/UI system design',
      'Full-stack build and integration',
      'Authentication and data workflows',
      'Deployment and handoff documentation',
    ],
    timeline: '6-12 weeks',
  },
]

export default function ServicesPage() {
  return (
    <div className="flex flex-col pt-24">
      <section className="pb-14 pt-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Services</p>
          <h1 className="max-w-3xl font-serif page-header-title font-medium gradient-text-neon">Production Systems Built to Ship</h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Every engagement combines custom AI-assisted workflows with disciplined creative direction.
            We pair human authorship with production-grade acceleration to deliver outcomes that are faster, more ambitious, and built to perform in market.
          </p>
        </div>
      </section>

      <section className="section-fade py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {services.map((service, index) => (
              <article
                key={service.id}
                className="group flex flex-col rounded-lg border border-border bg-card p-8 transition-all duration-300 hover:border-muted-foreground/30 lg:p-10"
              >
                <div className="mb-6 flex items-start justify-between">
                  <span className="font-mono text-xs text-muted-foreground/50">{String(index + 1).padStart(2, '0')}</span>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">{service.timeline}</span>
                </div>

                <h2 className="mb-3 font-serif text-2xl font-medium">{service.title}</h2>
                <p className="mb-8 text-sm leading-relaxed text-muted-foreground">{service.description}</p>

                <div className="mb-8 flex-1">
                  <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">Deliverables</p>
                  <ul className="flex flex-col gap-3">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button asChild variant="outline" className="w-full rounded-full">
                  <Link href="/contact">
                    Request a Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-fade bg-secondary/30 py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h2 className="max-w-2xl font-serif text-3xl font-medium leading-tight md:text-4xl">Need something custom?</h2>
            <p className="mt-4 max-w-lg text-base text-muted-foreground">
              If your scope does not fit a package, we can design a custom production path around your timeline and goals.
            </p>
            <Button asChild size="lg" className="mt-8 rounded-full px-8">
              <Link href="/contact">
                Start a Conversation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
