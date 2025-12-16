import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import gsap from 'gsap'

interface ParallaxSectionProps {
  children: React.ReactNode
  offset?: number
  className?: string
}

export const ParallaxSection = ({ 
  children, 
  offset = 50,
  className = '' 
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])
  const springY = useSpring(y, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      ref={ref}
      style={{ y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const FadeInOnScroll = ({ 
  children,
  direction = 'up',
  delay = 0,
  className = ''
}: {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  className?: string
}) => {
  const initialPosition = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
  }

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...initialPosition[direction] 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const StaggerContainer = ({ 
  children,
  staggerDelay = 0.1,
  className = ''
}: {
  children: React.ReactNode
  staggerDelay?: number
  className?: string
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const StaggerItem = ({ 
  children,
  className = ''
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.6, ease: 'easeOut' }
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const ScaleOnScroll = ({ 
  children,
  className = ''
}: {
  children: React.ReactNode
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center']
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1])
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      ref={ref}
      style={{ scale: springScale, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const useGsapScrollAnimation = (
  elementRef: React.RefObject<HTMLElement>,
  animation: gsap.TweenVars,
  scrollTriggerConfig?: ScrollTrigger.Vars
) => {
  useEffect(() => {
    if (!elementRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(elementRef.current, {
        ...animation,
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          ...scrollTriggerConfig,
        },
      })
    })

    return () => ctx.revert()
  }, [elementRef, animation, scrollTriggerConfig])
}

export const TextReveal = ({ 
  text,
  className = ''
}: {
  text: string
  className?: string
}) => {
  const words = text.split(' ')

  return (
    <motion.div className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.5, 
            delay: i * 0.1,
            ease: 'easeOut'
          }}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

export const ProgressBar = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-green-500 to-gold-500 origin-left z-50"
    />
  )
}
