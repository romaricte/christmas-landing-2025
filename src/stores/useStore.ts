// src/stores/useStore.ts
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { useShallow } from 'zustand/react/shallow'
import type { Store, Position2D, ModalContent, Ornament } from '../types'

// ==================== STORE PRINCIPAL ====================

export const useStore = create<Store>()(
  subscribeWithSelector((set, get) => ({
    // ========== LOADING STATE ==========
    isLoaded: false,
    loadingProgress: 0,
    setLoaded: (value: boolean) => set({ isLoaded: value }),
    setLoadingProgress: (progress: number) => set({ loadingProgress: progress }),

    // ========== AUDIO STATE ==========
    audioEnabled: false,
    musicPlaying: false,
    musicVolume: 0.3,
    sfxVolume: 0.5,
    
    toggleAudio: () => {
      const { audioEnabled } = get()
      set({ 
        audioEnabled: !audioEnabled,
        musicPlaying: !audioEnabled 
      })
    },
    setMusicPlaying: (playing: boolean) => set({ musicPlaying: playing }),
    setMusicVolume: (volume: number) => set({ musicVolume: volume }),
    setSfxVolume: (volume: number) => set({ sfxVolume: volume }),

    // ========== SCENE STATE ==========
    snowIntensity: 1,
    bloomIntensity: 1.5,
    
    setSnowIntensity: (intensity: number) => set({ snowIntensity: intensity }),
    setBloomIntensity: (intensity: number) => set({ bloomIntensity: intensity }),

    // ========== INTERACTION STATE ==========
    hoveredElement: null,
    selectedElement: null,
    mousePosition: { x: 0, y: 0 },
    
    setHoveredElement: (element: string | null) => set({ hoveredElement: element }),
    setSelectedElement: (element: string | null) => set({ selectedElement: element }),
    setMousePosition: (position: Position2D) => set({ mousePosition: position }),

    // ========== SCROLL STATE ==========
    scrollProgress: 0,
    currentSection: 0,
    
    setScrollProgress: (progress: number) => set({ scrollProgress: progress }),
    setCurrentSection: (section: number) => set({ currentSection: section }),

    // ========== UI STATE ==========
    isMenuOpen: false,
    isModalOpen: false,
    modalContent: null,
    
    toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
    openModal: (content: ModalContent) => set({ isModalOpen: true, modalContent: content }),
    closeModal: () => set({ isModalOpen: false, modalContent: null }),

    // ========== USER PREFERENCES ==========
    reducedMotion: false,
    highQuality: true,
    
    setReducedMotion: (value: boolean) => set({ reducedMotion: value }),
    setHighQuality: (value: boolean) => set({ highQuality: value }),

    // ========== CHRISTMAS SPECIFIC ==========
    wishText: '',
    setWishText: (text: string) => set({ wishText: text }),
    
    placedOrnaments: [],
    addOrnament: (ornament: Ornament) => set((state) => ({ 
      placedOrnaments: [...state.placedOrnaments, ornament] 
    })),
    removeOrnament: (id: string) => set((state) => ({ 
      placedOrnaments: state.placedOrnaments.filter((o) => o.id !== id) 
    })),
    clearOrnaments: () => set({ placedOrnaments: [] }),
  }))
)

// ==================== HOOKS AVEC useShallow (pour React 19) ====================

export const useLoadingState = () => {
  return useStore(
    useShallow((state) => ({
      isLoaded: state.isLoaded,
      loadingProgress: state.loadingProgress,
      setLoaded: state.setLoaded,
      setLoadingProgress: state.setLoadingProgress,
    }))
  )
}

export const useAudioState = () => {
  return useStore(
    useShallow((state) => ({
      audioEnabled: state.audioEnabled,
      musicPlaying: state.musicPlaying,
      musicVolume: state.musicVolume,
      sfxVolume: state.sfxVolume,
      toggleAudio: state.toggleAudio,
      setMusicPlaying: state.setMusicPlaying,
      setMusicVolume: state.setMusicVolume,
      setSfxVolume: state.setSfxVolume,
    }))
  )
}

export const useSceneState = () => {
  return useStore(
    useShallow((state) => ({
      snowIntensity: state.snowIntensity,
      bloomIntensity: state.bloomIntensity,
      highQuality: state.highQuality,
      setSnowIntensity: state.setSnowIntensity,
      setBloomIntensity: state.setBloomIntensity,
      setHighQuality: state.setHighQuality,
    }))
  )
}

export const useInteractionState = () => {
  return useStore(
    useShallow((state) => ({
      hoveredElement: state.hoveredElement,
      selectedElement: state.selectedElement,
      mousePosition: state.mousePosition,
      setHoveredElement: state.setHoveredElement,
      setSelectedElement: state.setSelectedElement,
    }))
  )
}

export const useUIState = () => {
  return useStore(
    useShallow((state) => ({
      isMenuOpen: state.isMenuOpen,
      isModalOpen: state.isModalOpen,
      modalContent: state.modalContent,
      toggleMenu: state.toggleMenu,
      openModal: state.openModal,
      closeModal: state.closeModal,
    }))
  )
}

export const useChristmasState = () => {
  return useStore(
    useShallow((state) => ({
      wishText: state.wishText,
      placedOrnaments: state.placedOrnaments,
      setWishText: state.setWishText,
      addOrnament: state.addOrnament,
      removeOrnament: state.removeOrnament,
      clearOrnaments: state.clearOrnaments,
    }))
  )
}