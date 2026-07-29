type LogoProps = {
  size?: 'header' | 'footer'
  variant?: 'symbol' | 'signature'
  className?: string
}

function AlucinadoSymbol({ className }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 64 64'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      aria-hidden='true'
      focusable='false'
    >
      <path d='M5 58 24.5 6H36L16.5 58H5Z' fill='currentColor' />
      <path d='M38 6 59 58H46L32.5 23.5 38 6Z' fill='currentColor' />
      <path d='M21 39H41.5L46 50H17L21 39Z' fill='currentColor' />
      <path d='m32 31 5.5 8H27l5-8Z' fill='#010205' />
      <path d='M49 11h9v3h-9z' fill='currentColor' opacity='.42' />
    </svg>
  )
}

export default function Logo({ size = 'header', variant = 'symbol', className = '' }: LogoProps) {
  const isFooter = size === 'footer'
  const symbolSize = isFooter ? 'h-12 w-12' : 'h-9 w-9'

  if (variant === 'signature') {
    return (
      <span className={`inline-flex items-center gap-3 ${className}`} aria-hidden='true'>
        <span className='text-cyan-bright relative shrink-0'>
          <AlucinadoSymbol className={symbolSize} />
          <span className='bg-plasma-purple absolute right-[8%] bottom-[10%] h-1 w-1 shadow-[0_0_8px_rgba(139,92,246,0.75)]' />
        </span>
        <span className='flex flex-col'>
          <span className='font-audiowide text-base leading-none tracking-[0.13em] text-slate-50 uppercase sm:text-lg'>
            Alucinado
          </span>
          <span className='font-syne-mono mt-1.5 text-[7px] tracking-[0.2em] text-slate-500 uppercase'>
            por Lucino Campos
          </span>
        </span>
      </span>
    )
  }

  return (
    <span
      className={`text-cyan-bright relative inline-flex items-center justify-center ${symbolSize} ${className}`}
      aria-hidden='true'
    >
      <AlucinadoSymbol className='h-full w-full' />
      <span className='bg-plasma-purple absolute right-[8%] bottom-[10%] h-1 w-1 shadow-[0_0_8px_rgba(139,92,246,0.7)]' />
    </span>
  )
}
