import Link from 'next/link'

import { Icon } from '@iconify/react'

import Container from '@/components/container/Container'
import { ProjectCard } from '@/components/features/ProjectCard'
import { projects } from '@/lib/data/ProjectData'

export default function ProjectsSection() {
  return (
    <section className='relative z-10 w-full bg-transparent py-16 md:py-24'>
      <Container
        isFluid={false}
        className='relative space-y-12 rounded-none border border-white/10 bg-linear-to-b bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] from-[#061024]/90 to-[#020612]/95 bg-size-[32px_32px] p-8 shadow-[0_0_50px_-12px_rgba(0,251,234,0.06)] backdrop-blur-md md:p-12'
      >
        {/* DETALHES DE ENGENHARIA: Pequenos marcadores nos cantos do painel */}
        <div className='absolute top-2 left-3 font-mono text-[10px] text-white/15 select-none'>+</div>
        <div className='absolute top-2 right-3 font-mono text-[10px] text-white/15 select-none'>+</div>
        <div className='absolute bottom-2 left-3 font-mono text-[10px] text-white/15 select-none'>+</div>
        <div className='absolute right-3 bottom-2 font-mono text-[10px] text-white/15 select-none'>+</div>

        {/* CABEÇALHO DO PAINEL */}
        <div className='flex flex-col justify-between gap-6 border-b border-white/5 pb-8 md:flex-row md:items-end'>
          <div className='space-y-3'>
            {/* Texto limpo e estritamente em português */}
            <div className='font-mono text-[10px] font-bold tracking-[0.2em] text-[#00fbea] uppercase'>
              02 . COMPILAÇÃO_DE_PROJETOS
            </div>
            <h2 className='font-sans text-2xl font-bold tracking-tight text-slate-100 uppercase md:text-3xl'>
              Projetos em Destaque
            </h2>
          </div>
          <p className='font-outfit max-w-md text-sm leading-relaxed font-light text-slate-400 md:text-right'>
            Uma seleção de aplicações em produção que demonstram proficiência em arquitetura frontend, performance e
            entrega de valor comercial real.
          </p>
        </div>

        {/* O GRID DE CARDS: Agora contrastam perfeitamente sobre o fundo do painel */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              slug={project.slug}
              id={project.id}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              badgeText={project.badgeText}
              tags={project.techs}
            />
          ))}
        </div>

        {/* BOTÃO DE NAVEGAÇÃO: Link limpo focado em português para o acervo completo */}
        <div className='flex justify-center pt-4'>
          <Link
            href='/projects'
            className='group flex rounded-none border border-white/10 bg-white/5 px-6 py-3 font-mono text-xs font-bold tracking-widest text-slate-300 transition-all duration-300 hover:border-[#00fbea]/40 hover:bg-[#00fbea]/5 hover:text-[#00fbea]'
          >
            <span className='flex items-center gap-2'>
              VER_ACERVO_COMPLETO
              <Icon
                icon='lucide:arrow-right'
                className='h-4 w-4 text-slate-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#00fbea]'
              />
            </span>
          </Link>
        </div>
      </Container>
    </section>
  )
}
