'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    // Mark animation as done after first mount
    setHasAnimated(true)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Experience', href: '/experience' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Achievements', href: '/achievements' },
    { name: 'Blog', href: '/blog' },
    { name: 'Interests', href: '/interests' },
    { name: 'Contact', href: '/contact' }
  ]

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-800"
      initial={hasAnimated ? false : { y: -100 }}
      animate={hasAnimated ? false : { y: 0 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              AK
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <motion.div
                    key={item.name}
                    whileHover={!isActive ? { scale: 1.05 } : {}}
                    whileTap={!isActive ? { scale: 0.95 } : {}}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        // Prevent navigation if already on the same page
                        if (isActive) {
                          e.preventDefault()
                        }
                      }}
                      className={cn(
                        "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                        isActive
                          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 cursor-default"
                          : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                      )}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {!mounted ? '🌙' : theme === 'dark' ? '☀️' : '🌙'}
            </motion.button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isOpen ? (
                  <XMarkIcon className="block h-6 w-6" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <motion.div
                    key={item.name}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-3 py-2 rounded-md text-base font-medium transition-all duration-200",
                        isActive
                          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                          : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                      )}
                      onClick={(e) => {
                        if (isActive) {
                          e.preventDefault()
                        }
                        setIsOpen(false)
                      }}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navigation
