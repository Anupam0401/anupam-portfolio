import React from "react"
import { cn } from "@/lib/utils"

export type LogoProps = {
  className?: string
  title?: string
}

/**
 * AK Monogram Logo (clean, container-less)
 * - Minimal strokes using currentColor for automatic theming
 * - No container/border to reduce visual clutter
 */
export default function Logo({ className, title = "AK" }: LogoProps) {
  return (
    <svg
      className={cn(className)}
      viewBox="0 0 24 24"
      role={title ? "img" : "presentation"}
      aria-label={title}
      focusable="false"
    >
      {/* AK strokes */}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* A */}
        <path d="M5.8 17 L10.6 7 L13.8 17" />
        <path d="M8.4 13 H12.0" />
        {/* K */}
        <path d="M16.8 7 V17" />
        <path d="M16.9 12 L20.2 7" />
        <path d="M16.9 12 L20.2 17" />
      </g>
    </svg>
  )
}
