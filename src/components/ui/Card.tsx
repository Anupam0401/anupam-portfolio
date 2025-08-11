'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { motion, HTMLMotionProps } from 'framer-motion'

interface CardProps extends Omit<HTMLMotionProps<"div">, 'style'> {
  children: React.ReactNode
  hoverable?: boolean
  gradient?: boolean
  style?: React.CSSProperties
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hoverable = false, gradient = false, style = {}, ...props }, ref) => {
    const [isDark, setIsDark] = useState(false)
    
    useEffect(() => {
      // Check if dark mode is active
      const checkDarkMode = () => {
        setIsDark(document.documentElement.classList.contains('dark'))
      }
      
      checkDarkMode()
      
      // Watch for theme changes
      const observer = new MutationObserver(checkDarkMode)
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      })
      
      return () => observer.disconnect()
    }, [])
    
    // Use inline styles for backgrounds to ensure dark mode works
    const backgroundStyle = isDark 
      ? { backgroundColor: '#111827' } // gray-900
      : { backgroundColor: '#ffffff' } // white
    
    const borderColor = isDark ? '#1f2937' : '#e5e7eb' // gray-800 : gray-200
    
    const baseStyles = `rounded-xl border shadow-sm`
    const hoverStyles = hoverable ? 'hover:shadow-lg transition-all duration-300 cursor-pointer' : ''
    const gradientStyles = gradient ? 'bg-gradient-to-br from-white to-gray-50' : ''

    return (
      <motion.div
        ref={ref}
        className={cn(baseStyles, hoverStyles, gradientStyles, className)}
        style={{
          ...backgroundStyle,
          borderColor,
          ...style
        }}
        whileHover={hoverable ? { y: -4, scale: 1.02 } : {}}
        transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props} />
  )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-gray-500 dark:text-gray-400', className)} {...props} />
  )
)
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
