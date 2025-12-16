import { useEffect } from 'react'
import { Scene } from './components/3d/Scene'
import { LoadingScreen } from './components/ui/LoadingScreen'
import { Overlay } from './components/ui/Overlay'
import { useBackgroundMusic, useAmbientSound } from './hooks/useAudio'
import { useStore } from './stores/useStore'
import './styles/globals.css'
import './styles/animations.css'

function App() {
  const isMuted = useStore((state) => state.isMuted)
  const isLoading = useStore((state) => state.isLoading)
  const backgroundMusic = useBackgroundMusic()
  const ambientSound = useAmbientSound()

  useEffect(() => {
    if (!isLoading && !isMuted) {
      backgroundMusic.play()
      ambientSound.play()
    } else {
      backgroundMusic.pause()
      ambientSound.pause()
    }
  }, [isLoading, isMuted, backgroundMusic, ambientSound])

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isMuted && !isLoading) {
        backgroundMusic.play()
        ambientSound.play()
      }
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
    }

    document.addEventListener('click', handleFirstInteraction)
    document.addEventListener('keydown', handleFirstInteraction)

    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
    }
  }, [isMuted, isLoading, backgroundMusic, ambientSound])

  return (
    <div className="app">
      <LoadingScreen />
      <Scene />
      <Overlay />
    </div>
  )
}

export default App
