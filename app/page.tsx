import Nav from '@/components/Nav'
import HeroSection from '@/components/HeroSection'
import FeatureStrip from '@/components/FeatureStrip'
import MaskCard from '@/components/MaskCard'
import Footer from '@/components/Footer'
import { masks } from '@/data/masks'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <FeatureStrip />

        <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: 'clamp(56px,7vw,96px) var(--gutter)' }}>
          <div style={{ marginBottom: 48, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--plasma)' }}>
              // Bộ Sưu Tập
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(1.7rem,3vw,2.8rem)', letterSpacing: '-0.02em', color: 'var(--ink-hi)', margin: 0 }}>
              NĂM NGUYÊN TỐ
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
            {masks.map(mask => (
              <MaskCard key={mask.id} mask={mask} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
