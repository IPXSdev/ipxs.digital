'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import type { ContactSubmissionRow } from '@/lib/manager-data'

const statuses = ['all', 'new', 'read', 'replied', 'archived'] as const

type StatusFilter = (typeof statuses)[number]

export function MessagesConsole({ initialMessages }: { initialMessages: ContactSubmissionRow[] }) {
  const [messages, setMessages] = useState(initialMessages)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [selectedId, setSelectedId] = useState(initialMessages[0]?.id || '')

  const filtered = useMemo(() => {
    return messages.filter((message) => {
      const matchesStatus = status === 'all' ? true : (message.status || 'new') === status
      const q = query.toLowerCase()
      const matchesQuery =
        !q ||
        message.name.toLowerCase().includes(q) ||
        message.email.toLowerCase().includes(q) ||
        message.message.toLowerCase().includes(q)
      return matchesStatus && matchesQuery
    })
  }, [messages, query, status])

  const selected = messages.find((message) => message.id === selectedId) || filtered[0]

  const updateMessage = async (id: string, payload: Record<string, string>) => {
    const response = await fetch(`/api/manager/messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      return
    }

    setMessages((prev) =>
      prev.map((message) =>
        message.id === id ? { ...message, ...payload } : message,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-3xl">Messages</h1>
        <p className="mt-2 text-sm text-muted-foreground">Filter, review, and respond to contact submissions.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <aside className="rounded-xl border border-border bg-card p-4">
          <Input
            placeholder="Search name, email, or message"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {statuses.map((option) => (
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
          <div className="mt-4 max-h-[540px] space-y-2 overflow-y-auto">
            {filtered.map((message) => (
              <button
                key={message.id}
                className="w-full rounded-lg border border-border/50 p-3 text-left hover:border-border"
                onClick={() => setSelectedId(message.id)}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium">{message.name}</p>
                  <Badge variant="outline">{message.status || 'new'}</Badge>
                </div>
                <p className="truncate text-xs text-muted-foreground">{message.email}</p>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{message.message}</p>
              </button>
            ))}
          </div>
        </aside>

        <section className="rounded-xl border border-border bg-card p-5">
          {selected ? (
            <MessageDetail message={selected} onSave={updateMessage} />
          ) : (
            <p className="text-sm text-muted-foreground">No message selected.</p>
          )}
        </section>
      </div>
    </div>
  )
}

function MessageDetail({
  message,
  onSave,
}: {
  message: ContactSubmissionRow
  onSave: (id: string, payload: Record<string, string>) => Promise<void>
}) {
  const [notes, setNotes] = useState(message.internal_notes || '')
  const [replyMessage, setReplyMessage] = useState(message.reply_message || '')

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl">{message.subject || 'Inquiry'}</h2>
          <p className="text-sm text-muted-foreground">
            {message.name} · {message.email}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{new Date(message.created_at).toLocaleString()}</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => onSave(message.id, { status: 'read' })}>Mark read</Button>
          <Button size="sm" variant="outline" onClick={() => onSave(message.id, { status: 'replied' })}>Mark replied</Button>
          <Button size="sm" variant="outline" onClick={() => onSave(message.id, { status: 'archived' })}>Archive</Button>
        </div>
      </div>

      <article className="mt-5 rounded-lg border border-border/50 bg-background/40 p-4">
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.message}</p>
      </article>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium">Internal notes</p>
          <Textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={5} />
          <Button className="mt-2" size="sm" onClick={() => onSave(message.id, { internal_notes: notes })}>Save notes</Button>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Reply draft</p>
          <Textarea value={replyMessage} onChange={(event) => setReplyMessage(event.target.value)} rows={5} />
          <div className="mt-2 flex gap-2">
            <Button size="sm" onClick={() => onSave(message.id, { reply_message: replyMessage, status: 'replied' })}>Save reply</Button>
            <Button size="sm" variant="outline" asChild>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(message.email)}&su=${encodeURIComponent(`Re: ${message.subject || 'Your inquiry'}`)}&body=${encodeURIComponent(replyMessage || '')}`}
                target="_blank"
                rel="noreferrer"
              >
                Reply in Gmail
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
