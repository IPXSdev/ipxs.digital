'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import type { TransmissionSignupRow } from '@/lib/manager-data'

export function TransmissionConsole({ initialSignups }: { initialSignups: TransmissionSignupRow[] }) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')

  const filtered = useMemo(() => {
    return initialSignups.filter((signup) => {
      const q = query.toLowerCase()
      const matchesQuery = !q || signup.email.toLowerCase().includes(q)
      const matchesStatus = status === 'all' ? true : (signup.status || 'active') === status
      return matchesQuery && matchesStatus
    })
  }, [initialSignups, query, status])

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl">Transmission List</h1>
          <p className="mt-2 text-sm text-muted-foreground">Subscriber management for drop notifications and transmission campaigns.</p>
        </div>
        <Button asChild variant="outline">
          <a href="/api/manager/transmission/export">Export CSV</a>
        </Button>
      </header>

      <section className="rounded-xl border border-border bg-card p-4">
        <div className="flex flex-wrap gap-3">
          <Input
            className="max-w-sm"
            placeholder="Search email"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {['all', 'active', 'paused', 'unsubscribed'].map((option) => (
            <Button
              key={option}
              size="sm"
              variant={status === option ? 'default' : 'outline'}
              onClick={() => setStatus(option)}
            >
              {option}
            </Button>
          ))}
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground">
              <tr className="border-b border-border/60">
                <th className="py-2">Email</th>
                <th className="py-2">Created</th>
                <th className="py-2">Source page</th>
                <th className="py-2">Status</th>
                <th className="py-2">Tags</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((signup) => (
                <tr key={signup.id} className="border-b border-border/40">
                  <td className="py-2">{signup.email}</td>
                  <td className="py-2 text-muted-foreground">{new Date(signup.created_at).toLocaleString()}</td>
                  <td className="py-2 text-muted-foreground">{signup.source_page || '—'}</td>
                  <td className="py-2"><Badge variant="outline">{signup.status || 'active'}</Badge></td>
                  <td className="py-2 text-muted-foreground">{signup.tags?.join(', ') || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
