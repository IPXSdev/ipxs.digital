'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { ArrowRight, Check } from 'lucide-react'

const projectTypes = [
  { value: 'release-system', label: 'Release System' },
  { value: 'motion-social', label: 'Motion/Social' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'pitch-deck', label: 'Pitch Deck' },
  { value: 'website', label: 'Website' },
  { value: 'mvp-platform', label: 'MVP Platform' },
  { value: 'custom-gpt', label: 'Custom GPT' },
  { value: 'other', label: 'Other / Not Sure' },
]

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [projectType, setProjectType] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)

    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()

    if (!name || !email || !message || !projectType) {
      setError('Please complete all required fields before submitting.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          projectType,
          subject: `Website inquiry (${projectType})`,
          sourcePage: window.location.pathname,
        }),
      })

      const result = (await response.json()) as { error?: string }

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit contact form.')
      }

      form.reset()
      setProjectType('')
      setSubmitted(true)
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Failed to submit contact form.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-12 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-foreground">
          <Check className="h-8 w-8 text-background" />
        </div>
        <h2 className="mb-2 font-serif text-2xl font-medium">Message Sent</h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          Thanks for reaching out. We&apos;ll review your message and get back to you within 24-48 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            required
            className="rounded-lg bg-card"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            required
            className="rounded-lg bg-card"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="project-type">Project Type</FieldLabel>
          <Select value={projectType} onValueChange={setProjectType} required>
            <SelectTrigger id="project-type" className="rounded-lg bg-card">
              <SelectValue placeholder="Select a project type" />
            </SelectTrigger>
            <SelectContent>
              {projectTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell us about your project, timeline, and any specific requirements..."
            rows={6}
            required
            className="resize-none rounded-lg bg-card"
          />
        </Field>
      </FieldGroup>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <Button
        type="submit"
        size="lg"
        className="w-full rounded-full sm:w-auto"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          'Sending...'
        ) : (
          <>
            Send Message
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  )
}
