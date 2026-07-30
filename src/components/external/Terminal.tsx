'use client'

import { Children, type ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react'

import { useLocale, useTranslations } from 'next-intl'

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
      className={cn('font-vt323 text-[15px] leading-5 tracking-wide md:text-lg md:leading-6', className)}
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

  if (!showLine) return <div className='min-h-5.5' />

  return (
    <div
      className={cn(
        'font-vt323 flex min-h-5.5 items-start gap-2 py-0.5 text-[15px] leading-5 tracking-wide md:items-center md:text-lg md:leading-none',
        className,
      )}
    >
      {icon && (isCurrentActive || hasFinished) && <Icon icon={icon} className={cn('h-4 w-4 shrink-0', iconClass)} />}

      <span className='min-w-0 whitespace-normal'>
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
  const t = useTranslations('pages.home.hero.terminal')

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
      return { progress: '45%', status: 'starting' as const }
    }
    if (activeIndex < 7) {
      return { progress: '82%', status: 'connecting' as const }
    }
    return { progress: '100%', status: 'ready' as const }
  }, [activeIndex])

  const sequenceComplete = activeIndex >= wrappedChildren.length

  return (
    <SequenceContext.Provider value={contextValue}>
      <div
        className={cn(
          'relative z-20 flex min-h-92 w-full max-w-xl flex-col overflow-hidden rounded-sm border border-cyan-900/55 bg-[#01040c]/92 text-slate-300 shadow-[0_28px_70px_-38px_rgba(0,0,0,0.96)] backdrop-blur-md',
          className,
        )}
      >
        <div className='flex items-center justify-between border-b border-cyan-950/70 bg-[#020713] px-4 py-3 select-none'>
          <div className='font-syne-mono flex min-w-0 items-center gap-3 border-l-2 border-cyan-500/70 pl-3 text-[11px] tracking-[0.16em] text-slate-300'>
            <Icon icon='lucide:square-terminal' className='h-4 w-4 shrink-0 text-cyan-400' aria-hidden='true' />
            <span className='truncate'>{t('title')}</span>
          </div>

          <div className='relative mr-1 h-4 w-4 rotate-45 border border-purple-400/45' aria-hidden='true'>
            <span className='absolute inset-[3px] border border-cyan-300/70' />
            <span className='absolute top-1/2 left-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-cyan-300/80' />
          </div>
        </div>

        {/* ÁREA DE CONTEÚDO (Dosagem ideal de padding e gap para evitar overflow e travar o scroll) */}
        <div className='relative flex-1 overflow-hidden bg-linear-to-b from-transparent to-slate-950/25 p-4 text-left md:p-5'>
          <div
            className='pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_3px,rgba(255,255,255,0.8)_4px)] opacity-[0.035]'
            aria-hidden='true'
          />
          <div className='relative z-10 flex flex-col gap-y-0.5'>{wrappedChildren}</div>

          {sequenceComplete && (
            <motion.a
              href='#projetos'
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className='font-vt323 relative z-10 mt-2 flex items-center justify-between border-t border-dashed border-cyan-900/45 pt-2 text-[15px] tracking-wide text-cyan-200/85 transition-colors hover:text-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400'
            >
              <span className='flex items-center gap-2'>
                <span className='text-cyan-500'>&gt;_</span>
                {t('hint')}
              </span>
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden='true'
              >
                <Icon icon='lucide:chevrons-down' className='h-4 w-4' />
              </motion.span>
            </motion.a>
          )}
        </div>

        {/* FOOTER REATIVO DINÂMICO */}
        <div className='font-rajdhani grid grid-cols-2 items-center border-t border-cyan-950/70 bg-[#020713] px-3.5 py-2 text-[10px] font-bold tracking-widest text-slate-400 select-none sm:grid-cols-3 sm:px-4 sm:text-[11px]'>
          <div className='flex items-center gap-1'>
            <Icon icon='lucide:globe' className='h-3 w-3 text-slate-400' />
            <span>
              {t('footer.language')}: [{locale.toLocaleUpperCase()}]
            </span>
          </div>
          <div className='hidden text-center sm:block'>
            {t('footer.progress')}: {footerTelemetry.progress}
          </div>
          <div className='flex items-center justify-end'>
            <span
              className={cn(
                'transition-all duration-300',
                footerTelemetry.status === 'ready'
                  ? 'border border-cyan-500/35 bg-cyan-500/10 px-2 py-0.5 tracking-[0.16em] text-cyan-300'
                  : 'text-amber-500',
              )}
            >
              {t(`footer.${footerTelemetry.status}`)}
            </span>
          </div>
        </div>
      </div>
    </SequenceContext.Provider>
  )
}
