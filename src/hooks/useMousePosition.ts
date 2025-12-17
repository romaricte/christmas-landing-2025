// src/hooks/useMousePosition.ts
import { useState, useEffect, useCallback } from 'react'
import { useStore } from '../stores/useStore'
import type { Position2D } from '../types'
import { throttle } from '../utils/helpers'

interface MousePositionOptions {
  throttleMs?: number
  normalized?: boolean
}

export function useMousePosition(options: MousePositionOptions = {}): Position2D {
  const { throttleMs = 16, normalized = true } = options
  const [mousePosition, setMousePosition] = useState<Position2D>({ x: 0, y: 0 })
  const setStoreMousePosition = useStore((state) => state.setMousePosition)

  const updatePosition = useCallback((event: MouseEvent): void => {
    let x: number
    let y: number

    if (normalized) {
      // Position normalisée entre -1 et 1
      x = (event.clientX / window.innerWidth) * 2 - 1
      y = -(event.clientY / window.innerHeight) * 2 + 1
    } else {
      // Position en pixels
      x = event.clientX
      y = event.clientY
    }

    const position = { x, y }
    setMousePosition(position)
    setStoreMousePosition(position)
  }, [normalized, setStoreMousePosition])

  useEffect(() => {
    const throttledUpdate = throttle(updatePosition, throttleMs)

    window.addEventListener('mousemove', throttledUpdate)
    return () => window.removeEventListener('mousemove', throttledUpdate)
  }, [updatePosition, throttleMs])

  return mousePosition
}