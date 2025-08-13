'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDownIcon, DocumentArrowDownIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { personalInfo } from '@/data/portfolio'

// Deterministic particle positions to prevent hydration mismatch
const PARTICLE_POSITIONS = [
  { left: 15.5, top: 20.3 },
  { left: 85.2, top: 75.8 },
  { left: 25.7, top: 85.1 },
  { left: 75.3, top: 35.9 },
  { left: 45.8, top: 15.4 },
  { left: 65.1, top: 95.2 }
]

const HeroSection = () => {
  const [mounted, setMounted] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const skills = ['Java', 'Kotlin', 'Spring Boot', 'Microservices', 'System Design', 'PostgreSQL']

  // Handle scroll-based visibility for scroll indicator
  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      
      // Hide scroll indicator when user scrolls past 10% of viewport height
      setShowScrollIndicator(scrollY < viewportHeight * 0.1)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = personalInfo.resume || '#'
    link.download = 'anupam-kumar-resume.pdf'
    link.click()
  }

  const handleContact = () => {
    window.location.href = 'mailto:anupamkumar0401@gmail.com'
  }

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(71,85,105,0.15)_1px,transparent_0)] [background-size:24px_24px]"></div>
      </div>
      
      {/* Floating Elements - Only render on client to prevent hydration mismatch */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          {PARTICLE_POSITIONS.map((position, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
              style={{
                left: `${position.left}%`,
                top: `${position.top}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Greeting */}
          <motion.p
            className="text-blue-600 dark:text-blue-400 text-xl md:text-2xl font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span
              className="inline-block"
              style={{ fontFamily: 'var(--font-caveat-script)' }}
            >
              Hello, I'm
            </span>
          </motion.p>

          {/* Hero local top accent blob for clear presence above name */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 -top-10 z-0 w-[18rem] h-[18rem] md:w-[22rem] md:h-[22rem] pointer-events-none"
            style={{
              background: 'radial-gradient(closest-side, var(--blob-indigo) 0%, transparent 50%)',
              filter: 'blur(24px)',
            }}
            initial={{ opacity: 0.0, y: -8 }}
            animate={{ opacity: 1, y: [-6, 0, -6] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />

          {/* Name */}
          <motion.h1
            className="relative z-10 text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Anupam Kumar
            </span>
          </motion.h1>

          {/* Sub-title under name for natural reading order */}
          <motion.p
            className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            {personalInfo.title}
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            I craft <span className="font-medium text-gray-800 dark:text-gray-200">scalable backend systems</span> and elegant solutions with a passion for <span className="font-medium text-gray-800 dark:text-gray-200">clean code</span>, 
            system design, and performance optimization. Currently building fintech applications that serve millions of users at{' '}
            <span className="text-blue-600 dark:text-blue-400 font-semibold">Navi Technologies</span>.
          </motion.p>

          {/* Skills */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
              >
                <Badge variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <Button
              onClick={handleDownloadResume}
              className="flex items-center gap-2 text-lg px-8 py-4"
              size="lg"
            >
              <DocumentArrowDownIcon className="w-5 h-5" />
              Download Resume
            </Button>
            <Button
              onClick={handleContact}
              variant="contrast"
              className="flex items-center gap-2 text-lg px-8 py-4"
              size="lg"
            >
              <EnvelopeIcon className="w-5 h-5" />
              Get In Touch
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center space-x-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </motion.a>
            <motion.a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </motion.a>
            <motion.a
              href={`mailto:${personalInfo.email}`}
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator - Compact FAB at bottom-right to avoid content overlap */}
        <motion.div
          className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showScrollIndicator ? 1 : 0, y: showScrollIndicator ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          style={{ pointerEvents: showScrollIndicator ? 'auto' : 'none' }}
        >
          <motion.button
            onClick={scrollToNext}
            title="Scroll to explore"
            className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-[color:var(--surface-1)]/55 hover:bg-[color:var(--surface-1)]/70 dark:bg-gray-900/60 dark:hover:bg-gray-900/70 backdrop-blur-md ring-1 ring-[color:var(--border-color)]/35 hover:ring-[color:var(--accent-primary)]/25 shadow-sm hover:shadow-md text-gray-600 dark:text-gray-300 transition-colors"
            animate={{ y: showScrollIndicator ? [0, 6, 0] : 0 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            aria-label="Scroll to explore"
          >
            <ChevronDownIcon className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
