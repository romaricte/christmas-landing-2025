// src/components/effects/Effects.tsx
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { useStore } from '../../stores/useStore'

export default function Effects(): JSX.Element {
  const bloomIntensity = useStore((state) => state.bloomIntensity)
  const highQuality = useStore((state) => state.highQuality)

  if (!highQuality) return null

  return (
    <EffectComposer>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Vignette
        offset={0.3}
        darkness={0.6}
      />
    </EffectComposer>
  )
}