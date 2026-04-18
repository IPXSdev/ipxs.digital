import { getContactSubmissions, getTransmissionSignups } from '@/lib/manager-data'

function startOfWeek(date: Date) {
  const d = new Date(date)
  const day = d.getUTCDay()
  const diff = (day + 6) % 7
  d.setUTCDate(d.getUTCDate() - diff)
  d.setUTCHours(0, 0, 0, 0)
  return d
}

function startOfMonth(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1))
}

export default async function ManagerOverviewPage() {
  const [messages, signups] = await Promise.all([
    getContactSubmissions(),
    getTransmissionSignups(),
  ])

  const now = new Date()
  const weekStart = startOfWeek(now)
  const monthStart = startOfMonth(now)

  const messagesThisWeek = messages.filter((m) => new Date(m.created_at) >= weekStart).length
  const signupsThisWeek = signups.filter((s) => new Date(s.created_at) >= weekStart).length
  const messagesThisMonth = messages.filter((m) => new Date(m.created_at) >= monthStart).length
  const signupsThisMonth = signups.filter((s) => new Date(s.created_at) >= monthStart).length
  const replied = messages.filter((m) => m.status === 'replied' || Boolean(m.reply_message)).length

  const inquiryBuckets = messages.reduce<Record<string, number>>((acc, row) => {
    const key = row.inquiry_type || 'unknown'
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})

  const signupTrend = signups.reduce<Record<string, number>>((acc, row) => {
    const key = row.created_at.slice(0, 10)
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})

  const statCards = [
    ['Total contact submissions', messages.length],
    ['Total transmission signups', signups.length],
    ['Combined leads', messages.length + signups.length],
    ['New this week', messagesThisWeek + signupsThisWeek],
    ['New this month', messagesThisMonth + signupsThisMonth],
    ['Replied inquiries', replied],
  ]

  return (
    <div className="space-y-8">
      <section>
        <h1 className="font-serif text-3xl">Overview</h1>
        <p className="mt-2 text-sm text-muted-foreground">Unified lead analytics across contact inquiries and transmission signups.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {statCards.map(([label, value]) => (
          <article key={label} className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-2 font-serif text-3xl">{value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-medium">Contact submissions by inquiry type</h2>
          <div className="mt-4 space-y-2 text-sm">
            {Object.entries(inquiryBuckets).map(([bucket, count]) => (
              <div key={bucket} className="flex items-center justify-between border-b border-border/50 pb-2">
                <span className="text-muted-foreground">{bucket}</span>
                <span>{count}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-medium">Transmission signups trend</h2>
          <div className="mt-4 space-y-2 text-sm">
            {Object.entries(signupTrend)
              .sort((a, b) => (a[0] > b[0] ? -1 : 1))
              .slice(0, 14)
              .map(([day, count]) => (
                <div key={day} className="flex items-center justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">{day}</span>
                  <span>{count}</span>
                </div>
              ))}
          </div>
        </article>
      </section>
    </div>
  )
}
