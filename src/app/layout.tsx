import type { Metadata } from 'next'
import './globals.css'
import { NotificationContainer } from '@/components'

export const metadata: Metadata = {
  title: 'SmartPark – AI Parking for Hinjewadi',
  description: 'Enterprise-quality parking management platform for Hinjewadi Phase 1. Real-time slot discovery, instant reservations, and professional incident management.',
  keywords: ['parking', 'hinjewadi', 'pune', 'parking management', 'AI parking'],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#FF6B2C',
  openGraph: {
    title: 'SmartPark – AI Parking for Hinjewadi',
    description: 'Enterprise-quality parking management for Hinjewadi Phase 1',
    url: 'https://smartpark.in',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="dark" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="bg-background text-text-primary antialiased font-sans">
        {/* Main Application Container */}
        <div className="flex flex-col min-h-screen">
          {children}
        </div>

        {/* Global Notification Container */}
        <NotificationContainer />

        {/* Toast/Notification Portal */}
        <div id="notification-portal" />
      </body>
    </html>
  )
}
