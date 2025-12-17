// src/components/3d/Scene.tsx
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

import Lights from './Lights'
import Environment from './Environment'
import Ground from './Ground'
import Snowfall from './Snowfall'
import ChristmasTree from './ChristmasTree'
import Gifts from './Gifts'
import Effects from '../effects/Effects'

import { useStore } from '../../stores/useStore'

export default function Scene(): JSX.Element {
  const groupRef = useRef<THREE.Group>(null)
  const mousePosition = useStore((state) => state.mousePosition)

  // Effet parallax avec la souris
  useFrame(() => {
    if (groupRef.current) {
      // Rotation douce basée sur la position de la souris
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mousePosition.x * 0.1,
        0.05
      )
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mousePosition.y * 0.05,
        0.05
      )
    }
  })

  return (
    <>
      {/* Couleur de fond */}
      <color attach="background" args={['#0a0a1a']} />
      
      {/* Brouillard pour la profondeur */}
      <fog attach="fog" args={['#0a0a1a', 15, 50]} />

      {/* Étoiles en arrière-plan */}
      <Stars
        radius={100}
        depth={50}
        count={3000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* Groupe principal avec parallax */}
      <group ref={groupRef}>
        {/* Éclairage */}
        <Lights />
        
        {/* Environnement HDRI */}
        <Environment />
        
        {/* Sol enneigé */}
        <Ground />
        
        {/* Sapin de Noël */}
        <ChristmasTree position={[0, 0, 0]} />
        
        {/* Cadeaux */}
        <Gifts />
      </group>

      {/* Neige (en dehors du groupe pour ne pas être affectée par le parallax) */}
      <Snowfall />

      {/* Post-processing */}
      <Effects />
    </>
  )
}