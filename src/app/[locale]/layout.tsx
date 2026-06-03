import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Asimovian, Audiowide, Exo_2, Outfit, Rajdhani, Space_Grotesk, Syne_Mono, Zen_Dots } from 'next/font/google'

import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { BackgroundWrapper } from '@/components/providers/BackgroundProvider'

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

const fonts = [outfit, SpaceGrotesk, SyneMono, Exo2, rajdhani, asimovian, audiowide, zenDots]
  .map(font => font.variable)
  .join(' ')

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const t = await getTranslations({
    locale: (await params).locale,
    namespace: 'metadata',
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
  params: Promise<{ locale: string }>
}) {
  return (
    <html lang={(await params).locale} className={`h-full antialiased`} suppressHydrationWarning>
      <body className={`${fonts} flex min-h-full flex-col`}>
        <BackgroundWrapper />
        <Header />
        <main className='p-4'>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
