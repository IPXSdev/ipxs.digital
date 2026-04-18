import { cookies } from 'next/headers'

const SESSION_COOKIE = 'manager_session'

export function getManagerPassword() {
  return process.env.MANAGER_DASHBOARD_PASSWORD || ''
}

export async function isManagerAuthenticated() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  const password = getManagerPassword()
  return Boolean(password && token && token === password)
}

export async function setManagerSession(password: string) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, password, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12,
  })
}

export async function clearManagerSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}
