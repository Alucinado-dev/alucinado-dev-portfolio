'use client'

import { useState } from 'react'

import { Icon } from '@iconify/react'
import { AnimatePresence, motion } from 'framer-motion'

import Container from '@/components/container/Container'
import { DotPattern } from '@/components/external/DotPattern'
import { techList } from '@/lib/data/TechData'

const STACK_TECHS = [
  'react',
  'nextjs',
  'typescript',
  'tailwind',
  'zustand',
  'motion',
  'nestjs',
  'mongodb',
  'docker',
  'rabbitmq',
  'zod',
  'posthog',
]

export default function StackSection() {
  // Mudamos o nome para refletir que agora é uma SELEÇÃO firme
  const [selectedTechKey, setSelectedTechKey] = useState<string | null>(null)

  return (
    <section id='stack' className='border-stroke-subtle bg-base relative z-10 w-full border-t py-20'>
      <Container className='border-stroke-subtle bg-panel/10 relative overflow-hidden rounded-xs border p-6 backdrop-blur-md md:p-10'>
        <DotPattern
          width={18}
          height={18}
          glow={false}
          className='text-muted/10 pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay'
        />

        {/* Cabeçalho */}
        <div className='relative z-10 mb-10 flex items-center gap-4 select-none'>
          <h2 className='font-space-grotesk text-primary text-xl font-bold tracking-tight uppercase md:text-2xl'>
            [07] Matriz de Conectividade
          </h2>
          <div className='from-stroke-subtle h-px flex-1 bg-linear-to-r to-transparent' />
        </div>

        {/* GRELHA TÁTICA DE STACKS */}
        <div className='relative z-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
          {STACK_TECHS.map(key => {
            const tech = techList[key]
            if (!tech) return null

            const isSelected = selectedTechKey === key

            return (
              <button
                key={key}
                type='button'
                // ✅ ÚNICO EVENTO LOGÍCO: O clique seleciona o nó de vez.
                // Se clicar no que já está selecionado, ele desmarca (comportamento de toggle opcional).
                onClick={() => setSelectedTechKey(isSelected ? null : key)}
                className={`border-stroke-subtle bg-base/40 group hover:bg-panel-hover/60 focus-visible:bg-panel-hover/60 focus-visible:border-cyan-bright/40 relative flex aspect-square cursor-crosshair flex-col items-center justify-center border p-5 transition-all duration-300 outline-none select-none ${isSelected ? 'border-cyan-bright/40 bg-panel-hover/40 shadow-[0_0_20px_rgba(6,182,212,0.08)]' : ''}`}
              >
                {/* 🎯 CANTOS DE MIRA HUD: Ativam se estiver SELECIONADO (JS) OU se houver HOVER/FOCUS (CSS) */}
                <div
                  className={`border-cyan-bright absolute top-0 left-0 h-2 w-2 border-t border-l transition-all duration-300 ${isSelected ? 'h-3 w-3 translate-x-1 translate-y-1 opacity-100' : 'opacity-0 group-hover:h-3 group-hover:w-3 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:opacity-100 group-focus-visible:opacity-100'}`}
                />
                <div
                  className={`border-cyan-bright absolute top-0 right-0 h-2 w-2 border-t border-r transition-all duration-300 ${isSelected ? 'h-3 w-3 -translate-x-1 translate-y-1 opacity-100' : 'opacity-0 group-hover:h-3 group-hover:w-3 group-hover:-translate-x-1 group-hover:translate-y-1 group-hover:opacity-100 group-focus-visible:opacity-100'}`}
                />
                <div
                  className={`border-cyan-bright absolute bottom-0 left-0 h-2 w-2 border-b border-l transition-all duration-300 ${isSelected ? 'h-3 w-3 translate-x-1 -translate-y-1 opacity-100' : 'opacity-0 group-hover:h-3 group-hover:w-3 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100 group-focus-visible:opacity-100'}`}
                />
                <div
                  className={`border-cyan-bright absolute right-0 bottom-0 h-2 w-2 border-r border-b transition-all duration-300 ${isSelected ? 'h-3 w-3 -translate-x-1 -translate-y-1 opacity-100' : 'opacity-0 group-hover:h-3 group-hover:w-3 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100 group-focus-visible:opacity-100'}`}
                />

                {/* ÍCONE */}
                <Icon
                  icon={tech.icon}
                  className={`text-muted group-hover:text-primary group-focus-visible:text-primary h-8 w-8 filter transition-all duration-300 ${isSelected ? 'text-primary scale-105 drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]' : ''}`}
                />

                {/* TEXTO DO CARD */}
                <span
                  className={`mt-3 font-mono text-[10px] tracking-widest uppercase transition-colors duration-300 ${isSelected ? 'text-cyan-bright font-bold' : 'text-muted group-hover:text-primary group-focus-visible:text-primary'}`}
                >
                  {tech.name}
                </span>
              </button>
            )
          })}
        </div>

        {/* 📟 INTERFACE DE DIAGNÓSTICO */}
        <div className='border-stroke-subtle bg-base/60 relative mt-8 h-[180px] overflow-hidden rounded-xs border p-5 font-mono text-xs backdrop-blur-md'>
          <div className='bg-stroke-subtle text-muted absolute top-0 right-0 px-2 py-0.5 text-[9px] tracking-wider uppercase select-none'>
            [Status_Monitor]
          </div>

          <AnimatePresence mode='wait'>
            {selectedTechKey ? (
              <motion.div
                key={selectedTechKey}
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -2 }}
                transition={{ duration: 0.1 }}
                className='space-y-2.5'
              >
                <div className='flex items-center gap-2 select-none'>
                  <span className='text-cyan-bright font-bold'>&gt; NODE_LOG:</span>
                  <span className='text-primary text-sm font-bold uppercase'>{techList[selectedTechKey]?.name}</span>
                  <span className='text-cyan-bright/80 border-cyan-bright/30 bg-cyan-bright/5 py-0.2 animate-pulse rounded-xs border px-1 text-[9px] tracking-widest uppercase'>
                    ONLINE
                  </span>
                </div>
                <p className='text-body font-sans text-sm leading-relaxed antialiased'>
                  {techList[selectedTechKey]?.justification}
                </p>
              </motion.div>
            ) : (
              <div className='text-dim flex h-full items-center font-sans text-sm italic select-none'>
                Nenhum nó ativo. Clique em uma tecnologia acima para injetar as diretrizes de arquitetura no monitor de
                diagnóstico.
              </div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}
