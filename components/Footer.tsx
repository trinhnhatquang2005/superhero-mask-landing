import Image from 'next/image'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--void)',
      borderTop: '1px solid var(--line)',
      padding: 'var(--space-9) var(--gutter)',
      textAlign: 'center',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
    }}>
      <Image src="/logo-mark.svg" width={32} height={32} alt="Logo" style={{ opacity: 0.5 }} />
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--t-sm)', color: 'var(--ink-mid)', margin: 0 }}>
        Năng lượng được niêm phong. Đeo vào. Bùng nổ.
      </p>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-dim)' }}>
        Mặt Nạ Siêu Nhân © {new Date().getFullYear()}
      </span>
    </footer>
  )
}
