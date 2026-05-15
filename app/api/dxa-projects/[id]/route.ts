import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// PATCH update project (PIN protected)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
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
      .update({
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
        is_pinned: projectData.isPinned,
        sort_order: projectData.sortOrder,
      })
      .eq('id', id)
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

// DELETE project (PIN protected)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const adminPin = process.env.DXA_ADMIN_PIN

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const pin = searchParams.get('pin')

    // Server-side PIN validation
    if (!adminPin || pin !== adminPin) {
      return NextResponse.json({ error: 'Invalid PIN' }, { status: 401 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { error } = await supabase
      .from('dxa_projects')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
