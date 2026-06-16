/* eslint-disable react/jsx-no-comment-textnodes */
'use client'

import { Children, type ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react'

import { useLocale } from 'next-intl'

import { Icon } from '@iconify/react'
import { motion } from 'motion/react'

import { cn } from '@/lib/utils/cn'

interface SequenceContextValue {
  completeItem: (index: number) => void
  activeIndex: number
  sequenceStarted: boolean
}

const SequenceContext = createContext<SequenceContextValue | null>(null)
const useSequence = () => useContext(SequenceContext)

const ItemIndexContext = createContext<number | null>(null)
const useItemIndex = () => useContext(ItemIndexContext)

interface AnimatedSpanProps {
  children: ReactNode
  delay?: number
  postDelay?: number
  className?: string
}

export const AnimatedSpan = ({ children, delay = 0, postDelay = 50, className }: AnimatedSpanProps) => {
  const sequence = useSequence()
  const itemIndex = useItemIndex()

  const shouldAnimate = !sequence || itemIndex === null || sequence.activeIndex >= itemIndex

  return (
    <motion.div
      initial={{ opacity: 0, x: -2 }}
      animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -2 }}
      transition={{ duration: 0.1, delay: delay / 1000 }}
      className={cn('font-vt323 text-base leading-relaxed tracking-wide md:text-lg', className)}
      onAnimationComplete={() => {
        if (!shouldAnimate || !sequence || itemIndex === null) return
        setTimeout(() => {
          sequence.completeItem(itemIndex)
        }, postDelay)
      }}
    >
      {children}
    </motion.div>
  )
}

interface TypingAnimationProps {
  children: string
  className?: string
  duration?: number
  postDelay?: number // Tempo de espera com cursor piscando após terminar de digitar a linha
  icon?: string
  iconClass?: string
}

export const TypingAnimation = ({
  children,
  className,
  duration = 12,
  postDelay = 120,
  icon,
  iconClass,
}: TypingAnimationProps) => {
  const [displayedText, setDisplayedText] = useState<string>('')
  const sequence = useSequence()
  const itemIndex = useItemIndex()

  const shouldStart = !sequence || itemIndex === null || sequence.activeIndex === itemIndex
  const hasFinished = sequence !== null && itemIndex !== null && sequence.activeIndex > itemIndex

  useEffect(() => {
    let typingEffect: ReturnType<typeof setInterval> | null = null

    if (shouldStart) {
      let i = 0
      typingEffect = setInterval(() => {
        if (i < children.length) {
          setDisplayedText(children.substring(0, i + 1))
          i++
        } else {
          if (typingEffect !== null) clearInterval(typingEffect)
          if (sequence && itemIndex !== null) {
            // Usa o postDelay customizado da linha antes de pular para o próximo index da fila
            setTimeout(() => {
              sequence.completeItem(itemIndex)
            }, postDelay)
          }
        }
      }, duration)
    }

    return () => {
      if (typingEffect !== null) clearInterval(typingEffect)
    }
  }, [children, duration, shouldStart, sequence, itemIndex, postDelay])

  const isCurrentActive = sequence?.activeIndex === itemIndex
  const showLine = !sequence || itemIndex === null || sequence.activeIndex >= itemIndex

  if (!showLine) return <div className='h-5.5' />

  return (
    <div
      className={cn(
        'font-vt323 flex h-5.5 items-center gap-2 text-base leading-none tracking-wide md:text-lg',
        className,
      )}
    >
      {icon && (isCurrentActive || hasFinished) && <Icon icon={icon} className={cn('h-4 w-4 shrink-0', iconClass)} />}

      <span>
        {displayedText}
        {isCurrentActive && (
          <span className='ml-1 inline-block h-3.5 w-1.5 animate-[pulse_0.6s_infinite] bg-cyan-400 align-middle' />
        )}
      </span>
    </div>
  )
}

interface TerminalProps {
  children: ReactNode
  className?: string
}

export const Terminal = ({ children, className }: TerminalProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const contextValue = useMemo<SequenceContextValue>(() => {
    return {
      completeItem: (index: number) => {
        setActiveIndex(current => (index === current ? current + 1 : current))
      },
      activeIndex,
      sequenceStarted: true,
    }
  }, [activeIndex])

  const wrappedChildren = useMemo(() => {
    const array = Children.toArray(children)
    return array.map((child, index) => (
      <ItemIndexContext.Provider key={index} value={index}>
        {child}
      </ItemIndexContext.Provider>
    ))
  }, [children])

  const locale = useLocale()

  const footerTelemetry = useMemo(() => {
    if (activeIndex < 2) {
      return { locale: 'BOOTING...', integrity: '45%', status: 'HANDSHAKE' }
    }
    if (activeIndex < 7) {
      return { locale: 'CONNECTING...', integrity: '82%', status: 'INDEXING' }
    }
    return { locale: locale.toLocaleUpperCase(), integrity: '100%', status: 'READY' }
  }, [activeIndex, locale])

  return (
    <SequenceContext.Provider value={contextValue}>
      <div
        className={cn(
          'relative z-20 flex h-102.5 w-full max-w-xl flex-col overflow-hidden rounded-sm border border-slate-900 bg-slate-950/75 text-slate-300 shadow-2xl backdrop-blur-md',
          className,
        )}
      >
        {/* HEADER CUSTOMIZADO INDUSTRIAL */}
        <div className='flex items-center justify-between border-b border-slate-900 bg-slate-950/90 px-4 py-2.5 select-none'>
          <div className='font-space-grotesk flex items-center gap-1.5 text-[10px] tracking-wider text-slate-400'>
            <Icon icon='lucide:terminal' className='h-3.5 w-3.5 text-cyan-500' />
            <span className='font-bold text-slate-500'>//</span>
            <span>CORE_SHELL_V1.0</span>
          </div>
          <div className='font-rajdhani flex items-center gap-3 text-[11px] font-semibold tracking-widest text-slate-500'>
            <span>PID: 4042</span>
            <div
              className={cn(
                'h-1.5 w-1.5 rounded-full transition-all duration-500',
                activeIndex > 8 ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-amber-500 shadow-[0_0_8px_#f59e0b]',
              )}
            />
          </div>
        </div>

        {/* ÁREA DE CONTEÚDO (Dosagem ideal de padding e gap para evitar overflow e travar o scroll) */}
        <div className='flex-1 overflow-hidden bg-linear-to-b from-transparent to-slate-950/20 p-4 text-left md:p-5'>
          <div className='flex flex-col gap-y-0.5'>{wrappedChildren}</div>
        </div>

        {/* FOOTER REATIVO DINÂMICO */}
        <div className='font-rajdhani flex items-center justify-between border-t border-slate-900 bg-slate-950/90 px-4 py-2 text-[11px] font-bold tracking-widest text-slate-500 select-none'>
          <div className='flex min-w-30 items-center gap-1'>
            <Icon icon='lucide:globe' className='h-3 w-3 text-slate-600' />
            <span>LOCALE: [{footerTelemetry.locale}]</span>
          </div>
          <div>INTEGRITY: {footerTelemetry.integrity}</div>
          <div
            className={cn(
              'flex min-w-17.5 items-center justify-end gap-1 transition-colors duration-300',
              footerTelemetry.status === 'READY' ? 'text-cyan-500' : 'text-amber-500',
            )}
          >
            <span
              className={cn('h-1 w-1 rounded-full bg-current', footerTelemetry.status === 'READY' && 'animate-ping')}
            />
            <span>{footerTelemetry.status}</span>
          </div>
        </div>
      </div>
    </SequenceContext.Provider>
  )
}
