export interface Mask {
  id: string
  name: string
  kicker: string
  tagline: string
  color: string
  glowRgb: string
}

export const masks: Mask[] = [
  {
    id: 'inferno',
    name: 'Inferno',
    kicker: '// NGUYÊN TỐ — LỬA',
    tagline: 'Sức mạnh và lửa dũng cảm. Đeo vào — bùng nổ.',
    color: '#FF2E43',
    glowRgb: '255,46,67',
  },
  {
    id: 'aquarix',
    name: 'Aquarix',
    kicker: '// NGUYÊN TỐ — BĂNG',
    tagline: 'Tốc độ băng. Trí tuệ lạnh. Không gì cản được.',
    color: '#15E0F0',
    glowRgb: '21,224,240',
  },
  {
    id: 'solaris',
    name: 'Solaris',
    kicker: '// NGUYÊN TỐ — ÁNH SÁNG',
    tagline: 'Ánh sáng dẫn lối. Năng lượng mặt trời trong đường nét.',
    color: '#FFC23D',
    glowRgb: '255,194,61',
  },
  {
    id: 'verdex',
    name: 'Verdex',
    kicker: '// NGUYÊN TỐ — ĐẤT',
    tagline: 'Bền bỉ như thiên nhiên. Mọc lên từ bóng tối.',
    color: '#2CE08A',
    glowRgb: '44,224,138',
  },
  {
    id: 'phantex',
    name: 'Phantex',
    kicker: '// NGUYÊN TỐ — BÓNG TỐI',
    tagline: 'Bí ẩn và tiên tri. Thấy những gì người khác không thấy.',
    color: '#9B6DFF',
    glowRgb: '155,109,255',
  },
]
