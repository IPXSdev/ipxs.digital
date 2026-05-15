import { DXAIndexClient } from './client'

// Server component that fetches data via internal API route
export default async function DXAIndexPage() {
  // Fetch projects and queue tasks via the secure API routes
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  try {
    const [projectsResponse, queueResponse] = await Promise.all([
      fetch(`${baseUrl}/api/dxa-projects`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/dxa-queue-tasks`, { cache: 'no-store' }),
    ])

    if (!projectsResponse.ok) {
      throw new Error('Failed to fetch projects')
    }

    const projects = await projectsResponse.json()
    const queueTasks = queueResponse.ok ? await queueResponse.json() : []

    // Transform database records to match the expected interface
    const transformedProjects = (projects || []).map((p: {
      id: string
      title: string
      lane: string | null
      status: string
      priority: string | null
      type: string[] | null
      preview_url: string | null
      summary: string | null
      current_need: string | null
      next_action: string | null
      assets_needed: string | null
      notes: string | null
    }) => ({
      id: p.id,
      title: p.title,
      lane: p.lane || '',
      status: p.status as 'Active' | 'Needs Assets' | 'Needs Review' | 'MVP Preview' | 'Reference' | 'Delivered' | 'Expansion Opportunity',
      priority: (p.priority || 'Medium') as 'High' | 'Medium' | 'Low',
      type: p.type || [],
      previewUrl: p.preview_url || '',
      summary: p.summary || '',
      currentNeed: p.current_need || '',
      nextAction: p.next_action || '',
      assetsNeeded: p.assets_needed || '',
      notes: p.notes || '',
    }))

    return <DXAIndexClient projects={transformedProjects} queueTasks={queueTasks} />
  } catch (error) {
    console.error('[DXA Index] Fetch error:', error)
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Loading Error</h1>
          <p className="mt-2 text-zinc-400">Unable to load projects. Please try again later.</p>
        </div>
      </div>
    )
  }
}
