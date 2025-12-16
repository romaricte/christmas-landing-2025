import { motion } from 'framer-motion'
import { useStore } from '../../stores/useStore'
import { MagneticButton, FloatingElement, GlowingText } from '../animations/InteractiveElements'
import { FadeInOnScroll, TextReveal } from '../animations/ScrollAnimations'

const SoundToggle = () => {
  const isMuted = useStore((state) => state.isMuted)
  const toggleMute = useStore((state) => state.toggleMute)

  return (
    <MagneticButton
      onClick={toggleMute}
      className="fixed top-6 right-6 z-40 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white hover:bg-white/20 transition-colors"
    >
      {isMuted ? (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      )}
    </MagneticButton>
  )
}

const SnowIntensitySlider = () => {
  const snowIntensity = useStore((state) => state.snowIntensity)
  const setSnowIntensity = useStore((state) => state.setSnowIntensity)

  return (
    <div className="fixed bottom-6 right-6 z-40 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
      <p className="text-white text-sm mb-2 flex items-center gap-2">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a1 1 0 011 1v1.323l1.954-1.127a1 1 0 111 1.732L12 6.054v2.196l1.902-1.098a1 1 0 011.196 1.602l-.098.072-1.902 1.098 1.902 1.098a1 1 0 01-.998 1.732l-1.902-1.098v2.196l1.954 1.127a1 1 0 11-1 1.732L11 15.677V17a1 1 0 11-2 0v-1.323l-1.954 1.127a1 1 0 11-1-1.732L8 13.946v-2.196l-1.902 1.098a1 1 0 01-.998-1.732l1.902-1.098-1.902-1.098a1 1 0 01.998-1.732L8 8.286V6.054L6.046 4.928a1 1 0 111-1.732L9 4.323V3a1 1 0 011-1z"/>
        </svg>
        Snow
      </p>
      <input
        type="range"
        min="0"
        max="2"
        step="0.1"
        value={snowIntensity}
        onChange={(e) => setSnowIntensity(parseFloat(e.target.value))}
        className="w-32 accent-white"
      />
    </div>
  )
}

const HeroSection = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
      <FloatingElement distance={15} duration={4}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 1, delay: 0.8 }}
            className="mb-6"
          >
            <GlowingText 
              text="✨" 
              className="text-6xl"
            />
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-2xl">
            <TextReveal text="Merry Christmas" className="inline" />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-xl md:text-2xl text-blue-100 mb-8"
          >
            Wishing you joy and happiness
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="pointer-events-auto"
          >
            <MagneticButton
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-red-500/50 transition-shadow border border-red-400/30"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
                Explore the Scene
              </span>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </FloatingElement>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white/60"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}

const InfoCards = () => {
  const cards = [
    {
      icon: '🎄',
      title: 'Interactive Tree',
      description: 'Watch the lights twinkle and ornaments shine',
    },
    {
      icon: '🎅',
      title: 'Santa\'s Flight',
      description: 'Santa flies across the sky with his reindeer',
    },
    {
      icon: '⛄',
      title: 'Friendly Snowmen',
      description: 'Click them for a surprise!',
    },
    {
      icon: '🎁',
      title: 'Gift Selection',
      description: 'Click on gifts to make them glow',
    },
  ]

  return (
    <div className="fixed bottom-6 left-6 z-40 flex gap-3">
      {cards.map((card, i) => (
        <FadeInOnScroll key={i} delay={i * 0.1} direction="up">
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 cursor-pointer"
          >
            <span className="text-2xl">{card.icon}</span>
            <h3 className="text-white text-sm font-semibold mt-1">{card.title}</h3>
            <p className="text-blue-200 text-xs">{card.description}</p>
          </motion.div>
        </FadeInOnScroll>
      ))}
    </div>
  )
}

export const Overlay = () => {
  return (
    <>
      <SoundToggle />
      <HeroSection />
      <SnowIntensitySlider />
      <InfoCards />
    </>
  )
}
