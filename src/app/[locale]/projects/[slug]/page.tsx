import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { FlorDoPomarCase } from '@/components/cases/FlorDoPomarCase'
import { StandardProjectCase } from '@/components/cases/StandardProjectCase'
import { projects } from '@/lib/data/ProjectData'
import { getSocialImage, localizedAlternates } from '@/lib/site-url'

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
    alternates: localizedAlternates(locale, `/projects/${project.slug}`),
    openGraph: {
      title: `${project.title} | Lucino Campos`,
      description,
      images: [getSocialImage()],
    },
  }
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { locale, slug } = await params
  const project = projects.find(item => item.slug === slug)

  if (!project) {
    notFound()
  }

  if (project.slug === 'flor-do-pomar') {
    return <FlorDoPomarCase locale={locale} project={project} />
  }

  return <StandardProjectCase locale={locale} project={project} />
}
