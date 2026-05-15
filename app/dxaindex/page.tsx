import { createClient } from '@supabase/supabase-js'
import { DXAIndexClient } from './client'

// Server component that fetches data from Supabase
export default async function DXAIndexPage() {
  // Use service role key for internal admin access (bypasses RLS)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Configuration Error</h1>
          <p className="mt-2 text-zinc-400">Missing Supabase environment variables.</p>
        </div>
      </div>
    )
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  const { data: projects, error } = await supabase
    .from('dxa_projects')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('[v0] Supabase error:', error)
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Database Error</h1>
          <p className="mt-2 text-zinc-400">{error.message}</p>
        </div>
      </div>
    )
  }

  // Transform database records to match the expected interface
  const transformedProjects = (projects || []).map((p) => ({
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

  return <DXAIndexClient projects={transformedProjects} />
}
