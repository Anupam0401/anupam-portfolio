'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, StarIcon, PlayIcon, EyeIcon } from '@heroicons/react/24/outline'
import MaterialIcon from '@/components/ui/MaterialIcon'

export type Interest = {
  id: string
  name: string
  level: string
  why: string
  activities: string[]
  gallery: { type: string; title: string; year: string }[]
}

export default function InterestDetailsModal({
  open,
  onClose,
  interest,
  category,
}: {
  open: boolean
  onClose: () => void
  interest: Interest | null
  category: string | null
}) {
  // Close on ESC and lock background scroll while open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  const getIconName = (curInterest: Interest | null, curCategory: string | null) => {
    if (!curCategory) return 'star'
    if (curCategory === 'sports') return 'sports_tennis'
    if (curCategory === 'arts') return curInterest?.id === 'painting' ? 'brush' : 'draw'
    if (curCategory === 'writing') {
      switch (curInterest?.id) {
        case 'novels':
          return 'menu_book'
        case 'short-stories':
          return 'book'
        case 'poetry':
          return 'auto_awesome'
        case 'calligraphy':
          return 'ink_pen'
        default:
          return 'edit'
      }
    }
    return 'star'
  }

  const getHeaderGradient = () => {
    if (!category) return 'from-gray-500 to-slate-500'
    switch (category) {
      case 'sports':
        return 'from-green-600 to-emerald-600'
      case 'arts':
        return 'from-pink-500 to-purple-500'
      case 'writing':
        return 'from-blue-600 to-purple-600'
      default:
        return 'from-gray-500 to-slate-500'
    }
  }

  return (
    <AnimatePresence initial={false} mode="wait">
      {open && interest && (
        <motion.div
          key={interest.id}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-default"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-3xl"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="glass-surface rounded-2xl ring-1 ring-[color:var(--border-color)]/60 bg-[color:var(--card-bg)] shadow-xl overflow-hidden max-h-[80vh] flex flex-col">
              {/* Header */}
              <div className={`px-6 py-5 bg-gradient-to-r ${getHeaderGradient()} text-white flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-xl bg-white/15">
                    <MaterialIcon name={getIconName(interest, category)} className="text-[22px]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold leading-tight">{interest.name}</h3>
                    <p className="text-xs opacity-90">{interest.level}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="h-9 w-9 inline-flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-5 space-y-6 overflow-y-auto">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <StarIcon className="w-4 h-4 mr-1 text-yellow-500" /> Why It Matters to Me
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{interest.why}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <PlayIcon className="w-4 h-4 mr-1 text-green-500" /> All Activities
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {interest.activities.map((a, i) => (
                      <span key={i} className="inline-flex items-center rounded-md bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-2 py-1 text-xs">{a}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <EyeIcon className="w-4 h-4 mr-1 text-blue-500" /> Complete Gallery
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {interest.gallery.map((item, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-900 dark:text-white">{item.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{item.year}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
