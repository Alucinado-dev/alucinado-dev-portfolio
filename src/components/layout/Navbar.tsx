'use client'

import { useTranslations } from 'next-intl'

import { NavItem } from '@/components/ui/NavItem'
import { siteNavigation } from '@/lib/data/SiteData'

export const Navbar = () => {
  const t = useTranslations('common.navigation')

  return (
    <nav className='relative flex h-14 items-center border-l border-white/5'>
      {siteNavigation.map(link => (
        <NavItem key={link.href} href={link.href}>
          {t(link.labelKey)}
        </NavItem>
      ))}
    </nav>
  )
}
