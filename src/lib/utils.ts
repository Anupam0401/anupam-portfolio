import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function calculateDuration(startDate: string, endDate?: string): string {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : new Date()
  
  const years = end.getFullYear() - start.getFullYear()
  const months = end.getMonth() - start.getMonth()
  
  let totalMonths = years * 12 + months
  
  if (totalMonths < 1) {
    return '1 month'
  } else if (totalMonths < 12) {
    return `${totalMonths} months`
  } else {
    const yearsPart = Math.floor(totalMonths / 12)
    const monthsPart = totalMonths % 12
    
    if (monthsPart === 0) {
      return `${yearsPart} year${yearsPart > 1 ? 's' : ''}`
    } else {
      return `${yearsPart} year${yearsPart > 1 ? 's' : ''} ${monthsPart} month${monthsPart > 1 ? 's' : ''}`
    }
  }
}
