import Image from 'next/image'
import Link from 'next/link'

import { Icon } from '@iconify/react'

import type { ProjectDataType } from '@/types/ProjectTypes'

interface ProjectArchiveCardProps {
  project: ProjectDataType
}

export function ProjectArchiveCard({ project }: ProjectArchiveCardProps) {
  return (
    <div className='group relative flex min-h-95 flex-col justify-between overflow-hidden rounded-lg border border-slate-800/70 bg-[#060913] p-5 transition-all duration-500 hover:border-cyan-500/40 hover:shadow-[0_0_35px_rgba(6,182,212,0.06)]'>
      {/* Linha técnica decorativa */}
      <div className='absolute top-0 left-0 h-0.5 w-full bg-linear-to-r from-transparent via-slate-800 to-transparent transition-all duration-500 group-hover:via-cyan-500/50' />

      <div>
        {/* CABEÇALHO: METADATA E BADGES */}
        <div className='mb-4 flex items-start justify-between gap-4'>
          <div className='space-y-0.5'>
            <div className='flex items-center gap-2 font-mono text-[10px] tracking-widest text-slate-500'>
              <span className='text-cyan-500/80'>/ /</span>
              <span>{project.id}</span>
            </div>
            <h3 className='font-mono text-xl font-bold tracking-tight text-slate-200 transition-colors duration-300 group-hover:text-cyan-400'>
              {project.title}
            </h3>
          </div>

          <div className='flex flex-col items-end gap-1.5 font-mono text-[9px] font-semibold tracking-widest uppercase sm:flex-row sm:items-center'>
            <span className='rounded border border-slate-800/80 bg-slate-900/90 px-2 py-0.5 text-slate-400'>
              {project.nature}
            </span>
            <span className='rounded border border-cyan-500/30 bg-cyan-950/20 px-2 py-0.5 text-cyan-400 backdrop-blur-sm'>
              {project.scope}
            </span>
          </div>
        </div>

        {/* CARGO / ATUAÇÃO */}
        <div className='mb-2.5 flex items-center gap-1.5 font-mono text-[11px] text-slate-500'>
          <span className='h-1 w-1 rounded-full bg-slate-700 transition-colors duration-500 group-hover:bg-cyan-500' />
          <span>{project.role}</span>
        </div>

        {/* DESCRIÇÃO */}
        <p className='line-clamp-3 font-sans text-sm leading-relaxed text-slate-400 transition-colors duration-300 group-hover:text-slate-300'>
          {project.description}
        </p>
      </div>
      {/* CONTAINER DA IMAGEM ESTILO TÉRMICO/INDUSTRIAL */}
      <div className='relative mt-6 mb-4 aspect-video w-full overflow-hidden rounded border border-slate-800/60 bg-slate-950/50'>
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          loading='lazy'
          className='h-full w-full object-cover opacity-50 transition-all duration-700 ease-out group-hover:opacity-100'
        />
        {/* Overlay sutil para misturar a imagem ao fundo escuro */}
        <div className='absolute inset-0 bg-linear-to-t from-[#060913] via-transparent to-transparent opacity-60' />
      </div>

      {/* FOOTER: TECHS E LINKS */}
      <div className='mt-6 flex items-center justify-between gap-4 border-t border-slate-900/80 pt-4'>
        <div className='flex flex-wrap items-center gap-2.5'>
          {project.techs.map(tech => (
            <div
              key={tech.name}
              className='flex h-5 w-5 cursor-help items-center justify-center text-slate-500 transition-all duration-300 group-hover:text-slate-300 hover:scale-110 hover:text-cyan-400!'
              title={tech.name}
            >
              <Icon icon={tech.icon} width='18' height='18' />
            </div>
          ))}
        </div>

        <div className='flex items-center gap-4 font-mono text-[11px] font-medium tracking-wider'>
          {project.links.isPrivateGithub ? (
            <span
              className='flex cursor-not-allowed items-center gap-1.5 text-slate-600 select-none'
              title='Repositório privado corporativo'
            >
              <Icon icon='lucide:lock' width='13' height='13' />
              <span className='hidden sm:inline'>CODE</span>
            </span>
          ) : (
            project.links.github && (
              <a
                href={project.links.github}
                target='_blank'
                rel='noreferrer'
                className='flex items-center gap-1.5 text-slate-400 transition-colors hover:text-slate-200'
              >
                <Icon icon='lucide:github' width='14' height='14' />
                <span className='hidden sm:inline'>CODE</span>
              </a>
            )
          )}

          <Link
            href={`/projects/${project.slug}`}
            className='group/btn flex items-center gap-1.5 rounded border border-slate-800 bg-slate-900/50 px-3 py-1 text-slate-300 transition-all duration-300 hover:border-cyan-500/30 hover:bg-cyan-950/30 hover:text-cyan-400'
          >
            <span>VIEW</span>
            <Icon
              icon='lucide:arrow-up-right'
              width='12'
              height='12'
              className='text-slate-500 transition-all duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:text-cyan-400'
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
