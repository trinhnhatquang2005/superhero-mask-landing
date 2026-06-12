'use client'

import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section id="top" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(64px,8vw,112px) var(--gutter) clamp(48px,6vw,80px)' }}>
      <div className="grid-overlay" style={{ position: 'absolute', inset: 0, opacity: 0.45, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'var(--glow-bg-plasma), var(--glow-bg-volt)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', maxWidth: 'var(--container)', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 24 }}>
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--plasma)' }}
        >
          // Bộ Sưu Tập Nguyên Tố · Phiên Bản Giới Hạn
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase',
            fontSize: 'clamp(3rem,8vw,6.5rem)', lineHeight: 0.92, letterSpacing: '-0.03em',
            color: 'var(--ink-hi)', margin: 0,
          }}
        >
          THỨC TỈNH<br />
          <span style={{ color: 'var(--plasma)' }}>SỨC MẠNH</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{ fontFamily: 'var(--font-body)', fontSize: 17, lineHeight: 1.6, color: 'var(--ink-mid)', maxWidth: 480, margin: 0 }}
        >
          Năm nguyên tố. Năm nguồn sức mạnh. Mỗi chiếc mang một linh hồn riêng — được niêm phong trong từng đường nét kim loại.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          style={{ marginTop: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-dim)' }}>Cuộn xuống</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.4 }}
            style={{ width: 2, height: 24, background: 'var(--plasma)', borderRadius: 999, opacity: 0.6 }}
          />
        </motion.div>
      </div>
    </section>
  )
}
