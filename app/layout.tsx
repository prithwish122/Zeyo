import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ZkvaultNavbar from '@/components/Zeyo-navbar'

import { headers } from 'next/headers' // added
import ContextProvider from '@/context'
import ZeyoNavbar from '@/components/Zeyo-navbar'

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

   const headersObj = await headers();
  const cookies = headersObj.get('cookie')
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider cookies={cookies}>
          {/* <ZeyoNavbar /> */}
          {children}
        </ContextProvider>
        
        {/* Footer can be added here if needed */}
      </body>
      
    </html>
  )
}
