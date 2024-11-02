import type { Metadata } from 'next'
import './globals.css'
import React from 'react'
import Providers from '@/app/providers'
import { rubik } from '@/app/fonts'
import Navbar from '@/app/components/navbar'

export const metadata: Metadata = {
  title: 'Krfx Web',
  description: 'Web interface for krfx.ru',
}

// const

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
