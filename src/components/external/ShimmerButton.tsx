import React, { type CSSProperties, type ComponentPropsWithoutRef } from 'react'

import { motion } from 'motion/react'

import { cn } from '@/lib/utils/cn'

export interface ShimmerButtonProps extends ComponentPropsWithoutRef<'button'> {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  className?: string
  children?: React.ReactNode
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = '#ffffff',
      shimmerSize = '0.06em',
      shimmerDuration = '3s',
      borderRadius = '0px', // Padrão geométrico industrial do portfólio
      background = 'rgba(0, 0, 0, 1)',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    // Convertemos a string do duration (ex: "3s" -> 3) para passar nativamente ao Framer Motion
    const durationNumber = parseFloat(shimmerDuration) || 3

    return (
      <button
        style={
          {
            '--spread': '90deg',
            '--shimmer-color': shimmerColor,
            '--radius': borderRadius,
            '--speed': shimmerDuration,
            '--cut': shimmerSize,
            '--bg': background,
            borderRadius: borderRadius,
          } as CSSProperties
        }
        className={cn(
          'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden border border-white/10 px-6 py-3 whitespace-nowrap text-white transition-transform duration-300 ease-in-out active:translate-y-px',
          className,
        )}
        ref={ref}
        {...props}
      >
        {/* SPARK CONTAINER */}
        <div className='@container-size absolute inset-0 -z-30 overflow-visible blur-[2px]'>
          {/* SPARK SLIDE: Replicando o '--animate-shimmer-slide' */}
          <motion.div
            className='absolute inset-0 aspect-square h-[100cqh] rounded-none [mask:none]'
            animate={{
              transform: ['translate(0px, 0px)', 'translate(calc(100cqw - 100%), 0px)'],
            }}
            transition={{
              duration: durationNumber,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'reverse', // Atua como o 'alternate' do CSS
            }}
          >
            {/* SPARK SPIN: Replicando o '--animate-spin-around' com as pausas exatas em 90° e 270° */}
            <motion.div
              className='absolute -inset-full w-auto [translate:0_0]'
              style={{
                background: `conic-gradient(from calc(270deg - (90deg * 0.5)), transparent 0, var(--shimmer-color) 90deg, transparent 90deg)`,
              }}
              animate={{
                rotate: [0, 90, 90, 270, 270, 360],
              }}
              transition={{
                duration: durationNumber * 2, // calc(var(--speed) * 2)
                ease: 'linear',
                repeat: Infinity,
                // Mapeamento idêntico às porcentagens do seu keyframes (0%, 15%, 35%, 65%, 85%, 100%)
                times: [0, 0.15, 0.35, 0.65, 0.85, 1.0],
              }}
            />
          </motion.div>
        </div>

        {children}

        {/* HIGHLIGHT RÍGIDO: Acompanha o raio dinâmico e aplica a cor misturada ao tema */}
        <div
          className='absolute inset-0 h-full w-full transform-gpu px-4 py-1.5 transition-all duration-300 ease-in-out group-hover:bg-white/2'
          style={{
            borderRadius: 'var(--radius)',
            boxShadow: 'inset 0 -8px 12px color-mix(in srgb, var(--shimmer-color) 16%, transparent)',
          }}
        />

        {/* BACKDROP */}
        <div
          className='absolute -z-20 transition-colors duration-300'
          style={{
            top: 'var(--cut)',
            bottom: 'var(--cut)',
            left: 'var(--cut)',
            right: 'var(--cut)',
            borderRadius: 'calc(var(--radius) - var(--cut))',
            background: 'var(--bg)',
          }}
        />
      </button>
    )
  },
)

ShimmerButton.displayName = 'ShimmerButton'
