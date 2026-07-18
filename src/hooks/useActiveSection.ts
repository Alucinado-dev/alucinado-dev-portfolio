'use client'

import { useEffect, useState } from 'react'

export function useActiveSection<T extends string>(sectionIds: readonly T[], fallbackId: T) {
  const [activeSectionId, setActiveSectionId] = useState<T>(fallbackId)

  useEffect(() => {
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    if (sections.length === 0) return

    const visibleSections = new Map<Element, IntersectionObserverEntry>()

    const updateBoundarySection = () => {
      if (window.scrollY <= 64) {
        setActiveSectionId(sectionIds[0] ?? fallbackId)
        return true
      }

      const pageBottom = window.scrollY + window.innerHeight
      if (pageBottom >= document.documentElement.scrollHeight - 4) {
        setActiveSectionId(sectionIds.at(-1) ?? fallbackId)
        return true
      }

      return false
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) visibleSections.set(entry.target, entry)
          else visibleSections.delete(entry.target)
        })

        if (updateBoundarySection()) return

        const viewportFocus = window.innerHeight * 0.42
        const closestSection = [...visibleSections.values()].sort(
          (a, b) =>
            Math.abs(a.boundingClientRect.top + a.boundingClientRect.height / 2 - viewportFocus) -
            Math.abs(b.boundingClientRect.top + b.boundingClientRect.height / 2 - viewportFocus),
        )[0]

        if (closestSection) setActiveSectionId(closestSection.target.id as T)
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: [0, 0.01],
      },
    )

    sections.forEach(section => observer.observe(section))
    window.addEventListener('scroll', updateBoundarySection, { passive: true })
    updateBoundarySection()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', updateBoundarySection)
    }
  }, [fallbackId, sectionIds])

  return { activeSectionId, setActiveSectionId }
}
