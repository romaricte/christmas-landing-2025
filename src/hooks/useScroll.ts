// src/hooks/useScroll.ts
import { useState, useEffect, useCallback } from 'react'
import { useStore } from '../stores/useStore'
import { throttle } from '../utils/helpers'

interface ScrollData {
  scrollY: number
  scrollProgress: number
  direction: 'up' | 'down'
  isAtTop: boolean
  isAtBottom: boolean
}

interface ScrollOptions {
  throttleMs?: number
}

export function useScroll(options: ScrollOptions = {}): ScrollData {
  const { throttleMs = 16 } = options
  
  const [scrollData, setScrollData] = useState<ScrollData>({
    scrollY: 0,
    scrollProgress: 0,
    direction: 'down',
    isAtTop: true,
    isAtBottom: false,
  })
  
  const setScrollProgress = useStore((state) => state.setScrollProgress)

  const handleScroll = useCallback((): void => {
    const scrollY = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = docHeight > 0 ? scrollY / docHeight : 0
    
    setScrollData((prev) => ({
      scrollY,
      scrollProgress: progress,
      direction: scrollY > prev.scrollY ? 'down' : 'up',
      isAtTop: scrollY < 10,
      isAtBottom: progress > 0.99,
    }))
    
    setScrollProgress(progress)
  }, [setScrollProgress])

  useEffect(() => {
    const throttledScroll = throttle(handleScroll, throttleMs)

    window.addEventListener('scroll', throttledScroll, { passive: true })
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [handleScroll, throttleMs])

  return scrollData
}