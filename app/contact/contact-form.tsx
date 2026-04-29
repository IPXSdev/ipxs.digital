'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, Check, Copy, Mail, ExternalLink } from 'lucide-react'
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'

const destinationEmail = 'ipxsdev@gmail.com'

const projectTypes = [
  { value: 'release-system', label: 'Release System' },
  { value: 'motion-social', label: 'Motion and Social' },
  { value: 'commercial', label: 'Commercial Spot' },
  { value: 'pitch-deck', label: 'Pitch Deck Architecture' },
  { value: 'deck-walkthrough', label: 'Deck Walkthrough Request' },
  { value: 'website', label: 'Artist/Brand Website' },
  { value: 'mvp-platform', label: 'MVP Platform' },
  { value: 'other', label: 'Other' },
]

const inquiryTypes = [
  { value: 'new-project', label: 'New Project' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'retainer', label: 'Retainer' },
  { value: 'other', label: 'Other' },
]


const bestDayOptions = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
  'Flexible',
]

const bestTimeOptions = ['Morning', 'Afternoon', 'Evening', 'Flexible']

interface ContactDraft {
  name: string
  email: string
  company: string
  phone: string
  projectType: string
  inquiryType: string
  subject: string
  bestDayToCall: string
  bestTimeToCall: string
  message: string
}

const emptyDraft: ContactDraft = {
  name: '',
  email: '',
  company: '',
  phone: '',
  projectType: '',
  inquiryType: '',
  subject: '',
  bestDayToCall: '',
  bestTimeToCall: '',
  message: '',
}

