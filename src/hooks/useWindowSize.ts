// src/hooks/useWindowSize.ts
import { useState, useEffect } from 'react'
import type { Size } from '../types'
import { BREAKPOINTS } from '../utils/constants'

interface WindowSize extends Size {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<Size>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    function handleResize(): void {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    ...windowSize,
    isMobile: windowSize.width < BREAKPOINTS.md,
    isTablet: windowSize.width >= BREAKPOINTS.md && windowSize.width < BREAKPOINTS.lg,
    isDesktop: windowSize.width >= BREAKPOINTS.lg,
  }
}