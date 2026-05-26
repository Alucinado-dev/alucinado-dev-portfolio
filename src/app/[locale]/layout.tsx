import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'

import Background from '@/components/layout/Background'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'Metadata',
  })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <html lang={params.locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Background />
          <Header />
          <main className='p-4'>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
