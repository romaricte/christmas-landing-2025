import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleSystemProps {
  count?: number
  color?: string
  size?: number
  speed?: number
  spread?: number
  position?: [number, number, number]
}

export const MagicSparkles = ({
  count = 100,
  color = '#ffd700',
  size = 0.05,
  speed = 1,
  spread = 5,
  position = [0, 0, 0],
}: ParticleSystemProps) => {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, velocities, phases, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    const phs = new Float32Array(count)
    const cols = new Float32Array(count * 3)

    const baseColor = new THREE.Color(color)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      pos[i3] = (Math.random() - 0.5) * spread
      pos[i3 + 1] = Math.random() * spread
      pos[i3 + 2] = (Math.random() - 0.5) * spread

      vel[i3] = (Math.random() - 0.5) * 0.02
      vel[i3 + 1] = Math.random() * 0.02 + 0.01
      vel[i3 + 2] = (Math.random() - 0.5) * 0.02

      phs[i] = Math.random() * Math.PI * 2

      const colorVariation = 0.8 + Math.random() * 0.4
      cols[i3] = baseColor.r * colorVariation
      cols[i3 + 1] = baseColor.g * colorVariation
      cols[i3 + 2] = baseColor.b * colorVariation
    }

    return { positions: pos, velocities: vel, phases: phs, colors: cols }
  }, [count, color, spread])

  useFrame((state) => {
    if (!pointsRef.current) return

    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array
    const time = state.clock.elapsedTime * speed

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      posArray[i3] += velocities[i3] + Math.sin(time + phases[i]) * 0.01
      posArray[i3 + 1] += velocities[i3 + 1]
      posArray[i3 + 2] += velocities[i3 + 2] + Math.cos(time + phases[i]) * 0.01

      if (posArray[i3 + 1] > spread) {
        posArray[i3] = (Math.random() - 0.5) * spread
        posArray[i3 + 1] = 0
        posArray[i3 + 2] = (Math.random() - 0.5) * spread
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

export const FireworkBurst = ({
  position = [0, 5, 0] as [number, number, number],
  color = '#ff0000',
  particleCount = 50,
}) => {
  const pointsRef = useRef<THREE.Points>(null)
  const startTime = useRef(Date.now())

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const vel = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const speed = 0.05 + Math.random() * 0.1

      pos[i3] = 0
      pos[i3 + 1] = 0
      pos[i3 + 2] = 0

      vel[i3] = Math.sin(phi) * Math.cos(theta) * speed
      vel[i3 + 1] = Math.cos(phi) * speed
      vel[i3 + 2] = Math.sin(phi) * Math.sin(theta) * speed
    }

    return { positions: pos, velocities: vel }
  }, [particleCount])

  useFrame(() => {
    if (!pointsRef.current) return

    const elapsed = (Date.now() - startTime.current) / 1000
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      posArray[i3] += velocities[i3]
      posArray[i3 + 1] += velocities[i3 + 1] - 0.002
      posArray[i3 + 2] += velocities[i3 + 2]
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
    
    const material = pointsRef.current.material as THREE.PointsMaterial
    material.opacity = Math.max(0, 1 - elapsed * 0.5)
  })

  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color={color}
        transparent
        opacity={1}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export const SnowDust = ({ position = [0, 0, 0] as [number, number, number] }) => {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 200

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = 3 + Math.random() * 5
      const theta = Math.random() * Math.PI * 2

      pos[i3] = Math.cos(theta) * radius
      pos[i3 + 1] = Math.random() * 0.5
      pos[i3 + 2] = Math.sin(theta) * radius

      vel[i3] = (Math.random() - 0.5) * 0.01
      vel[i3 + 1] = Math.random() * 0.005 + 0.001
      vel[i3 + 2] = (Math.random() - 0.5) * 0.01
    }

    return { positions: pos, velocities: vel }
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return

    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array
    const time = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      posArray[i3] += velocities[i3] + Math.sin(time + i) * 0.002
      posArray[i3 + 1] += velocities[i3 + 1]
      posArray[i3 + 2] += velocities[i3 + 2] + Math.cos(time + i) * 0.002

      if (posArray[i3 + 1] > 1) {
        const radius = 3 + Math.random() * 5
        const theta = Math.random() * Math.PI * 2
        posArray[i3] = Math.cos(theta) * radius
        posArray[i3 + 1] = 0
        posArray[i3 + 2] = Math.sin(theta) * radius
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
