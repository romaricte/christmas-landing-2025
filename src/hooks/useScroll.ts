import { useState, useEffect, useCallback } from 'react'

interface ScrollState {
  scrollY: number
  scrollProgress: number
  direction: 'up' | 'down' | null
}

export const useScroll = () => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    scrollProgress: 0,
    direction: null,
  })

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const progress = maxScroll > 0 ? currentScrollY / maxScroll : 0

    setScrollState((prev) => ({
      scrollY: currentScrollY,
      scrollProgress: Math.min(Math.max(progress, 0), 1),
      direction: currentScrollY > prev.scrollY ? 'down' : currentScrollY < prev.scrollY ? 'up' : prev.direction,
    }))
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return scrollState
}
