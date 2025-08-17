'use client'

import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpIcon } from '@heroicons/react/24/outline'

function isNearBottom(threshold = 200) {
  if (typeof window === 'undefined') return false
  const scrollY = window.scrollY || window.pageYOffset
  const viewport = window.innerHeight
  const doc = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  )
  return scrollY + viewport >= doc - threshold
}

export default function BackToTop() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => {
      const scrolled = typeof window !== 'undefined' ? (window.scrollY || window.pageYOffset) : 0
      const nearBottom = isNearBottom(220)
      // Show when user has scrolled a meaningful amount OR is near the bottom
      setVisible(scrolled > window.innerHeight * 0.75 || nearBottom)
    }
    const onResize = () => setVisible(isNearBottom(220))
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const scrollToTop = () => {
    if (typeof window === 'undefined') return
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!mounted) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to top"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 h-11 w-11 rounded-full bg-[color:var(--surface-1)]/60 hover:bg-[color:var(--surface-1)]/75 ring-1 ring-[color:var(--border-color)]/45 hover:ring-[color:var(--accent-primary)]/30 backdrop-blur-md shadow-sm hover:shadow-md text-[color:var(--text-secondary)] transition-colors"
        >
          <ArrowUpIcon className="h-5 w-5 mx-auto" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
