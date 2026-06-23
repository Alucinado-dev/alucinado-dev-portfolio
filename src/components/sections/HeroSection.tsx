'use client'

import Link from 'next/link'

import { Icon } from '@iconify/react'
import { motion } from 'motion/react'

import { ProjectButton } from '@/components/external/GlowingButton'
import { AnimatedSpan, Terminal, TypingAnimation } from '@/components/external/Terminal'

export default function HeroSection() {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } as const },
  }

  return (
    <section className='relative flex w-full items-center justify-center overflow-hidden px-6 py-12 md:py-10'>
      <div className='relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12'>
        {/* COLUNA ESQUERDA */}
        {/* COLUNA ESQUERDA: Informações e CTAs Táticos */}
        <motion.div
          className='relative flex flex-col items-start space-y-7 rounded-none border border-white/5 bg-[#020612]/30 p-6 text-left shadow-2xl lg:col-span-6'
          initial='hidden'
          animate='visible'
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {/* Detalhe estático de cantoneira industrial no TOPO ESQUERDO */}
          <div className='absolute -top-1 -left-1 h-2 w-2 border-t border-l border-[#00fbea]/30' />

          {/* REFACTOR: Badge de Disponibilidade Modular (Destaque CLT|PJ) */}
          <motion.div
            variants={fadeUpVariant}
            className='flex w-full items-center gap-3 border-l border-[#10b981]/20 py-1 pl-4'
          >
            <div className='font-rajdhani flex items-center gap-2 rounded-none border border-emerald-500/10 bg-emerald-500/5 px-3 py-1.5 text-xs font-bold tracking-widest text-emerald-400 uppercase'>
              <span className='relative flex h-2 w-2'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75'></span>
                <span className='relative inline-flex h-2 w-2 rounded-full bg-emerald-500'></span>
              </span>
              Disponível
            </div>

            {/* Destaque CLT|PJ: Caixa Rígida Monospace */}
            <div className='group font-syne-mono relative rounded-none border border-[#10b981]/30 bg-black/40 px-3 py-1.5 text-[10px] tracking-[0.2em] text-emerald-300 uppercase select-none'>
              CLT
            </div>

            <div className='group font-syne-mono relative rounded-none border border-[#10b981]/30 bg-black/40 px-3 py-1.5 text-[10px] tracking-[0.2em] text-emerald-300 uppercase select-none'>
              PJ
            </div>

            <div className='group font-syne-mono relative rounded-none border border-[#10b981]/30 bg-black/40 px-3 py-1.5 text-[10px] tracking-[0.2em] text-emerald-300 uppercase select-none'>
              PROJETOS
            </div>
          </motion.div>

          {/* Bloco de Nome e Cargo com Micro-IDs */}
          <div className='relative w-full space-y-1 border-l border-white/5 pl-6'>
            <motion.h1
              variants={fadeUpVariant}
              className='font-exo-2 text-4xl font-extrabold tracking-tight text-slate-50 uppercase md:text-6xl'
            >
              <span className='font-syne-mono mr-2 text-sm text-white/20 select-none'>01 //</span>
              Lucino Campos
            </motion.h1>
            <motion.h2
              variants={fadeUpVariant}
              className='font-audiowide text-xl font-semibold text-slate-400 md:text-2xl'
            >
              <span className='font-syne-mono mr-2 text-sm text-white/20 select-none'>02 //</span>
              Desenvolvedor Frontend
            </motion.h2>
          </div>

          {/* Frase de Impacto com Margem Modular */}
          <motion.p
            variants={fadeUpVariant}
            className='font-outfit max-w-xl border-l border-white/5 pl-6 text-base leading-relaxed font-light text-slate-400 md:text-lg'
          >
            Especialista em construir interfaces modernas, performáticas e arquiteturas frontend robustas. Experiência
            real com aplicações em produção e foco absoluto em entregar valor comercial através de código limpo.
          </motion.p>

          <motion.div variants={fadeUpVariant} className='flex flex-wrap gap-4 pt-4 pl-6'>
            <ProjectButton>Ver Projetos</ProjectButton>

            <Link href='/lucino_campos_cv.pdf' download='Lucino_Campos_CV.pdf' className='inline-block'>
              <motion.div
                className='group font-zen-dots relative flex cursor-pointer items-center justify-center gap-3 rounded-none border border-white/10 bg-slate-950/20 px-7 py-4 text-xs tracking-widest text-slate-400 uppercase transition-all'
                initial='initial'
                whileHover='hover'
                whileTap={{ y: 1 }}
                variants={{
                  initial: {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#94a3b8',
                    backgroundColor: 'rgba(15, 23, 42, 0.2)',
                  },
                  hover: {
                    borderColor: 'rgba(0, 251, 234, 0.4)', // Acende sutilmente no ciano do seu HUD
                    color: '#f8fafc',
                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                  },
                }}
              >
                <span>Baixar CV</span>

                {/* ÍCONE SVG ANIMADO VIA MOTION COM COMPORTAMENTO DE SETA PULSANDO */}
                <div className='relative flex h-4 w-4 items-center justify-center'>
                  <motion.span
                    variants={{
                      initial: { y: 0 },
                      // Faz um loop infinito de "pulo" simulando download enquanto durar o hover
                      hover: {
                        y: [0, 4, 0],
                        transition: {
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        },
                      },
                    }}
                  >
                    <Icon
                      icon='pixelarticons:download'
                      className='h-7 w-7 text-slate-400 transition-colors group-hover:text-slate-200'
                    />
                  </motion.span>
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Detalhe estático de cantoneira industrial no BOTTOM DIREITO */}
          <div className='absolute -right-1 -bottom-1 h-2 w-2 border-r border-b border-[#00fbea]/30' />
        </motion.div>
        {/* COLUNA DIREITA: O Terminal Otimizado Sem Mínimo Risco de Scroll */}
        <div className='flex w-full justify-center lg:col-span-6 lg:justify-end'>
          <h3 className='sr-only'>Logs do Sistema e Inicialização Técnica</h3>
          <Terminal>
            {/* Comando Inicial */}
            <TypingAnimation icon='lucide:chevron-right' iconClass='text-slate-500' className='font-bold text-cyan-400'>
              pnpm dlx lucino@latest init
            </TypingAnimation>

            {/* Carregamento do Manifesto (Segura um pouco mais pelas reticências) */}
            <TypingAnimation
              icon='lucide:settings'
              iconClass='text-slate-500 animate-spin'
              postDelay={1500}
              className='text-slate-400'
            >
              Loading manifest schema from repository...
            </TypingAnimation>

            {/* Novas Linhas Solicitadas de Telemetria e Inicialização */}
            <TypingAnimation
              icon='lucide:activity'
              iconClass='text-cyan-400'
              postDelay={1800}
              className='text-slate-400'
            >
              PostHog asynchronous telemetry node synchronized.
            </TypingAnimation>

            <TypingAnimation
              icon='lucide:sparkles'
              iconClass='text-purple-400 animate-pulse'
              postDelay={500}
              className='text-slate-400'
            >
              Starfield background interactive particle array loaded.
            </TypingAnimation>

            {/* Handshakes */}
            <TypingAnimation
              icon='lucide:check-circle-2'
              iconClass='text-emerald-500'
              postDelay={500}
              className='text-emerald-400'
            >
              System integrity handshake verified successfully.
            </TypingAnimation>

            <TypingAnimation
              icon='lucide:check-circle-2'
              iconClass='text-emerald-500'
              postDelay={500}
              className='text-emerald-400'
            >
              Environment variables injected: [production_node].
            </TypingAnimation>

            {/* Core Tech */}
            <TypingAnimation icon='lucide:box' iconClass='text-cyan-500' postDelay={1000} className='text-slate-300'>
              Core tech: Next.js v16 · React v19 · Tailwind v4
            </TypingAnimation>

            {/* Descoberta de pegada ativa (Hangs um pouco para dar impacto ao link) */}
            <TypingAnimation
              icon='lucide:zap'
              iconClass='text-amber-500 animate-pulse'
              postDelay={900}
              className='text-amber-400'
            >
              Active Production Footprint discovered:
            </TypingAnimation>

            {/* Linha de Link com tag A nativa */}
            <AnimatedSpan postDelay={2000} className='flex h-5.5 items-center gap-1.5 pl-6 text-slate-400'>
              <Icon icon='lucide:link-2' className='h-3.5 w-3.5 shrink-0 text-cyan-500' />
              <span>URL:</span>
              <a
                href='https://flordopomar.pt'
                target='_blank'
                rel='noreferrer'
                className='font-bold text-cyan-400 underline transition-colors hover:text-cyan-300'
              >
                flordopomar.pt
              </a>
              <span className='ml-1 font-mono text-xs text-slate-600'>(Best Project Freelancer ever made by me!)</span>
            </AnimatedSpan>

            {/* Finalização de Telemetria */}
            <TypingAnimation
              icon='eos-icons:loading'
              iconClass='text-slate-500'
              postDelay={600}
              className='text-slate-400'
            >
              Synchronizing telemetry routers and state nodes...
            </TypingAnimation>

            {/* Divisória Rápida */}
            <AnimatedSpan postDelay={30} className='h-3 leading-none tracking-tighter text-slate-900 select-none'>
              ────────────────────────────────────────────────────────
            </AnimatedSpan>

            {/* Sucesso Industrial com Ícone Tecnológico Exclusivo */}
            <TypingAnimation
              icon='lucide:shield-check'
              iconClass='text-cyan-400'
              postDelay={1900}
              className='font-bold text-slate-100'
            >
              [SUCCESS] Environment compiled with 0 warnings.
            </TypingAnimation>

            {/* Dica de Ação */}
            <TypingAnimation
              icon='lucide:help-circle'
              iconClass='text-slate-600'
              postDelay={500}
              className='text-sm text-slate-500'
            >
              Scroll down node to investigate full capabilities.
            </TypingAnimation>
          </Terminal>
        </div>
      </div>
    </section>
  )
}
