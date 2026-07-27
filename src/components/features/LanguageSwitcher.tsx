'use client'

import { useLocale, useTranslations } from 'next-intl'

import { motion } from 'motion/react'

import { usePathname, useRouter } from '@/i18n/navigation'
import { capturePortfolioEvent } from '@/lib/analytics'

export const LanguageSwitcher = () => {
  const pathname = usePathname()
  const router = useRouter()
  const currentLocale = useLocale()
  const accessibility = useTranslations('common.accessibility')
  const language = useTranslations('common.language')

  const toggleLanguage = (locale: 'pt' | 'en') => {
    if (locale === currentLocale || !pathname) return

    const suffix = `${window.location.search}${window.location.hash}`
    capturePortfolioEvent({
      name: 'language_switched',
      properties: { from_locale: currentLocale, to_locale: locale },
    })
    router.replace(`${pathname}${suffix}`, { locale })
  }

  return (
    <div
      role='group'
      aria-label={accessibility('languageSwitcher')}
      className='font-syne-mono flex h-14 items-center border-l border-white/5 px-4 text-[10px] tracking-widest text-white/40'
    >
      <div className='relative flex items-center gap-1 rounded-xs border border-white/5 bg-black/40 p-1 select-none'>
        <button
          type='button'
          onClick={() => toggleLanguage('pt')}
          aria-label={language('portuguese')}
          aria-pressed={currentLocale === 'pt'}
          className='relative z-10 cursor-pointer px-2 py-0.5 font-bold uppercase transition-colors'
          style={{ color: currentLocale === 'pt' ? '#00fbea' : 'rgba(255,255,255,0.58)' }}
        >
          PT
          {currentLocale === 'pt' && (
            <motion.span
              layoutId='activeLangIndicator'
              className='absolute inset-0 z-[-1] rounded-xs border-b border-[#00fbea]/50 bg-[#00fbea]/10'
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </button>

        <span aria-hidden='true' className='font-sans text-[8px] text-white/25'>
          /
        </span>

        <button
          type='button'
          onClick={() => toggleLanguage('en')}
          aria-label={language('english')}
          aria-pressed={currentLocale === 'en'}
          className='relative z-10 cursor-pointer px-2 py-0.5 font-bold uppercase transition-colors'
          style={{ color: currentLocale === 'en' ? '#00fbea' : 'rgba(255,255,255,0.58)' }}
        >
          EN
          {currentLocale === 'en' && (
            <motion.span
              layoutId='activeLangIndicator'
              className='absolute inset-0 z-[-1] rounded-xs border-b border-[#00fbea]/50 bg-[#00fbea]/10'
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      </div>
    </div>
  )
}
