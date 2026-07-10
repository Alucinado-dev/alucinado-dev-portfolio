'use client'

import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

import { Icon } from '@iconify/react'

import { projects } from '@/lib/data/ProjectData'

export default function ProjectDetailsPage() {
  const { slug } = useParams()
  const router = useRouter()

  // Busca o projeto pelo slug correspondente
  const project = projects.find(p => p.slug === slug)

  // Fallback caso o projeto não seja indexado
  if (!project) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center gap-4 bg-[#030610] font-mono text-slate-400'>
        <Icon icon='lucide:alert-triangle' width='32' className='animate-pulse text-amber-500' />
        <p>ERR_PROJECT_NOT_FOUND_IN_REGISTRY</p>
        <button onClick={() => router.push('/projects')} className='text-xs text-cyan-400 underline'>
          Retornar ao Acervo
        </button>
      </div>
    )
  }

  return (
    <main className='relative z-10 my-32 rounded-2xl border-t border-slate-900 bg-[#030610] px-6 py-24 text-slate-100 md:px-12'>
      <div className='mx-auto max-w-5xl space-y-10'>
        {/* BOTÃO VOLTAR E CRUMBS */}
        <nav className='flex items-center gap-4 font-mono text-xs text-slate-500'>
          <button
            onClick={() => router.push('/projects')}
            className='group flex items-center gap-1.5 transition-colors hover:text-cyan-400'
          >
            <Icon icon='lucide:arrow-left' width='14' className='transition-transform group-hover:-translate-x-0.5' />
            <span>VOLTAR_AO_ACERVO</span>
          </button>
          <span>/</span>
          <span className='text-slate-400 uppercase'>{project.slug}</span>
        </nav>

        {/* HEADER DO CASE */}
        <header className='flex flex-col gap-6 border-b border-slate-900 pb-6 md:flex-row md:items-end md:justify-between'>
          <div className='space-y-2'>
            <div className='flex items-center gap-3 font-mono text-[10px] font-bold tracking-widest text-slate-500 uppercase'>
              <span>{project.id}</span>
              <span className='h-3 w-px bg-slate-800' />
              <span className='text-slate-400'>{project.nature}</span>
              <span className='h-3 w-px bg-slate-800' />
              <span className='text-cyan-400/90'>{project.scope}</span>
            </div>
            <h1 className='font-mono text-4xl font-bold tracking-tight text-slate-100 md:text-5xl'>{project.title}</h1>
            <p className='font-mono text-xs text-slate-400'>/ / ROLE: {project.role.toUpperCase()}</p>
          </div>

          {/* AÇÕES DE PRODUÇÃO (LINKS EXTERNOS) */}
          <div className='flex flex-wrap gap-3 font-mono text-xs'>
            {project.links.live && (
              <a
                href={project.links.live}
                target='_blank'
                rel='noreferrer'
                className='flex items-center gap-2 rounded bg-cyan-500 px-4 py-2 font-bold text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-colors hover:bg-cyan-400'
              >
                <span>LIVE_DEPLOY</span>
                <Icon icon='lucide:external-link' width='14' />
              </a>
            )}

            {project.links.isPrivateGithub ? (
              <div
                className='flex cursor-not-allowed items-center gap-2 rounded border border-slate-800 bg-slate-900 px-4 py-2 text-slate-500'
                title='Código sob NDA comercial'
              >
                <Icon icon='lucide:lock' width='14' />
                <span>PRIVATE_REPO</span>
              </div>
            ) : (
              project.links.github && (
                <a
                  href={project.links.github}
                  target='_blank'
                  rel='noreferrer'
                  className='flex items-center gap-2 rounded border border-slate-800 bg-slate-900/60 px-4 py-2 text-slate-200 transition-colors hover:border-slate-700 hover:bg-slate-900'
                >
                  <Icon icon='lucide:github' width='14' />
                  <span>VIEW_CODE</span>
                </a>
              )
            )}
          </div>
        </header>

        {/* HERO VISUAL DO PROJETO */}
        <div className='group relative aspect-video w-full overflow-hidden rounded-lg border border-slate-800/80 bg-slate-950/40'>
          <Image
            src={project.imageUrl}
            fill
            alt={`Painel de visualização de ${project.title}`}
            className='h-full w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-[1.01]'
          />
        </div>

        {/* GRID ASSIMÉTRICO PRINCIPAL */}
        <div className='grid grid-cols-1 items-start gap-10 md:grid-cols-3'>
          {/* COLUNA ESQUERDA: NARRATIVA E REQUISITOS (66%) */}
          <div className='space-y-8 md:col-span-2'>
            <section className='space-y-4'>
              <h2 className='flex items-center gap-2 font-mono text-xs tracking-widest text-slate-400 uppercase'>
                <span className='h-1.5 w-1.5 rounded-full bg-cyan-500' />
                01 / VISÃO_GERAL_E_CONTEXTO
              </h2>
              <div className='space-y-4 font-sans text-[15px] leading-relaxed text-slate-300'>
                {/* Divide a descrição estendida por quebras de linha caso haja */}
                {project.extendedDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section className='space-y-4'>
              <h2 className='flex items-center gap-2 font-mono text-xs tracking-widest text-slate-400 uppercase'>
                <span className='h-1.5 w-1.5 rounded-full bg-cyan-500' />
                02 / ESPECIFICACOES_E_FUNCIONALIDADES
              </h2>
              <ul className='grid grid-cols-1 gap-3 font-mono text-xs text-slate-400 sm:grid-cols-2'>
                {project.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className='group/item flex flex-col gap-1 rounded border border-l-2 border-slate-900 border-l-slate-800 bg-[#060913] p-3.5 shadow-sm transition-all duration-300 hover:border-slate-800 hover:border-l-cyan-500/70'
                  >
                    <div className='flex items-center gap-2 font-mono text-[11px] text-slate-300 transition-colors group-hover/item:text-cyan-400'>
                      <span className='text-cyan-500/50 transition-transform group-hover/item:translate-x-0.5'>↳</span>
                      <span>{feature}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* COLUNA DIREITA: JUSTIFICATIVA DE ENGENHARIA (33% - STICKY) */}
          <aside className='space-y-4 rounded-lg border border-slate-800/50 bg-[#060913] p-5 md:sticky md:top-24'>
            <h2 className='flex items-center gap-2 border-b border-slate-900 pb-3 font-mono text-xs tracking-widest text-slate-400 uppercase'>
              <Icon icon='lucide:cpu' width='14' className='text-cyan-500' />
              ARQUITETURA_DE_STACK
            </h2>

            <div className='custom-scrollbar max-h-125 space-y-4 overflow-y-auto pr-1'>
              {project.techs.map(tech => (
                <div
                  key={tech.name}
                  className='group/tech space-y-1.5 border-b border-slate-900/60 pb-3 last:border-0 last:pb-0'
                >
                  <div className='flex items-center gap-2 text-slate-200'>
                    <div className='text-slate-500 transition-colors group-hover/tech:text-cyan-400'>
                      <Icon icon={tech.icon} width='16' />
                    </div>
                    <span className='font-mono text-xs font-bold tracking-tight'>{tech.name.toUpperCase()}</span>
                  </div>
                  <p className='pl-6 font-sans text-xs leading-relaxed text-slate-400'>{tech.justification}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
