import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationStart' | 'onAnimationEnd'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'contrast' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const baseStyles = 'btn inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: [
        'btn-primary',
        'text-white',
        'bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)]',
        'shadow-lg hover:shadow-xl',
        'ring-1 ring-[color:var(--accent-primary)]/20 hover:ring-[color:var(--accent-hover)]/40',
        'focus-visible:ring-[color:var(--accent-hover)]/50',
      ].join(' '),
      secondary: [
        'btn-secondary',
        'text-white',
        'bg-gray-900 hover:bg-gray-800',
        'shadow-lg hover:shadow-xl',
        'ring-1 ring-black/10',
      ].join(' '),
      outline: [
        'btn-outline',
        'border border-gray-300 text-gray-700 hover:bg-gray-50',
        'focus-visible:ring-gray-400',
        'dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
      ].join(' '),
      contrast: [
        'btn-contrast',
        'border border-white/80 text-white',
        'backdrop-blur-sm',
        'hover:bg-white/95 hover:text-[color:var(--accent-primary)]',
        'focus-visible:ring-white/40',
        'dark:hover:bg-white/90 dark:hover:text-[color:var(--accent-primary)]',
      ].join(' '),
      ghost: 'btn-ghost text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800'
    }
    
    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-6 text-base',
      lg: 'h-12 px-8 text-base'
    }

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ y: 0, scale: 0.99 }}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <motion.div
            className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ) : null}
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
