import gsap from 'gsap'

export const fadeIn = (element: HTMLElement, duration = 1, delay = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration, delay, ease: 'power2.out' }
  )
}

export const fadeOut = (element: HTMLElement, duration = 0.5) => {
  return gsap.to(element, { opacity: 0, y: -20, duration, ease: 'power2.in' })
}

export const scaleIn = (element: HTMLElement, duration = 0.8, delay = 0) => {
  return gsap.fromTo(
    element,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration, delay, ease: 'back.out(1.7)' }
  )
}

export const slideInFromLeft = (element: HTMLElement, duration = 1, delay = 0) => {
  return gsap.fromTo(
    element,
    { x: -100, opacity: 0 },
    { x: 0, opacity: 1, duration, delay, ease: 'power3.out' }
  )
}

export const slideInFromRight = (element: HTMLElement, duration = 1, delay = 0) => {
  return gsap.fromTo(
    element,
    { x: 100, opacity: 0 },
    { x: 0, opacity: 1, duration, delay, ease: 'power3.out' }
  )
}

export const staggerChildren = (
  parent: HTMLElement,
  childSelector: string,
  stagger = 0.1
) => {
  const children = parent.querySelectorAll(childSelector)
  return gsap.fromTo(
    children,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, stagger, ease: 'power2.out' }
  )
}

export const pulseAnimation = (element: HTMLElement, scale = 1.1, duration = 0.5) => {
  return gsap.to(element, {
    scale,
    duration,
    yoyo: true,
    repeat: -1,
    ease: 'power1.inOut',
  })
}

export const floatAnimation = (element: HTMLElement, y = 10, duration = 2) => {
  return gsap.to(element, {
    y: `-=${y}`,
    duration,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
  })
}

export const rotateAnimation = (element: HTMLElement, duration = 4) => {
  return gsap.to(element, {
    rotation: 360,
    duration,
    repeat: -1,
    ease: 'none',
  })
}

export const shimmerAnimation = (element: HTMLElement) => {
  return gsap.fromTo(
    element,
    { backgroundPosition: '-200% 0' },
    { backgroundPosition: '200% 0', duration: 2, repeat: -1, ease: 'none' }
  )
}

export const typewriterEffect = (
  element: HTMLElement,
  text: string,
  speed = 0.05
) => {
  element.textContent = ''
  const chars = text.split('')
  const tl = gsap.timeline()

  chars.forEach((char, i) => {
    tl.to(element, {
      duration: speed,
      onComplete: () => {
        element.textContent += char
      },
    }, i * speed)
  })

  return tl
}

export const createSnowfallTimeline = () => {
  const tl = gsap.timeline({ repeat: -1 })
  
  return tl
}

export const cameraShake = (
  camera: { position: { x: number; y: number; z: number } },
  intensity = 0.1,
  duration = 0.5
) => {
  const originalPos = { ...camera.position }
  
  return gsap.to(camera.position, {
    x: `+=${Math.random() * intensity - intensity / 2}`,
    y: `+=${Math.random() * intensity - intensity / 2}`,
    duration: duration / 10,
    repeat: 10,
    yoyo: true,
    ease: 'none',
    onComplete: () => {
      gsap.to(camera.position, {
        x: originalPos.x,
        y: originalPos.y,
        z: originalPos.z,
        duration: 0.1,
      })
    },
  })
}
