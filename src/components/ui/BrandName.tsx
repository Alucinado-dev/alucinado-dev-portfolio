import MeshText from '@/components/external/MeshText'

const brandMeshPoints = [
  { color: '#00fbea', x: 12, y: 48, spread: 68, opacity: 1 },
  { color: '#67e8f9', x: 42, y: 18, spread: 42, opacity: 0.72 },
  { color: '#8b5cf6', x: 73, y: 62, spread: 46, opacity: 0.86 },
  { color: '#f72585', x: 98, y: 42, spread: 28, opacity: 0.78 },
]

type BrandNameProps = {
  children: string
  size?: 'header' | 'footer'
}

export default function BrandName({ children, size = 'header' }: BrandNameProps) {
  const isFooter = size === 'footer'

  return (
    <span className={`relative inline-flex flex-col ${isFooter ? 'pb-2' : 'pb-1.5'}`}>
      <MeshText
        points={brandMeshPoints}
        background='#94a3b8'
        className={`font-asimovian block font-normal whitespace-nowrap drop-shadow-[0_0_7px_rgba(0,251,234,0.18)] ${
          isFooter ? 'text-xl tracking-[0.055em] sm:text-2xl' : 'text-sm tracking-[0.055em] sm:text-base'
        }`}
      >
        {children}
      </MeshText>

      <span aria-hidden='true' className={`absolute bottom-0 left-0 flex items-center ${isFooter ? 'w-28' : 'w-20'}`}>
        <span className='from-cyan-bright/85 via-plasma-purple/65 h-px flex-1 bg-linear-to-r to-transparent' />
        <span className='bg-pink-neon -ml-1 h-1 w-1 rotate-45 shadow-[0_0_6px_rgba(247,37,133,0.8)]' />
      </span>
    </span>
  )
}
