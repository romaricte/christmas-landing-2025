import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { COLORS } from '../../utils/constants'

export const Lights = () => {
  const movingLightRef = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    if (movingLightRef.current) {
      const time = state.clock.elapsedTime
      movingLightRef.current.position.x = Math.sin(time * 0.5) * 5
      movingLightRef.current.position.z = Math.cos(time * 0.5) * 5
      movingLightRef.current.intensity = 0.3 + Math.sin(time * 2) * 0.1
    }
  })

  return (
    <>
      <ambientLight intensity={0.15} color="#4a6fa5" />
      
      <directionalLight
        position={[10, 20, 10]}
        intensity={0.3}
        color={COLORS.moonlight}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.0001}
      />
      
      <pointLight
        position={[0, 8, 0]}
        intensity={0.5}
        color={COLORS.warmLight}
        distance={20}
        decay={2}
      />
      
      <pointLight
        ref={movingLightRef}
        position={[0, 3, 0]}
        intensity={0.3}
        color={COLORS.gold}
        distance={15}
        decay={2}
      />
      
      <hemisphereLight
        color="#87ceeb"
        groundColor="#362312"
        intensity={0.2}
      />
      
      <spotLight
        position={[0, 15, 0]}
        angle={Math.PI / 4}
        penumbra={0.5}
        intensity={0.2}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
    </>
  )
}

export const ChristmasStringLights = ({ 
  start, 
  end, 
  count = 10,
  sag = 1 
}: { 
  start: [number, number, number]
  end: [number, number, number]
  count?: number
  sag?: number
}) => {
  const lightsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (lightsRef.current) {
      lightsRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          const time = state.clock.elapsedTime
          const intensity = 0.5 + Math.sin(time * 3 + i) * 0.5
          const material = child.material as THREE.MeshStandardMaterial
          material.emissiveIntensity = intensity * 2
        }
      })
    }
  })

  const lights = []
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']

  for (let i = 0; i < count; i++) {
    const t = i / (count - 1)
    const x = start[0] + (end[0] - start[0]) * t
    const y = start[1] + (end[1] - start[1]) * t - Math.sin(t * Math.PI) * sag
    const z = start[2] + (end[2] - start[2]) * t
    const color = colors[i % colors.length]

    lights.push(
      <mesh key={i} position={[x, y, z]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1}
          toneMapped={false}
        />
        <pointLight color={color} intensity={0.2} distance={2} />
      </mesh>
    )
  }

  return <group ref={lightsRef}>{lights}</group>
}
