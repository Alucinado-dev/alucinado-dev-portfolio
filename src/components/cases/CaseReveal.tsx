'use client'

import { motion } from 'motion/react'

import { cn } from '@/lib/utils/cn'

type CaseRevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  immediate?: boolean
}

export function CaseReveal({ children, className, delay = 0, immediate = false }: CaseRevealProps) {
  return (
    <motion.div
      data-case-reveal
      className={cn(className)}
      initial={immediate ? false : { opacity: 0, y: 24 }}
      whileInView={immediate ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
