import HeroSection from '@/components/sections/HeroSection'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params

  return (
    <div className='flex w-full flex-col gap-y-20 py-8 md:gap-y-32 md:py-16'>
      <HeroSection />
    </div>
  )
}
