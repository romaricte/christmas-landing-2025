import { useRef } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'

const GlowMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color('#ffd700'),
    intensity: 1.0,
  },
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float time;
    uniform vec3 color;
    uniform float intensity;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      float dist = length(vUv - 0.5);
      float glow = 1.0 - smoothstep(0.0, 0.5, dist);
      glow *= 0.5 + 0.5 * sin(time * 2.0 + vPosition.y * 5.0);
      
      vec3 finalColor = color * glow * intensity;
      gl_FragColor = vec4(finalColor, glow * 0.8);
    }
  `
)

const AuroraMaterial = shaderMaterial(
  {
    time: 0,
    colorA: new THREE.Color('#00ff88'),
    colorB: new THREE.Color('#8800ff'),
  },
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float time;
    uniform vec3 colorA;
    uniform vec3 colorB;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }
    
    void main() {
      float n = noise(vUv * 10.0 + time * 0.1);
      float wave = sin(vUv.x * 10.0 + time) * 0.5 + 0.5;
      wave *= sin(vUv.y * 5.0 + time * 0.5) * 0.5 + 0.5;
      
      vec3 color = mix(colorA, colorB, vUv.y + wave * 0.3);
      float alpha = wave * 0.3 * (1.0 - vUv.y);
      
      gl_FragColor = vec4(color, alpha);
    }
  `
)

const SnowGroundMaterial = shaderMaterial(
  {
    time: 0,
    baseColor: new THREE.Color('#e8f4f8'),
    sparkleColor: new THREE.Color('#ffffff'),
  },
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float time;
    uniform vec3 baseColor;
    uniform vec3 sparkleColor;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }
    
    void main() {
      vec3 color = baseColor;
      
      float sparkle = 0.0;
      for(int i = 0; i < 3; i++) {
        vec2 sparkleUV = vUv * (50.0 + float(i) * 20.0);
        float r = random(floor(sparkleUV));
        float t = fract(time * 0.5 + r * 6.28);
        sparkle += smoothstep(0.95, 1.0, r) * (0.5 + 0.5 * sin(t * 6.28)) * 0.5;
      }
      
      color = mix(color, sparkleColor, sparkle);
      
      float fresnel = pow(1.0 - max(dot(vNormal, vec3(0.0, 1.0, 0.0)), 0.0), 2.0);
      color += vec3(0.1) * fresnel;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
)

extend({ GlowMaterial, AuroraMaterial, SnowGroundMaterial })

export const GlowSphere = ({ 
  position = [0, 0, 0] as [number, number, number],
  color = '#ffd700',
  size = 1,
  intensity = 1 
}) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      {/* @ts-expect-error - Custom shader material */}
      <glowMaterial
        ref={materialRef}
        color={new THREE.Color(color)}
        intensity={intensity}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

export const ShaderAurora = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh position={[0, 30, -40]} rotation={[-0.3, 0, 0]}>
      <planeGeometry args={[80, 30, 64, 32]} />
      {/* @ts-expect-error - Custom shader material */}
      <auroraMaterial
        ref={materialRef}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

export const SparklingGround = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
      <planeGeometry args={[100, 100, 1, 1]} />
      {/* @ts-expect-error - Custom shader material */}
      <snowGroundMaterial ref={materialRef} />
    </mesh>
  )
}
