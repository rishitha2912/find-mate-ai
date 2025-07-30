import type { Metadata } from 'next'
import React from 'react'
import './globals.css'
import { ToastProvider } from '../components/ui/ToastContainer'

export const metadata: Metadata = {
  title: 'FindMate - AI-Powered Lost & Found Assistant',
  description: 'AI-powered platform to help you find lost items and connect with people who found them',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
} 