import Image from 'next/image'

type LogoProps = {
  size?: 'header' | 'footer'
  className?: string
}

export default function Logo({ size = 'header', className = '' }: LogoProps) {
  const isFooter = size === 'footer'

  return (
    <span
      className={`relative block shrink-0 overflow-hidden ${isFooter ? 'h-20 w-20' : 'h-12 w-12'} ${className}`}
      aria-hidden='true'
    >
      <Image
        src='/brand/alucinado-logo.png'
        alt=''
        fill
        sizes={isFooter ? '80px' : '48px'}
        className='object-contain'
        priority={!isFooter}
      />
    </span>
  )
}
