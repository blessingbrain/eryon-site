import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })
export const metadata: Metadata = { title: 'ERYON — Operational Software Platform', description: 'One operational picture. Across sensors, systems and domains.' }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-[#070e19]"><body className={`${manrope.variable} font-sans`}>{children}</body></html>
}
