import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, Stars } from '@react-three/drei'
import { ChristmasTree } from './ChristmasTree'
import { Snowfall } from './Snowfall'
import { Ground } from './Ground'
import { Environment } from './Environment'
import { Lights } from './Lights'
import { SantaSleigh } from './SantaSleigh'
import { Snowman } from './Snowman'
import { Gifts } from './Gifts'
import { Cabin } from './Cabin'
import { PostProcessing } from '../effects/PostProcessing'
import { SCENE_CONFIG } from '../../utils/constants'

const SceneContent = () => {
  return (
    <>
      <Lights />
      <Environment />
      <Ground />
      <ChristmasTree position={[0, 0, 0]} />
      <Snowfall />
      <SantaSleigh />
      <Snowman position={[-4, 0, 3]} />
      <Snowman position={[5, 0, 2]} scale={0.7} />
      <Gifts />
      <Cabin position={[-8, 0, -5]} />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <PostProcessing />
    </>
  )
}

export const Scene = () => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{
        fov: SCENE_CONFIG.camera.fov,
        near: SCENE_CONFIG.camera.near,
        far: SCENE_CONFIG.camera.far,
        position: SCENE_CONFIG.camera.position,
      }}
      gl={{ 
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      }}
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%',
        background: 'linear-gradient(to bottom, #0a1628, #1a237e)',
      }}
    >
      <fog attach="fog" args={[SCENE_CONFIG.fog.color, SCENE_CONFIG.fog.near, SCENE_CONFIG.fog.far]} />
      <color attach="background" args={['#0a1628']} />
      
      <Suspense fallback={null}>
        <SceneContent />
        <Preload all />
      </Suspense>
      
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={5}
        maxDistance={25}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </Canvas>
  )
}
