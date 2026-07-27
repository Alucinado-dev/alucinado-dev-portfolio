import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils/cn'

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
  isFluid?: boolean
}

const Container: React.FC<ContainerProps> = ({ children, isFluid = false, className, ...props }) => {
  return (
    <div {...props} className={cn('mx-auto px-4', isFluid ? 'w-full' : 'container', className)}>
      {children}
    </div>
  )
}

export default Container
