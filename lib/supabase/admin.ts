import 'server-only'

import { getSupabaseServiceRoleKey, getSupabaseUrl } from '@/lib/supabase-rest'

export function isSupabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
}

export async function supabaseAdminFetch(path: string, init: RequestInit = {}) {
  const key = getSupabaseServiceRoleKey()
  const url = `${getSupabaseUrl()}/rest/v1/${path}`
  return fetch(url, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      ...(init.headers || {}),
    },
    cache: 'no-store',
  })
}
