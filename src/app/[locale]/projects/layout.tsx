import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { localizedAlternates } from '@/lib/site-url'

type ProjectsLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ProjectsLayoutProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.projects.seo' })

  return {
    title: t('title'),
    description: t('description'),
    alternates: localizedAlternates(locale, '/projects'),
    openGraph: {
      title: t('title'),
      description: t('description'),
    },
  }
}

export default function ProjectsLayout({ children }: ProjectsLayoutProps) {
  return children
}
