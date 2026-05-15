import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const DXA_ADMIN_PIN = process.env.DXA_ADMIN_PIN

// GET all queue tasks
export async function GET() {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    const { data, error } = await supabase
      .from('dxa_queue_tasks')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('[v0] Error fetching queue tasks:', error)
      return NextResponse.json({ error: 'Failed to fetch queue tasks' }, { status: 500 })
    }

    // Transform snake_case to camelCase for frontend
    const tasks = data.map((task: Record<string, unknown>) => ({
      id: task.id,
      projectTitle: task.project_title,
      task: task.task,
      ownerType: task.owner_type,
      status: task.status,
      notes: task.notes,
      sortOrder: task.sort_order,
      createdAt: task.created_at,
      updatedAt: task.updated_at,
    }))

    return NextResponse.json(tasks)
  } catch (error) {
    console.error('[v0] Error in GET /api/dxa-queue-tasks:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST create a new queue task
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { pin, ...taskData } = body

    // Server-side PIN validation
    if (!pin || pin !== DXA_ADMIN_PIN) {
      return NextResponse.json({ error: 'Invalid PIN' }, { status: 401 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { data, error } = await supabase
      .from('dxa_queue_tasks')
      .insert({
        project_title: taskData.projectTitle,
        task: taskData.task,
        owner_type: taskData.ownerType || 'Me',
        status: taskData.status || 'Open',
        notes: taskData.notes || null,
        sort_order: taskData.sortOrder || 0,
      })
      .select()
      .single()

    if (error) {
      console.error('[v0] Error creating queue task:', error)
      return NextResponse.json({ error: 'Failed to create queue task' }, { status: 500 })
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
    console.error('[v0] Error in POST /api/dxa-queue-tasks:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
