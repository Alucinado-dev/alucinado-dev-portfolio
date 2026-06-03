'use client'

import dynamic from 'next/dynamic'

export const BackgroundWrapper = dynamic(() => import('@/components/layout/Background'), {
  ssr: false,
  // Carrega um esqueleto preto básico enquanto o JS do cliente não monta o Canvas
  loading: () => <div className='fixed inset-0 z-[-1] bg-[#010205]' />,
})
