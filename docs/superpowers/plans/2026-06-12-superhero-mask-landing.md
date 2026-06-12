# Superhero Mask Landing Page — Implementation Plan (v2)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark HUD tokusatsu landing page showcasing 5 superhero masks with interactive 3D viewers, using the Mặt Nạ Siêu Nhân Design System tokens.

**Architecture:** Next.js 16 App Router. CSS Variables từ design system cho màu/font/effect. Tailwind chỉ cho layout. Framer Motion cho scroll reveal. React Three Fiber cho 3D viewer.

**Tech Stack:** Next.js 16, Tailwind CSS (layout only), Framer Motion, @react-three/fiber, @react-three/drei, lucide-react

---

## File Map

| File | Trách nhiệm |
|------|------------|
| `app/layout.tsx` | Root layout, metadata |
| `app/globals.css` | Import design system tokens, Tailwind base |
| `app/page.tsx` | Compose tất cả sections |
| `design-system/` | Token CSS files từ Design System |
| `data/masks.ts` | Data 5 mặt nạ |
| `components/Nav.tsx` | Sticky nav blur backdrop |
| `components/HeroSection.tsx` | Hero full-viewport |
| `components/FeatureStrip.tsx` | Marquee strip |
| `components/MaskViewer.tsx` | React Three Fiber 3D canvas |
| `components/MaskCard.tsx` | Card bevel + glow + 3D |
| `components/Footer.tsx` | Footer tối |
| `public/logo-mark.svg` | Logo từ design system |
| `tailwind.config.ts` | Disable preflight, layout only |

---

### Task 1: Khởi tạo project và copy design system

- [ ] Clone repo, init Next.js, cài dependencies, copy design system tokens
- [ ] Cập nhật tailwind.config.ts (disable preflight)
- [ ] Cập nhật globals.css (import tokens)
- [ ] Cập nhật layout.tsx
- [ ] Verify `npm run dev` chạy với nền tối
- [ ] Commit: `feat: init Next.js 16 with design system tokens`

### Task 2: Data layer
- [ ] Tạo `data/masks.ts` với 5 mask (id, name, kicker, tagline, color, glowRgb)
- [ ] Commit: `feat: add mask data layer`

### Task 3: Nav
- [ ] Tạo `components/Nav.tsx` — sticky, blur backdrop, logo + links
- [ ] Commit: `feat: add sticky Nav component`

### Task 4: HeroSection
- [ ] Tạo `components/HeroSection.tsx` — grid overlay, glow, kicker, title plasma, scroll indicator
- [ ] Commit: `feat: add Hero section`

### Task 5: FeatureStrip
- [ ] Tạo `components/FeatureStrip.tsx` — marquee, Space Mono, zap icon
- [ ] Commit: `feat: add Feature Strip marquee`

### Task 6: MaskViewer
- [ ] Tạo `components/MaskViewer.tsx` — React Three Fiber, TorusKnot, OrbitControls
- [ ] Commit: `feat: add 3D MaskViewer`

### Task 7: MaskCard
- [ ] Tạo `components/MaskCard.tsx` — bevel, dynamic MaskViewer, glow, HUD tick, scroll reveal
- [ ] Commit: `feat: add MaskCard`

### Task 8: Footer
- [ ] Tạo `components/Footer.tsx`
- [ ] Commit: `feat: add Footer`

### Task 9: Compose page.tsx
- [ ] Cập nhật `app/page.tsx` — Nav + Hero + Strip + Cards grid + Footer
- [ ] `npm run dev` — kiểm tra toàn bộ
- [ ] `npm run build` — không có error
- [ ] Commit: `feat: compose main page — all sections complete`

### Task 10: Push
- [ ] `git push origin main`
