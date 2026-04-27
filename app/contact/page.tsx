import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ContactForm } from './contact-form'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Start a project with ipxs.digital. Release systems, motion campaigns, pitch decks, and digital platforms.',
}

export default function ContactPage() {
  return (
    <div className="flex flex-col pt-24">
      <section className="pb-14 pt-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
          <h1 className="max-w-3xl font-serif page-header-title font-medium gradient-text-neon">Start a Project</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Share your scope and priorities, then choose how you want to send the message.
            We will be ready with a focused next step.
          </p>
        </div>
      </section>

      <section className="section-fade py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-5 lg:gap-24">
            <div className="lg:col-span-3">
              <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-muted" />}>
                <ContactForm />
              </Suspense>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="mb-4 font-serif text-lg font-medium">What to Expect</h2>
                <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
                  <li className="flex gap-3"><span className="font-mono text-xs text-muted-foreground/50">01</span><span>Fill every field so context is complete.</span></li>
                  <li className="flex gap-3"><span className="font-mono text-xs text-muted-foreground/50">02</span><span>Tap in and choose Mail App, Gmail, or Outlook.</span></li>
                  <li className="flex gap-3"><span className="font-mono text-xs text-muted-foreground/50">03</span><span>Your email draft opens with subject and project details prefilled.</span></li>
                  <li className="flex gap-3"><span className="font-mono text-xs text-muted-foreground/50">04</span><span>ipxsdev@gmail.com and your full message are copied for backup.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
