// src/utils/helpers.ts
import type { TimeRemaining, Position3D } from '../types'

/**
 * Génère un nombre aléatoire entre min et max
 */
export const randomInRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min
}

/**
 * Génère une position aléatoire dans un cube
 */
export const randomPosition = (
  width: number, 
  height: number, 
  depth: number
): [number, number, number] => {
  return [
    (Math.random() - 0.5) * width,
    Math.random() * height,
    (Math.random() - 0.5) * depth,
  ]
}

/**
 * Interpolation linéaire
 */
export const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor
}

/**
 * Clamp une valeur entre min et max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

/**
 * Mappe une valeur d'une plage à une autre
 */
export const mapRange = (
  value: number, 
  inMin: number, 
  inMax: number, 
  outMin: number, 
  outMax: number
): number => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

/**
 * Calcule le temps restant jusqu'à Noël
 */
export const getTimeUntilChristmas = (): TimeRemaining => {
  const now = new Date()
  let christmas = new Date(now.getFullYear(), 11, 25)
  
  // Si Noël est passé, on prend l'année prochaine
  if (now > christmas) {
    christmas = new Date(now.getFullYear() + 1, 11, 25)
  }
  
  const diff = christmas.getTime() - now.getTime()
  
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    total: diff,
  }
}

/**
 * Formate un nombre avec leading zero
 */
export const padZero = (num: number): string => {
  return num.toString().padStart(2, '0')
}

/**
 * Détecte si on est sur mobile
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

/**
 * Détecte si on est sur tablette
 */
export const isTablet = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.innerWidth >= 768 && window.innerWidth < 1024
}

/**
 * Détecte si l'utilisateur préfère les animations réduites
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Génère un ID unique
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9)
}

/**
 * Convertit Position3D en tuple
 */
export const positionToTuple = (pos: Position3D): [number, number, number] => {
  return [pos.x, pos.y, pos.z]
}

/**
 * Convertit tuple en Position3D
 */
export const tupleToPosition = (tuple: [number, number, number]): Position3D => {
  return { x: tuple[0], y: tuple[1], z: tuple[2] }
}

/**
 * Easing functions pour animations
 */
export const easing = {
  easeOutCubic: (t: number): number => {
    return 1 - Math.pow(1 - t, 3)
  },
  
  easeInOutCubic: (t: number): number => {
    return t < 0.5 
      ? 4 * t * t * t 
      : 1 - Math.pow(-2 * t + 2, 3) / 2
  },
  
  easeOutElastic: (t: number): number => {
    const c4 = (2 * Math.PI) / 3
    return t === 0 
      ? 0 
      : t === 1 
        ? 1 
        : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
  },
  
  easeOutBounce: (t: number): number => {
    const n1 = 7.5625
    const d1 = 2.75
    
    if (t < 1 / d1) {
      return n1 * t * t
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375
    }
  },
} as const

/**
 * Debounce function
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}