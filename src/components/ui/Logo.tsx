type LogoProps = {
  size?: 'header' | 'footer'
}

export default function Logo({ size = 'header' }: LogoProps) {
  const isFooter = size === 'footer'

  return (
    <div
      className={`relative flex items-center justify-center text-slate-50 ${isFooter ? 'h-12 w-12' : 'h-9 w-9'}`}
      aria-hidden='true'
    >
      <span className='border-cyan-bright/35 absolute top-0 left-0 h-2.5 w-2.5 border-t border-l' />
      <span className='border-plasma-purple/35 absolute right-0 bottom-0 h-2.5 w-2.5 border-r border-b' />
      <span className={`font-asimovian font-bold ${isFooter ? 'text-2xl' : 'text-xl'}`}>A</span>
      <span className='bg-cyan-bright absolute top-1 right-1 h-1 w-1 rounded-full shadow-[0_0_7px_rgba(0,251,234,0.8)] motion-safe:animate-pulse' />
      <span className='border-cyan-bright/10 absolute inset-1 rotate-45 border' />
    </div>
  )
}
