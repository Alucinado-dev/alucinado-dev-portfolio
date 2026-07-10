import AboutSection from '@/components/sections/AboutSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import HeroSection from '@/components/sections/HeroSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import StackSection from '@/components/sections/StackSection'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params

  return (
    <div className='z-30 flex w-full flex-col gap-y-20 py-8 md:gap-y-32 md:py-16'>
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <StackSection />
      <ExperienceSection />
    </div>
  )
}
