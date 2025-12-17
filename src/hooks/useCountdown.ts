// src/hooks/useCountdown.ts
import { useState, useEffect, useCallback } from 'react'
import type { TimeRemaining } from '../types'
import { getTimeUntilChristmas } from '../utils/helpers'

export function useCountdown(): TimeRemaining {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(
    getTimeUntilChristmas()
  )

  const updateCountdown = useCallback((): void => {
    setTimeRemaining(getTimeUntilChristmas())
  }, [])

  useEffect(() => {
    // Mise à jour immédiate
    updateCountdown()

    // Mise à jour chaque seconde
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [updateCountdown])

  return timeRemaining
}