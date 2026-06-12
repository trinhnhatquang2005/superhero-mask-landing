# Superhero Mask Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark-themed single-page landing page showcasing 5 superhero masks with interactive 3D viewers using Next.js 16, Tailwind CSS, Framer Motion, and React Three Fiber.

**Architecture:** Single Next.js App Router page (`app/page.tsx`) composed of section components. Mask data centralized in `data/masks.ts`. Each card renders an isolated React Three Fiber Canvas for the 3D viewer. Framer Motion handles scroll-triggered animations.

**Tech Stack:** Next.js 16, Tailwind CSS, Framer Motion, React Three Fiber (@react-three/fiber), @react-three/drei

---

## File Map

| File | Trách nhiệm |
|------|------------|
| `app/layout.tsx` | Root layout, font, metadata |
| `app/globals.css` | Tailwind directives, custom glow utilities |
| `app/page.tsx` | Compose các section |
| `data/masks.ts` | Data 5 mặt nạ (tên, màu, glow, tagline) |
| `components/HeroSection.tsx` | Hero full-viewport |
| `components/IntroSection.tsx` | Intro fade-in |
| `components/MaskCard.tsx` | Card layout + glow border + hover |
| `components/MaskViewer.tsx` | React Three Fiber 3D canvas |
| `components/Footer.tsx` | Footer đơn giản |
| `tailwind.config.ts` | Extend theme, safelist glow colors |

---

### Task 1: Khởi tạo project Next.js 16

**Files:**
- Create: `package.json`, `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx`

- [ ] **Step 1: Tạo project**

```bash
cd /Users/trinhnhatquang/Desktop
npx create-next-app@latest superhero-mask-landing \
  --typescript --tailwind --app --no-src-dir --import-alias "@/*"
cd superhero-mask-landing
```

- [ ] **Step 2: Cài dependencies**

```bash
npm install framer-motion @react-three/fiber @react-three/drei three
npm install -D @types/three
```

- [ ] **Step 3: Cập nhật `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        inferno: '#ff3333',
        aquarix: '#3399ff',
        solaris: '#ffcc00',
        verdex: '#33ff99',
        phantex: '#cc33ff',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 100%)',
      },
    },
  },
  safelist: [
    'shadow-inferno', 'shadow-aquarix', 'shadow-solaris', 'shadow-verdex', 'shadow-phantex',
    'border-inferno', 'border-aquarix', 'border-solaris', 'border-verdex', 'border-phantex',
    'text-inferno', 'text-aquarix', 'text-solaris', 'text-verdex', 'text-phantex',
  ],
  plugins: [],
}
export default config
```

- [ ] **Step 4: Cập nhật `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-[#0a0a0a] text-white;
  }
}

@layer utilities {
  .glow-inferno  { box-shadow: 0 0 24px #ff3333, 0 0 48px #ff333344; }
  .glow-aquarix  { box-shadow: 0 0 24px #3399ff, 0 0 48px #3399ff44; }
  .glow-solaris  { box-shadow: 0 0 24px #ffcc00, 0 0 48px #ffcc0044; }
  .glow-verdex   { box-shadow: 0 0 24px #33ff99, 0 0 48px #33ff9944; }
  .glow-phantex  { box-shadow: 0 0 24px #cc33ff, 0 0 48px #cc33ff44; }
}
```

- [ ] **Step 5: Cập nhật `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['700', '900'] })

export const metadata: Metadata = {
  title: 'Superhero Mask Collection',
  description: 'Bộ sưu tập mặt nạ siêu nhân 5 màu',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

- [ ] **Step 6: Verify chạy được**

```bash
npm run dev
```
Mở http://localhost:3000 — thấy trang Next.js mặc định là OK.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: init Next.js 16 project with Tailwind and dependencies"
```

---

### Task 2: Data layer — masks.ts

**Files:**
- Create: `data/masks.ts`

- [ ] **Step 1: Tạo file data**

```ts
// data/masks.ts
export interface Mask {
  id: string
  name: string
  tagline: string
  color: string        // hex, dùng cho Three.js material
  glowClass: string    // CSS utility class
  borderClass: string
  textClass: string
}

export const masks: Mask[] = [
  {
    id: 'inferno',
    name: 'Inferno',
    tagline: 'Sức mạnh và lửa dũng cảm',
    color: '#ff3333',
    glowClass: 'glow-inferno',
    borderClass: 'border-inferno',
    textClass: 'text-inferno',
  },
  {
    id: 'aquarix',
    name: 'Aquarix',
    tagline: 'Tốc độ băng và trí tuệ',
    color: '#3399ff',
    glowClass: 'glow-aquarix',
    borderClass: 'border-aquarix',
    textClass: 'text-aquarix',
  },
  {
    id: 'solaris',
    name: 'Solaris',
    tagline: 'Ánh sáng dẫn lối',
    color: '#ffcc00',
    glowClass: 'glow-solaris',
    borderClass: 'border-solaris',
    textClass: 'text-solaris',
  },
  {
    id: 'verdex',
    name: 'Verdex',
    tagline: 'Bền bỉ như thiên nhiên',
    color: '#33ff99',
    glowClass: 'glow-verdex',
    borderClass: 'border-verdex',
    textClass: 'text-verdex',
  },
  {
    id: 'phantex',
    name: 'Phantex',
    tagline: 'Bí ẩn và tiên tri',
    color: '#cc33ff',
    glowClass: 'glow-phantex',
    borderClass: 'border-phantex',
    textClass: 'text-phantex',
  },
]
```

