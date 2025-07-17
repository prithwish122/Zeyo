import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ZkvaultNavbar from '@/components/Zeyo-navbar'

// Load Inter font
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'], // You can customize this as needed
})

export const metadata: Metadata = {
  title: 'Zeyo',
  description: 'Reclaim your DeFi Privacy with Zeyo',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ZkvaultNavbar />
        {children}</body>
    </html>
  )
}
