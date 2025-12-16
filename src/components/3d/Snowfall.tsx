import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '../../stores/useStore'
import { SCENE_CONFIG } from '../../utils/constants'

export const Snowfall = () => {
  const pointsRef = useRef<THREE.Points>(null)
  const snowIntensity = useStore((state) => state.snowIntensity)
  
  const { count, positions, velocities, sizes } = useMemo(() => {
    const cnt = SCENE_CONFIG.snow.count
    const pos = new Float32Array(cnt * 3)
    const vel = new Float32Array(cnt * 3)
    const sz = new Float32Array(cnt)
    const { area, speed, size } = SCENE_CONFIG.snow
    
    for (let i = 0; i < cnt; i++) {
      pos[i * 3] = (Math.random() - 0.5) * area.x
      pos[i * 3 + 1] = Math.random() * area.y
      pos[i * 3 + 2] = (Math.random() - 0.5) * area.z
      
      vel[i * 3] = (Math.random() - 0.5) * 0.01
      vel[i * 3 + 1] = -(speed.min + Math.random() * (speed.max - speed.min))
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01
      
      sz[i] = size.min + Math.random() * (size.max - size.min)
    }
    
    return { count: cnt, positions: pos, velocities: vel, sizes: sz }
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    
    const positionArray = pointsRef.current.geometry.attributes.position.array as Float32Array
    const time = state.clock.elapsedTime
    const { area } = SCENE_CONFIG.snow
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      positionArray[i3] += velocities[i3] + Math.sin(time + i) * 0.002
      positionArray[i3 + 1] += velocities[i3 + 1] * snowIntensity
      positionArray[i3 + 2] += velocities[i3 + 2] + Math.cos(time + i) * 0.002
      
      if (positionArray[i3 + 1] < -1) {
        positionArray[i3] = (Math.random() - 0.5) * area.x
        positionArray[i3 + 1] = area.y
        positionArray[i3 + 2] = (Math.random() - 0.5) * area.z
      }
      
      if (positionArray[i3] > area.x / 2) positionArray[i3] = -area.x / 2
      if (positionArray[i3] < -area.x / 2) positionArray[i3] = area.x / 2
      if (positionArray[i3 + 2] > area.z / 2) positionArray[i3 + 2] = -area.z / 2
      if (positionArray[i3 + 2] < -area.z / 2) positionArray[i3 + 2] = area.z / 2
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  const snowTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')!
    
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)')
    gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.3)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 64, 64)
    
    const texture = new THREE.CanvasTexture(canvas)
    return texture
  }, [])

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        map={snowTexture}
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors={false}
        sizeAttenuation
      />
    </points>
  )
}
