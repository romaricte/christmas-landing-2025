// src/components/3d/Ground.tsx
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Ground() {
  const meshRef = useRef<THREE.Mesh>(null)

  // Créer une texture de neige procédurale
  const snowTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')!
    
    // Fond blanc neige
    ctx.fillStyle = '#f0f5ff'
    ctx.fillRect(0, 0, 512, 512)
    
    // Ajouter du bruit pour la texture
    for (let i = 0; i < 5000; i++) {
      const x = Math.random() * 512
      const y = Math.random() * 512
      const brightness = 200 + Math.random() * 55
      ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness + 10})`
      ctx.fillRect(x, y, 2, 2)
    }
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(10, 10)
    return texture
  }, [])

  return (
    <group>
      {/* Sol principal */}
      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        receiveShadow
      >
        <circleGeometry args={[30, 64]} />
        <meshStandardMaterial
          map={snowTexture}
          color="#e8f0ff"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Collines de neige en arrière-plan */}
      <mesh position={[0, 0, -15]} receiveShadow>
        <sphereGeometry args={[8, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#d4e4ff" roughness={0.95} />
      </mesh>
      <mesh position={[-12, -1, -12]} receiveShadow>
        <sphereGeometry args={[6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#dce8ff" roughness={0.95} />
      </mesh>
      <mesh position={[12, -1, -10]} receiveShadow>
        <sphereGeometry args={[7, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#d8e6ff" roughness={0.95} />
      </mesh>
    </group>
  )
}