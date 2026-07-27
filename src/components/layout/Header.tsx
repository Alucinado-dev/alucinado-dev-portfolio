'use client'

import { useEffect, useRef, useState } from 'react'

import { useLocale, useTranslations } from 'next-intl'

import { Icon } from '@iconify/react'

import Container from '@/components/container/Container'
import { LanguageSwitcher } from '@/components/features/LanguageSwitcher'
import Logo from '@/components/ui/Logo'
import { Link, usePathname } from '@/i18n/navigation'
import { siteNavigation } from '@/lib/data/SiteData'

import { Navbar } from './Navbar'

export default function Header() {
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations('common.header')
  const navigation = useTranslations('common.navigation')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRootRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isMenuOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRootRef.current?.contains(event.target as Node)) setIsMenuOpen(false)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setIsMenuOpen(false)
      menuButtonRef.current?.focus()
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  const isRouteActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))
  const currentRoute = siteNavigation.find(link => isRouteActive(link.href)) ?? siteNavigation[0]

  return (
    <header className='sticky top-0 z-50 flex h-14 w-full items-center overflow-visible border-b border-white/10 bg-[#050817]/96 backdrop-blur-md'>
      <div className='font-syne-mono hidden h-full flex-1 items-center gap-3 border-r border-white/10 px-6 text-[9px] text-white/35 select-none min-[1800px]:flex'>
        <span className='bg-tech-teal h-1.5 w-1.5 animate-pulse rounded-full shadow-[0_0_8px_rgba(20,184,166,0.7)]' />
        <span className='tracking-widest'>{t('systemStatus')}</span>
        <span className='text-white/10'>|</span>
        <span className='tracking-widest'>{t('version')}</span>
      </div>

      <Container className='flex h-full items-center border-white/10 bg-[#020612] px-0'>
        <div className='flex h-full shrink-0 items-center border-r border-white/5 px-4 sm:px-6'>
          <Link
            href={siteNavigation[0].href}
            aria-label={t('logoHome')}
            className='focus-visible:ring-cyan-bright/60 relative outline-none focus-visible:ring-2'
          >
            <Logo />
          </Link>
        </div>

        <div className='hidden h-full flex-1 md:flex md:justify-start'>
          <Navbar />
        </div>

        <div className='ml-auto flex h-full items-center border-l border-white/5'>
          <div ref={menuRootRef} className='flex h-full items-center md:hidden'>
            <button
              ref={menuButtonRef}
              type='button'
              aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
              aria-expanded={isMenuOpen}
              aria-controls='mobile-route-menu'
              onClick={() => setIsMenuOpen(current => !current)}
              className='text-body hover:text-cyan-bright focus-visible:border-cyan-bright flex h-14 w-12 cursor-pointer items-center justify-center border-r border-white/5 transition-colors outline-none focus-visible:border'
            >
              <Icon icon={isMenuOpen ? 'lucide:x' : 'lucide:menu'} className='h-5 w-5' aria-hidden='true' />
            </button>

            {isMenuOpen && (
              <nav
                id='mobile-route-menu'
                aria-label={t('mobileNavigation')}
                className='fixed top-14 right-3 left-3 z-50 ml-auto border border-white/12 bg-[#050817]/98 p-2 shadow-[0_18px_45px_rgba(0,0,0,0.48)] backdrop-blur-xl sm:left-auto sm:w-72'
              >
                {siteNavigation.map(link => {
                  const isActive = isRouteActive(link.href)

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => setIsMenuOpen(false)}
                      className={`font-rajdhani flex min-h-11 items-center border px-4 text-sm font-semibold tracking-[0.1em] uppercase transition-colors outline-none focus-visible:border-cyan-300 ${
                        isActive
                          ? 'border-cyan-bright/25 bg-cyan-bright/8 text-cyan-bright'
                          : 'border-transparent text-slate-400 hover:border-white/8 hover:bg-white/4 hover:text-slate-100'
                      }`}
                    >
                      {navigation(link.labelKey)}
                    </Link>
                  )
                })}
              </nav>
            )}
          </div>

          <LanguageSwitcher />
        </div>
      </Container>

      <div className='font-syne-mono hidden h-full flex-1 items-center justify-end gap-5 border-l border-white/10 px-6 text-[9px] select-none min-[1800px]:flex'>
        <div className='flex items-center gap-2'>
          <span className='text-white/20'>{t('currentRoute')}</span>
          <span className='text-cyan-bright/65 tracking-widest'>{navigation(currentRoute.labelKey)}</span>
        </div>
        <span className='h-4 w-px bg-white/8' aria-hidden='true' />
        <span className='tracking-widest text-white/20'>
          {t('locale', { locale: locale === 'en' ? 'EN-US' : 'PT-BR' })}
        </span>
        <span className='border-cyan-bright/30 relative h-3 w-3 rotate-45 border' aria-hidden='true'>
          <span className='bg-plasma-purple absolute inset-1 shadow-[0_0_7px_rgba(139,92,246,0.7)]' />
        </span>
      </div>

      <div className='pointer-events-none absolute right-0 bottom-0 left-0 h-px bg-linear-to-r from-transparent via-[#00fbea]/25 to-transparent' />
    </header>
  )
}
