'use client'

import { motion } from 'motion/react'

import { Link, usePathname } from '@/i18n/navigation'

interface NavItemProps {
  href: string
  children: React.ReactNode
}

export const NavItem = ({ href, children }: NavItemProps) => {
  const pathname = usePathname()
  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className='group font-asimovian relative flex h-14 cursor-pointer flex-col justify-center overflow-hidden border-r border-white/5 px-6 text-sm font-normal tracking-[0.12em] uppercase transition-all duration-300 select-none'
      style={{ backgroundColor: isActive ? 'rgba(0, 251, 234, 0.015)' : 'transparent' }}
    >
      <span
        className='pointer-events-none absolute inset-0 opacity-[0.035]'
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)',
          backgroundSize: '12px 12px',
        }}
        aria-hidden='true'
      />
      <span
        className='relative z-10 transition-colors duration-300'
        style={{
          color: isActive ? '#00fbea' : 'rgba(255, 255, 255, 0.5)',
          textShadow: isActive ? '0 0 8px rgba(0, 251, 234, 0.4)' : 'none',
        }}
      >
        {children}
      </span>

      {isActive && (
        <motion.div
          layoutId='expandedActiveLine'
          className='absolute top-0 right-0 left-0 h-0.5 bg-[#00fbea] shadow-[0_0_10px_#00fbea]'
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
        />
      )}

      {!isActive && (
        <span className='absolute inset-0 bg-linear-to-t from-white/2 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
      )}

      <span className='absolute bottom-1 left-1 h-1 w-1 bg-white/5 transition-colors group-hover:bg-[#00fbea]/30' />
      <span className='border-cyan-bright/0 group-hover:border-cyan-bright/25 absolute top-1 right-1 h-2 w-2 border-t border-r transition-colors' />
    </Link>
  )
}
