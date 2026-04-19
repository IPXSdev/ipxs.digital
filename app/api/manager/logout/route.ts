import { NextResponse } from 'next/server'
import { clearManagerSession } from '@/lib/manager-auth'

export async function POST() {
  await clearManagerSession()
  return NextResponse.json({ success: true })
}
