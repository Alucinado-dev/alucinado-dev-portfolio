'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Icon } from '@iconify/react'

interface ProjectCardProps {
  slug: string
  id: string
  title: string
  description: string
  imageUrl: string
  tags: { name: string; icon: string; colorClass?: string }[]
  badgeText?: string
}

export function ProjectCard({
  slug,
  id,
  title,
  description,
  imageUrl,
  tags,
  badgeText = 'Destaque',
}: ProjectCardProps) {
  return (
    // O card inteiro agora é o link para a página dinâmica slug
    <Link
      href={`/projects/${slug}`}
      className='group z-20 flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#020612] shadow-xl transition-all duration-300 hover:border-white/20 hover:bg-[#020612]/70'
    >
      {/* CONTAINER DA IMAGEM: Controla o transbordo para o efeito de zoom */}
      <div className='relative aspect-video w-full overflow-hidden border-b border-white/10'>
        {/* Badge Técnico Tático (Ex: DESTAQUE ou IA) */}

        {/* Micro-ID do sistema no canto superior direito da imagem */}
        <div className='absolute top-3 right-3 z-20 font-mono text-[9px] tracking-wider text-white/30 select-none'>
          {id}
        </div>

        {/* A Imagem com Efeito de Zoom Suave no Hover do Card */}
        <Image
          src={imageUrl}
          alt={title}
          fill
          loading='lazy'
          sizes='(max-w-7xl) 33vw, 100vw'
          className='object-cover transition-transform duration-500 ease-out group-hover:scale-105'
        />

        {/* Overlay escuro sutil para garantir contraste no topo */}
        <div className='pointer-events-none absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-transparent' />
      </div>

      {/* CONTEÚDO DO CARD */}
      <div className='flex flex-1 flex-col justify-between space-y-4 p-5'>
        <div className='space-y-2'>
          {/* Título com seta de indicação discreta igual à referência image_29811b.jpg */}
          <div className='flex items-center justify-between font-sans text-base font-bold tracking-tight text-slate-100 transition-colors duration-200 group-hover:text-[#00fbea]'>
            <h4>{title}</h4>

            <div className='z-20 flex gap-2'>
              <span className='rounded-none border border-white/10 bg-black/80 px-2 py-0.5 font-mono text-[9px] font-bold tracking-widest text-slate-600 uppercase select-none group-hover:text-slate-200'>
                {badgeText}
              </span>

              <Icon
                icon='lucide:arrow-right'
                className='h-4 w-4 -translate-x-2 text-slate-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-[#00fbea] group-hover:opacity-100'
              />
            </div>
          </div>

          <p className='font-outfit line-clamp-2 text-xs leading-relaxed font-light text-slate-400'>{description}</p>
        </div>

        {/* FOOTER DO CARD: Ícones das Stacks que ganham cor no Hover */}
        <div className='flex items-center justify-between border-t border-white/5 pt-3'>
          {/* Fileira de Ícones de Tecnologia */}
          <div className='flex items-center -space-x-1.5'>
            {tags.slice(0, 5).map((tag, idx) => (
              <div
                key={idx}
                className='relative flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-[#0d1527] shadow-md transition-transform duration-200 group-hover:-translate-y-0.5'
                style={{ zIndex: 10 - idx }}
              >
                {/*
                  O TRUQUE SÊNIOR: grayscale-100 brightness-75 por padrão (preto e branco fosco).
                  No hover do grupo (card), vira grayscale-0 brightness-100 (ganha a cor original da stack).
                */}
                <Icon
                  icon={tag.icon}
                  className='h-4 w-4 opacity-60 grayscale filter transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0'
                />
              </div>
            ))}

            {/* Indicador de mais tecnologias se passar de 5 */}
            {tags.length > 5 && (
              <div className='relative z-0 flex h-7 w-7 items-center justify-center rounded-full border border-white/5 bg-slate-900 font-mono text-[9px] font-bold text-slate-500'>
                +{tags.length - 5}
              </div>
            )}
          </div>

          {/* Link discreto de Ação de Detalhes */}
          <span className='font-mono text-[10px] font-bold tracking-wider text-[#00fbea]/80 decoration-[#00fbea]/30 underline-offset-4 group-hover:text-[#00fbea] group-hover:underline'>
            Ver Detalhes
          </span>
        </div>
      </div>
    </Link>
  )
}
