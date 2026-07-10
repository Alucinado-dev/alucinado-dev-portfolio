'use client'

import { motion } from 'motion/react'

import Container from '@/components/container/Container'

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' } as const,
    },
  }

  return (
    <section id='sobre' className='relative z-10 w-full bg-transparent py-16 md:py-24'>
      <Container className='border-stroke-subtle from-space-dark/80 via-base/80 to-space-dark/90 relative overflow-hidden border border-t bg-linear-to-b py-16 shadow-[0_30px_70px_-10px_rgba(0,0,0,0.9)] backdrop-blur-sm'>
        {/* ==========================================
           DETALHES ESTÉTICOS: CANTONEIRAS HUD
           ========================================== */}
        <div className='border-muted/30 absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 select-none' />
        <div className='border-muted/30 absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 select-none' />
        <div className='border-muted/30 absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 select-none' />
        <div className='border-muted/30 absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 select-none' />

        {/* Linha de divisão que esmaece nas pontas */}
        <div className='via-stroke-subtle absolute top-0 left-0 h-px w-full bg-linear-to-r from-transparent to-transparent' />

        {/* Micro-glow cirúrgico centralizado */}
        <div className='via-tech-teal/20 absolute top-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-linear-to-r from-transparent to-transparent blur-[1px]' />

        <motion.div
          className='mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* COLUNA ESQUERDA: Bio Principal */}
          <div className='relative flex flex-col justify-center lg:col-span-7'>
            <motion.div variants={itemVariants} className='mb-8 flex items-center gap-4'>
              <h2 className='font-space-grotesk text-primary text-3xl font-bold tracking-tight'>Sobre</h2>
              <div className='from-tech-teal/40 via-stroke-subtle h-px flex-1 bg-linear-to-r to-transparent' />
            </motion.div>

            <div className='text-body space-y-6 font-sans leading-relaxed'>
              <motion.p variants={itemVariants}>
                Antes de ter meu primeiro emprego formal, já tinha entregue um site institucional em produção para uma
                empresa portuguesa, com painel administrativo, internacionalização PT/EN e integrações reais com API.
                Foi um projeto freelancer remunerado, e foi assim que aprendi de verdade o que é entregar software com
                responsabilidade.
              </motion.p>

              <motion.p variants={itemVariants}>
                Sou desenvolvedor front-end júnior focado em React, Next.js, TypeScript e Tailwind, criando interfaces
                modernas, responsivas e com atenção real à experiência do usuário. No dia a dia trabalho com Zustand,
                Zod, React Hook Form e Motion, e gosto de trabalhar de forma organizada e iterativa: começo simples,
                valido, refatoro e evoluo.
              </motion.p>

              <motion.p variants={itemVariants}>
                Antes de entrar na área, atuem como Scrum Master na empresa júnior Zaffiro da UFPA, trabalhando com
                Kanban, gestão de projetos e comunicação direta com clientes. Também fui monitor universitário, o que
                aprimorou minha capacidade de explicar conceitos com clareza e trabalhar bem com pessoas.
              </motion.p>
            </div>
          </div>

          {/* COLUNA DIREITA: Os 3 Cards Táticos Reestruturados */}
          <div className='flex flex-col justify-center space-y-4 lg:col-span-5'>
            {/* CARD 1: Freelancer Internacional */}
            <motion.div
              variants={itemVariants}
              whileHover={{ x: 6 }} // 🔥 O Motion cuida apenas do movimento de transform (Alta Performance)
              className='group border-stroke-subtle border-l-cyan-bright bg-panel hover:bg-panel-hover hover:border-t-cyan-bright/30 hover:border-r-cyan-bright/30 hover:border-b-cyan-bright/30 rounded-none border border-l-2 p-6 shadow-xl backdrop-blur-md transition-all duration-300'
            >
              <div className='mb-3 flex items-start justify-between'>
                <h3 className='font-space-grotesk text-primary group-hover:text-cyan-bright text-lg font-bold transition-colors'>
                  Freelancer Internacional
                </h3>
                <span className='text-muted bg-box border-stroke-subtle border px-2 py-0.5 font-mono text-[10px] tracking-wider'>
                  [PRE_CLT]
                </span>
              </div>
              <p className='text-body font-sans text-sm leading-relaxed'>
                Entrega de software comercial em produção para o mercado europeu (
                <span className='text-cyan-bright/90 font-medium'>Flor do Pomar — Portugal</span>). Experiência prática
                com arquitetura robusta, gerenciamento de estado global com{' '}
                <span className='text-secondary font-medium'>Zustand</span> e painéis administrativos protegidos.
              </p>
            </motion.div>

            {/* CARD 2: Liderança Ágil */}
            <motion.div
              variants={itemVariants}
              whileHover={{ x: 6 }}
              className='group border-stroke-subtle border-l-deep-indigo bg-panel hover:bg-panel-hover hover:border-t-deep-indigo/30 hover:border-r-deep-indigo/30 hover:border-b-deep-indigo/30 rounded-none border border-l-2 p-6 shadow-xl backdrop-blur-md transition-all duration-300'
            >
              <div className='mb-3 flex items-start justify-between'>
                <h3 className='font-space-grotesk text-primary group-hover:text-plasma-purple text-lg font-bold transition-colors'>
                  Liderança e Agilidade
                </h3>
                <span className='text-muted bg-box border-stroke-subtle border px-2 py-0.5 font-mono text-[10px] tracking-wider'>
                  [AGILE_MIND]
                </span>
              </div>
              <p className='text-body font-sans text-sm leading-relaxed'>
                Atuação como <span className='text-plasma-purple font-medium'>Scrum Master</span> na empresa júnior
                Zaffiro. Domínio prático de frameworks ágeis (<span className='text-secondary font-medium'>Kanban</span>
                ), mapeamento e otimização de processos internos e gestão direta com stakeholders.
              </p>
            </motion.div>

            {/* CARD 3: Comunicação Global */}
            <motion.div
              variants={itemVariants}
              whileHover={{ x: 6 }}
              className='group border-stroke-subtle border-l-pink-neon bg-panel hover:bg-panel-hover hover:border-t-pink-neon/30 hover:border-r-pink-neon/30 hover:border-b-pink-neon/30 rounded-none border border-l-2 p-6 shadow-xl backdrop-blur-md transition-all duration-300'
            >
              <div className='mb-3 flex items-start justify-between'>
                <h3 className='font-space-grotesk text-primary group-hover:text-pink-neon text-lg font-bold transition-colors'>
                  Comunicação Global
                </h3>
                <span className='text-muted bg-box border-stroke-subtle border px-2 py-0.5 font-mono text-[10px] tracking-wider'>
                  [CERT_B2]
                </span>
              </div>
              <p className='text-body font-sans text-sm leading-relaxed'>
                Fluência em inglês avançado validada e certificada via{' '}
                <span className='text-pink-neon font-medium'>TOEFL ITP B2</span>. Capacidade total para atuar em times
                internacionais, debugar documentações nativas e realizar reuniões técnicas sem atritos.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
