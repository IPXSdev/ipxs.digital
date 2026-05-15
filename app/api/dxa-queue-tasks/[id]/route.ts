import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const DXA_ADMIN_PIN = process.env.DXA_ADMIN_PIN

// PATCH update a queue task
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { pin, ...taskData } = body

    // Server-side PIN validation
    if (!pin || pin !== DXA_ADMIN_PIN) {
      return NextResponse.json({ error: 'Invalid PIN' }, { status: 401 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const updateData: Record<string, unknown> = {}
    if (taskData.projectTitle !== undefined) updateData.project_title = taskData.projectTitle
    if (taskData.task !== undefined) updateData.task = taskData.task
    if (taskData.ownerType !== undefined) updateData.owner_type = taskData.ownerType
    if (taskData.status !== undefined) updateData.status = taskData.status
    if (taskData.notes !== undefined) updateData.notes = taskData.notes
    if (taskData.sortOrder !== undefined) updateData.sort_order = taskData.sortOrder

    const { data, error } = await supabase
      .from('dxa_queue_tasks')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('[v0] Error updating queue task:', error)
      return NextResponse.json({ error: 'Failed to update queue task' }, { status: 500 })
    }

    return NextResponse.json({
      id: data.id,
      projectTitle: data.project_title,
      task: data.task,
      ownerType: data.owner_type,
      status: data.status,
      notes: data.notes,
      sortOrder: data.sort_order,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    })
  } catch (error) {
    console.error('[v0] Error in PATCH /api/dxa-queue-tasks/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE a queue task
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { pin } = body

    // Server-side PIN validation
    if (!pin || pin !== DXA_ADMIN_PIN) {
      return NextResponse.json({ error: 'Invalid PIN' }, { status: 401 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { error } = await supabase
      .from('dxa_queue_tasks')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('[v0] Error deleting queue task:', error)
      return NextResponse.json({ error: 'Failed to delete queue task' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Error in DELETE /api/dxa-queue-tasks/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
