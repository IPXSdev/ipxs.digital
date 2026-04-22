import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ContactForm } from './contact-form'
import { Calendar, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Start a project with ipxs.digital. Release systems, motion campaigns, pitch decks, and digital platforms.',
}

export default function ContactPage() {
  return (
    <div className="flex flex-col pt-24">
      {/* Header */}
      <section className="border-b border-border/50 pb-16 pt-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Contact
          </p>
          <h1 className="max-w-3xl font-serif page-header-title font-medium gradient-text-neon">
            Start a Project
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Tell us about what you&apos;re building. We&apos;ll get back to you within 24-48 hours 
            with thoughts on how we can help.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-5 lg:gap-24">
            {/* Form */}
            <div className="lg:col-span-3">
              <Suspense fallback={<div className="animate-pulse h-96 rounded-lg bg-muted" />}>
                <ContactForm />
              </Suspense>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              <div className="flex flex-col gap-8">
                {/* Quick Contact */}
                <div className="rounded-lg border border-border bg-card p-6">
                  <h2 className="mb-4 font-serif text-lg font-medium">Other Ways to Connect</h2>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-secondary">
                        <Mail className="h-4 w-4 text-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Email Directly</p>
                        <p className="text-sm text-muted-foreground">hello@ipxs.digital</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-secondary">
                        <Calendar className="h-4 w-4 text-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Book a Call</p>
                        <Button asChild variant="link" className="h-auto p-0 text-sm text-muted-foreground">
                          <Link href="#" className="hover:text-foreground">
                            Schedule via Calendly (Coming Soon)
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="rounded-lg border border-border bg-card p-6">
                  <h2 className="mb-4 font-serif text-lg font-medium">What to Expect</h2>
                  <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="font-mono text-xs text-muted-foreground/50">01</span>
                      <span>Response within 24-48 hours</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-mono text-xs text-muted-foreground/50">02</span>
                      <span>Initial discovery call to understand scope</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-mono text-xs text-muted-foreground/50">03</span>
                      <span>Proposal with timeline and investment</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-mono text-xs text-muted-foreground/50">04</span>
                      <span>Kickoff and project start</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
