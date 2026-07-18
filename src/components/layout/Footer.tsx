'use client'

import { useTranslations } from 'next-intl'

import { Icon } from '@iconify/react'

import Container from '@/components/container/Container'
import { Link } from '@/i18n/navigation'
import { siteExternalLinks, siteNavigation } from '@/lib/data/SiteData'

const linkStyles = {
  email: 'hover:border-tech-teal/35 hover:bg-tech-teal/8 hover:text-tech-teal',
  github: 'hover:border-plasma-purple/35 hover:bg-plasma-purple/8 hover:text-purple-300',
  linkedin: 'hover:border-cyan-bright/35 hover:bg-cyan-bright/7 hover:text-cyan-bright',
  instagram: 'hover:border-pink-neon/30 hover:bg-pink-neon/7 hover:text-pink-300',
} as const

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const navigation = useTranslations('common.navigation')
  const footer = useTranslations('common.footer')
  const accessibility = useTranslations('common.accessibility')

  return (
    <footer className='relative z-10 w-full border-t border-white/10 bg-[#050817]/96 backdrop-blur-xl'>
      <Container isFluid className='p-0'>
        <div className='font-syne-mono hidden h-10 items-center justify-between border-b border-white/6 px-6 text-[9px] tracking-[0.14em] text-slate-600 uppercase xl:flex'>
          <span>{footer('identity')}</span>
          <span>{footer('builtWith')}</span>
        </div>

        <Container className='flex flex-col items-center justify-between gap-5 py-6 md:flex-row md:py-5'>
          <nav className='font-space-grotesk flex items-center gap-5 text-xs font-medium text-slate-400'>
            {siteNavigation.map(link => (
              <Link key={link.href} href={link.href} className='hover:text-cyan-bright transition-colors'>
                {navigation(link.labelKey)}
              </Link>
            ))}
          </nav>

          <div className='font-syne-mono flex items-center gap-2 text-[10px] tracking-[0.1em] text-slate-500'>
            <Icon icon='lucide:copyright' className='h-3.5 w-3.5' aria-hidden='true' />
            <span>{currentYear}</span>
            <span className='text-slate-300'>{footer('copyright')}</span>
          </div>

          <div className='flex items-center gap-3'>
            {siteExternalLinks.map(link => (
              <a
                key={link.key}
                href={link.href}
                target={link.opensNewTab ? '_blank' : undefined}
                rel={link.opensNewTab ? 'noopener noreferrer' : undefined}
                aria-label={accessibility(`${link.key}Profile`)}
                className={`flex h-9 w-9 items-center justify-center border border-white/9 bg-white/3 text-slate-500 transition-all ${linkStyles[link.key]}`}
              >
                <Icon icon={link.icon} className='h-4 w-4' aria-hidden='true' />
              </a>
            ))}
          </div>
        </Container>
      </Container>

      <div className='via-plasma-purple/35 pointer-events-none absolute top-0 right-0 left-0 h-px bg-linear-to-r from-transparent to-transparent' />
    </footer>
  )
}
