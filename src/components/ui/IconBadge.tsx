"use client"

import React from "react"
import { cn } from "@/lib/utils"

export type IconBadgeProps = {
  children: React.ReactNode
  className?: string
  gradientClass?: string // e.g., "bg-gradient-to-r from-blue-600 to-purple-600"
  size?: "sm" | "md" | "lg"
}

export function IconBadge({ children, className, gradientClass = "bg-gradient-to-r from-blue-600 to-purple-600", size = "md" }: IconBadgeProps) {
  const sizeClasses = size === "sm" ? "p-2 rounded-lg" : size === "lg" ? "p-4 rounded-2xl" : "p-3 rounded-xl"
  return (
    <div className={cn("inline-flex items-center justify-center text-white shadow-lg", sizeClasses, gradientClass, className)}>
      {children}
    </div>
  )
}

export default IconBadge
