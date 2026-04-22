import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Pitch Deck Architecture',
  description:
    'Decks that raise capital and sell the vision. From story and positioning to investor ready structure, visuals, and delivery.',
}

const deliverables = [
  {
    title: 'Narrative and positioning',
    description: 'Clear story arc, audience framing, and strategic message hierarchy.',
  },
  {
    title: 'Copywriting and structure',
    description: 'From opening statement to closing call to action, built to keep attention and drive next steps.',
  },
  {
    title: 'Visual system and slide design',
    description: 'Premium, readable, brand aligned layouts built for live pitching and PDF delivery.',
  },
  {
    title: 'Asset direction',
    description: 'Cover concepts, section rhythm, and presentation pacing designed for impact.',
  },
  {
    title: 'Pitch readiness',
    description: 'A deck that can be walked through live and also stands alone as a PDF.',
  },
]

const decks = [
  {
    id: 'larry-parker',
    title: "Larry Parker's Diner Documentary Deck",
    hook: 'A culture driven revival deck built as a roadmap through a legendary Los Angeles era.',
    tags: ['Documentary', 'Brand collaborations', 'Cultural legacy'],
    cover: '/case-studies/pitch-decks/covers/larry-parkers.jpg',
    highlights: `This documentary deck is built like a cinematic menu. It opens with a clear statement of why the story matters now, then uses the "Table of Condiments" as an intentional navigation system for the audience. It frames Larry Parker's as a cultural collision point where fame, food, and late night Los Angeles lived under neon and Cadillac booths. It is designed to attract both streaming partners and brand collaborators, with explicit sections for collaboration targets, merch concepts, and a closing call to action that invites supporters to help bring the moment to the screen.`,
  },
  {
    id: 'xia',
    title: 'xIa Company Deck',
    hook: 'A next generation talent and technology platform deck built for scale, partners, and capital.',
    tags: ['Company deck', 'AI and entertainment', 'Investor narrative'],
    cover: '/case-studies/pitch-decks/covers/xia.jpg',
    highlights: `This company deck positions xIa as a cultural and commercial engine built at the intersection of artist development, scalable strategy, and proprietary AI systems. It supports the narrative with leadership credibility, trusted partners, and a concrete case study, including the King Willonius "BBL Drizzy" campaign and its cultural impact. The structure is built to move from mission and model into differentiation, the ask, and the revenue model so the deck can function for both investor conversations and strategic partnerships.`,
  },
  {
    id: 'let-the-record-play',
    title: 'Let The Record Play',
    hook: 'A live podcast and YouTube series deck centered on identity, memory, and sound.',
    tags: ['Live podcast', 'West Adams culture', 'Sponsorship ready'],
    cover: '/case-studies/pitch-decks/covers/let-the-record-play.png',
    highlights: `This deck sells a live podcast and YouTube format by making the structure the hook. It is framed as a three act immersive experience: digging in the crates, the cultured cocktail, and the playback interview. The narrative emphasizes why the show matters for deep engagement across audio and video audiences, with clear sponsor alignment language and location credibility tied to Delicious Vinyl and West Adams.`,
  },
  {
    id: 'dynamics-multiverse',
    title: 'The Dynamics Multiverse',
    hook: 'A web3 IP licensing and portal concept deck designed to translate utility into story and product.',
    tags: ['Web3 platform', 'IP licensing', 'Ecosystem pitch'],
    cover: '/case-studies/pitch-decks/covers/dynamics-multiverse.jpg',
    highlights: `This deck presents IPXS as a proprietary licensing protocol that connects NFT IP ownership to smart licensing contracts, enabling licensing and print on demand commerce backed by on chain eligibility verification. It also introduces a community pitch portal concept, positioning the ecosystem as something that can onboard and hire from within while expanding into fashion, entertainment, and technology. The deck is built to translate technical utility into a clear end user flow and monetization narrative.`,
  },
]

const processSteps = [
  {
    title: 'Discovery and goal definition',
    description: 'Identify the audience, the decision they must make, and what must be true for them to say yes.',
  },
  {
    title: 'Message hierarchy',
    description: 'Build a clean story ladder: hook, stakes, proof, offer, next step.',
  },
  {
    title: 'Slide architecture',
    description: 'Design a repeatable rhythm: opener, context, solution, proof, expansion, close.',
  },
  {
    title: 'Visual system',
    description: 'Create a consistent grid, type scale, and spacing so the deck feels premium and fast to read.',
  },
  {
    title: 'Pitch readiness',
    description: 'Ensure the deck works live and as a PDF, with a closing call to action that drives action.',
  },
]

const outcomes = [
  'Strong opening statement and fast clarity on what the deck is selling.',
  'Clear structure that makes long ideas easy to navigate and retell.',
  'Visual consistency that reads premium without sacrificing speed.',
  'Calls to action that move viewers into a guided walkthrough and discovery call.',
]

