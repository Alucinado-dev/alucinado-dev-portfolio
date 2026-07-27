function normalizeUrl(value: string | undefined) {
  const candidate = value?.trim()
  if (!candidate) return null

  try {
    const url = new URL(candidate.startsWith('http') ? candidate : `https://${candidate}`)
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null
    return new URL('/', url)
  } catch {
    return null
  }
}

export function getSiteUrl() {
  return (
    normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    normalizeUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    normalizeUrl(process.env.VERCEL_URL) ??
    new URL('http://localhost:3000')
  )
}

export function localizedPath(locale: string, path = '/') {
  const suffix = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`
  return `/${locale}${suffix}`
}

export function localizedAlternates(locale: string, path = '/') {
  return {
    canonical: localizedPath(locale, path),
    languages: {
      'pt-BR': localizedPath('pt', path),
      en: localizedPath('en', path),
      'x-default': localizedPath('pt', path),
    },
  }
}
