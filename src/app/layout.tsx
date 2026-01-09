import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SmartPark – AI Parking for Hinjewadi',
  description: 'Find, reserve, and manage parking with AI assistance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-bg-dark text-text-primary">
        {children}
      </body>
    </html>
  )
}
