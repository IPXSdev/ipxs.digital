import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Download, Mail, Linkedin, Globe, Award, Briefcase, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Darion R. Harris (LightGod). 20+ years in creative direction, motion design, and technical production. Agency-represented. Death Row Records, institutional platforms, and AI-powered creative systems.',
}

const highlights = [
  '20+ years of commercial creative and technical production experience',
  'Agency-represented creative director and technologist',
  'Death Row Records campaign art direction and visual systems',
  'Platinum-certified release campaigns and motion design',
  'Institutional investor platforms and board-ready digital products',
  'AI-integrated production pipelines shipping at commercial scale',
]

const coreStrengths = [
  'Creative direction and visual strategy for entertainment, music, and tech brands',
  'Full-stack product design and development (web, mobile, AI applications)',
  'Motion design, commercial production, and campaign architecture',
  'Pitch deck strategy and investor-ready presentation design',
  'AI-powered workflow design, custom tool development, and production automation',
  'Cross-functional leadership across creative, engineering, and business teams',
  'Visual release system architecture: cover art, motion, rollout assets, social content',
  'Music production, audio engineering, mixing, and sound design',
]

const selectedWork = [
  {
    title: 'ipxs.digital',
    role: 'Founder & Lead Creative Technologist',
    period: '2020 - Present',
    description: 'Entertainment-focused creative technology studio building AI-powered release ecosystems for artists, labels, and brands. Full-service visual systems from concept through distribution.',
  },
  {
    title: 'CharliBereal x Death Row Records',
    role: 'Creative Director',
    period: '2024',
    description: 'End-to-end creative art direction for Death Row Records single release. Primary cover artwork, animated cover motion, and rollout assets for streaming and social launch windows.',
  },
  {
    title: 'Major Label Campaigns',
    role: 'Creative Director / Motion Lead',
    period: 'Multiple Engagements',
    description: 'Visual systems and motion campaigns for platinum-certified releases. Cover art, visualizers, social content packages, and campaign rollout architecture.',
  },
  {
    title: 'Institutional Platforms',
    role: 'Technical Lead / Product Designer',
    period: 'Multiple Engagements',
    description: 'Board-ready dashboards and investor platforms for fund managers. Premium digital products engineered for trust, clarity, and conversion.',
  },
  {
    title: 'Keith Collins Rugs',
    role: 'Creative Technologist',
    period: '2024',
    description: 'Interactive product visualization platform with AR integration. Transformed high-value collectible product presentation for digital-native audiences.',
  },
  {
    title: 'The Dynamics Multiverse',
    role: 'World Builder / Creative Director',
    period: '2023 - Present',
    description: 'Franchise-scale story universe engineered for expansion across film, series, games, and brand collaborations. Generative lore systems and character IP development.',
  },
]

const toolsAndStack = [
  { 
    category: 'Visual Design', 
    tools: 'Figma, Adobe Photoshop, Adobe Illustrator, Canva Pro',
    description: 'Brand identity, cover art, campaign assets, UI/UX'
  },
  { 
    category: 'Motion & Video', 
    tools: 'Adobe After Effects, Cinema 4D, DaVinci Resolve Studio, Blender',
    description: 'Motion graphics, visualizers, commercial production, color grading'
  },
  { 
    category: 'AI Visual Generation', 
    tools: 'Midjourney, Higgsfield, Google Whisk, Stable Diffusion, DALL-E',
    description: 'Visual asset creation, concept development, release system artwork'
  },
  { 
    category: 'AI Production Suite', 
    tools: 'Google Gemini, Google Flow, Claude, ChatGPT, Custom GPTs',
    description: 'Content generation, workflow automation, production pipelines'
  },
  { 
    category: 'Audio & Music', 
    tools: 'Pro Tools, Reason, Suno AI, Ableton Live',
    description: 'Music production, audio engineering, mixing, sound design'
  },
  { 
    category: 'Development', 
    tools: 'React, Next.js, TypeScript, Node.js, Python, v0',
    description: 'Full-stack applications, AI integrations, production systems'
  },
  { 
    category: 'Infrastructure', 
    tools: 'Vercel, AWS, Supabase, PostgreSQL, GitHub',
    description: 'Deployment, databases, CI/CD, version control'
  },
  { 
    category: '3D & Immersive', 
    tools: 'Cinema 4D, Blender, Three.js, Unity',
    description: 'Product visualization, AR/VR experiences, 3D assets'
  },
]

const achievements = [
  {
    icon: Award,
    title: 'Death Row Records Campaign',
    description: 'Art direction for official label release with global streaming distribution',
  },
  {
    icon: Briefcase,
    title: 'Agency Represented',
    description: 'Commercial creative direction through established talent representation',
  },
  {
    icon: Sparkles,
    title: 'AI Production Pioneer',
    description: 'Early adopter integrating AI tools into professional creative workflows',
  },
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
              <h1 className="font-serif page-header-title font-medium gradient-text-neon">
                Darion R. Harris
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                <span className="text-foreground">(LightGod)</span> | Creative Technologist | Director | Strategist
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                20+ Years Commercial Experience | Agency Represented
              </p>
            </div>
            <Button variant="outline" className="shrink-0 rounded-full" disabled>
              <Download className="mr-2 h-4 w-4" />
              Download PDF (Coming Soon)
            </Button>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="border-b border-border/50 bg-secondary/30 py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <div key={achievement.title} className="flex items-start gap-4 rounded-lg bg-card/60 p-4">
                <div className="icon-3d-neon icon-3d-neon-cyan flex-shrink-0" style={{ width: '2.5rem', height: '2.5rem' }}>
                  <achievement.icon className="h-4 w-4 text-foreground" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">{achievement.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            ))}
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
                Senior creative technologist and director with over two decades of commercial experience 
                across entertainment, music, tech, and institutional verticals. I architect premium 
                creative systems: from cover art and motion campaigns for major label releases, to 
                investor platforms and AI-powered production tools that ship fast and perform at scale. 
                Agency-represented with credits including Death Row Records visual campaigns and 
                platinum-certified release artwork. Currently leading ipxs.digital, an entertainment-focused 
                studio serving artists, labels, and brands with full-service creative technology solutions.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {highlights.map((highlight, index) => (
                  <span key={index} className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground">
                    {highlight}
                  </span>
                ))}
              </div>
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
              <p className="text-sm text-muted-foreground">
                Production-tested tools across visual, motion, audio, AI, and development workflows.
              </p>
            </div>
            <div className="lg:col-span-2">
              <div className="grid gap-6 sm:grid-cols-2">
                {toolsAndStack.map((item) => (
                  <div key={item.category} className="rounded-lg border border-border/50 bg-card/50 p-4 transition-colors hover:border-border">
                    <h3 className="mb-1 text-sm font-medium text-foreground">{item.category}</h3>
                    <p className="mb-2 text-xs text-muted-foreground/70">{item.description}</p>
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
