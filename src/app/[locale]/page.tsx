import Sidebar from '@/components/layout/Sidebar'
import AboutSection from '@/components/sections/AboutSection'
import ContactSection from '@/components/sections/ContactSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import HeroSection from '@/components/sections/HeroSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import StackSection from '@/components/sections/StackSection'

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
