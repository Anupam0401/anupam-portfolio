'use client'

import React from 'react'
import { ThemeProvider } from 'next-themes'
import Navigation from './Navigation'
import Footer from './Footer'
import AnimatedBlobs from '@/components/ui/AnimatedBlobs'
import BackToTop from '@/components/ui/BackToTop'
import { usePathname } from 'next/navigation'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname()
  const isHome = pathname === '/'
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="relative min-h-screen app-background transition-colors duration-300">
        <AnimatedBlobs variant={isHome ? 'home' : 'global'} />
        <Navigation />
        <main className="relative z-10 pt-16">
          {children}
        </main>
        <BackToTop />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default Layout
