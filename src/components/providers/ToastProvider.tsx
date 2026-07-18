'use client'

import { ToastContainer } from 'react-toastify'

export default function ToastProvider() {
  return (
    <ToastContainer
      position='bottom-right'
      autoClose={3200}
      limit={3}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme='dark'
      aria-label='Notificações do portfólio'
      toastClassName='font-outfit border border-white/10 bg-[#07101e]/96 text-sm text-slate-200 shadow-[0_24px_70px_-28px_rgba(0,0,0,0.98)] backdrop-blur-xl'
      progressClassName='bg-cyan-bright/70'
    />
  )
}
