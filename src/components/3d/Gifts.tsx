import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Float } from '@react-three/drei'
import { useStore } from '../../stores/useStore'
import { COLORS, ANIMATION_CONFIG } from '../../utils/constants'

interface GiftProps {
  position: [number, number, number]
  size: [number, number, number]
  color: string
  ribbonColor: string
  id: number
}

const Gift = ({ position, size, color, ribbonColor, id }: GiftProps) => {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const selectedGift = useStore((state) => state.selectedGift)
  const selectGift = useStore((state) => state.selectGift)
  
  const isSelected = selectedGift === id

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      const { hoverHeight, hoverSpeed, rotationSpeed } = ANIMATION_CONFIG.gifts
      
      if (hovered || isSelected) {
        meshRef.current.position.y = position[1] + Math.sin(time * hoverSpeed) * hoverHeight
        meshRef.current.rotation.y += rotationSpeed * 0.02
      } else {
        meshRef.current.position.y = position[1]
      }
      
      const targetScale = hovered ? 1.15 : isSelected ? 1.2 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.3}
      floatingRange={[0, 0.1]}
    >
      <group
        ref={meshRef}
        position={position}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'default'
        }}
        onClick={(e) => {
          e.stopPropagation()
          selectGift(isSelected ? null : id)
        }}
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={size} />
          <meshStandardMaterial
            color={color}
            roughness={0.3}
            metalness={0.5}
            emissive={color}
            emissiveIntensity={isSelected ? 0.3 : hovered ? 0.15 : 0}
          />
        </mesh>
        
        <mesh position={[0, 0, size[2] / 2 + 0.01]}>
          <planeGeometry args={[size[0] * 0.15, size[1]]} />
          <meshStandardMaterial color={ribbonColor} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, -size[2] / 2 - 0.01]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[size[0] * 0.15, size[1]]} />
          <meshStandardMaterial color={ribbonColor} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[size[0] / 2 + 0.01, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[size[2] * 0.15, size[1]]} />
          <meshStandardMaterial color={ribbonColor} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-size[0] / 2 - 0.01, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[size[2] * 0.15, size[1]]} />
          <meshStandardMaterial color={ribbonColor} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, size[1] / 2 + 0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[size[0] * 0.15, size[2]]} />
          <meshStandardMaterial color={ribbonColor} metalness={0.8} roughness={0.2} />
        </mesh>
        
        <group position={[0, size[1] / 2 + 0.15, 0]}>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <torusGeometry args={[0.1, 0.02, 8, 16, Math.PI]} />
            <meshStandardMaterial color={ribbonColor} metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh rotation={[0, 0, -Math.PI / 4]}>
            <torusGeometry args={[0.1, 0.02, 8, 16, Math.PI]} />
            <meshStandardMaterial color={ribbonColor} metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color={ribbonColor} metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
        
        {(hovered || isSelected) && (
          <pointLight
            color={color}
            intensity={1}
            distance={3}
          />
        )}
      </group>
    </Float>
  )
}

export const Gifts = () => {
  const gifts = useMemo(() => [
    { position: [1.5, 0.2, 1] as [number, number, number], size: [0.4, 0.4, 0.4] as [number, number, number], color: COLORS.giftRed, ribbonColor: COLORS.gold },
    { position: [2, 0.15, 0.5] as [number, number, number], size: [0.3, 0.3, 0.3] as [number, number, number], color: COLORS.giftGreen, ribbonColor: '#ffffff' },
    { position: [1.8, 0.25, 1.5] as [number, number, number], size: [0.5, 0.5, 0.5] as [number, number, number], color: COLORS.giftBlue, ribbonColor: COLORS.gold },
    { position: [-1.5, 0.2, 1.2] as [number, number, number], size: [0.35, 0.35, 0.35] as [number, number, number], color: COLORS.giftGold, ribbonColor: COLORS.red },
    { position: [-1.8, 0.15, 0.8] as [number, number, number], size: [0.25, 0.25, 0.25] as [number, number, number], color: '#9c27b0', ribbonColor: COLORS.gold },
    { position: [0.5, 0.2, 2] as [number, number, number], size: [0.4, 0.3, 0.4] as [number, number, number], color: COLORS.giftRed, ribbonColor: '#ffffff' },
    { position: [-0.5, 0.18, 1.8] as [number, number, number], size: [0.35, 0.45, 0.35] as [number, number, number], color: '#00bcd4', ribbonColor: COLORS.gold },
  ], [])

  return (
    <group>
      {gifts.map((gift, i) => (
        <Gift
          key={i}
          id={i}
          position={gift.position}
          size={gift.size}
          color={gift.color}
          ribbonColor={gift.ribbonColor}
        />
      ))}
    </group>
  )
}
