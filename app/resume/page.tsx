import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Download, Mail, Linkedin, Globe, Award, Briefcase, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Darion R. Harris (LightGod). Creative technologist, director, post-production lead, SSL-certified audio engineer, and AI production architect building entertainment, music, film, and original IP systems through ipxs.digital.',
}

const capabilityIndex = [
  'Creative Direction',
  'Post-Production Leadership',
  'AI Production Workflows',
  'Music Release Campaigns',
  'Film & TV Production',
  'Supervising Editorial',
  'SSL-Certified Audio Engineering',
  'Product Design',
  'Next.js / React',
  'Pitch Deck Architecture',
  'Original IP Development',
  'Motion Design',
  'Brand Systems',
  'MVP Platforms',
  'Visual Storytelling',
  'Technical Production',
  'Artist Infrastructure',
  'Campaign Architecture',
  'AI-Native Entertainment',
  'Full-Stack Creative Systems',
]

const coreCompetencies = [
  {
    title: 'Creative & Brand Systems',
    bullets: [
      'Creative direction for entertainment, music, film, technology, and founder-led brands',
      'Campaign architecture for singles, albums, podcasts, commercials, pitch decks, and product launches',
      'Visual identity systems, cover art, rollout assets, presentation design, and premium brand storytelling',
      'Narrative strategy that connects audience attention to conversion, cultural relevance, and long-term IP value',
    ],
  },
  {
    title: 'Post-Production, Film/TV & Audio',
    bullets: [
      'Head of Post Production workflow leadership for HSS FEED, hosted by veteran music executive and A&R Adrian Miller',
      'Supervising editorial, finishing workflows, delivery preparation, and content packaging for audio/video releases',
      'SSL-certified audio engineering with experience across music production, mixing, sound design, and podcast post',
      'Commercially released TV/film experience with credits spanning Executive Producer, Consulting Producer, Writer, Director, and Supervising Editor',
    ],
  },
  {
    title: 'AI-Native Production & Automation',
    bullets: [
      'AI-assisted production pipelines for visual development, motion campaigns, music ideation, character systems, and rapid asset generation',
      'Custom GPT workflows, prompt systems, and production frameworks for repeatable creative output',
      'Human-led quality control across AI-generated assets, story logic, brand consistency, and platform-ready deliverables',
      'Integration of tools like Higgsfield, Midjourney, Suno, Google Flow, ChatGPT, Claude, Gemini, and custom AI assistants into real production use cases',
    ],
  },
  {
    title: 'Product, Web & Platform Development',
    bullets: [
      'Digital product design and front-end architecture for websites, investor platforms, dashboards, MVPs, and creator-facing experiences',
      'Practical build experience with Next.js, React, TypeScript, Supabase, PostgreSQL, Vercel, GitHub, and modern deployment workflows',
      'Conversion-focused site planning for creative agencies, artists, fund managers, podcasts, original IP, and commercial brands',
      'Bridge between creative strategy, technical implementation, client communication, and launch-readiness',
    ],
  },
]

const selectedWork = [
  {
    title: 'ipxs.digital',
    role: 'Founder & Lead Creative Technologist',
    period: '2020 - Present',
    description:
      'Founded and lead an entertainment-focused creative technology studio building AI-assisted release ecosystems, original IP systems, artist infrastructure, pitch architecture, websites, MVP platforms, motion campaigns, and campaign-ready creative assets for artists, labels, brands, founders, and institutional clients.',
  },
  {
    title: 'HSS FEED',
    role: 'Head of Post Production',
    period: '2026',
    description:
      'Lead post-production workflows for a music industry podcast hosted by veteran music executive and A&R Adrian Miller. Responsibilities include editorial flow, audio/video finishing, episode readiness, delivery standards, and production organization across a music-industry content pipeline.',
  },
  {
    title: 'Pri$$y Vandro$$',
    role: 'Flagship AI Artist / Original IP Deployment',
    period: '2026',
    description:
      'Created and developed the flagship AI artist and original IP deployment under IPXS, combining music production, character design, cinematic visuals, lore, web infrastructure, licensing strategy, and visual album planning into a scalable entertainment property.',
  },
  {
    title: 'Major Recording Campaigns',
    role: 'Creative Director / Motion Lead',
    period: 'Multiple Engagements',
    description:
      'Designed visual systems and motion assets across recording-industry campaigns, including Death Row Records and Delicious Vinyl Island Records. Work includes cover art, animated cover motion, visualizers, social content packages, release identity systems, and rollout architecture for streaming and digital platforms.',
  },
  {
    title: 'Commercially Released TV/Film Projects',
    role: 'Executive Producer / Consulting Producer / Writer / Director / Supervising Editor',
    period: 'Multiple Releases',
    description:
      'Contributed to commercially released TV/film projects distributed through Tubi TV and Roku TV, with credits spanning executive production, consulting production, writing, directing, supervising editorial, and post-production oversight.',
  },
  {
    title: 'Emory Capital',
    role: 'Product Designer / Technical Lead',
    period: '2026',
    description:
      'Designed and developed an institutional-grade digital presence and demo partner dashboard for a private capital platform. Work included brand presentation, investor-facing copy, MVP interface planning, dashboard structure, and trust-focused digital product execution.',
  },
  {
    title: 'Keith Collins Rugs',
    role: 'Creative Technologist',
    period: '2026',
    description:
      'Built an AI-assisted commercial production and visual asset system from client-supplied materials, turning a niche product story into a cinematic, comedic, social-ready campaign with a clear production workflow and marketable visual identity.',
  },
  {
    title: 'Pitch Deck Architecture',
    role: 'Narrative Strategist / Deck Designer',
    period: 'Multiple Engagements',
    description:
      'Developed investor-facing and entertainment-facing pitch decks that translate complex ideas into clear, persuasive presentations. Work includes narrative sequencing, positioning, visual systems, proof framing, and presentation-ready assets for founders, producers, artists, and brands.',
  },
  {
    title: 'The Dynamics Multiverse',
    role: 'World Builder / Creative Director',
    period: '2023 - Present',
    description:
      'Built a franchise-scale story universe with lore systems, character logic, canon structure, visual language, and expansion pathways for film, series, games, collectibles, brand collaborations, and generative story development.',
  },
]

