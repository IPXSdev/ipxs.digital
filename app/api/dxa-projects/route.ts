import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// GET all projects (public read)
export async function GET() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  const { data, error } = await supabase
    .from('dxa_projects')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// POST create new project (PIN protected)
export async function POST(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const adminPin = process.env.DXA_ADMIN_PIN

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  try {
    const body = await request.json()
    const { pin, ...projectData } = body

    // Server-side PIN validation
    if (!adminPin || pin !== adminPin) {
      return NextResponse.json({ error: 'Invalid PIN' }, { status: 401 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { data, error } = await supabase
      .from('dxa_projects')
      .insert({
        title: projectData.title,
        lane: projectData.lane,
        status: projectData.status,
        priority: projectData.priority,
        type: projectData.type,
        preview_url: projectData.previewUrl,
        summary: projectData.summary,
        current_need: projectData.currentNeed,
        next_action: projectData.nextAction,
        assets_needed: projectData.assetsNeeded,
        notes: projectData.notes,
        is_pinned: projectData.isPinned || false,
        sort_order: projectData.sortOrder || 0,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
