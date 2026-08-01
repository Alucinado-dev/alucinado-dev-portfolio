import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import Sidebar from '@/components/layout/Sidebar'
import AboutSection from '@/components/sections/AboutSection'
import ContactSection from '@/components/sections/ContactSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import HeroSection from '@/components/sections/HeroSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import StackSection from '@/components/sections/StackSection'
import { getSocialImage, localizedAlternates } from '@/lib/site-url'

type HomePageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.home.seo' })

  return {
    title: t('title'),
    description: t('description'),
    alternates: localizedAlternates(locale, '/'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: [getSocialImage()],
    },
  }
}

export default function HomePage() {
  return (
    <>
      <main className='z-30 flex w-full flex-col gap-y-4 pt-4 pb-10 md:gap-y-8 md:pt-6 md:pb-14'>
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <StackSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Sidebar />
    </>
  )
}
