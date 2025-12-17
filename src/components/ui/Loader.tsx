// src/components/ui/Loader.tsx
import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { LoaderProps } from '../../types'

// Composant Flocon de neige
const Snowflake = ({ delay, duration, left }: { 
  delay: number
  duration: number
  left: string 
}) => (
  <motion.div
    className="absolute text-white text-2xl pointer-events-none select-none"
    style={{ left }}
    initial={{ y: -20, opacity: 0, rotate: 0 }}
    animate={{ 
      y: '100vh', 
      opacity: [0, 1, 1, 0],
      rotate: 360 
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'linear',
    }}
  >
    ❄️
  </motion.div>
)

// Composant Cadeau rebondissant
const BouncingGift = ({ emoji, delay }: { emoji: string; delay: number }) => (
  <motion.span
    className="text-4xl inline-block"
    animate={{ y: [0, -15, 0] }}
    transition={{
      duration: 0.6,
      repeat: Infinity,
      delay,
      ease: 'easeInOut',
    }}
  >
    {emoji}
  </motion.span>
)

// Messages de chargement
const loadingMessages = [
  "Préparation des flocons de neige ❄️",
  "Allumage des guirlandes ✨",
  "Emballage des cadeaux 🎁",
  "Préparation du chocolat chaud ☕",
  "Réveil des lutins 🧝",
  "Chargement de la magie 🪄",
]

export default function CustomLoader({ onComplete }: LoaderProps){
  const [progress, setProgress] = useState<number>(0)
  const [messageIndex, setMessageIndex] = useState<number>(0)
  const [isExiting, setIsExiting] = useState<boolean>(false)

  // Simuler le chargement
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        // Progression aléatoire mais progressive
        const increment = Math.random() * 15 + 5
        return Math.min(prev + increment, 100)
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  // Changer le message de chargement
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Déclencher la sortie quand le chargement est terminé
  useEffect(() => {
    if (progress >= 100 && !isExiting) {
      const timeout = setTimeout(() => {
        setIsExiting(true)
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [progress, isExiting])

  // Appeler onComplete après l'animation de sortie
  const handleExitComplete = useCallback(() => {
    onComplete()
  }, [onComplete])

  // Générer les flocons
  const snowflakes = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 2,
    left: `${Math.random() * 100}%`,
  }))

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom, #0F1C2E, #1E3A5F)',
          }}
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
          }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Flocons en arrière-plan */}
          <div className="absolute inset-0 overflow-hidden">
            {snowflakes.map((flake) => (
              <Snowflake
                key={flake.id}
                delay={flake.delay}
                duration={flake.duration}
                left={flake.left}
              />
            ))}
          </div>

          {/* Étoiles scintillantes en arrière-plan */}
          <div className="absolute inset-0">
            {Array.from({ length: 50 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Contenu principal */}
          <motion.div
            className="relative z-10 text-center px-4"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: 'spring', 
              duration: 0.8,
              delay: 0.2 
            }}
          >
            {/* Sapin animé */}
            <motion.div
              className="text-8xl mb-6"
              animate={{ 
                rotate: [0, 5, -5, 0],
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              🎄
            </motion.div>

            {/* Titre */}
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-white mb-2 font-christmas"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Joyeux Noël
            </motion.h1>

            {/* Sous-titre avec gradient */}
            <motion.p
              className="text-xl md:text-2xl mb-8 font-accent"
              style={{
                background: 'linear-gradient(90deg, #FFD700, #FFA500, #FFD700)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'shimmer 2s linear infinite',
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Préparation de la magie...
            </motion.p>

            {/* Message de chargement */}
            <motion.p
              key={messageIndex}
              className="text-white/70 mb-8 h-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {loadingMessages[messageIndex]}
            </motion.p>

            {/* Barre de progression */}
            <div className="w-64 md:w-80 mx-auto mb-4">
              <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #C41E3A, #165B33, #C41E3A)',
                    backgroundSize: '200% 100%',
                  }}
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${progress}%`,
                    backgroundPosition: ['0% 0%', '100% 0%'],
                  }}
                  transition={{ 
                    width: { duration: 0.3 },
                    backgroundPosition: { duration: 2, repeat: Infinity, ease: 'linear' },
                  }}
                />
              </div>
              
              {/* Pourcentage */}
              <motion.p
                className="text-white/80 mt-2 text-sm font-medium"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {Math.round(progress)}%
              </motion.p>
            </div>
          </motion.div>

          {/* Cadeaux en bas */}
          <motion.div
            className="absolute bottom-8 flex space-x-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <BouncingGift emoji="🎁" delay={0} />
            <BouncingGift emoji="🎀" delay={0.2} />
            <BouncingGift emoji="🎁" delay={0.4} />
            <BouncingGift emoji="⭐" delay={0.6} />
            <BouncingGift emoji="🎁" delay={0.8} />
          </motion.div>

          {/* Décoration coins */}
          <motion.div
            className="absolute top-4 left-4 text-4xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🔔
          </motion.div>
          <motion.div
            className="absolute top-4 right-4 text-4xl"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            🌟
          </motion.div>
          <motion.div
            className="absolute bottom-4 left-4 text-4xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🦌
          </motion.div>
          <motion.div
            className="absolute bottom-4 right-4 text-4xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          >
            🎅
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}