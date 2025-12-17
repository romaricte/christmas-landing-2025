// src/App.tsx
import { Suspense, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

// Components
import CustomLoader from './components/ui/Loader'
import Navbar from './components/ui/Navbar'
import Hero from './components/ui/Hero'
import CountdownTimer from './components/ui/CountdownTimer'
import WishCard from './components/ui/WishCard'
import Newsletter from './components/ui/Newsletter'
import Footer from './components/ui/Footer'
import AudioControls from './components/ui/AudioControls'

// Store - Sélecteurs individuels
import { useStore } from './stores/useStore'
import { prefersReducedMotion } from './utils/helpers'

function App(): React.ReactNode {
  // Sélectionner les valeurs individuellement
  const isLoaded = useStore((state) => state.isLoaded)
  const setLoaded = useStore((state) => state.setLoaded)
  const setReducedMotion = useStore((state) => state.setReducedMotion)
  
  const [showLoader, setShowLoader] = useState<boolean>(true)

  // Vérifier les préférences utilisateur
  useEffect(() => {
    setReducedMotion(prefersReducedMotion())
    
    // Écouter les changements de préférence
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (e: MediaQueryListEvent): void => {
      setReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [setReducedMotion])

  // Gérer la fin du chargement
  const handleLoadComplete = (): void => {
    setLoaded(true)
    setTimeout(() => setShowLoader(false), 500)
  }

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Loader */}
      <AnimatePresence mode="wait">
        {showLoader && (
          <CustomLoader onComplete={handleLoadComplete} />
        )}
      </AnimatePresence>

      {/* Contenu UI */}
      <div 
        className={`relative z-10 transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Navbar />
        
        <main>
          <Hero />
          <CountdownTimer />
          <WishCard />
          <Newsletter />
        </main>
        
        <Footer />
      </div>

      {/* Contrôles audio */}
      <AudioControls />
    </div>
  )
}

export default App