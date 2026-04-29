import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Download, Mail, Linkedin, Globe, Award, Briefcase, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Darion R. Harris (LightGod). Creative technologist, director, post-production lead, SSL-certified audio engineer, and AI production architect building entertainment, music, film, and original IP systems through ipxs.digital.',
}

const highlights = [
  '20+ years of commercial creative and technical production experience',
  'Agency-represented creative director, technologist, and post-production lead',
  'Head of Post Production for HSS FEED with Adrian Miller',
  'SSL-certified audio engineer',
  'Commercially released TV/film work distributed through Tubi TV and Roku TV',
  'Executive Producer, Consulting Producer, Writer, Director, and Supervising Editor credits',
  'Major recording campaign systems across Death Row Records, Delicious Vinyl Island Records, and label-facing releases',
  'Flagship AI artist and original IP deployment through Pri$$y Vandro$$',
]

const coreStrengths = [
  'Creative direction and visual strategy for entertainment, music, film, and technology brands',
  'Post-production leadership for podcast, music, commercial, and long-form content workflows',
  'SSL-certified audio engineering, music production, mixing, and sound design',
  'Executive production, writing, directing, and supervising editorial for commercially released screen projects',
  'Full-stack product design and development for websites, platforms, AI tools, and digital experiences',
  'Motion design, visual release systems, animated covers, commercial assets, and campaign architecture',
  'Pitch deck strategy and investor-ready presentation systems for entertainment and institutional projects',
  'AI-powered workflow design, custom GPT/product development, and production automation',
  'Original IP architecture spanning character development, lore, music, visuals, licensing, and rollout strategy',
  'Cross-functional leadership across creative, engineering, post-production, and business teams',
]

const selectedWork = [
  {
    title: 'ipxs.digital',
    role: 'Founder & Lead Creative Technologist',
    period: '2020 - Present',
    description: 'Entertainment-focused creative technology studio building AI-powered release ecosystems, original IP systems, artist infrastructure, pitch architecture, websites, and campaign assets for artists, labels, brands, and institutional clients.',
  },
  {
    title: 'HSS FEED',
    role: 'Head of Post Production',
    period: '2026',
    description: 'Post-production leadership for a music industry podcast hosted by veteran music executive and A&R Adrian Miller, supporting editorial flow, audio/video finishing, delivery standards, and content readiness.',
  },
  {
    title: 'CharliBereal x Death Row Records',
    role: 'Creative Director',
    period: '2025',
    description: 'End-to-end creative art direction for commercially released music campaigns, including primary cover artwork, animated cover motion, rollout assets, and visual release systems tailored for streaming and social launch windows.',
  },
  {
    title: 'Major Recording Campaigns',
    role: 'Creative Director / Motion Lead',
    period: 'Multiple Engagements',
    description: 'Visual systems and motion campaigns across recording-industry releases, including Death Row Records, Delicious Vinyl Island Records, and other label-facing campaigns. Work includes cover art, visualizers, social content packages, and rollout architecture.',
  },
  {
    title: 'Pri$$y Vandro$$',
    role: 'Flagship AI Artist / Original IP Deployment',
    period: '2026',
    description: 'Flagship AI artist and original IP deployment under IPXS, combining music production, character design, cinematic visual systems, lore, website infrastructure, licensing strategy, and case-study-driven commercialization.',
  },
  {
    title: 'Commercially Released TV/Film Projects',
    role: 'Executive Producer / Consulting Producer / Writer / Director / Supervising Editor',
    period: 'Multiple Releases',
    description: 'Screen production work distributed through Tubi TV and Roku TV, with credits spanning executive production, consulting production, writing, directing, and supervising editorial.',
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
    period: '2026',
    description: 'AI-assisted commercial production and visual asset system built from client-supplied materials, transforming a niche product story into a cinematic, social-ready commercial campaign.',
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
    tools: 'Pro Tools, Reason, SSL-certified audio engineering, Suno AI',
    description: 'Music production, audio engineering, mixing, sound design, and AI-assisted vocal/music workflows'
  },
  { 
    category: 'Development', 
    tools: 'React, Next.js, TypeScript, Node.js, Python',
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
    title: 'Major Recording Campaigns',
    description: 'Creative direction and rollout assets across Death Row Records, Delicious Vinyl Island Records, and label-facing release campaigns.',
  },
  {
    icon: Briefcase,
    title: 'Flagship Original IP',
    description: 'Pri$$y Vandro$$ anchors an IPXS-built artist system spanning music, lore, visuals, licensing, and AI-native platform deployment.',
  },
  {
    icon: Sparkles,
    title: 'AI Production Pioneer',
    description: 'Early adopter integrating AI tools into professional creative, post-production, music, and release workflows.',
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
                Senior creative technologist, director, post-production lead, and SSL-certified audio engineer with over two decades of commercial experience across music, film, television, technology, and original IP development. I build complete creative systems: release campaigns, cinematic assets, pitch architecture, AI-assisted production pipelines, websites, and platform-ready brand ecosystems. My work spans major recording campaigns, commercially released TV/film projects distributed through Tubi TV and Roku TV, and high-level production roles including Executive Producer, Consulting Producer, Writer, Director, and Supervising Editor. I currently lead ipxs.digital while serving as Head of Post Production for HSS FEED, a music industry podcast hosted by veteran music executive and A&R Adrian Miller. Pri$$y Vandro$$ is my flagship AI artist and original IP deployment, built to demonstrate how IPXS can create, package, and scale AI-native entertainment properties.
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
