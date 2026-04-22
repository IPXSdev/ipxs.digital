import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, FileText, Briefcase, Cog, Layers, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Deck',
  description:
    'The ipxs.digital studio deck. Our operating model, capabilities, and selected case studies.',
}

const deckSections = [
  {
    id: 'overview',
    title: 'Studio Overview',
    description: 'Who we are, what we believe, and how we got here.',
    icon: Briefcase,
  },
  {
    id: 'work',
    title: 'Selected Case Studies',
    description: 'Case studies across entertainment and technology verticals.',
    icon: Layers,
  },
  {
    id: 'model',
    title: 'Operating Model',
    description: 'How we work, our process, and engagement structure.',
    icon: Cog,
  },
  {
    id: 'capabilities',
    title: 'Capabilities',
    description: 'Full-stack creative and technical services.',
    icon: FileText,
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'How to start a project or conversation.',
    icon: Mail,
  },
]

export default function DeckPage() {
  return (
    <div className="flex flex-col pt-24">
      {/* Header */}
      <section className="border-b border-border/50 pb-16 pt-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Deck Room
          </p>
          <h1 className="max-w-3xl font-serif page-header-title font-medium gradient-text-neon">
            The Studio Deck
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            A comprehensive look at ipxs.digital. Our positioning, capabilities, operating model, 
            and selected case studies. For partners, collaborators, and prospective clients.
          </p>
        </div>
      </section>

      {/* Deck Sections */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {deckSections.map((section, index) => (
              <article
                key={section.id}
                className="group flex flex-col rounded-lg border border-border bg-card p-8 transition-all duration-300 hover:border-muted-foreground/30"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary transition-colors group-hover:border-muted-foreground/30">
                    <section.icon className="h-4 w-4 text-foreground" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground/50">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h2 className="mb-2 font-serif text-xl font-medium">{section.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {section.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Full Deck Request */}
      <section className="border-t border-border/50 bg-secondary/30 py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-muted-foreground/20 bg-secondary/50">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="font-serif text-2xl font-medium md:text-3xl">
              Request the Full Deck
            </h2>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              The complete studio deck is available on request. 
              Book a discovery call to walk through our capabilities together.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/contact">
                  Request the Deck
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href="/work">View Case Studies</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
