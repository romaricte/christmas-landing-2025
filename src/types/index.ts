// src/types/index.ts
import { Vector3 } from 'three'

// ==================== COMMON TYPES ====================

export interface Position3D {
  x: number
  y: number
  z: number
}

export interface Position2D {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

// ==================== SCENE TYPES ====================

export interface CameraConfig {
  position: [number, number, number]
  fov: number
  near: number
  far: number
}

export interface FogConfig {
  color: string
  near: number
  far: number
}

export interface SceneConfig {
  camera: CameraConfig
  fog: FogConfig
}

// ==================== SNOW TYPES ====================

export interface SnowConfig {
  count: number
  area: {
    width: number
    height: number
    depth: number
  }
  speed: {
    min: number
    max: number
  }
  size: {
    min: number
    max: number
  }
}

export interface SnowParticle {
  position: Vector3
  velocity: number
  size: number
}

// ==================== TREE TYPES ====================

export interface TreeConfig {
  levels: number
  baseRadius: number
  height: number
  lightsCount: number
  colors: string[]
}

export interface TreeLight {
  position: [number, number, number]
  color: string
  intensity: number
}

// ==================== GIFT TYPES ====================

export interface GiftConfig {
  count: number
  colors: string[]
  positions: Position2D[]
}

export interface Gift {
  id: string
  position: Position3D
  color: string
  scale: number
  rotation: number
}

// ==================== AUDIO TYPES ====================

export interface AudioConfig {
  src: string
  volume: number
  loop: boolean
}

export interface AudioState {
  enabled: boolean
  playing: boolean
  volume: number
}

export type SfxName = 'click' | 'whoosh' | 'magic' | 'bell'

// ==================== COUNTDOWN TYPES ====================

export interface TimeRemaining {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
}

// ==================== ORNAMENT TYPES ====================

export interface Ornament {
  id: string
  type: 'ball' | 'star' | 'candy' | 'bell' | 'ribbon'
  color: string
  position: Position3D
  scale: number
}

// ==================== UI TYPES ====================

export interface NavItem {
  label: string
  href: string
  icon?: string
}

export interface WishMessage {
  id: string
  author: string
  message: string
  timestamp: Date
}

export interface ModalContent {
  title: string
  body: React.ReactNode
  actions?: React.ReactNode
}

// ==================== STORE TYPES ====================

export interface StoreState {
  // Loading
  isLoaded: boolean
  loadingProgress: number
  
  // Audio
  audioEnabled: boolean
  musicPlaying: boolean
  musicVolume: number
  sfxVolume: number
  
  // Scene
  snowIntensity: number
  bloomIntensity: number
  
  // Interaction
  hoveredElement: string | null
  selectedElement: string | null
  mousePosition: Position2D
  
  // Scroll
  scrollProgress: number
  currentSection: number
  
  // UI
  isMenuOpen: boolean
  isModalOpen: boolean
  modalContent: ModalContent | null
  
  // Preferences
  reducedMotion: boolean
  highQuality: boolean
  
  // Christmas
  wishText: string
  placedOrnaments: Ornament[]
}

export interface StoreActions {
  // Loading
  setLoaded: (value: boolean) => void
  setLoadingProgress: (progress: number) => void
  
  // Audio
  toggleAudio: () => void
  setMusicPlaying: (playing: boolean) => void
  setMusicVolume: (volume: number) => void
  setSfxVolume: (volume: number) => void
  
  // Scene
  setSnowIntensity: (intensity: number) => void
  setBloomIntensity: (intensity: number) => void
  
  // Interaction
  setHoveredElement: (element: string | null) => void
  setSelectedElement: (element: string | null) => void
  setMousePosition: (position: Position2D) => void
  
  // Scroll
  setScrollProgress: (progress: number) => void
  setCurrentSection: (section: number) => void
  
  // UI
  toggleMenu: () => void
  openModal: (content: ModalContent) => void
  closeModal: () => void
  
  // Preferences
  setReducedMotion: (value: boolean) => void
  setHighQuality: (value: boolean) => void
  
  // Christmas
  setWishText: (text: string) => void
  addOrnament: (ornament: Ornament) => void
  removeOrnament: (id: string) => void
  clearOrnaments: () => void
}

export type Store = StoreState & StoreActions

// ==================== COMPONENT PROPS ====================

export interface LoaderProps {
  onComplete: () => void
}

export interface SceneProps {
  quality?: 'low' | 'medium' | 'high'
}

export interface ChristmasTreeProps {
  position?: [number, number, number]
  scale?: number
}

export interface SnowfallProps {
  count?: number
  intensity?: number
}

export interface GiftsProps {
  count?: number
}

export interface AudioControlsProps {
  className?: string
}

export interface CountdownTimerProps {
  targetDate?: Date
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}