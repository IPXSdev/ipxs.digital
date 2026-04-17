import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Download, Mail, Linkedin, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Darion R. Harris. Creative Technologist, Director, and Strategist. Founder of ipxs.digital.',
}

const coreStrengths = [
  'Creative direction & visual strategy for entertainment and tech brands',
  'Full-stack product design and development (web, mobile, AI)',
  'Motion design, commercial production, and campaign architecture',
  'Pitch deck strategy and investor-ready presentation design',
  'AI-powered workflow design and custom tool development',
  'Cross-functional leadership across creative and engineering teams',
]

const selectedWork = [
  {
    title: 'ipxs.digital',
    role: 'Founder & Lead Creative Technologist',
    period: 'Present',
    description: 'Entertainment-focused creative technology studio building AI-powered release ecosystems.',
  },
  {
    title: 'Major Label Campaigns',
    role: 'Creative Director',
    period: 'Selected Case Studies',
    description: 'Visual systems and motion campaigns for platinum-certified releases.',
  },
  {
    title: 'Institutional Platforms',
    role: 'Technical Lead',
    period: 'Selected Case Studies',
    description: 'Board-ready dashboards and investor platforms for fund managers.',
  },
]

const toolsAndStack = [
  { category: 'Design', tools: 'Figma, After Effects, Cinema 4D, Photoshop, Illustrator' },
  { category: 'Development', tools: 'React, Next.js, TypeScript, Node.js, Python' },
  { category: 'AI/ML', tools: 'OpenAI, Anthropic, Stable Diffusion, Custom GPTs' },
  { category: 'Infrastructure', tools: 'Vercel, AWS, Supabase, PostgreSQL' },
]

export default function ResumePage() {
  return (
    <div className="flex flex-col pt-24">
      {/* Header */}
      <section className="border-b border-border/50 pb-16 pt-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Resume
              </p>
              <h1 className="font-serif text-4xl font-medium leading-tight md:text-5xl">
                Darion R. Harris
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                <span className="text-foreground">(LightGod)</span>, Creative Technologist, Director, Strategist
              </p>
            </div>
            <Button variant="outline" className="shrink-0 rounded-full" disabled>
              <Download className="mr-2 h-4 w-4" />
              Download PDF (Coming Soon)
            </Button>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="border-b border-border/50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div>
              <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Summary
              </h2>
            </div>
            <div className="lg:col-span-2">
              <p className="text-base leading-relaxed text-foreground md:text-lg">
                Creative technologist and director with deep experience across entertainment, tech, and 
                institutional verticals. I build premium creative systems, from cover art and motion 
                campaigns to investor platforms and AI-powered tools, that ship fast and perform at scale. 
                Currently leading ipxs.digital, an entertainment-focused studio serving artists, labels, 
                and brands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Strengths */}
      <section className="border-b border-border/50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div>
              <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Core Strengths
              </h2>
            </div>
            <div className="lg:col-span-2">
              <ul className="flex flex-col gap-4">
                {coreStrengths.map((strength, index) => (
                  <li key={index} className="flex gap-4 text-foreground">
                    <span className="font-mono text-xs text-muted-foreground/50">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm leading-relaxed md:text-base">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Case Studies */}
      <section className="border-b border-border/50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div>
              <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Selected Case Studies
              </h2>
            </div>
            <div className="lg:col-span-2">
              <div className="flex flex-col gap-8">
                {selectedWork.map((work) => (
                  <article key={work.title} className="border-l-2 border-border pl-6 transition-colors hover:border-foreground">
                    <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="font-medium text-foreground">{work.title}</h3>
                      <span className="text-sm text-muted-foreground">/</span>
                      <span className="text-sm text-muted-foreground">{work.role}</span>
                    </div>
                    <p className="mb-2 text-xs text-muted-foreground/70">{work.period}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{work.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools & Stack */}
      <section className="border-b border-border/50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div>
              <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Tools & Stack
              </h2>
            </div>
            <div className="lg:col-span-2">
              <div className="grid gap-6 sm:grid-cols-2">
                {toolsAndStack.map((item) => (
                  <div key={item.category}>
                    <h3 className="mb-2 text-sm font-medium text-foreground">{item.category}</h3>
                    <p className="text-sm text-muted-foreground">{item.tools}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div>
              <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Contact
              </h2>
            </div>
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Get in Touch
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="rounded-full">
                  <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="rounded-full">
                  <Link href="/">
                    <Globe className="mr-2 h-4 w-4" />
                    ipxs.digital
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
