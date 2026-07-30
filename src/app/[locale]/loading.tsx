import { getTranslations } from 'next-intl/server'

export default async function Loading() {
  const t = await getTranslations('pages.loading')

  return (
    <main
      className='relative flex min-h-[calc(100vh-3.5rem)] items-center justify-center overflow-hidden'
      aria-live='polite'
      aria-busy='true'
    >
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,251,234,0.06),transparent_42%)]' />
      <div className='relative flex flex-col items-center'>
        <div className='relative h-14 w-14' aria-hidden='true'>
          <span className='border-cyan-bright/35 absolute inset-0 rotate-45 border' />
          <span className='border-plasma-purple/35 absolute inset-2 rotate-45 border motion-safe:animate-pulse' />
          <span className='bg-cyan-bright absolute inset-[25px] rounded-full shadow-[0_0_12px_rgba(0,251,234,0.8)]' />
        </div>
        <p className='font-syne-mono mt-7 text-[10px] tracking-[0.18em] text-slate-400 uppercase'>{t('label')}</p>
        <span className='mt-3 h-px w-28 overflow-hidden bg-white/8' aria-hidden='true'>
          <span className='bg-cyan-bright/70 block h-full w-1/2 motion-safe:animate-pulse' />
        </span>
      </div>
    </main>
  )
}
