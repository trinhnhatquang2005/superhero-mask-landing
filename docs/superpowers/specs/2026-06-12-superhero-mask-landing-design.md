---
name: superhero-mask-landing
description: Landing page showcase mặt nạ siêu nhân 5 màu — Next.js 16, Tailwind CSS, React Three Fiber, dựa trên Design System Mặt Nạ Siêu Nhân
metadata:
  type: project
---

# Superhero Mask Landing Page — Design Spec (v2)

## Mục đích
Showcase / trưng bày bộ sưu tập 5 mặt nạ siêu nhân. Không có chức năng mua hàng. Tạo ấn tượng mạnh qua dark theme HUD tokusatsu và 3D viewer tương tác.

## Tech Stack
- **Next.js 16** (App Router)
- **Tailwind CSS** — layout & spacing utilities
- **CSS Variables** từ Design System (token-based, không dùng Tailwind cho màu/font/effect)
- **Framer Motion** — scroll reveal animation
- **React Three Fiber + @react-three/drei** — 3D mask viewer
- **Lucide React** — icons

## Design System

Design system gốc tại: `design-system/` (copy từ thư mục Downloads vào repo).

### Fonts (Google Fonts)
- **Saira** 800–900 — display, tiêu đề, IN HOA, letter-spacing âm
- **Be Vietnam Pro** 300–700 — body, chuẩn dấu tiếng Việt
- **Space Mono** 400/700 — nhãn kỹ thuật, IN HOA, mono readouts

### Color Tokens
| Token | Giá trị | Dùng cho |
|-------|---------|----------|
| `--bg` | `#0B0D12` | Nền trang |
| `--void` | `#06070A` | Nền sâu nhất |
| `--surface-1` | `#111319` | Card background |
| `--surface-2` | `#181B23` | Raised panels |
| `--plasma` | `#FF2E43` | Accent chính (đỏ) |
| `--volt` | `#15E0F0` | Accent phụ (cyan) |
| `--hazard` | `#FFC23D` | Signal (vàng) |
| `--ink-hi` | `#F3F5FB` | Heading text |
| `--ink` | `#C8CDD9` | Body text |
| `--ink-mid` | `#888FA0` | Secondary text |

### 5 Mask Colors
| Tên | Màu | Hex |
|-----|-----|-----|
| Inferno | Đỏ plasma | `#FF2E43` |
| Aquarix | Cyan volt | `#15E0F0` |
| Solaris | Vàng hazard | `#FFC23D` |
| Verdex | Xanh lá | `#2CE08A` |
| Phantex | Tím | `#9B6DFF` |

### Effects
- Glow plasma: `0 0 0 1px rgba(255,46,67,.35), 0 0 22px rgba(255,46,67,.40)`
- Glow volt: `0 0 0 1px rgba(21,224,240,.35), 0 0 22px rgba(21,224,240,.38)`
- Bevel clip: `clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)`
- Grid overlay: `--grid` + `background-size: 56px 56px`
- Inner sheen: `inset 0 1px 0 rgba(255,255,255,.06)`

### Motion
- `--ease-out: cubic-bezier(.2,.8,.2,1)`
- `--ease-snap: cubic-bezier(.34,1.56,.64,1)`
- Duration: 120ms / 200ms / 320ms / 520ms

## Cấu trúc trang

### 1. Nav (sticky)
- Logo mark + "MẶT NẠ SIÊU NHÂN"
- Links: Bộ sưu tập · Công nghệ · Câu chuyện
- `backdrop-filter: blur(14px)`, nền `rgba(11,13,18,.72)`

### 2. Hero Section
- Grid kỹ thuật overlay mờ
- Radial glow plasma + volt phía sau
- Kicker: `// Bộ Sưu Tập Nguyên Tố` (Space Mono, plasma)
- Title: **THỨC TỈNH SỨC MẠNH** (Saira 900, clamp 3rem→6.5rem)
- Sub: 1 câu mô tả (Be Vietnam Pro, ink-mid)
- Scroll-down indicator

### 3. Feature Strip
- Marquee: "Hợp kim hàng không · LED phản ứng · In 3D thủ công · Phản quang ban đêm · Năng lượng niêm phong · Bảo hành trọn đời"
- Space Mono, IN HOA, icon Lucide `zap`

### 4. Mask Cards (5 cards)
- 3D viewer: React Three Fiber, TorusKnot placeholder, màu + emissive
- Kicker Space Mono, Tên Saira 900, Tagline Be Vietnam Pro
- Card: surface-1, bevel clip, hover glow theo màu mask, HUD tick corner
- Grid: auto-fill minmax(280px, 1fr)

### 5. Footer
- Nền `--void`, logo mark, tagline, copyright Space Mono

## Copy Tone
- Ngắn, mệnh lệnh, dứt khoát. IN HOA tiêu đề. Dùng `//`, `·`.

## File Structure
```
superhero-mask-landing/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Nav.tsx
│   ├── HeroSection.tsx
│   ├── FeatureStrip.tsx
│   ├── MaskCard.tsx
│   ├── MaskViewer.tsx
│   └── Footer.tsx
├── data/
│   └── masks.ts
├── design-system/
│   ├── styles.css
│   ├── tokens/
│   └── assets/
├── public/
│   └── logo-mark.svg
├── tailwind.config.ts
└── package.json
```
