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
          <div className="mx-auto max-w-3xl">
            <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-muted" />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  )
}
