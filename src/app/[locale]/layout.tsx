import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import {
  Asimovian,
  Audiowide,
  Exo_2,
  Outfit,
  Rajdhani,
  Space_Grotesk,
  Syne_Mono,
  VT323,
  Zen_Dots,
} from 'next/font/google'
import { headers } from 'next/headers'

import Container from '@/components/container/Container'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { AppProviders } from '@/components/providers/AppProviders'
import { getSiteUrl } from '@/lib/site-url'

import '../../styles/globals.css'

const outfit = Outfit({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const SpaceGrotesk = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const SyneMono = Syne_Mono({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-syne-mono',
  display: 'swap',
})

const Exo2 = Exo_2({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900', '100'],
  subsets: ['latin'],
  variable: '--font-exo-2',
  display: 'swap',
})

const rajdhani = Rajdhani({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-rajdhani',
  display: 'swap',
})

const asimovian = Asimovian({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-asimovian',
  display: 'swap',
  adjustFontFallback: false,
})

const audiowide = Audiowide({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-audiowide',
  display: 'swap',
})

const zenDots = Zen_Dots({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-zen-dots',
  display: 'swap',
})

const vt323 = VT323({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-vt323',
  display: 'swap',
})

const fonts = [outfit, SpaceGrotesk, SyneMono, Exo2, rajdhani, asimovian, audiowide, zenDots, vt323]
  .map(font => font.variable)
  .join(' ')

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const t = await getTranslations({
    locale: (await params).locale,
    namespace: 'metadata',
  })

  return {
    metadataBase: getSiteUrl(),
    title: t('title'),
    description: t('description'),
    applicationName: 'alucinado.dev',
    authors: [{ name: 'Lucino Campos' }],
    creator: 'Lucino Campos',
    openGraph: {
      type: 'website',
      siteName: 'alucinado.dev',
    },
    twitter: {
      card: 'summary_large_image',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const [{ locale }, requestHeaders] = await Promise.all([params, headers()])
  const accessibility = await getTranslations({ locale, namespace: 'common.accessibility' })
  const receivedCountryCode = requestHeaders.get('x-vercel-ip-country')?.toUpperCase()
  const countryCode = receivedCountryCode && /^[A-Z]{2}$/.test(receivedCountryCode) ? receivedCountryCode : undefined

  return (
    <html
      lang={locale}
      className='h-full scroll-smooth antialiased motion-reduce:scroll-auto'
      data-country={countryCode}
      data-scroll-behavior='smooth'
      suppressHydrationWarning
    >
      <body className={`${fonts} relative flex min-h-full flex-col`}>
        <AppProviders>
          <a
            href='#conteudo-principal'
            className='font-space-grotesk focus:bg-cyan-bright fixed top-2 left-2 z-100 -translate-y-24 px-4 py-3 text-sm font-semibold text-[#010205] transition-transform focus:translate-y-0 focus:outline-none'
          >
            {accessibility('skipToContent')}
          </a>
          <Header />
          <Container id='conteudo-principal' tabIndex={-1}>
            {children}
          </Container>
          <Footer />
        </AppProviders>
      </body>
    </html>
  )
}
