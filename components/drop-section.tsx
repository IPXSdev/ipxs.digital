'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function DropSection() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSuccessMessage('')
    setError('')

    const normalizedEmail = email.trim().toLowerCase()

    if (!normalizedEmail) {
      setError('Email is required.')
      return
    }

    if (!emailPattern.test(normalizedEmail)) {
      setError('Please enter a valid email address.')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/transmission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: normalizedEmail,
          sourcePage: window.location.pathname,
          sourceLabel: 'home_drop_section',
        }),
      })

      const result = (await response.json()) as {
        error?: string
        alreadySubscribed?: boolean
      }

      if (!response.ok) {
        throw new Error(result.error || 'Unable to join the transmission list.')
      }

      setSuccessMessage(
        result.alreadySubscribed
          ? 'You are already on the transmission list.'
          : 'You are on the transmission list. Watch your inbox.',
      )
      setEmail('')
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Unable to join the transmission list.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="section-fade bg-secondary/20 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Join the Transmission List
          </p>
          <h2 className="max-w-2xl font-serif text-2xl font-medium md:text-3xl">
            Get drops, case-study releases, and studio transmissions first.
          </h2>
          <form className="mt-8 flex flex-col gap-3 sm:flex-row" onSubmit={onSubmit}>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@company.com"
              className="h-11 rounded-full bg-background"
            />
            <Button type="submit" className="h-11 rounded-full px-7" disabled={isSubmitting}>
              {isSubmitting ? 'Joining...' : 'Join'}
            </Button>
          </form>
          {successMessage ? (
            <p className="mt-3 text-sm text-emerald-500">{successMessage}</p>
          ) : null}
          {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
        </div>
      </div>
    </section>
  )
}
