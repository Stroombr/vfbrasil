import { cookies } from 'next/headers'

import { normalizeLocale, type Locale, localeCookieName } from './i18n'

export async function getRequestLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  return normalizeLocale(cookieStore.get(localeCookieName)?.value)
}
