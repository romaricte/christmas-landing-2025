import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Sky } from '@react-three/drei'
import { COLORS } from '../../utils/constants'

const Moon = () => {
  const moonRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (moonRef.current && glowRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
      glowRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <group position={[20, 25, -30]}>
      <mesh ref={moonRef}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshStandardMaterial
          color={COLORS.moonlight}
          emissive={COLORS.moonlight}
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh ref={glowRef} scale={1.2}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial
          color={COLORS.moonlight}
          transparent
          opacity={0.2}
        />
      </mesh>
      <pointLight
        color={COLORS.moonlight}
        intensity={0.5}
        distance={100}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
    </group>
  )
}

const NightSky = () => {
  const starsRef = useRef<THREE.Points>(null)

  const starsGeometry = useMemo(() => {
    const count = 2000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const radius = 80 + Math.random() * 20

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = Math.abs(radius * Math.cos(phi)) + 10
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)

      const colorValue = 0.8 + Math.random() * 0.2
      colors[i * 3] = colorValue
      colors[i * 3 + 1] = colorValue
      colors[i * 3 + 2] = colorValue + Math.random() * 0.1

      sizes[i] = Math.random() * 2 + 0.5
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    return geometry
  }, [])

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.005
      
      const sizes = starsRef.current.geometry.attributes.size.array as Float32Array
      for (let i = 0; i < sizes.length; i++) {
        sizes[i] = (Math.sin(state.clock.elapsedTime * 2 + i) * 0.3 + 1) * (Math.random() * 0.5 + 0.75)
      }
      starsRef.current.geometry.attributes.size.needsUpdate = true
    }
  })

  return (
    <points ref={starsRef} geometry={starsGeometry}>
      <pointsMaterial
        size={0.5}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  )
}

const AuroraBorealis = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const { geometry } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(60, 20, 64, 32)
    const cols = new Float32Array(geo.attributes.position.count * 3)
    
    const auroraColors = [
      new THREE.Color('#00ff88'),
      new THREE.Color('#00ffcc'),
      new THREE.Color('#00ccff'),
      new THREE.Color('#8800ff'),
    ]
    
    for (let i = 0; i < geo.attributes.position.count; i++) {
      const y = geo.attributes.position.getY(i)
      const normalizedY = (y + 10) / 20
      
      const colorIndex = Math.floor(normalizedY * (auroraColors.length - 1))
      const nextColorIndex = Math.min(colorIndex + 1, auroraColors.length - 1)
      const colorT = (normalizedY * (auroraColors.length - 1)) % 1
      
      const color = auroraColors[colorIndex].clone().lerp(auroraColors[nextColorIndex], colorT)
      
      cols[i * 3] = color.r
      cols[i * 3 + 1] = color.g
      cols[i * 3 + 2] = color.b
    }
    
    geo.setAttribute('color', new THREE.BufferAttribute(cols, 3))
    
    return { geometry: geo, colors: cols }
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array
      const time = state.clock.elapsedTime
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]
        positions[i + 2] = Math.sin(x * 0.1 + time * 0.5) * Math.cos(y * 0.2 + time * 0.3) * 3
      }
      
      meshRef.current.geometry.attributes.position.needsUpdate = true
      const material = meshRef.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.15 + Math.sin(time * 0.2) * 0.05
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={[0, 35, -40]}
      rotation={[-0.3, 0, 0]}
      geometry={geometry}
    >
      <meshBasicMaterial
        vertexColors
        transparent
        opacity={0.2}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

export const Environment = () => {
  return (
    <>
      <NightSky />
      <Moon />
      <AuroraBorealis />
      <Sky
        distance={450000}
        sunPosition={[0, -1, 0]}
        inclination={0}
        azimuth={0.25}
        rayleigh={0.1}
      />
    </>
  )
}
