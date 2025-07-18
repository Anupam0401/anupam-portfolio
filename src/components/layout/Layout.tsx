'use client'

import React from 'react'
import { ThemeProvider } from 'next-themes'
import Navigation from './Navigation'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navigation />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default Layout
