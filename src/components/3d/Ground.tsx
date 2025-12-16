import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { COLORS, SCENE_CONFIG } from '../../utils/constants'

export const Ground = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const { geometry, heightData } = useMemo(() => {
    const { size, segments } = SCENE_CONFIG.ground
    const geo = new THREE.PlaneGeometry(size, size, segments, segments)
    const heights: number[] = []
    
    const positions = geo.attributes.position.array as Float32Array
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const z = positions[i + 1]
      
      const distance = Math.sqrt(x * x + z * z)
      let height = 0
      
      height += Math.sin(x * 0.3) * Math.cos(z * 0.3) * 0.3
      height += Math.sin(x * 0.1 + z * 0.1) * 0.2
      
      if (distance < 8) {
        height *= distance / 8
      }
      
      positions[i + 2] = height
      heights.push(height)
    }
    
    geo.computeVertexNormals()
    return { geometry: geo, heightData: heights }
  }, [])

  const snowTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')!
    
    ctx.fillStyle = COLORS.snowGround
    ctx.fillRect(0, 0, 512, 512)
    
    for (let i = 0; i < 3000; i++) {
      const x = Math.random() * 512
      const y = Math.random() * 512
      const radius = Math.random() * 2 + 0.5
      const alpha = Math.random() * 0.3 + 0.1
      
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
      ctx.fill()
    }
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(8, 8)
    return texture
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array
      const time = state.clock.elapsedTime
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const z = positions[i + 1]
        const baseHeight = heightData[i / 3] || 0
        
        positions[i + 2] = baseHeight + Math.sin(time * 0.5 + x * 0.1 + z * 0.1) * 0.02
      }
      
      meshRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <mesh 
      ref={meshRef} 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -0.1, 0]}
      receiveShadow
      geometry={geometry}
    >
      <meshStandardMaterial
        map={snowTexture}
        color={COLORS.snowGround}
        roughness={0.9}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export const SnowMounds = () => {
  const mounds = useMemo(() => {
    const positions: [number, number, number][] = []
    const scales: [number, number, number][] = []
    
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = 8 + Math.random() * 15
      positions.push([
        Math.cos(angle) * distance,
        0,
        Math.sin(angle) * distance,
      ])
      scales.push([
        1 + Math.random() * 2,
        0.3 + Math.random() * 0.5,
        1 + Math.random() * 2,
      ])
    }
    
    return { positions, scales }
  }, [])

  return (
    <group>
      {mounds.positions.map((pos, i) => (
        <mesh key={i} position={pos} scale={mounds.scales[i]} receiveShadow>
          <sphereGeometry args={[1, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={COLORS.snowGround} roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}
