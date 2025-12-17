// src/components/Experience.tsx
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Scene from './3d/Scene'
import { useStore } from '../stores/useStore'

export default function Experience() {
  const highQuality = useStore((state) => state.highQuality)

  return (
    <Canvas
      shadows
      dpr={highQuality ? [1, 2] : [1, 1]}
      camera={{ 
        position: [0, 2, 12], 
        fov: 45,
        near: 0.1,
        far: 1000,
      }}
      gl={{ 
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{
        background: 'linear-gradient(to bottom, #0a0a1a, #1a1a3a)',
      }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}