export function ContactForm() {
  const searchParams = useSearchParams()
  const [form, setForm] = useState<ContactDraft>(emptyDraft)
  const [error, setError] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const messageParam = searchParams.get('message')
    const subjectParam = searchParams.get('subject')

    setForm((prev) => ({
      ...prev,
      message: messageParam ?? prev.message,
      subject: subjectParam ?? prev.subject,
      projectType:
        subjectParam && subjectParam.toLowerCase().includes('deck walkthrough')
          ? 'deck-walkthrough'
          : prev.projectType,
    }))
  }, [searchParams])

  const composed = useMemo(() => {
    const projectLabel = projectTypes.find((item) => item.value === form.projectType)?.label ?? form.projectType
    const inquiryLabel = inquiryTypes.find((item) => item.value === form.inquiryType)?.label ?? form.inquiryType

    const subject = `[ipxs.space] ${form.subject}`
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company}`,
      `Phone: ${form.phone}`,
      `Project Type: ${projectLabel}`,
      `Inquiry Type: ${inquiryLabel}`,
      `Best Day to Call: ${form.bestDayToCall}`,
      `Best Time to Call: ${form.bestTimeToCall}`,
      '',
      'Project Details:',
      form.message,
    ].join('\n')

    return { subject, body }
  }, [form])

  const encodedSubject = encodeURIComponent(composed.subject)
  const encodedBody = encodeURIComponent(composed.body)

  const links = {
    mailto: `mailto:${destinationEmail}?subject=${encodedSubject}&body=${encodedBody}`,
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${destinationEmail}&su=${encodedSubject}&body=${encodedBody}`,
    outlook: `https://outlook.office.com/mail/deeplink/compose?to=${destinationEmail}&subject=${encodedSubject}&body=${encodedBody}`,
  }

  const copyPayload = `${destinationEmail}\n\nSubject: ${composed.subject}\n\n${composed.body}`

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(copyPayload)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  const openDialog = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    const requiredFields = [
      form.name,
      form.email,
      form.company,
      form.phone,
      form.projectType,
      form.inquiryType,
      form.subject,
      form.bestDayToCall,
      form.bestTimeToCall,
      form.message,
    ]

    if (requiredFields.some((field) => !field.trim())) {
      setError('Please complete every field before tapping in.')
      return
    }

    await copyMessage()
    setDialogOpen(true)
  }

  const updateField = (key: keyof ContactDraft, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const isValid = (key: keyof ContactDraft) => form[key].trim().length > 0

  return (
    <>
      <form onSubmit={openDialog} className="flex flex-col gap-8">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Name *</FieldLabel>
            <div className="relative">
              <Input id="name" name="name" placeholder="Your full name" required className="rounded-lg bg-card pr-10" value={form.name} onChange={(event) => updateField('name', event.target.value)} />
              {isValid('name') ? <Check className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600" /> : null}
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email *</FieldLabel>
            <div className="relative">
              <Input id="email" name="email" type="email" placeholder="you@company.com" required className="rounded-lg bg-card pr-10" value={form.email} onChange={(event) => updateField('email', event.target.value)} />
              {isValid('email') ? <Check className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600" /> : null}
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="company">Company *</FieldLabel>
            <div className="relative">
              <Input id="company" name="company" placeholder="Company or artist name" required className="rounded-lg bg-card pr-10" value={form.company} onChange={(event) => updateField('company', event.target.value)} />
              {isValid('company') ? <Check className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600" /> : null}
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="phone">Phone *</FieldLabel>
            <div className="relative">
              <Input id="phone" name="phone" placeholder="(555) 555-5555" required className="rounded-lg bg-card pr-10" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} />
              {isValid('phone') ? <Check className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600" /> : null}
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="project-type">Project Type *</FieldLabel>
            <Select value={form.projectType} onValueChange={(value) => updateField('projectType', value)}>
              <div className="relative">
                <SelectTrigger id="project-type" className="rounded-lg bg-card pr-10">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                {isValid('projectType') ? <Check className="pointer-events-none absolute right-9 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600" /> : null}
              </div>
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
            <FieldLabel htmlFor="inquiry-type">Inquiry Type *</FieldLabel>
            <Select value={form.inquiryType} onValueChange={(value) => updateField('inquiryType', value)}>
              <div className="relative">
                <SelectTrigger id="inquiry-type" className="rounded-lg bg-card pr-10">
                  <SelectValue placeholder="Select inquiry type" />
                </SelectTrigger>
                {isValid('inquiryType') ? <Check className="pointer-events-none absolute right-9 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600" /> : null}
              </div>
              <SelectContent>
                {inquiryTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="subject">Subject *</FieldLabel>
            <div className="relative">
              <Input id="subject" name="subject" placeholder="What are we building?" required className="rounded-lg bg-card pr-10" value={form.subject} onChange={(event) => updateField('subject', event.target.value)} />
              {isValid('subject') ? <Check className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600" /> : null}
            </div>
          </Field>


          <Field>
            <FieldLabel htmlFor="best-day-to-call">Best day to call *</FieldLabel>
            <Select value={form.bestDayToCall} onValueChange={(value) => updateField('bestDayToCall', value)}>
              <div className="relative">
                <SelectTrigger id="best-day-to-call" className="rounded-lg bg-card pr-10">
                  <SelectValue placeholder="Select best day" />
                </SelectTrigger>
                {isValid('bestDayToCall') ? (
                  <Check className="pointer-events-none absolute right-9 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600" />
                ) : null}
              </div>
              <SelectContent>
                {bestDayOptions.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="best-time-to-call">Best time to call *</FieldLabel>
            <Select value={form.bestTimeToCall} onValueChange={(value) => updateField('bestTimeToCall', value)}>
              <div className="relative">
                <SelectTrigger id="best-time-to-call" className="rounded-lg bg-card pr-10">
                  <SelectValue placeholder="Select best time" />
                </SelectTrigger>
                {isValid('bestTimeToCall') ? (
                  <Check className="pointer-events-none absolute right-9 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600" />
                ) : null}
              </div>
              <SelectContent>
                {bestTimeOptions.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="message">Project Details *</FieldLabel>
            <div className="relative">
              <Textarea
                id="message"
                name="message"
                placeholder="Share goals, timeline, budget range, and launch context."
                rows={6}
                required
                className="resize-none rounded-lg bg-card pr-10"
                value={form.message}
                onChange={(event) => updateField('message', event.target.value)}
              />
              {isValid('message') ? <Check className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-green-600" /> : null}
            </div>
          </Field>
        </FieldGroup>

        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        <Button type="submit" size="lg" className="w-full rounded-full sm:w-auto">
          Tap in
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose your email app</DialogTitle>
            <DialogDescription>
              Your message is ready for {destinationEmail}. We also copied the email and draft message to your clipboard.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <Button asChild className="justify-between rounded-full">
              <a href={links.mailto}>
                Open Mail App
                <Mail className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" className="justify-between rounded-full">
              <a href={links.gmail} target="_blank" rel="noopener noreferrer">
                Gmail
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" className="justify-between rounded-full">
              <a href={links.outlook} target="_blank" rel="noopener noreferrer">
                Outlook
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button type="button" variant="ghost" onClick={copyMessage} className="justify-between rounded-full">
              {copied ? 'Copied' : 'Copy Email + Message'}
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
