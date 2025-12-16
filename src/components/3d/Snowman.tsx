import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { COLORS } from '../../utils/constants'

interface SnowmanProps {
  position?: [number, number, number]
  scale?: number
}

export const Snowman = ({ position = [0, 0, 0], scale = 1 }: SnowmanProps) => {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.1
      
      if (hovered) {
        groupRef.current.scale.setScalar(scale * 1.05)
      } else {
        groupRef.current.scale.setScalar(scale)
      }
      
      if (clicked) {
        groupRef.current.position.y = position[1] + Math.abs(Math.sin(time * 10)) * 0.2
      } else {
        groupRef.current.position.y = position[1]
      }
    }
  })

  return (
    <group 
      ref={groupRef} 
      position={position} 
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => {
        setClicked(true)
        setTimeout(() => setClicked(false), 1000)
      }}
    >
      <mesh position={[0, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={COLORS.snow} roughness={0.9} />
      </mesh>
      
      <mesh position={[0, 1.15, 0]} castShadow>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color={COLORS.snow} roughness={0.9} />
      </mesh>
      
      <mesh position={[0, 1.7, 0]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color={COLORS.snow} roughness={0.9} />
      </mesh>
      
      <mesh position={[0.12, 1.8, 0.25]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[-0.12, 1.8, 0.25]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      <mesh position={[0, 1.7, 0.28]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <coneGeometry args={[0.05, 0.2, 8]} />
        <meshStandardMaterial color="#ff6600" roughness={0.5} />
      </mesh>
      
      {[-0.08, -0.04, 0, 0.04, 0.08].map((x, i) => (
        <mesh key={i} position={[x, 1.6, 0.28]}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      ))}
      
      <group position={[0, 1.95, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.2, 0.25, 0.25, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.12, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
        <mesh position={[0.18, 0, 0.02]}>
          <boxGeometry args={[0.02, 0.08, 0.15]} />
          <meshStandardMaterial color={COLORS.red} />
        </mesh>
      </group>
      
      <group position={[0, 1.1, 0]} rotation={[0, 0, 0]}>
        <mesh position={[0.15, 0, 0.15]} rotation={[0.4, 0, 0.8]} castShadow>
          <capsuleGeometry args={[0.015, 0.25, 4, 8]} />
          <meshStandardMaterial color="#4a3728" roughness={0.9} />
        </mesh>
        <mesh position={[-0.15, 0, 0.15]} rotation={[0.4, 0, -0.8]} castShadow>
          <capsuleGeometry args={[0.015, 0.25, 4, 8]} />
          <meshStandardMaterial color="#4a3728" roughness={0.9} />
        </mesh>
      </group>
      
      {[0, 0.15, 0.3].map((y, i) => (
        <mesh key={i} position={[0, 0.5 + y, 0.48]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      ))}
      
      <mesh position={[0, 1.35, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.45, 0.03, 8, 32]} />
        <meshStandardMaterial color={COLORS.red} roughness={0.5} />
      </mesh>
    </group>
  )
}
