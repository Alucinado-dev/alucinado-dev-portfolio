'use client'

import { useEffect, useState } from 'react'

export const usePageVisibility = (): boolean => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const updateVisibility = () => setIsVisible(document.visibilityState !== 'hidden')

    updateVisibility()
    document.addEventListener('visibilitychange', updateVisibility)
    return () => document.removeEventListener('visibilitychange', updateVisibility)
  }, [])

  return isVisible
}
