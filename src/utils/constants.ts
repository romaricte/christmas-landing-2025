// src/utils/constants.ts
import type { 
  SceneConfig, 
  SnowConfig, 
  TreeConfig, 
  GiftConfig, 
  AudioConfig 
} from '../types'

// Couleurs du thème
export const COLORS = {
  christmas: {
    red: '#C41E3A',
    redLight: '#FF6B6B',
    green: '#165B33',
    greenLight: '#228B22',
    gold: '#FFD700',
    goldLight: '#FFED4A',
  },
  night: {
    dark: '#0F1C2E',
    default: '#1E3A5F',
    light: '#2E5A8F',
  },
  snow: {
    white: '#FFFFFF',
    cream: '#F5E6D3',
    ice: '#87CEEB',
  },
} as const

// Configuration de la scène 3D
export const SCENE_CONFIG: SceneConfig = {
  camera: {
    position: [0, 2, 12],
    fov: 45,
    near: 0.1,
    far: 1000,
  },
  fog: {
    color: '#0a0a1a',
    near: 10,
    far: 50,
  },
}

// Configuration des particules de neige
export const SNOW_CONFIG: SnowConfig = {
  count: 8000,
  area: {
    width: 50,
    height: 30,
    depth: 50,
  },
  speed: {
    min: 0.5,
    max: 2,
  },
  size: {
    min: 0.02,
    max: 0.08,
  },
}

// Configuration du sapin
export const TREE_CONFIG: TreeConfig = {
  levels: 4,
  baseRadius: 1.8,
  height: 1.2,
  lightsCount: 50,
  colors: ['#ff0000', '#00ff00', '#ffff00', '#0000ff', '#ff00ff', '#00ffff'],
}

// Configuration des cadeaux
export const GIFTS_CONFIG: GiftConfig = {
  count: 8,
  colors: ['#C41E3A', '#165B33', '#FFD700', '#4169E1', '#9932CC'],
  positions: [
    { x: -2, y: 1.5 },
    { x: 2, y: 1.5 },
    { x: -1.5, y: 2 },
    { x: 1.5, y: 2 },
    { x: 0, y: 2.5 },
    { x: -2.5, y: 0.5 },
    { x: 2.5, y: 0.5 },
    { x: 0, y: 1 },
  ],
}

// Configuration audio
export const AUDIO_CONFIG: Record<'music' | 'ambient', AudioConfig> = {
  music: {
    src: '/audio/jingle-bells.mp3',
    volume: 0.3,
    loop: true,
  },
  ambient: {
    src: '/audio/ambient-wind.mp3',
    volume: 0.2,
    loop: true,
  },
}

// Date de Noël pour le countdown
export const getChristmasDate = (): Date => {
  const now = new Date()
  const year = now.getMonth() === 11 && now.getDate() > 25 
    ? now.getFullYear() + 1 
    : now.getFullYear()
  return new Date(year, 11, 25)
}

// Breakpoints responsive
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

// Sections de la page
export const SECTIONS = [
  { id: 'hero', label: 'Accueil' },
  { id: 'countdown', label: 'Compte à rebours' },
  { id: 'wishes', label: 'Vœux' },
  { id: 'newsletter', label: 'Newsletter' },
] as const

// Ornements disponibles
export const ORNAMENT_TYPES = [
  { type: 'ball', label: 'Boule', emoji: '🔴' },
  { type: 'star', label: 'Étoile', emoji: '⭐' },
  { type: 'candy', label: 'Sucre d\'orge', emoji: '🍬' },
  { type: 'bell', label: 'Cloche', emoji: '🔔' },
  { type: 'ribbon', label: 'Ruban', emoji: '🎀' },
] as const