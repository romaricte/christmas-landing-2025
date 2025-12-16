import { create } from 'zustand'

interface SceneState {
  isLoading: boolean
  loadingProgress: number
  isMuted: boolean
  currentSection: number
  isInteracting: boolean
  selectedGift: number | null
  snowIntensity: number
  cameraPosition: [number, number, number]
  
  setLoading: (loading: boolean) => void
  setLoadingProgress: (progress: number) => void
  toggleMute: () => void
  setCurrentSection: (section: number) => void
  setInteracting: (interacting: boolean) => void
  selectGift: (gift: number | null) => void
  setSnowIntensity: (intensity: number) => void
  setCameraPosition: (position: [number, number, number]) => void
}

export const useStore = create<SceneState>((set) => ({
  isLoading: true,
  loadingProgress: 0,
  isMuted: true,
  currentSection: 0,
  isInteracting: false,
  selectedGift: null,
  snowIntensity: 1,
  cameraPosition: [0, 2, 10],
  
  setLoading: (loading) => set({ isLoading: loading }),
  setLoadingProgress: (progress) => set({ loadingProgress: progress }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setCurrentSection: (section) => set({ currentSection: section }),
  setInteracting: (interacting) => set({ isInteracting: interacting }),
  selectGift: (gift) => set({ selectedGift: gift }),
  setSnowIntensity: (intensity) => set({ snowIntensity: intensity }),
  setCameraPosition: (position) => set({ cameraPosition: position }),
}))
