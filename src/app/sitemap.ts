import type { MetadataRoute } from 'next'

import { projects } from '@/lib/data/ProjectData'
import { getSiteUrl, localizedPath } from '@/lib/site-url'

const locales = ['pt', 'en'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()
  const routes = [
    { path: '/', changeFrequency: 'monthly' as const, priority: 1 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/projects', changeFrequency: 'monthly' as const, priority: 0.9 },
    ...projects.map(project => ({
      path: `/projects/${project.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
  ]

  return routes.flatMap(route =>
    locales.map(locale => ({
      url: new URL(localizedPath(locale, route.path), siteUrl).toString(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          'pt-BR': new URL(localizedPath('pt', route.path), siteUrl).toString(),
          en: new URL(localizedPath('en', route.path), siteUrl).toString(),
        },
      },
    })),
  )
}
