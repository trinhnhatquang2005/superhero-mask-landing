'use client'

import Image from 'next/image'

export default function Nav() {
  const links = ['Bộ sưu tập', 'Công nghệ', 'Câu chuyện']
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 60,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 24, height: 70, padding: '0 var(--gutter)',
      background: 'rgba(11,13,18,.72)', backdropFilter: 'blur(14px)',
      borderBottom: '1px solid var(--line)',
    }}>
      <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none' }}>
        <Image src="/logo-mark.svg" width={34} height={34} alt="Logo Mặt Nạ Siêu Nhân" />
        <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 0.82 }}>
          <b style={{ fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.01em', color: 'var(--ink-hi)', fontSize: 15 }}>MẶT NẠ</b>
          <b style={{ fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.01em', color: 'var(--plasma)', fontSize: 15 }}>SIÊU NHÂN</b>
        </span>
      </a>
      <nav style={{ display: 'flex', gap: 28 }}>
        {links.map(l => (
          <a
            key={l}
            href="#"
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'var(--ink-mid)', textDecoration: 'none',
              transition: 'color var(--dur-2) var(--ease-out)',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink-hi)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-mid)')}
          >
            {l}
          </a>
        ))}
      </nav>
    </header>
  )
}
