'use client'

import { usePathname } from 'next/navigation'

import Container from '@/components/container/Container'
import { LanguageSwitcher } from '@/components/features/LanguageSwitcher'
import Logo from '@/components/ui/Logo'

import { Navbar } from './Navbar'

export default function Header() {
  const pathname = usePathname()
  const systemLocaleTag = pathname?.startsWith('/en') ? 'EN-US' : 'PT-BR'

  return (
    <header className='relative z-50 flex h-14 w-full items-center border-b border-white/10 bg-[#0a0a1a] backdrop-blur-md'>
      <div className='font-syne-mono hidden h-full flex-1 items-center gap-3 border-r border-white/10 px-6 text-[9px] text-white/30 select-none xl:flex'>
        <span className='animate-pulse text-[#00fbea]/60'>●</span>
        <span className='tracking-widest'>SYS_STATUS: ONLINE</span>
        <span className='text-white/10'>|</span>
        <span className='tracking-widest'>NET_NODE: 2026.06</span>
      </div>

      {/* 2. CAIXA CENTRAL: O seu Container de Conteúdo Útil */}
      {/* Removemos o mx-auto padrão aqui temporariamente via classes para ele travar perfeitamente entre as asas em telas ultra-wide */}
      <Container className='mx-0 flex h-full items-center justify-between border-white/10 bg-[#020612] px-50 xl:mx-auto'>
        {/* Bloco do Logo */}
        <div className='flex h-full items-center border-r border-white/5 px-6'>
          <Logo />
        </div>

        {/* Bloco da Navegação */}
        <div className='flex h-full flex-1 justify-center md:justify-start'>
          <Navbar />
        </div>

        {/* Bloco do Idioma (Fechando a borda direita do container util) */}
        <div className='flex h-full items-center border-l border-white/5'>
          <LanguageSwitcher />
        </div>
      </Container>

      {/* 3. ASA DIREITA: Bloco Estático Isolado */}
      <div className='font-syne-mono hidden h-full flex-1 items-center justify-end gap-4 border-l border-white/10 px-6 text-[9px] text-white/20 select-none xl:flex'>
        <span className='tracking-widest'>LOC_AUTH: [{systemLocaleTag}]</span>
        <div className='flex h-2 items-end gap-0.5'>
          <span className='h-2 w-0.5 animate-bounce bg-[#ff00bb]/40' style={{ animationDelay: '0.1s' }} />
          <span className='h-3.5 w-0.5 animate-bounce bg-[#00fbea]/60' style={{ animationDelay: '0.3s' }} />
          <span className='h-2.5 w-0.5 animate-bounce bg-[#00fbea]/40' style={{ animationDelay: '0.2s' }} />
        </div>
      </div>

      {/* Linha de Pulso de Luz Ciano Contínua na Base do Header */}
      <div className='pointer-events-none absolute right-0 bottom-0 left-0 h-px bg-linear-to-r from-transparent via-[#00fbea]/25 to-transparent' />
    </header>
  )
}
