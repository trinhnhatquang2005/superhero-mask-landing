import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mặt Nạ Siêu Nhân — Bộ Sưu Tập Nguyên Tố',
  description: 'Năm nguyên tố. Một lần đeo. Bùng nổ.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}
