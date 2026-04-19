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
      'Complete visual ecosystem for album, EP, or single releases. Everything you need to launch with impact.',
    deliverables: [
      'Cover art (multiple formats & aspect ratios)',
      'Motion cover / visualizer loop',
      'Social asset pack (stories, posts, banners)',
      'Press kit assets',
      'Color & type guidelines',
    ],
    timeline: '2-4 weeks',
  },
  {
    id: 'motion-social-kit',
    title: 'Motion + Social Kit',
    description:
      'Scroll-stopping content for social campaigns. Built to perform across platforms and capture attention.',
    deliverables: [
      'Campaign concept & creative direction',
      '6-12 motion assets (15-60s each)',
      'Platform-optimized exports',
      'Static companion posts',
      'Performance-ready file delivery',
    ],
    timeline: '2-3 weeks',
  },
  {
    id: 'commercial-spot',
    title: 'Commercial Spot',
    description:
      'Broadcast-ready creative for brands and artists. From concept to final delivery, built for impact.',
    deliverables: [
      'Creative concept & storyboard',
      '30-60s hero spot',
      'Cutdowns (15s, 6s)',
      'Platform-specific versions',
      'Color grading & audio mix',
    ],
    timeline: '4-6 weeks',
  },
  {
    id: 'pitch-deck',
    title: 'Pitch Deck Architecture',
    description:
      'Investor-ready decks that tell your story with clarity and conviction. Built to close.',
    deliverables: [
      'Narrative architecture & flow',
      '20-40 slide deck design',
      'Data visualization design',
      'Presentation coaching notes',
      'Source files & template system',
    ],
    timeline: '2-3 weeks',
  },
  {
    id: 'artist-website',
    title: 'Artist/Brand Website',
    description:
      'Premium digital presence that converts. From portfolio sites to full artist ecosystems.',
    deliverables: [
      'UX strategy & wireframes',
      'Custom design (5-10 pages)',
      'Responsive development',
      'CMS integration',
      'Performance optimization',
    ],
    timeline: '4-8 weeks',
  },
  {
    id: 'mvp-platform',
    title: 'MVP Platform Build',
    description:
      'Functional product builds for new ventures. From concept to deployed MVP, ready for users.',
    deliverables: [
      'Product strategy & scoping',
      'UX/UI design system',
      'Full-stack development',
      'User authentication & data',
      'Deployment & handoff',
    ],
    timeline: '6-12 weeks',
  },
]

export default function ServicesPage() {
  return (
    <div className="flex flex-col pt-24">
      {/* Header */}
      <section className="border-b border-border/50 pb-16 pt-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Services
          </p>
          <h1 className="max-w-3xl font-serif page-header-title font-medium gradient-text-neon">
            What We Build
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Premium creative packages with clear deliverables, realistic timelines, and outcomes 
            that matter. Every engagement is scoped for success.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {services.map((service, index) => (
              <article
                key={service.id}
                className="group flex flex-col rounded-lg border border-border bg-card p-8 transition-all duration-300 hover:border-muted-foreground/30 lg:p-10"
              >
                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                  <span className="font-mono text-xs text-muted-foreground/50">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                    {service.timeline}
                  </span>
                </div>

                {/* Title & Description */}
                <h2 className="mb-3 font-serif text-2xl font-medium">{service.title}</h2>
                <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                {/* Deliverables */}
                <div className="mb-8 flex-1">
                  <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Deliverables
                  </p>
                  <ul className="flex flex-col gap-3">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
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

      {/* CTA Section */}
      <section className="border-t border-border/50 bg-secondary/30 py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h2 className="max-w-2xl font-serif text-3xl font-medium leading-tight md:text-4xl">
              Need something custom?
            </h2>
            <p className="mt-4 max-w-lg text-base text-muted-foreground">
              Every project is different. Let&apos;s talk about what you&apos;re building and 
              how we can help make it exceptional.
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
