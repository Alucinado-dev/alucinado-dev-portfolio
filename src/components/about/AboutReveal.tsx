'use client'

import { motion } from 'motion/react'

import { cn } from '@/lib/utils/cn'

type AboutRevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  immediate?: boolean
}

export function AboutReveal({ children, className, delay = 0, immediate = false }: AboutRevealProps) {
  return (
    <motion.div
      data-about-reveal
      className={cn(className)}
      initial={immediate ? false : { opacity: 0, y: 22 }}
      whileInView={immediate ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
