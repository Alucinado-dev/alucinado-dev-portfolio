'use client'

import { useRef } from 'react'

import { motion, useScroll, useSpring } from 'framer-motion'

import Container from '@/components/container/Container'

interface TimelineItem {
  period: string
  title: string
  organization: string
  location: string
  isCurrent?: boolean
  isOpenToWork?: boolean // Nova flag para o selo de oportunidade
  type: 'WORK' | 'MILESTONE' | 'ACADEMIC'
  description?: string
  highlights?: string[]
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    type: 'WORK',
    period: '2024 — PRESENTE',
    title: 'Desenvolvedor Frontend Freelancer',
    organization: 'Coletivo FloatHouse',
    location: 'Remoto',
    isCurrent: true,
    isOpenToWork: true, // Ativa o selo de "Disponível"
    highlights: [
      'Atuação em equipe multidisciplinar no desenvolvimento de aplicações web, dividindo tarefas, definindo arquiteturas de interface e realizando revisões de código conjuntas.',
      'Alinhamento direto com clientes para levantamento de requisitos, refinamento de escopo, prazos de entrega e validação de protótipos.',
      'Configuração de fluxos de deploy e ambientes de homologação, garantindo a estabilidade e entrega contínua de sistemas reais em produção.',
    ],
  },
  {
    type: 'WORK',
    period: '2023 — 2024',
    title: 'Scrum Master / Liderança Ágil',
    organization: 'Empresa Júnior Zaffiro (UFPA)',
    location: 'Belém / PA',
    highlights: [
      'Facilitação de cerimônias ágeis (Sprints, Dailies e Retrospectivas), garantindo a cadência de entrega e organização do time de engenharia.',
      'Mapeamento de débitos técnicos e remoção ativa de impedimentos operacionais em conjunto com os stakeholders do projeto.',
      'Planejamento de releases e gestão de backlog, garantindo previsibilidade e qualidade na entrega de produtos e MVPs.',
    ],
  },
  {
    type: 'MILESTONE',
    period: '2023',
    title: 'Transição de Carreira para Tecnologia',
    organization: 'Estudos Autodidatas',
    location: 'Brasil',
    description:
      'Pivô estratégico focado em engenharia de software e desenvolvimento web. Dedicação integral ao estudo de arquitetura de componentes, lógica de programação avançada, gerenciamento de estado e ecossistema TypeScript.',
  },
  {
    type: 'ACADEMIC',
    period: '2020 — 2023', // Corrigido o ano de início para evitar distorção cronológica
    title: 'Graduação em Engenharia Biomédica (Interrompida)',
    organization: 'Universidade Federal do Pará (UFPA)',
    location: 'Belém / PA',
    description:
      'Desenvolvimento de sólida base analítica e raciocínio lógico rigoroso. Experiência prática com física experimental, modelagem matemática de sistemas e introdução à lógica de programação.',
  },
]

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Captura o progresso de rolagem específico desta seção
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  // Suaviza a animação da linha para não dar trancos ao scrollar rápido
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <section id='experience' className='border-stroke-subtle bg-base w-full border-t py-20'>
      <Container className='border-stroke-subtle bg-panel/5 relative z-10 overflow-hidden rounded-xs border p-4 backdrop-blur-md sm:p-6 md:p-12'>
        {/* Cabeçalho de Ponta a Ponta */}
        <div className='relative mb-20 flex items-center gap-4 select-none'>
          <h2 className='font-space-grotesk text-primary text-xl font-bold tracking-tight uppercase md:text-2xl'>
            [08] Histórico Profissional e Acadêmico
          </h2>
          <div className='from-stroke-subtle h-px flex-1 bg-linear-to-r to-transparent' />
        </div>

        {/* MÓDULO DA TIMELINE GRID */}
        <div ref={containerRef} className='relative mx-auto w-full max-w-5xl'>
          {/* Linha Guia Controlada pelo Scroll do Mouse (Apenas Desktop) */}
          <div className='bg-stroke-subtle/30 absolute top-3 bottom-3 left-[155px] hidden w-px md:block'>
            <motion.div
              style={{ scaleY }}
              className='from-cyan-bright via-stroke-focus to-stroke-subtle h-full w-full origin-top bg-linear-to-b shadow-[0_0_8px_rgba(6,182,212,0.5)]'
            />
          </div>

          <div className='space-y-10'>
            {TIMELINE_DATA.map((item, index) => {
              return (
                <motion.div
                  key={index}
                  className='relative grid grid-cols-1 gap-4 md:grid-cols-[140px_1fr] md:gap-12'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  {/* Coluna 1: Datas Maiores, Legíveis e Fixas */}
                  <div className='pt-1.5 select-none md:text-right'>
                    <span className='font-space-grotesk text-secondary block text-sm font-bold tracking-wider md:text-base'>
                      {item.period.split(' — ')[0]}
                    </span>
                    <span className='text-dim mt-0.5 block font-mono text-[10px] tracking-widest uppercase md:mt-0'>
                      {item.period.split(' — ')[1] ? `— ${item.period.split(' — ')[1]}` : ''}
                    </span>
                  </div>

                  {/* Nó Indicador na Linha (Apenas Desktop) */}
                  <div className='absolute top-3.5 left-[155px] z-20 hidden h-2 w-2 -translate-x-1/2 items-center justify-center md:flex'>
                    <div
                      className={`h-2 w-2 rounded-full border transition-all duration-500 ${
                        item.isCurrent
                          ? 'border-cyan-bright bg-space-dark scale-110 shadow-[0_0_10px_rgba(6,182,212,0.8)]'
                          : 'border-stroke-subtle bg-base'
                      }`}
                    />
                  </div>

                  {/* Coluna 2: Card Robusto com Profundidade (Sombra Forte) */}
                  <div
                    className={`border-stroke-subtle bg-panel/30 hover:border-stroke-focus relative rounded-xs border p-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] ${
                      item.isCurrent ? 'border-stroke-focus/70 bg-panel/40 ring-stroke-focus/20 ring-1' : ''
                    }`}
                  >
                    {/* Cabeçalho do Card */}
                    <div className='mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                      <div className='space-y-1'>
                        <span className='text-dim mb-1 block font-mono text-[10px] tracking-wider uppercase md:hidden'>
                          {item.location}
                        </span>
                        <h3 className='text-primary font-space-grotesk text-base font-bold tracking-tight uppercase md:text-lg'>
                          {item.title}
                        </h3>
                        <p className='text-secondary font-mono text-xs font-medium tracking-wide'>
                          @{item.organization}
                        </p>
                      </div>

                      {/* Espaço para Selos/Badges Dinâmicos */}
                      <div className='flex flex-wrap gap-1.5 self-start pt-1'>
                        {item.isOpenToWork && (
                          <span className='flex items-center gap-1.5 rounded-xs border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 font-mono text-[9px] font-semibold tracking-wider text-emerald-400 uppercase shadow-[0_0_10px_rgba(16,185,129,0.1)]'>
                            <span className='h-1 w-1 animate-pulse rounded-full bg-emerald-400' />
                            Disponível para Propostas
                          </span>
                        )}
                        {!item.isCurrent && (
                          <span className='text-dim border-stroke-subtle bg-box rounded-xs border px-1.5 py-0.5 font-mono text-[9px] font-medium tracking-wider uppercase'>
                            {item.location}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Conteúdo: Texto Corrido */}
                    {item.description && (
                      <p className='text-body font-sans text-sm leading-relaxed antialiased'>{item.description}</p>
                    )}

                    {/* Conteúdo: Tópicos de Processo */}
                    {item.highlights && (
                      <ul className='text-body border-stroke-subtle/40 space-y-3 border-l pl-4 font-sans text-sm leading-relaxed antialiased'>
                        {item.highlights.map((bullet, idx) => (
                          <li
                            key={idx}
                            className='before:bg-muted/30 relative before:absolute before:top-[9px] before:left-[-21px] before:h-1 before:w-1 before:rounded-full'
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