const toolsAndStack = [
  {
    category: 'Visual Design',
    tools: 'Figma, Adobe Photoshop, Adobe Illustrator, Canva Pro',
    description: 'Brand identity, cover art, release assets, pitch visuals, UI/UX, and campaign design systems.',
  },
  {
    category: 'Motion, Editorial & Video',
    tools: 'Adobe After Effects, Cinema 4D, DaVinci Resolve Studio, Blender',
    description: 'Motion graphics, visualizers, commercials, trailers, color workflows, editorial finishing, and campaign video assets.',
  },
  {
    category: 'AI Visual & Generative Production',
    tools: 'Midjourney, Higgsfield, Google Whisk, Stable Diffusion, DALL-E, Google Flow',
    description: 'Concept development, character design, motion ideation, cinematic assets, visual treatments, and rapid production prototyping.',
  },
  {
    category: 'AI Strategy & Automation',
    tools: 'ChatGPT, Claude, Google Gemini, Custom GPTs',
    description: 'Prompt systems, production assistants, content workflows, brand logic, script support, research systems, and repeatable creative operations.',
  },
  {
    category: 'Audio & Music',
    tools: 'Pro Tools, Reason, SSL-Certified Audio Engineering, Suno AI',
    description: 'Music production, vocal and audio workflows, mixing, sound design, podcast post-production, and AI-assisted music development.',
  },
  {
    category: 'Development',
    tools: 'React, Next.js, TypeScript, Node.js, Python',
    description: 'Web applications, landing pages, platform prototypes, custom tools, and AI-connected product experiences.',
  },
  {
    category: 'Infrastructure',
    tools: 'Vercel, Supabase, PostgreSQL, AWS, GitHub',
    description: 'Deployment, databases, storage, CI/CD workflows, version control, authentication-aware builds, and production handoff.',
  },
  {
    category: '3D & Immersive',
    tools: 'Cinema 4D, Blender, Three.js, Unity',
    description: 'Product visualization, 3D assets, interactive concepts, AR/VR planning, and immersive entertainment experiences.',
  },
]

const achievements = [
  {
    icon: Award,
    title: 'Creative Technology Leadership',
    description:
      'Founder of ipxs.digital, building entertainment-facing systems that connect creative direction, AI workflows, artist infrastructure, campaign assets, websites, MVP platforms, and original IP development.',
  },
  {
    icon: Briefcase,
    title: 'Post-Production & Screen Credits',
    description:
      'Head of Post Production for HSS FEED, with commercially released TV/film work distributed through Tubi TV and Roku TV, plus credits across executive production, consulting production, writing, directing, and supervising editorial.',
  },
  {
    icon: Sparkles,
    title: 'Music Campaign Systems',
    description:
      'Creative and motion direction for major recording campaigns, including Death Row Records and Delicious Vinyl Island Records, with work spanning cover art, animated motion, rollout assets, and streaming/social delivery.',
  },
]

export default function ResumePage() {
  return (
    <div className="flex flex-col pt-24">
      <section className="border-b border-border/50 pb-16 pt-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">RESUME</p>
              <h1 className="font-serif page-header-title font-medium gradient-text-neon">Darion R. Harris</h1>
              <p className="mt-2 text-lg text-muted-foreground">
                <span className="text-foreground">(LightGod)</span> | Creative Technologist | Director | Post-Production Lead | AI Production Architect
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                20+ Years Commercial Experience | Agency Represented | SSL-Certified Audio Engineer
              </p>
            </div>
            <Button variant="outline" className="shrink-0 rounded-full" disabled>
              <Download className="mr-2 h-4 w-4" />
              Download PDF (Coming Soon)
            </Button>
          </div>
        </div>
      </section>

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

      <section className="border-b border-border/50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div>
              <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">SUMMARY</h2>
            </div>
            <div className="lg:col-span-2">
              <p className="text-base leading-relaxed text-foreground md:text-lg">
                Senior creative technologist, director, post-production lead, and SSL-certified audio engineer operating across entertainment, music, film/TV, AI production, and digital product development. I build complete creative systems from concept through delivery, including release campaigns, cinematic assets, editorial workflows, pitch decks, websites, MVP platforms, and original IP ecosystems. My work combines agency-level creative direction, hands-on post-production leadership, audio engineering, product strategy, and modern AI-assisted workflows to help artists, labels, brands, and founders turn ideas into market-ready platforms, campaigns, and entertainment properties.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div>
              <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">CAPABILITY INDEX</h2>
            </div>
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2">
                {capabilityIndex.map((capability) => (
                  <span key={capability} className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground">
                    {capability}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div>
              <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">CORE COMPETENCIES</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
              {coreCompetencies.map((group) => (
                <article key={group.title} className="rounded-lg border border-border/50 bg-card/50 p-5">
                  <h3 className="mb-3 text-sm font-medium text-foreground">{group.title}</h3>
                  <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                    {group.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div>
              <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">SELECTED EXPERIENCE</h2>
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

      <section className="border-b border-border/50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div>
              <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">TOOLS & STACK</h2>
              <p className="text-sm text-muted-foreground">
                Production-tested tools across visual design, motion, post-production, audio, AI, web development, and immersive media.
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

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div>
              <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">CONTACT</h2>
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