- [ ] **Step 2: Commit**

```bash
git add data/masks.ts
git commit -m "feat: add mask data layer"
```

---

### Task 3: MaskViewer — 3D component

**Files:**
- Create: `components/MaskViewer.tsx`

Note: Vì React Three Fiber dùng WebGL cần chạy client-side, component phải có `'use client'`. Next.js dynamic import với `ssr: false` được dùng ở MaskCard để tránh SSR error.

- [ ] **Step 1: Tạo `components/MaskViewer.tsx`**

```tsx
'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function MaskMesh({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <mesh ref={meshRef} castShadow>
      <torusKnotGeometry args={[0.8, 0.3, 128, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  )
}

export default function MaskViewer({ color }: { color: string }) {
  return (
    <div className="w-full h-64">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight position={[-5, -5, -5]} color={color} intensity={0.8} />
        <MaskMesh color={color} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/MaskViewer.tsx
git commit -m "feat: add 3D mask viewer with React Three Fiber"
```

---

### Task 4: MaskCard component

**Files:**
- Create: `components/MaskCard.tsx`

- [ ] **Step 1: Tạo `components/MaskCard.tsx`**

```tsx
'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import type { Mask } from '@/data/masks'

const MaskViewer = dynamic(() => import('./MaskViewer'), { ssr: false })

export default function MaskCard({ mask }: { mask: Mask }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      className={`
        relative rounded-2xl border-2 ${mask.borderClass} ${mask.glowClass}
        bg-[#0d0d1a] p-6 flex flex-col gap-4
        transition-shadow duration-300
        hover:${mask.glowClass}
      `}
    >
      <MaskViewer color={mask.color} />
      <div>
        <h2 className={`text-3xl font-black uppercase tracking-widest ${mask.textClass}`}>
          {mask.name}
        </h2>
        <p className="text-gray-400 mt-1 text-sm">{mask.tagline}</p>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/MaskCard.tsx
git commit -m "feat: add MaskCard with scroll reveal and hover glow"
```

---

### Task 5: HeroSection

**Files:**
- Create: `components/HeroSection.tsx`

- [ ] **Step 1: Tạo `components/HeroSection.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 bg-hero-gradient overflow-hidden">
      {/* Glow orb */}
      <div className="absolute w-96 h-96 rounded-full bg-purple-700/20 blur-3xl pointer-events-none" />

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-black uppercase tracking-widest text-white"
      >
        Superhero Mask
        <br />
        <span className="text-purple-400">Collection</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-4 text-gray-400 text-lg md:text-xl"
      >
        Chọn sức mạnh của bạn
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-gray-500 text-sm"
      >
        <span>Cuộn xuống</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
          className="w-1 h-6 bg-gray-500 rounded-full"
        />
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/HeroSection.tsx
git commit -m "feat: add Hero section"
```

---

### Task 6: IntroSection và Footer

**Files:**
- Create: `components/IntroSection.tsx`
- Create: `components/Footer.tsx`

- [ ] **Step 1: Tạo `components/IntroSection.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'

export default function IntroSection() {
  return (
    <section className="py-20 px-4 text-center max-w-2xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-gray-300 text-lg md:text-xl leading-relaxed"
      >
        Năm mặt nạ. Năm nguồn sức mạnh. Mỗi chiếc mang một linh hồn riêng — được tạo ra để
        dành cho những ai dám đối mặt với bóng tối.
      </motion.p>
    </section>
  )
}
```

- [ ] **Step 2: Tạo `components/Footer.tsx`**

```tsx
export default function Footer() {
  return (
    <footer className="py-10 text-center text-gray-600 text-sm border-t border-gray-800">
      Superhero Mask Collection © {new Date().getFullYear()}
    </footer>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/IntroSection.tsx components/Footer.tsx
git commit -m "feat: add Intro section and Footer"
```

---

### Task 7: Compose page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Cập nhật `app/page.tsx`**

```tsx
import HeroSection from '@/components/HeroSection'
import IntroSection from '@/components/IntroSection'
import MaskCard from '@/components/MaskCard'
import Footer from '@/components/Footer'
import { masks } from '@/data/masks'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <IntroSection />
      <section className="max-w-5xl mx-auto px-4 pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {masks.map((mask) => (
          <MaskCard key={mask.id} mask={mask} />
        ))}
      </section>
      <Footer />
    </main>
  )
}
```

- [ ] **Step 2: Chạy và kiểm tra**

```bash
npm run dev
```

Mở http://localhost:3000. Kiểm tra:
- Hero section hiện đúng với glow orb
- Scroll xuống thấy intro fade in
- 5 card hiện ra với 3D viewer xoay
- Hover card → nâng lên + glow
- Responsive trên mobile (1 cột) và desktop (3 cột)

- [ ] **Step 3: Build check**

```bash
npm run build
```
Expected: build thành công, không có error.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: compose main page with all sections"
```

---

### Task 8: Push lên GitHub

- [ ] **Step 1: Add remote và push**

```bash
git remote add origin https://github.com/trinhnhatquang2005/superhero-mask-landing.git
git branch -M main
git push -u origin main
```

- [ ] **Step 2: Verify trên GitHub**

Mở https://github.com/trinhnhatquang2005/superhero-mask-landing — kiểm tra tất cả file đã lên.
