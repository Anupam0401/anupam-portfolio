'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

interface Props {
  children: React.ReactNode
}

export default function AppBackground({ children }: Props) {
  const pathname = usePathname()
  const useAmbient = pathname === '/'

  return (
    <div className={`min-h-screen ${useAmbient ? 'app-background' : ''} transition-colors duration-300`}>
      {children}
    </div>
  )
}
