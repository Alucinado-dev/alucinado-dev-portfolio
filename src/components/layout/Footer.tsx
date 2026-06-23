'use client'

import Link from 'next/link'

import { Icon } from '@iconify/react'

import Container from '@/components/container/Container'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='relative z-10 flex h-auto w-full items-center border-t border-white/10 bg-[#0a0a1a] select-none md:h-14'>
      {/* BACKGROUND FLUIDO EXTERNO (Garante que as bordas encostem nas pontas da tela) */}
      <Container isFluid={true} className='flex h-full w-full flex-col items-center p-0 md:flex-row'>
        {/* 1. ASA ESQUERDA ESTÉTICA: Telemetria de Baixo Nível (Inédita) */}
        <div className='font-syne-mono hidden h-full flex-1 items-center gap-3 border-r border-white/10 px-6 text-[9px] text-white/30 xl:flex'>
          <span className='font-bold text-[#7c3aed]/70'>└─ CORE_CLK:</span>
          <span className='tracking-widest text-slate-400'>EXEC_STEADY</span>
          <span className='text-white/10'>|</span>
          <span className='font-mono tracking-widest text-white/20'>MEM_HEX: 0x7FFF5FBFF</span>
        </div>

        {/* 2. CONTAINER CENTRAL NÃO-FLUIDO (Alinhado com a grade de conteúdo do site) */}
        <Container
          isFluid={false}
          className='flex h-full flex-col items-center justify-between gap-4 border border-white/10 bg-[#020612] py-4 md:flex-row md:py-0'
        >
          {/* LINKS INTERNOS DE NAVEGAÇÃO */}
          <nav className='flex items-center gap-5 text-[10px] font-semibold tracking-widest text-slate-400 uppercase'>
            <Link href='/' className='transition-colors duration-200 hover:text-[#00fbea]'>
              Home
            </Link>
            <Link href='/about' className='transition-colors duration-200 hover:text-[#00fbea]'>
              About
            </Link>
            <Link href='/projects' className='transition-colors duration-200 hover:text-[#00fbea]'>
              Projects
            </Link>
          </nav>

          {/* COPYRIGHT CENTRALIZADO PERFEITAMENTE */}
          <div className='flex border border-red-600 text-center font-mono text-[10px] tracking-widest text-slate-500 md:absolute md:left-1/2 md:-translate-x-1/2 md:items-center md:gap-2'>
            <Icon icon='material-symbols:copyright-outline-sharp' /> {currentYear}
            <span className='font-bold text-slate-400'>ALUCINADO DEV</span>
          </div>

          {/* REDES SOCIAIS (Separadas da navegação interna) */}
          <div className='flex items-center gap-5 text-[10px] font-semibold tracking-widest text-slate-400 uppercase'>
            <a
              href='https://github.com' // Injetado depois
              target='_blank'
              rel='noopener noreferrer'
              className='transition-colors duration-200 hover:text-[#7c3aed]'
            >
              GitHub
            </a>
            <a
              href='https://linkedin.com' // Injetado depois
              target='_blank'
              rel='noopener noreferrer'
              className='transition-colors duration-200 hover:text-[#00fbea]'
            >
              LinkedIn
            </a>
          </div>
        </Container>

        {/* 3. ASA DIREITA ESTÉTICA: Buffer de Alocação de Memória e Ciclo */}
        <div className='font-syne-mono hidden h-full flex-1 items-center justify-end gap-4 border-l border-white/10 px-6 text-[9px] text-white/20 xl:flex'>
          <span className='tracking-widest'>SYS_BUFF: [■■■■■■□□]</span>
          <span className='text-white/10'>|</span>
          <span className='tracking-widest'>STABLE_V1.0</span>
        </div>
      </Container>

      {/* Linha de Pulso de Luz Roxo/Ciano na Base Superior do Footer */}
      <div className='pointer-events-none absolute top-0 right-0 left-0 h-px bg-linear-to-r from-transparent via-[#7c3aed]/20 to-transparent' />
    </footer>
  )
}
