// src/hooks/useAudio.ts
import { useEffect, useRef, useCallback } from 'react'
import { Howl } from 'howler'
import { useAudioState } from '../stores/useStore'
import type { SfxName } from '../types'

interface SfxCollection {
  [key: string]: Howl
}

interface UseAudioReturn {
  playSfx: (name: SfxName) => void
  playMusic: () => void
  pauseMusic: () => void
  toggleMusic: () => void
  isPlaying: boolean
}

export function useAudio(): UseAudioReturn {
  const musicRef = useRef<Howl | null>(null)
  const sfxRef = useRef<SfxCollection>({})
  
  const { 
    audioEnabled, 
    musicPlaying, 
    musicVolume, 
    sfxVolume,
    setMusicPlaying 
  } = useAudioState()

  // Initialiser la musique et les effets sonores
  useEffect(() => {
    // Créer l'instance de musique
    musicRef.current = new Howl({
      src: ['/audio/jingle-bells.mp3'],
      loop: true,
      volume: musicVolume,
      html5: true, // Meilleur pour les longs fichiers audio
      onplayerror: () => {
        console.warn('Audio playback failed, retrying...')
        musicRef.current?.once('unlock', () => {
          musicRef.current?.play()
        })
      },
    })

    // Créer les effets sonores
    const sfxFiles: Record<SfxName, string> = {
      click: '/audio/sfx/click.mp3',
      whoosh: '/audio/sfx/whoosh.mp3',
      magic: '/audio/sfx/magic.mp3',
      bell: '/audio/sfx/bell.mp3',
    }

    Object.entries(sfxFiles).forEach(([name, src]) => {
      sfxRef.current[name] = new Howl({
        src: [src],
        volume: sfxVolume,
        preload: true,
      })
    })

    // Cleanup
    return () => {
      if (musicRef.current) {
        musicRef.current.unload()
      }
      Object.values(sfxRef.current).forEach((sfx) => sfx.unload())
    }
  }, []) // Exécuté une seule fois au montage

  // Gérer le play/pause de la musique
  useEffect(() => {
    if (!musicRef.current) return

    if (audioEnabled && musicPlaying) {
      musicRef.current.play()
    } else {
      musicRef.current.pause()
    }
  }, [audioEnabled, musicPlaying])

  // Mettre à jour le volume de la musique
  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume(musicVolume)
    }
  }, [musicVolume])

  // Mettre à jour le volume des effets sonores
  useEffect(() => {
    Object.values(sfxRef.current).forEach((sfx) => {
      sfx.volume(sfxVolume)
    })
  }, [sfxVolume])

  // Jouer un effet sonore
  const playSfx = useCallback((name: SfxName): void => {
    if (!audioEnabled) return
    
    const sfx = sfxRef.current[name]
    if (sfx) {
      sfx.play()
    }
  }, [audioEnabled])

  // Contrôles de la musique
  const playMusic = useCallback((): void => {
    setMusicPlaying(true)
  }, [setMusicPlaying])

  const pauseMusic = useCallback((): void => {
    setMusicPlaying(false)
  }, [setMusicPlaying])

  const toggleMusic = useCallback((): void => {
    setMusicPlaying(!musicPlaying)
  }, [musicPlaying, setMusicPlaying])

  return {
    playSfx,
    playMusic,
    pauseMusic,
    toggleMusic,
    isPlaying: musicPlaying && audioEnabled,
  }
}