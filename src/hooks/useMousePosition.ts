import { useState, useEffect, useCallback } from 'react'

interface MousePosition {
  x: number
  y: number
  normalizedX: number
  normalizedY: number
}

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  })

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const { clientX, clientY } = event
    const normalizedX = (clientX / window.innerWidth) * 2 - 1
    const normalizedY = -(clientY / window.innerHeight) * 2 + 1

    setMousePosition({
      x: clientX,
      y: clientY,
      normalizedX,
      normalizedY,
    })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return mousePosition
}