function getDeckWalkthroughUrl(deckName: string) {
  const subject = encodeURIComponent('Deck Walkthrough Request: Pitch Deck Architecture')
  const message = encodeURIComponent(`Hi Darion, I want the full deck walkthrough for ${deckName}. Please share access and schedule a call.`)
  return `/contact?subject=${subject}&message=${message}`
}

export default function PitchDecksPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative h-[40vh] min-h-[300px] w-full">
          <Image
            src="/case-studies/pitch-decks/covers/xia.jpg"
            alt="Pitch Deck Architecture"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 -mt-24 lg:px-8">
          <Link
            href="/work"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Case Studies
          </Link>

          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Pitch Deck Architecture
          </p>

          <h1 className="mb-4 max-w-4xl font-serif text-3xl font-medium gradient-text-neon md:text-4xl lg:text-5xl">
            Decks That Raise Capital and Sell the Vision
          </h1>

          <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            I build pitch decks that do more than explain. They position. They persuade. They turn complex ideas into a clear narrative investors, partners, and audiences can act on.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/contact">
                Book a Discovery Call
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link href={getDeckWalkthroughUrl('All Decks')}>
                Request Full Deck Walkthrough
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What I Delivered */}
      <section className="border-t border-border/50 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Deliverables
          </p>
          <h2 className="mb-8 font-serif text-xl font-medium md:text-2xl">What I Delivered</h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((item, index) => (
              <div
                key={item.title}
                className="rounded-lg border border-border/50 bg-card/50 p-5"
              >
                <span className="mb-3 block font-mono text-xs text-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-2 font-medium">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deck Highlights */}
      <section className="border-t border-border/50 bg-secondary/30 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Case Study Media
          </p>
          <h2 className="mb-4 font-serif text-xl font-medium md:text-2xl">Deck Highlights</h2>
          <p className="mb-8 max-w-2xl text-sm text-muted-foreground">
            Below are four examples across documentary, music, platform, and company fundraising. Full PDFs are shared through a guided walkthrough.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {decks.map((deck) => (
              <div
                key={deck.id}
                className="group overflow-hidden rounded-xl border border-border/50 bg-card"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={deck.cover}
                    alt={deck.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="mb-2 font-serif text-lg font-medium">{deck.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{deck.hook}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {deck.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button asChild variant="outline" size="sm" className="rounded-full">
                      <a href={`#${deck.id}`}>View Highlights</a>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="rounded-full">
                      <Link href={getDeckWalkthroughUrl(deck.title)}>View Full Deck PDF</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Deck Highlights Sections */}
      {decks.map((deck, index) => (
        <section
          key={deck.id}
          id={deck.id}
          className={`border-t border-border/50 py-12 lg:py-16 ${index % 2 === 1 ? 'bg-secondary/30' : ''}`}
        >
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="relative aspect-video overflow-hidden rounded-xl border border-border/50">
                <Image
                  src={deck.cover}
                  alt={deck.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Deck {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="mb-4 font-serif text-xl font-medium md:text-2xl">{deck.title}</h2>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{deck.highlights}</p>
                <Button asChild variant="outline" size="sm" className="rounded-full">
                  <Link href={getDeckWalkthroughUrl(deck.title)}>
                    Request Full Deck Walkthrough
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* How the Decks Were Built */}
      <section className="border-t border-border/50 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Pipeline
          </p>
          <h2 className="mb-8 font-serif text-xl font-medium md:text-2xl">How the Decks Were Built</h2>

          <div className="grid gap-4 md:grid-cols-5">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="relative flex flex-col gap-3 rounded-lg border border-border/50 bg-card/50 p-4"
              >
                {index < processSteps.length - 1 && (
                  <div className="absolute -right-2 top-1/2 hidden h-px w-4 bg-border/50 md:block" />
                )}
                <span className="font-mono text-xs text-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="mb-1 text-sm font-medium">{step.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="border-t border-border/50 bg-secondary/30 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Results
          </p>
          <h2 className="mb-8 font-serif text-xl font-medium md:text-2xl">Outcomes and Why It Works</h2>

          <ul className="grid gap-3 sm:grid-cols-2">
            {outcomes.map((outcome, index) => (
              <li
                key={outcome}
                className="flex items-start gap-3 rounded-lg border border-border/50 bg-card/50 px-4 py-3"
              >
                <span className="font-mono text-xs text-accent pt-0.5">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA Band */}
      <section className="border-t border-border/50 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h2 className="mb-3 font-serif text-xl font-medium md:text-2xl">
              Want the full deck walkthrough?
            </h2>
            <p className="mb-6 max-w-lg text-sm text-muted-foreground">
              I will walk you through the full PDF live and tailor the next steps to your goal.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/contact">
                  Book a Discovery Call
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href={getDeckWalkthroughUrl('All Decks')}>
                  Request Full Deck Walkthrough
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
