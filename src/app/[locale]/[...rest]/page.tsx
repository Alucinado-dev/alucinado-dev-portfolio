import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

type UnknownRoutePageProps = {
  params: Promise<{ locale: string; rest: string[] }>
}

export async function generateMetadata({ params }: UnknownRoutePageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.notFound' })

  return {
    title: t('metadataTitle'),
    description: t('description'),
  }
}

export default function UnknownRoutePage() {
  notFound()
}
