import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { FlorDoPomarCase } from '@/components/cases/FlorDoPomarCase'
import { LegacyProjectCase } from '@/components/cases/LegacyProjectCase'
import { StandardProjectCase } from '@/components/cases/StandardProjectCase'
import { projects } from '@/lib/data/ProjectData'

type ProjectDetailsPageProps = {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateMetadata({ params }: ProjectDetailsPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const project = projects.find(item => item.slug === slug)

  if (!project) {
    return {}
  }

  const projectContent = await getTranslations({ locale, namespace: 'content.projects' })
  const description = projectContent(`${project.slug}.description`)

  return {
    title: `${project.title} | Lucino Campos`,
    description,
    openGraph: {
      title: `${project.title} | Lucino Campos`,
      description,
    },
  }
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { locale, slug } = await params
  const project = projects.find(item => item.slug === slug)

  if (!project) {
    notFound()
  }

  if (locale === 'pt' && project.slug === 'flor-do-pomar') {
    return <FlorDoPomarCase locale={locale} project={project} />
  }

  if (locale === 'pt') {
    return <StandardProjectCase locale={locale} project={project} />
  }

  return <LegacyProjectCase locale={locale} project={project} />
}
