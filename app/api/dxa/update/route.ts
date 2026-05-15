import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Missing Supabase configuration' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const project = await request.json()

    // Transform camelCase to snake_case for database
    const dbRecord = {
      title: project.title,
      lane: project.lane,
      status: project.status,
      priority: project.priority,
      type: project.type,
      preview_url: project.previewUrl,
      summary: project.summary,
      current_need: project.currentNeed,
      next_action: project.nextAction,
      assets_needed: project.assetsNeeded,
      notes: project.notes,
    }

    const { error } = await supabase
      .from('dxa_projects')
      .update(dbRecord)
      .eq('id', project.id)

    if (error) {
      console.error('[v0] Supabase update error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] API error:', error)
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}
