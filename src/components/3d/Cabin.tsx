import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { COLORS } from '../../utils/constants'

interface CabinProps {
  position?: [number, number, number]
  scale?: number
}

const SmokeParticles = ({ position }: { position: [number, number, number] }) => {
  const particlesRef = useRef<THREE.Points>(null)
  
  const { positions, velocities } = useMemo(() => {
    const count = 30
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.2
      pos[i * 3 + 1] = Math.random() * 2
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.2
      
      vel[i * 3] = (Math.random() - 0.5) * 0.01
      vel[i * 3 + 1] = 0.02 + Math.random() * 0.02
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01
    }
    
    return { positions: pos, velocities: vel }
  }, [])

  useFrame(() => {
    if (!particlesRef.current) return
    
    const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < posArray.length / 3; i++) {
      const i3 = i * 3
      
      posArray[i3] += velocities[i3]
      posArray[i3 + 1] += velocities[i3 + 1]
      posArray[i3 + 2] += velocities[i3 + 2]
      
      if (posArray[i3 + 1] > 3) {
        posArray[i3] = (Math.random() - 0.5) * 0.2
        posArray[i3 + 1] = 0
        posArray[i3 + 2] = (Math.random() - 0.5) * 0.2
      }
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={particlesRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#888888"
        transparent
        opacity={0.4}
        depthWrite={false}
      />
    </points>
  )
}

const Window = ({ position, rotation = [0, 0, 0] }: { position: [number, number, number], rotation?: [number, number, number] }) => {
  const lightRef = useRef<THREE.PointLight>(null)
  
  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.intensity = 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.2
    }
  })

  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[0.4, 0.5, 0.1]} />
        <meshStandardMaterial color="#2a1810" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[0.35, 0.45, 0.05]} />
        <meshStandardMaterial
          color={COLORS.warmLight}
          emissive={COLORS.warmLight}
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[0.02, 0.45, 0.02]} />
        <meshStandardMaterial color="#2a1810" />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[0.35, 0.02, 0.02]} />
        <meshStandardMaterial color="#2a1810" />
      </mesh>
      <pointLight
        ref={lightRef}
        position={[0, 0, 0.3]}
        color={COLORS.warmLight}
        intensity={1}
        distance={3}
      />
    </group>
  )
}

export const Cabin = ({ position = [0, 0, 0], scale = 1 }: CabinProps) => {
  const groupRef = useRef<THREE.Group>(null)

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 1.5, 2]} />
        <meshStandardMaterial color="#5d3a1a" roughness={0.9} />
      </mesh>
      
      {[-0.6, 0, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0.75, 1.01]} castShadow>
          <boxGeometry args={[0.08, 1.5, 0.02]} />
          <meshStandardMaterial color="#3d2510" roughness={0.9} />
        </mesh>
      ))}
      {[-0.6, 0, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0.75, -1.01]} castShadow>
          <boxGeometry args={[0.08, 1.5, 0.02]} />
          <meshStandardMaterial color="#3d2510" roughness={0.9} />
        </mesh>
      ))}
      
      <mesh position={[0, 1.75, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
        <coneGeometry args={[1.8, 1.2, 4]} />
        <meshStandardMaterial color="#8B0000" roughness={0.8} />
      </mesh>
      
      <mesh position={[0, 1.85, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[1.9, 0.3, 4]} />
        <meshStandardMaterial color={COLORS.snow} roughness={0.9} />
      </mesh>
      
      <mesh position={[0.7, 2.2, 0.3]} castShadow>
        <boxGeometry args={[0.3, 0.6, 0.3]} />
        <meshStandardMaterial color="#4a3020" roughness={0.9} />
      </mesh>
      <mesh position={[0.7, 2.55, 0.3]}>
        <boxGeometry args={[0.35, 0.1, 0.35]} />
        <meshStandardMaterial color="#3a2010" roughness={0.9} />
      </mesh>
      <SmokeParticles position={[0.7, 2.6, 0.3]} />
      
      <Window position={[0.5, 0.9, 1.01]} />
      <Window position={[-0.5, 0.9, 1.01]} />
      <Window position={[1.26, 0.9, 0]} rotation={[0, Math.PI / 2, 0]} />
      
      <group position={[-0.8, 0.5, 1.01]}>
        <mesh castShadow>
          <boxGeometry args={[0.5, 1, 0.1]} />
          <meshStandardMaterial color="#3d2510" roughness={0.9} />
        </mesh>
        <mesh position={[0.15, 0, 0.06]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color={COLORS.gold} metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
      
      <mesh position={[1.5, 0.4, 1.2]} rotation={[0, -0.3, 0]} castShadow>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshStandardMaterial color="#4a3020" roughness={0.9} />
      </mesh>
      <mesh position={[1.5, 0.85, 1.2]} rotation={[0, -0.3, 0]} castShadow>
        <boxGeometry args={[0.4, 0.1, 0.4]} />
        <meshStandardMaterial color={COLORS.snow} roughness={0.9} />
      </mesh>
      
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <cylinderGeometry args={[3, 3, 0.05, 32]} />
        <meshStandardMaterial color={COLORS.snowGround} roughness={0.95} />
      </mesh>
    </group>
  )
}
