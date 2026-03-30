export type Locale = 'pt' | 'en' | 'es' | 'fr' | 'it'

export const localeCookieName = 'vf_locale'

export const supportedLocales: Locale[] = ['pt', 'en', 'es', 'fr', 'it']

export const localeLabels: Record<Locale, string> = {
  pt: 'Portugu\u00eas',
  en: 'English',
  es: 'Espa\u00f1ol',
  fr: 'Fran\u00e7ais',
  it: 'Italiano',
}

export function normalizeLocale(value?: string | null): Locale {
  if (!value) {
    return 'pt'
  }

  const normalized = value.trim().toLowerCase().slice(0, 2)
  return supportedLocales.includes(normalized as Locale) ? (normalized as Locale) : 'pt'
}

export function toHtmlLang(locale: Locale) {
  if (locale === 'pt') return 'pt-BR'
  if (locale === 'en') return 'en'
  if (locale === 'es') return 'es'
  if (locale === 'fr') return 'fr'
  return 'it'
}

export function interpolate(template: string, values: Record<string, string>) {
  return Object.entries(values).reduce((acc, [key, value]) => acc.replaceAll(`{${key}}`, value), template)
}
