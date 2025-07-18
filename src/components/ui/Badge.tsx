import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center rounded-full font-medium transition-all duration-200'
    
    const variants = {
      default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
      secondary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      info: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
    }
    
    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-1.5 text-base'
    }

    return (
      <motion.div
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }
