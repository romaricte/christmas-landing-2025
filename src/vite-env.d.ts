// src/vite-env.d.ts
/// <reference types="vite/client" />

// Déclarations pour les fichiers 3D
declare module '*.glb' {
  const src: string
  export default src
}

declare module '*.gltf' {
  const src: string
  export default src
}

declare module '*.hdr' {
  const src: string
  export default src
}

// Déclarations pour les shaders GLSL
declare module '*.glsl' {
  const value: string
  export default value
}

declare module '*.vert' {
  const value: string
  export default value
}

declare module '*.frag' {
  const value: string
  export default value
}