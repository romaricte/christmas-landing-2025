import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { COLORS, CHRISTMAS_LIGHTS_COLORS } from '../../utils/constants'

interface ChristmasTreeProps {
  position?: [number, number, number]
  scale?: number
}

const TreeLayer = ({ 
  radius, 
  height, 
  y, 
  color 
}: { 
  radius: number
  height: number
  y: number
  color: string 
}) => {
  return (
    <mesh position={[0, y, 0]} castShadow receiveShadow>
      <coneGeometry args={[radius, height, 32]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.8} 
        metalness={0.1}
      />
    </mesh>
  )
}

const TreeTrunk = () => {
  return (
    <mesh position={[0, 0.3, 0]} castShadow>
      <cylinderGeometry args={[0.2, 0.3, 0.8, 16]} />
      <meshStandardMaterial color={COLORS.wood} roughness={0.9} />
    </mesh>
  )
}

const TreeStar = () => {
  const starRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (starRef.current) {
      starRef.current.rotation.y = state.clock.elapsedTime * 0.5
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      starRef.current.scale.setScalar(scale)
    }
  })

  return (
    <mesh ref={starRef} position={[0, 5.2, 0]}>
      <octahedronGeometry args={[0.25, 0]} />
      <meshStandardMaterial 
        color={COLORS.gold} 
        emissive={COLORS.gold}
        emissiveIntensity={2}
        metalness={0.9}
        roughness={0.1}
      />
      <pointLight color={COLORS.gold} intensity={3} distance={5} />
    </mesh>
  )
}

const ChristmasLights = ({ count = 50 }: { count?: number }) => {
  const lightsRef = useRef<THREE.InstancedMesh>(null)
  
  const { positions, colors, phases } = useMemo(() => {
    const pos: THREE.Vector3[] = []
    const cols: THREE.Color[] = []
    const phs: number[] = []
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 8
      const y = 1 + (i / count) * 3.5
      const radius = 1.5 - (y - 1) * 0.35
      
      pos.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      ))
      
      cols.push(CHRISTMAS_LIGHTS_COLORS[i % CHRISTMAS_LIGHTS_COLORS.length])
      phs.push(Math.random() * Math.PI * 2)
    }
    
    return { positions: pos, colors: cols, phases: phs }
  }, [count])

  useFrame((state) => {
    if (!lightsRef.current) return
    
    const time = state.clock.elapsedTime
    const dummy = new THREE.Object3D()
    
    positions.forEach((pos, i) => {
      dummy.position.copy(pos)
      const intensity = 0.5 + Math.sin(time * 3 + phases[i]) * 0.5
      dummy.scale.setScalar(0.06 + intensity * 0.04)
      dummy.updateMatrix()
      lightsRef.current!.setMatrixAt(i, dummy.matrix)
      lightsRef.current!.setColorAt(i, colors[i].clone().multiplyScalar(0.5 + intensity * 0.5))
    })
    
    lightsRef.current.instanceMatrix.needsUpdate = true
    if (lightsRef.current.instanceColor) {
      lightsRef.current.instanceColor.needsUpdate = true
    }
  })

  return (
    <instancedMesh ref={lightsRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial 
        emissive="#ffffff"
        emissiveIntensity={3}
        toneMapped={false}
      />
    </instancedMesh>
  )
}

const Ornaments = ({ count = 30 }: { count?: number }) => {
  const ornamentsRef = useRef<THREE.InstancedMesh>(null)
  
  const { matrices, colors } = useMemo(() => {
    const mats: THREE.Matrix4[] = []
    const cols: THREE.Color[] = []
    const ornamentColors = [
      new THREE.Color(COLORS.red),
      new THREE.Color(COLORS.gold),
      new THREE.Color('#1565c0'),
      new THREE.Color('#7b1fa2'),
    ]
    
    for (let i = 0; i < count; i++) {
      const matrix = new THREE.Matrix4()
      const angle = Math.random() * Math.PI * 2
      const y = 1.2 + Math.random() * 3
      const radius = (1.3 - (y - 1) * 0.3) * (0.8 + Math.random() * 0.4)
      
      matrix.setPosition(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      )
      
      const scale = 0.08 + Math.random() * 0.06
      matrix.scale(new THREE.Vector3(scale, scale, scale))
      
      mats.push(matrix)
      cols.push(ornamentColors[Math.floor(Math.random() * ornamentColors.length)])
    }
    
    return { matrices: mats, colors: cols }
  }, [count])

  useFrame(() => {
    if (!ornamentsRef.current) return
    
    matrices.forEach((matrix, i) => {
      ornamentsRef.current!.setMatrixAt(i, matrix)
      ornamentsRef.current!.setColorAt(i, colors[i])
    })
    
    ornamentsRef.current.instanceMatrix.needsUpdate = true
    if (ornamentsRef.current.instanceColor) {
      ornamentsRef.current.instanceColor.needsUpdate = true
    }
  })

  return (
    <instancedMesh ref={ornamentsRef} args={[undefined, undefined, count]} castShadow>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial metalness={0.9} roughness={0.1} />
    </instancedMesh>
  )
}

export const ChristmasTree = ({ position = [0, 0, 0], scale = 1 }: ChristmasTreeProps) => {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <TreeTrunk />
      <TreeLayer radius={1.8} height={1.5} y={1.2} color={COLORS.treeGreen} />
      <TreeLayer radius={1.5} height={1.4} y={2.0} color={COLORS.treeDarkGreen} />
      <TreeLayer radius={1.2} height={1.3} y={2.7} color={COLORS.treeGreen} />
      <TreeLayer radius={0.9} height={1.2} y={3.3} color={COLORS.treeDarkGreen} />
      <TreeLayer radius={0.6} height={1.1} y={3.9} color={COLORS.treeGreen} />
      <TreeLayer radius={0.3} height={0.8} y={4.4} color={COLORS.treeDarkGreen} />
      <TreeStar />
      <ChristmasLights count={60} />
      <Ornaments count={35} />
    </group>
  )
}
