'use client'

import { type ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/utils/cn'

export interface AnimatedGradientTextProps extends ComponentPropsWithoutRef<'span'> {
  speed?: number
  colorFrom?: string
  colorTo?: string
}

export function AnimatedGradientText({
  children,
  className,
  speed = 1,
  colorFrom = '#00fbea', // Seu Ciano
  colorTo = '#7c3aed', // Seu Roxo
  ...props
}: AnimatedGradientTextProps) {
  return (
    <span
      style={
        {
          '--bg-size': `${speed * 300}%`,
          '--color-from': colorFrom,
          '--color-to': colorTo,
        } as React.CSSProperties
      }
      className={cn(
        // Remetendo à animação configurada no globals.css do Tailwind v4
        `animate-gradient inline bg-linear-to-r from-(--color-from) via-(--color-to) to-(--color-from) bg-size-[var(--bg-size)_100%] bg-clip-text text-transparent`,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

interface ProjectButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  colorFrom?: string
  colorTo?: string
}

export function ProjectButton({
  className,
  colorFrom = '#00fbea',
  colorTo = '#7c3aed',
  children,
  ...props
}: ProjectButtonProps) {
  return (
    <button
      className={cn(
        // Estrutura do botão adaptada para o visual rígido e responsivo
        'group relative flex cursor-pointer items-center justify-center rounded-none bg-slate-950/40 px-7 py-4 transition-transform duration-200 select-none hover:scale-105 active:translate-y-px',
        className,
      )}
      {...props}
    >
      {/* A Borda Mágica Animada via Máscara CSS */}
      <span
        className='animate-gradient absolute inset-0 block h-full w-full rounded-none bg-linear-to-r from-[#00fbea]/60 via-[#7c3aed]/60 to-[#00fbea]/60 bg-size-[300%_100%] p-px opacity-60 transition-opacity duration-300 group-hover:opacity-100'
        style={{
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'destination-out',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'subtract',
          WebkitClipPath: 'padding-box',
        }}
      />

      {/* O Conteúdo do Botão utilizando o texto gradiente sem risco de quebra */}
      <AnimatedGradientText className='font-asimovian text-xs font-bold tracking-[0.2em] uppercase'>
        {children || 'Ver Projetos'}
      </AnimatedGradientText>

      {/* Brilho neon sutil de fundo no hover (Opcional, mantém o clima HUD) */}
      <div
        className='pointer-events-none absolute inset-0 -z-10 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-10'
        style={{
          background: `radial-gradient(circle, ${colorFrom} 0%, transparent 70%)`,
        }}
      />
    </button>
  )
}
