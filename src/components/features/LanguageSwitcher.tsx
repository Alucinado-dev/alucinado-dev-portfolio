'use client'

import { usePathname, useRouter } from 'next/navigation'

import { motion } from 'motion/react'

export const LanguageSwitcher = () => {
  const pathname = usePathname()
  const router = useRouter()

  // Detecta o locale atual mapeando os primeiros caracteres da rota (/pt/... ou /en/...)
  const currentLocale = pathname?.startsWith('/en') ? 'en' : 'pt'

  const toggleLanguage = (locale: 'pt' | 'en') => {
    if (locale === currentLocale) return
    if (!pathname) return

    // Reconstrói a URL mantendo a rota interna intacta
    let newPath = pathname
    if (currentLocale === 'en') {
      newPath = pathname.replace('/en', '/pt')
    } else {
      newPath = pathname.startsWith('/pt') ? pathname.replace('/pt', '/en') : `/en${pathname}`
    }

    // Se o resultado for apenas o prefixo limpo com barra, garante a raiz
    if (newPath === '/pt' || newPath === '/en/') newPath = '/pt' // ou dependendo da estrutura padrão

    router.push(newPath)
  }

  return (
    <div className='font-syne-mono flex h-14 items-center border-l border-white/5 px-4 text-[10px] tracking-widest text-white/40'>
      <div className='relative flex items-center gap-1 rounded-xs border border-white/5 bg-black/40 p-1 select-none'>
        {/* Botão PT */}
        <button
          onClick={() => toggleLanguage('pt')}
          className='relative z-10 cursor-pointer px-2 py-0.5 font-bold uppercase transition-colors'
          style={{ color: currentLocale === 'pt' ? '#00fbea' : 'rgba(255,255,255,0.3)' }}
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

        <span className='font-sans text-[8px] text-white/10'>/</span>

        {/* Botão EN */}
        <button
          onClick={() => toggleLanguage('en')}
          className='relative z-10 cursor-pointer px-2 py-0.5 font-bold uppercase transition-colors'
          style={{ color: currentLocale === 'en' ? '#00fbea' : 'rgba(255,255,255,0.3)' }}
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
