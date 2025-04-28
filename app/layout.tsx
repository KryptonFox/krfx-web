import type { Metadata } from 'next'
import './globals.css'
import React from 'react'
import Providers from '@/app/providers'
import { rubik } from '@/app/fonts'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Krfx Web UI',
  description: 'Бесплатно сокращайте ссылки и загружайте файлы весом до 100 МБ',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={rubik.className}>
        <Providers>
          <main className="min-h-screen">
            <Navbar />
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
