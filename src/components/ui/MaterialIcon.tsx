"use client"

import React from "react"
import { cn } from "@/lib/utils"

export type MaterialIconProps = {
  name: string
  className?: string
  title?: string
  fill?: 0 | 1
  weight?: number // 100-700
  grade?: number // -50 to 200
  opticalSize?: number // 24..48
}

export function MaterialIcon({
  name,
  className,
  title,
  fill = 0,
  weight = 500,
  grade = 0,
  opticalSize = 24,
}: MaterialIconProps) {
  return (
    <span
      className={cn("material-symbols-rounded", className)}
      style={{
        fontVariationSettings: `"FILL" ${fill}, "wght" ${weight}, "GRAD" ${grade}, "opsz" ${opticalSize}`,
      }}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      aria-label={title}
    >
      {name}
    </span>
  )
}

export default MaterialIcon
