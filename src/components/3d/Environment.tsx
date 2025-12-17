// src/components/3d/Environment.tsx
import { Environment as DreiEnvironment } from '@react-three/drei'

export default function Environment() {
  return (
    <DreiEnvironment
      preset="night"
      background={false}
    />
  )
}