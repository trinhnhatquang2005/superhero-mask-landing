'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import type { Mask } from '@/data/masks'

const MaskViewer = dynamic(() => import('./MaskViewer'), { ssr: false })

export default function MaskCard({ mask }: { mask: Mask }) {
  const glowBase = `0 0 0 1px rgba(${mask.glowRgb},.30), 0 0 22px rgba(${mask.glowRgb},.35), inset 0 1px 0 rgba(255,255,255,.06)`
  const glowHover = `0 0 0 1px rgba(${mask.glowRgb},.55), 0 0 48px rgba(${mask.glowRgb},.55), inset 0 1px 0 rgba(255,255,255,.06)`

  return (
    <motion.div
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ y: -6 }}
      className="bevel"
      style={{
        background: 'var(--surface-1)',
        border: `1px solid rgba(${mask.glowRgb},.30)`,
        boxShadow: glowBase,
        padding: 'var(--space-5)',
        display: 'flex', flexDirection: 'column', gap: 16,
        transition: `box-shadow var(--dur-3) var(--ease-out), border-color var(--dur-3) var(--ease-out)`,
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = glowHover
        e.currentTarget.style.borderColor = `rgba(${mask.glowRgb},.55)`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = glowBase
        e.currentTarget.style.borderColor = `rgba(${mask.glowRgb},.30)`
      }}
    >
      {/* HUD tick corner */}
      <div style={{
        position: 'absolute', top: 12, right: 12, width: 10, height: 10,
        borderTop: `2px solid ${mask.color}`, borderRight: `2px solid ${mask.color}`, opacity: 0.8,
      }} />

      <MaskViewer color={mask.color} />

      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: mask.color, marginBottom: 6 }}>
          {mask.kicker}
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase', fontSize: 'var(--t-h2)', letterSpacing: '-0.02em', color: 'var(--ink-hi)', margin: '0 0 8px' }}>
          {mask.name}
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--t-sm)', lineHeight: 'var(--lh-normal)', color: 'var(--ink-mid)', margin: 0 }}>
          {mask.tagline}
        </p>
      </div>
    </motion.div>
  )
}
