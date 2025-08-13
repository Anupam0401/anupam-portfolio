"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { getBrandIcon } from "@/lib/brand-icons"

export type BrandIconProps = {
  name: string
  className?: string
  title?: string
  useBrandColor?: boolean
}

export function BrandIcon({ name, className, title, useBrandColor = false }: BrandIconProps) {
  const icon = getBrandIcon(name)
  if (!icon) return null
  const color = useBrandColor ? `#${icon.hex}` : undefined
  return (
    <svg
      className={cn(className)}
      viewBox="0 0 24 24"
      role={title ? "img" : "presentation"}
      aria-label={title || icon.title}
      focusable="false"
    >
      <path d={icon.path} fill={color || "currentColor"} />
    </svg>
  )
}

export default BrandIcon
