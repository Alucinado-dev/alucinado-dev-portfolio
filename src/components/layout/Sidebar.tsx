'use client'

import { useTranslations } from 'next-intl'

import { useActiveSection } from '@/hooks/useActiveSection'
import { homeSectionIds, homeSections } from '@/lib/data/SiteData'

export default function Sidebar() {
  const t = useTranslations('pages.home.navigation')
  const { activeSectionId, setActiveSectionId } = useActiveSection(homeSectionIds, 'inicio')
  const activeIndex = homeSections.findIndex(section => section.id === activeSectionId)
  const progress = activeIndex < 0 ? 0 : (activeIndex / (homeSections.length - 1)) * 100

  return (
    <>
      <nav
        aria-label={t('label')}
        className='fixed top-1/2 right-1.5 z-40 hidden -translate-y-1/2 lg:block xl:right-3 2xl:right-5'
      >
        <div className='relative flex flex-col items-center py-1'>
          <span className='absolute top-5 bottom-5 left-1/2 w-px -translate-x-1/2 bg-white/12' aria-hidden='true' />
          <span className='absolute top-5 bottom-5 left-1/2 w-px -translate-x-1/2' aria-hidden='true'>
            <span
              className='bg-cyan-bright/55 block w-full shadow-[0_0_8px_rgba(0,251,234,0.45)] transition-[height] duration-300 motion-reduce:transition-none'
              style={{ height: `${progress}%` }}
            />
          </span>

          {homeSections.map(section => {
            const isActive = section.id === activeSectionId

            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-label={t(`sections.${section.labelKey}`)}
                aria-current={isActive ? 'location' : undefined}
                onClick={() => setActiveSectionId(section.id)}
                className='group relative flex h-8 w-8 items-center justify-center outline-none'
              >
                <span
                  className={`relative z-10 block rounded-full border transition-all duration-200 motion-reduce:transition-none ${
                    isActive
                      ? 'border-cyan-bright bg-cyan-bright h-2.5 w-2.5 shadow-[0_0_10px_rgba(0,251,234,0.75)]'
                      : 'h-1.5 w-1.5 border-slate-500 bg-[#07101d] group-hover:border-slate-200 group-focus-visible:border-slate-200'
                  }`}
                />
                <span className='font-rajdhani pointer-events-none absolute right-full mr-1.5 translate-x-1 border border-white/10 bg-[#050817]/96 px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] whitespace-nowrap text-slate-200 uppercase opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none'>
                  {t(`sections.${section.labelKey}`)}
                </span>
                <span className='border-cyan-bright/80 pointer-events-none absolute inset-0 border opacity-0 group-focus-visible:opacity-100' />
              </a>
            )
          })}
        </div>
      </nav>

      <div
        aria-hidden='true'
        className='pointer-events-none fixed top-1/2 right-1 z-30 flex -translate-y-1/2 flex-col items-center py-1 lg:hidden'
      >
        <span className='absolute top-2.5 bottom-2.5 left-1/2 w-px -translate-x-1/2 bg-white/10' />
        {homeSections.map(section => {
          const isActive = section.id === activeSectionId

          return (
            <span key={section.id} className='relative flex h-4 w-3 items-center justify-center'>
              <span
                className={`relative z-10 block rounded-full transition-all motion-reduce:transition-none ${
                  isActive ? 'bg-cyan-bright h-1.5 w-1.5 shadow-[0_0_7px_rgba(0,251,234,0.65)]' : 'h-1 w-1 bg-slate-600'
                }`}
              />
            </span>
          )
        })}
      </div>
    </>
  )
}
