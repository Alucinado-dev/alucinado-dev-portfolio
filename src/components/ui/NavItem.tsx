'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { motion } from 'motion/react'

interface NavItemProps {
  href: string
  index: string
  children: React.ReactNode
}

export const NavItem = ({ href, index, children }: NavItemProps) => {
  const pathname = usePathname()

  // Identifica o idioma ativo no Pathname para calcular a rota real e o estado ativo
  const currentLocale = pathname?.startsWith('/en') ? 'en' : 'pt'

  // Constrói o destino correto baseado no idioma
  const localizedHref = currentLocale === 'en' ? (href === '/' ? '/en' : `/en${href}`) : href

  // Verificação inteligente de link ativo que ignora o prefixo do idioma
  const isActive = (() => {
    if (!pathname) return false
    // Remove o prefixo do idioma para comparar a rota limpa
    const cleanPathname = pathname.replace(/^\/(en|pt)/, '') || '/'

    if (href === '/') {
      return cleanPathname === '/'
    }
    return cleanPathname.startsWith(href)
  })()

  return (
    <Link
      href={localizedHref}
      className='group font-rajdhani relative flex h-14 cursor-pointer flex-col justify-center border-r border-white/5 px-6 text-sm font-medium tracking-[0.12em] uppercase transition-all duration-300 select-none'
      style={{
        backgroundColor: isActive ? 'rgba(0, 251, 234, 0.015)' : 'transparent',
      }}
    >
      {/* Micro-índice tático superior direito */}
      <span className='font-syne-mono absolute top-2 right-3 text-[8px] text-white/20 transition-colors group-hover:text-[#00fbea]/50'>
        {index}
      </span>

      {/* Texto do Link */}
      <span
        className='relative z-10 transition-colors duration-300'
        style={{
          color: isActive ? '#00fbea' : 'rgba(255, 255, 255, 0.5)',
          textShadow: isActive ? '0 0 8px rgba(0, 251, 234, 0.4)' : 'none',
        }}
      >
        {children}
      </span>

      {/* Linha Indicadora no TOPO (Abas Digitais) */}
      {isActive && (
        <motion.div
          layoutId='expandedActiveLine'
          className='absolute top-0 right-0 left-0 h-0.5 bg-[#00fbea] shadow-[0_0_10px_#00fbea]'
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
        />
      )}

      {/* Hover background */}
      {!isActive && (
        <span className='absolute inset-0 bg-linear-to-t from-white/2 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
      )}

      {/* Pequeno ponto de mira */}
      <span className='absolute bottom-1 left-1 h-1 w-1 bg-white/5 transition-colors group-hover:bg-[#00fbea]/30' />
    </Link>
  )
}
