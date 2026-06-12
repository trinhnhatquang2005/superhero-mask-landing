---
name: superhero-mask-landing
description: Landing page showcase bộ sưu tập mặt nạ siêu nhân 5 màu với 3D viewer — Next.js 16 + Tailwind CSS + Three.js
metadata:
  type: project
---

# Superhero Mask Landing Page — Design Spec

## Mục đích
Showcase / trưng bày bộ sưu tập 5 mặt nạ siêu nhân. Không có chức năng mua hàng. Mục tiêu tạo ấn tượng mạnh qua dark theme và 3D viewer tương tác.

## Tech Stack
- **Next.js 16** (App Router)
- **Tailwind CSS** — styling
- **Framer Motion** — scroll reveal animation
- **React Three Fiber + @react-three/drei** — 3D mask viewer
- **Three.js** (qua React Three Fiber)

## Tone & Style
- Dark theme: background gradient `#0a0a0a → #1a0a2e`
- Neon glow theo màu từng mặt nạ
- Typography: bold, dramatic (font sans-serif nặng)
- Hiệu ứng: scroll reveal, hover glow, 3D model xoay

## Cấu trúc trang (Single Page Scroll)

### 1. Hero Section
- Full-viewport height
- Background dark gradient + subtle glow ở trung tâm
- Tiêu đề lớn: **"SUPERHERO MASK COLLECTION"**
- Tagline: *"Chọn sức mạnh của bạn"*
- Scroll-down indicator

### 2. Intro Section
- 1-2 câu mô tả bộ sưu tập
- Animate fade-in khi scroll vào viewport

### 3. Mask Card Section (5 cards)

Mỗi card hiển thị:
- **3D viewer** — model mặt nạ xoay được bằng chuột/touch (React Three Fiber Canvas)
- **Tên nhân vật** (bold, màu theo glow)
- **Tagline** ngắn
- **Glow border** theo màu riêng
- Hover: card nâng lên (translateY), tăng glow intensity

| Màu | Tên | Màu glow | Tagline |
|-----|-----|----------|---------|
| Đỏ | **Inferno** | `#ff3333` | *Sức mạnh và lửa dũng cảm* |
| Xanh dương | **Aquarix** | `#3399ff` | *Tốc độ băng và trí tuệ* |
| Vàng | **Solaris** | `#ffcc00` | *Ánh sáng dẫn lối* |
| Xanh lá | **Verdex** | `#33ff99` | *Bền bỉ như thiên nhiên* |
| Tím | **Phantex** | `#cc33ff` | *Bí ẩn và tiên tri* |

3D model: dùng geometry đơn giản (placeholder BoxGeometry hoặc SphereGeometry có màu) nếu chưa có file `.glb`. Thiết kế sẵn để swap vào model thật sau.

### 4. Footer
- Background tối
- Text đơn giản: tên bộ sưu tập + năm

## File Structure
```
superhero-mask-landing/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── HeroSection.tsx
│   ├── IntroSection.tsx
│   ├── MaskCard.tsx        # card + 3D viewer
│   ├── MaskViewer.tsx      # React Three Fiber canvas
│   └── Footer.tsx
├── data/
│   └── masks.ts            # data 5 mặt nạ (tên, màu, tagline)
├── public/
│   └── models/             # file .glb sau này
├── tailwind.config.ts
└── package.json
```

## Các quyết định thiết kế

- **React Three Fiber** thay vì Three.js thuần — tích hợp tự nhiên với React/Next.js, quản lý lifecycle dễ hơn
- **Placeholder geometry** cho 3D model — tránh phụ thuộc vào file `.glb` bên ngoài, dễ swap sau
- **Framer Motion** cho scroll animation — nhẹ, API đơn giản với Next.js App Router
- Không dùng backend, toàn bộ là static rendering
