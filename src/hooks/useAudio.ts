import { useEffect, useRef, useCallback } from 'react'
import { Howl } from 'howler'
import { useStore } from '../stores/useStore'

interface AudioConfig {
  src: string
  loop?: boolean
  volume?: number
  autoplay?: boolean
}

export const useAudio = (config: AudioConfig) => {
  const soundRef = useRef<Howl | null>(null)
  const isMuted = useStore((state) => state.isMuted)

  useEffect(() => {
    soundRef.current = new Howl({
      src: [config.src],
      loop: config.loop ?? true,
      volume: config.volume ?? 0.5,
      autoplay: false,
    })

    return () => {
      soundRef.current?.unload()
    }
  }, [config.src, config.loop, config.volume])

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.mute(isMuted)
    }
  }, [isMuted])

  const play = useCallback(() => {
    if (soundRef.current && !soundRef.current.playing()) {
      soundRef.current.play()
    }
  }, [])

  const stop = useCallback(() => {
    soundRef.current?.stop()
  }, [])

  const pause = useCallback(() => {
    soundRef.current?.pause()
  }, [])

  const setVolume = useCallback((volume: number) => {
    soundRef.current?.volume(volume)
  }, [])

  return { play, stop, pause, setVolume, sound: soundRef.current }
}

export const useBackgroundMusic = () => {
  return useAudio({
    src: '/audio/jingle-bells.mp3',
    loop: true,
    volume: 0.3,
  })
}

export const useAmbientSound = () => {
  return useAudio({
    src: '/audio/ambient-wind.mp3',
    loop: true,
    volume: 0.2,
  })
}
