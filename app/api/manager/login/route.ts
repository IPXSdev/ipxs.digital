import { NextResponse } from 'next/server'
import { getManagerPassword, setManagerSession } from '@/lib/manager-auth'

export async function POST(request: Request) {
  const { password } = (await request.json()) as { password?: string }
  const managerPassword = getManagerPassword()

  if (!managerPassword) {
    return NextResponse.json({ error: 'Dashboard password is not configured.' }, { status: 500 })
  }

  if (!password || password !== managerPassword) {
    return NextResponse.json({ error: 'Invalid password.' }, { status: 401 })
  }

  await setManagerSession(managerPassword)
  return NextResponse.json({ success: true })
}
