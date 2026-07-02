'use client'

import { useMemo, useState } from 'react'

import { Icon } from '@iconify/react'

import { ProjectArchiveCard } from '@/components/features/ProjectArchiveCard'
import { projects } from '@/lib/data/ProjectData'
import type { ProjectNatureType, ProjectScopeType } from '@/types/ProjectTypes'

export default function ProjectsArchivePage() {
  const [activeNature, setActiveNature] = useState<ProjectNatureType | 'all'>('all')
  const [activeScope, setActiveScope] = useState<ProjectScopeType | 'all'>('all')

  const natureOptions: (ProjectNatureType | 'all')[] = ['all', 'autoral', 'colaborativo', 'freelancer']
  const scopeOptions: (ProjectScopeType | 'all')[] = ['all', 'frontend', 'backend', 'fullstack']

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesNature = activeNature === 'all' || project.nature === activeNature
      const matchesScope = activeScope === 'all' || project.scope === activeScope
      return matchesNature && matchesScope
    })
  }, [activeNature, activeScope])

  const getNatureCount = (nature: ProjectNatureType | 'all') => {
    if (nature === 'all') return projects.length
    return projects.filter(p => p.nature === nature).length
  }

  const getScopeCount = (scope: ProjectScopeType | 'all') => {
    if (scope === 'all') return projects.length
    return projects.filter(p => p.scope === scope).length
  }

  return (
    // Adicionado relative e z-10 no container principal
    <main className='relative z-10 my-28 min-h-screen border-t border-slate-900 bg-[#030610] px-6 py-24 text-slate-100 md:px-12'>
      <div className='mx-auto max-w-6xl space-y-12'>
        {/* CABEÇALHO TÉCNICO DE ARQUIVO */}
        <header className='flex flex-col gap-6 border-b border-slate-800/60 pb-8 md:flex-row md:items-end md:justify-between'>
          <div className='space-y-2'>
            <div className='flex items-center gap-2 font-mono text-xs tracking-widest text-cyan-400 uppercase'>
              <Icon icon='lucide:folder-git-2' width='14' height='14' />
              <span>NO_02 . ARCHIVE_REGISTRY</span>
            </div>
            <h1 className='font-mono text-3xl font-bold tracking-tight text-slate-100 uppercase'>Acervo de Projetos</h1>
            <p className='max-w-xl text-sm leading-relaxed text-slate-400'>
              Indexador central de ecossistemas e aplicações desenvolvidas para fins de validação arquitetural,
              homologação comercial ou engenharia autoral.
            </p>
          </div>

          <div className='self-start rounded border border-slate-800/80 bg-slate-900/40 px-3 py-1.5 font-mono text-xs text-slate-500 md:self-end'>
            REGISTROS_ATIVOS: <span className='font-bold text-cyan-400'>{filteredProjects.length}</span>
          </div>
        </header>

        {/* PAINEL DE CONTROLE (Ganha relative e z-20 para isolar das sombras dos cards) */}
        <section className='relative z-25 space-y-4 rounded-lg border border-slate-800/50 bg-[#060913] p-6 shadow-sm'>
          {/* Categoria 1: Natureza do Projeto */}
          <div className='flex flex-col gap-3 border-b border-slate-900 pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-center'>
            <span className='font-mono text-[10px] tracking-widest text-slate-500 uppercase sm:w-28'>
              / / NATUREZA:
            </span>
            <div className='flex flex-wrap gap-2'>
              {natureOptions.map(nature => {
                const isActive = activeNature === nature
                return (
                  <button
                    key={nature}
                    onClick={() => setActiveNature(nature)}
                    className={`flex items-center gap-2 rounded border px-3 py-1 font-mono text-xs uppercase transition-all duration-300 ${
                      isActive
                        ? 'border-cyan-500/30 bg-cyan-950/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.03)]'
                        : 'border-slate-800/80 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span>{nature === 'all' ? 'todos' : nature}</span>
                    <span
                      className={`rounded px-1 text-[10px] ${isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-950 text-slate-500'}`}
                    >
                      {getNatureCount(nature)}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Categoria 2: Escopo Técnico */}
          <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
            <span className='font-mono text-[10px] tracking-widest text-slate-500 uppercase sm:w-28'>/ / ESCOPO:</span>
            <div className='flex flex-wrap gap-2'>
              {scopeOptions.map(scope => {
                const isActive = activeScope === scope
                return (
                  <button
                    key={scope}
                    onClick={() => setActiveScope(scope)}
                    className={`flex items-center gap-2 rounded border px-3 py-1 font-mono text-xs uppercase transition-all duration-300 ${
                      isActive
                        ? 'border-cyan-500/30 bg-cyan-950/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.03)]'
                        : 'border-slate-800/80 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span>
                      {scope === 'all'
                        ? 'todos'
                        : scope === 'frontend'
                          ? 'front-end'
                          : scope === 'backend'
                            ? 'back-end'
                            : scope}
                    </span>
                    <span
                      className={`rounded px-1 text-[10px] ${isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-950 text-slate-500'}`}
                    >
                      {getScopeCount(scope)}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* FEEDBACK DE FILTRO VAZIO */}
        {filteredProjects.length === 0 ? (
          <div className='space-y-3 rounded-lg border border-dashed border-slate-800 bg-[#060913]/30 p-12 text-center'>
            <Icon icon='lucide:terminal' width='28' height='28' className='mx-auto text-slate-600' />
            <p className='font-mono text-sm text-slate-400'>NENHUM_PROJETO_ENCONTRADO_PARA_ESTA_COMBINACAO</p>
            <button
              onClick={() => {
                setActiveNature('all')
                setActiveScope('all')
              }}
              className='font-mono text-xs text-cyan-400 underline transition-colors hover:text-cyan-300'
            >
              Resetar Filtros
            </button>
          </div>
        ) : (
          /* GRID PRINCIPAL DE DUAS COLUNAS */
          <div className='animate-fadeIn grid grid-cols-1 gap-6 md:grid-cols-2'>
            {filteredProjects.map(project => (
              <ProjectArchiveCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
