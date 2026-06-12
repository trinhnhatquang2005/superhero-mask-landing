import { Zap } from 'lucide-react'

const items = [
  'Hợp kim hàng không', 'LED phản ứng nhịp', 'In 3D thủ công',
  'Phản quang ban đêm', 'Năng lượng niêm phong', 'Bảo hành trọn đời',
]

export default function FeatureStrip() {
  const loop = [...items, ...items]
  return (
    <div
      style={{ overflow: 'hidden', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', background: 'var(--surface-1)', padding: '13px 0' }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes mn-marquee { to { transform: translateX(-50%); } }
        .marquee-track { display:flex; gap:44px; width:max-content; animation:mn-marquee 28s linear infinite; }
        @media (prefers-reduced-motion:reduce) { .marquee-track { animation:none; } }
      `}</style>
      <div className="marquee-track">
        {loop.map((t, i) => (
          <span
            key={i}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-mid)' }}
          >
            <Zap size={14} color="var(--plasma)" />
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
