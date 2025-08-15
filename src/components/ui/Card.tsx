'use client'

import React from 'react'
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
    // Let CSS variables drive theming to avoid per-card observers
    const wantsGradient = gradient || (typeof className === 'string' && className.includes('gradient-card'))
    const backgroundStyle = wantsGradient ? {} : { backgroundColor: 'var(--card-bg)' }
    const borderColor = wantsGradient ? 'transparent' : 'var(--border-color)'
    
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

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement> & { children: React.ReactNode }>(
  ({ className, children, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props}>
      {children}
    </h3>
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
