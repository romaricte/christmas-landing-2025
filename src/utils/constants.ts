import * as THREE from 'three'

export const COLORS = {
  snow: '#ffffff',
  snowGround: '#e8f4f8',
  treeGreen: '#1a472a',
  treeDarkGreen: '#0f2d1a',
  gold: '#ffd700',
  red: '#c41e3a',
  warmLight: '#ffb347',
  coolLight: '#87ceeb',
  nightSky: '#0a1628',
  moonlight: '#f5f5dc',
  wood: '#8b4513',
  giftRed: '#d32f2f',
  giftGreen: '#2e7d32',
  giftBlue: '#1976d2',
  giftGold: '#f9a825',
}

export const CHRISTMAS_LIGHTS_COLORS = [
  new THREE.Color('#ff0000'),
  new THREE.Color('#00ff00'),
  new THREE.Color('#0000ff'),
  new THREE.Color('#ffff00'),
  new THREE.Color('#ff00ff'),
  new THREE.Color('#00ffff'),
  new THREE.Color('#ffa500'),
  new THREE.Color('#ff69b4'),
]

export const SCENE_CONFIG = {
  camera: {
    fov: 45,
    near: 0.1,
    far: 1000,
    position: [0, 3, 12] as [number, number, number],
  },
  fog: {
    color: '#0a1628',
    near: 10,
    far: 50,
  },
  snow: {
    count: 5000,
    area: { x: 30, y: 20, z: 30 },
    speed: { min: 0.02, max: 0.06 },
    size: { min: 0.02, max: 0.08 },
  },
  tree: {
    position: [0, 0, 0] as [number, number, number],
    scale: 1,
    layers: 5,
  },
  ground: {
    size: 100,
    segments: 128,
  },
}

export const ANIMATION_CONFIG = {
  tree: {
    rotationSpeed: 0.001,
    lightFlickerSpeed: 2,
  },
  sleigh: {
    speed: 0.3,
    amplitude: { x: 15, y: 2, z: 8 },
    height: 8,
  },
  gifts: {
    hoverHeight: 0.3,
    hoverSpeed: 2,
    rotationSpeed: 0.5,
  },
  camera: {
    smoothness: 0.05,
    maxRotation: 0.1,
  },
}

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
}
