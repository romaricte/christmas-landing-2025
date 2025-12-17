// src/components/3d/Lights.tsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Lights(){
  const pointLightRef = useRef<THREE.PointLight>(null)

  // Animation subtile de la lumière
  useFrame((state) => {
    if (pointLightRef.current) {
      // Légère pulsation de la lumière
      pointLightRef.current.intensity = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <>
      {/* Lumière ambiante douce */}
      <ambientLight intensity={0.3} color="#4a6fa5" />
      
      {/* Lumière directionnelle principale (lune) */}
      <directionalLight
        position={[10, 20, 10]}
        intensity={0.5}
        color="#a0c4ff"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      
      {/* Lumière chaude venant de la scène (feu, maison) */}
      <pointLight
        ref={pointLightRef}
        position={[0, 3, 0]}
        intensity={1}
        color="#ff9944"
        distance={15}
        decay={2}
      />
      
      {/* Lumières d'accent colorées */}
      <pointLight
        position={[-5, 2, 5]}
        intensity={0.5}
        color="#ff4444"
        distance={10}
        decay={2}
      />
      <pointLight
        position={[5, 2, 5]}
        intensity={0.5}
        color="#44ff44"
        distance={10}
        decay={2}
      />
      
      {/* Lumière de rim (contour) */}
      <directionalLight
        position={[-5, 5, -10]}
        intensity={0.3}
        color="#6699ff"
      />
    </>
  )
}