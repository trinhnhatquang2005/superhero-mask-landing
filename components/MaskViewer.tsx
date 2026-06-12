'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function MaskMesh({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.55
  })
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[0.75, 0.28, 128, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.45}
        roughness={0.15}
        metalness={0.85}
      />
    </mesh>
  )
}

export default function MaskViewer({ color }: { color: string }) {
  return (
    <div style={{ width: '100%', height: 220 }}>
      <Canvas camera={{ position: [0, 0, 2.8], fov: 50 }}>
        <ambientLight intensity={0.25} />
        <pointLight position={[4, 4, 4]} intensity={1.5} />
        <pointLight position={[-4, -4, -4]} color={color} intensity={1} />
        <MaskMesh color={color} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}
