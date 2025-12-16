import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Trail } from '@react-three/drei'
import { COLORS, ANIMATION_CONFIG } from '../../utils/constants'

const Reindeer = ({ position, delay = 0 }: { position: [number, number, number], delay?: number }) => {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime + delay
      groupRef.current.rotation.x = Math.sin(time * 4) * 0.1
      groupRef.current.position.y = Math.sin(time * 4) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <mesh castShadow>
        <capsuleGeometry args={[0.15, 0.4, 8, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
      <mesh position={[0.2, 0.15, 0]} rotation={[0, 0, -0.3]} castShadow>
        <capsuleGeometry args={[0.08, 0.15, 4, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
      <mesh position={[0.28, 0.3, 0.05]}>
        <coneGeometry args={[0.03, 0.15, 4]} />
        <meshStandardMaterial color="#5D3A1A" roughness={0.7} />
      </mesh>
      <mesh position={[0.28, 0.3, -0.05]}>
        <coneGeometry args={[0.03, 0.15, 4]} />
        <meshStandardMaterial color="#5D3A1A" roughness={0.7} />
      </mesh>
      <mesh position={[0.32, 0.18, 0]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color={COLORS.red} emissive={COLORS.red} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.1, -0.15, 0.1]} rotation={[0.2, 0, 0.3]}>
        <capsuleGeometry args={[0.03, 0.15, 4, 4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[-0.1, -0.15, -0.1]} rotation={[0.2, 0, 0.3]}>
        <capsuleGeometry args={[0.03, 0.15, 4, 4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0.1, -0.15, 0.1]} rotation={[-0.2, 0, -0.3]}>
        <capsuleGeometry args={[0.03, 0.15, 4, 4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0.1, -0.15, -0.1]} rotation={[-0.2, 0, -0.3]}>
        <capsuleGeometry args={[0.03, 0.15, 4, 4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  )
}

const Sleigh = () => {
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[1.2, 0.3, 0.6]} />
        <meshStandardMaterial color={COLORS.red} roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.25, 0.25]} castShadow>
        <boxGeometry args={[1.2, 0.2, 0.05]} />
        <meshStandardMaterial color={COLORS.red} roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.25, -0.25]} castShadow>
        <boxGeometry args={[1.2, 0.2, 0.05]} />
        <meshStandardMaterial color={COLORS.red} roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0.55, 0.3, 0]} castShadow>
        <boxGeometry args={[0.1, 0.3, 0.6]} />
        <meshStandardMaterial color={COLORS.red} roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, -0.2, 0.2]} rotation={[0, 0, Math.PI / 12]}>
        <torusGeometry args={[0.15, 0.03, 8, 16, Math.PI]} />
        <meshStandardMaterial color={COLORS.gold} metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, -0.2, -0.2]} rotation={[0, 0, Math.PI / 12]}>
        <torusGeometry args={[0.15, 0.03, 8, 16, Math.PI]} />
        <meshStandardMaterial color={COLORS.gold} metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.3, 0.2, 0]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
      <mesh position={[-0.3, 0.45, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#FFE4C4" roughness={0.8} />
      </mesh>
      <mesh position={[-0.3, 0.55, 0]}>
        <coneGeometry args={[0.12, 0.15, 8]} />
        <meshStandardMaterial color={COLORS.red} />
      </mesh>
      <mesh position={[-0.3, 0.62, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  )
}

const GiftBag = () => {
  return (
    <group position={[0.3, 0.35, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.2, 0.25, 0.4, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 3) * 0.1,
            0.3,
            Math.sin((i * Math.PI * 2) / 3) * 0.1,
          ]}
          castShadow
        >
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial
            color={[COLORS.giftRed, COLORS.giftGreen, COLORS.giftBlue][i]}
            roughness={0.3}
            metalness={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}

export const SantaSleigh = () => {
  const groupRef = useRef<THREE.Group>(null)
  const trailRef = useRef<THREE.Mesh>(null)
  
  const { amplitude, speed, height } = ANIMATION_CONFIG.sleigh

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime * speed
      
      groupRef.current.position.x = Math.sin(time) * amplitude.x
      groupRef.current.position.y = height + Math.sin(time * 2) * amplitude.y
      groupRef.current.position.z = Math.cos(time) * amplitude.z - 5
      
      groupRef.current.rotation.z = Math.cos(time) * 0.1
      groupRef.current.rotation.x = Math.sin(time * 2) * 0.05
      groupRef.current.rotation.y = Math.atan2(
        Math.cos(time) * amplitude.x,
        -Math.sin(time) * amplitude.z
      )
    }
  })

  return (
    <group ref={groupRef} position={[0, height, -5]}>
      <Trail
        width={1}
        length={8}
        color={COLORS.gold}
        attenuation={(t) => t * t}
      >
        <mesh ref={trailRef} visible={false}>
          <sphereGeometry args={[0.05]} />
          <meshBasicMaterial />
        </mesh>
      </Trail>
      
      <Reindeer position={[1.5, 0, 0.15]} delay={0} />
      <Reindeer position={[1.5, 0, -0.15]} delay={0.2} />
      <Reindeer position={[2, 0, 0.15]} delay={0.4} />
      <Reindeer position={[2, 0, -0.15]} delay={0.6} />
      
      <mesh position={[0.9, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.01, 0.01, 0.8, 4]} />
        <meshStandardMaterial color={COLORS.gold} metalness={0.8} />
      </mesh>
      
      <Sleigh />
      <GiftBag />
      
      <pointLight
        position={[0, 0.5, 0]}
        color={COLORS.warmLight}
        intensity={2}
        distance={5}
      />
    </group>
  )
}
