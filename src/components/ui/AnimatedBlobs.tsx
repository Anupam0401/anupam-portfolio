"use client"

import React, { useEffect, useState } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"

type BlobConfig = {
  colorVar: string
  size: number
  initial: { x: number; y: number }
  animateTo: { x: number; y: number }
  duration: number
  delay?: number
  className?: string
  stop?: number // radial gradient transparent stop percentage (e.g., 48 for stronger presence)
  blur?: number // optional per-blob blur radius in px
}

type AnimatedBlobsProps = {
  variant?: 'home' | 'global'
}

export default function AnimatedBlobs({ variant = 'home' }: AnimatedBlobsProps) {
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 480])
  const parallaxX = useTransform(scrollYProgress, [0, 1], [0, -200])

  // Tuned for light/dark via CSS vars in globals.css
  // Home: richer, Global: lighter + fewer blobs
  const homeBlobs: BlobConfig[] = [
    // Top-left
    {
      colorVar: "var(--blob-pink)",
      size: 540,
      initial: { x: -460, y: -380 },
      animateTo: { x: -200, y: -220 },
      duration: 18,
      delay: 0,
      className: "hidden sm:block",
      stop: 44,
    },
    // Top-right (always visible)
    {
      colorVar: "var(--blob-amber)",
      size: 500,
      initial: { x: 380, y: -320 },
      animateTo: { x: 200, y: -160 },
      duration: 19,
      delay: 0.15,
      className: "hidden sm:block",
      stop: 44,
    },
    // Top-center
    {
      colorVar: "var(--blob-indigo)",
      size: 480,
      initial: { x: 0, y: -360 },
      animateTo: { x: -40, y: -200 },
      duration: 22,
      delay: 0.25,
      className: "hidden sm:block",
      stop: 42,
    },
    // Top-wide halo (md+)
    {
      colorVar: "var(--blob-indigo)",
      size: 640,
      initial: { x: 0, y: -420 },
      animateTo: { x: -60, y: -340 },
      duration: 32,
      delay: 0.1,
      className: "hidden md:block",
      stop: 56,
    },
    // Top-near (small accent near nav)
    {
      colorVar: "var(--blob-pink)",
      size: 260,
      initial: { x: 100, y: -160 },
      animateTo: { x: 0, y: -100 },
      duration: 20,
      delay: 0.2,
      className: "hidden sm:block",
      stop: 46,
    },
    // Hero-center accent (directly above name, subtle and closer)
    {
      colorVar: "var(--blob-indigo)",
      size: 230,
      initial: { x: 10, y: -150 },
      animateTo: { x: -10, y: -100 },
      duration: 19,
      delay: 0.16,
      className: "block",
      stop: 44,
      blur: 24,
    },
    // Hero-top-left accent (just above the name, farther left and slightly lower)
    {
      colorVar: "var(--blob-indigo)",
      size: 220,
      initial: { x: -280, y: -120 },
      animateTo: { x: -240, y: -80 },
      duration: 21,
      delay: 0.14,
      className: "hidden sm:block",
      stop: 48,
      blur: 24,
    },
    // Hero-top-right accent (just above the name, farther right and slightly lower)
    {
      colorVar: "var(--blob-pink)",
      size: 200,
      initial: { x: 280, y: -120 },
      animateTo: { x: 240, y: -80 },
      duration: 20,
      delay: 0.26,
      className: "hidden sm:block",
      stop: 48,
      blur: 24,
    },
    // Mid-left
    {
      colorVar: "var(--blob-cyan)",
      size: 260,
      initial: { x: -360, y: 40 },
      animateTo: { x: -220, y: -10 },
      duration: 24,
      delay: 0.35,
      className: "hidden sm:block",
    },
    // Mid-right
    {
      colorVar: "var(--blob-emerald)",
      size: 320,
      initial: { x: 360, y: 80 },
      animateTo: { x: 260, y: 160 },
      duration: 23,
      delay: 0.3,
      className: "hidden md:block",
    },
    // Bottom-left (shift further out, soften stop)
    {
      colorVar: "var(--blob-indigo)",
      size: 360,
      initial: { x: -380, y: 300 },
      animateTo: { x: -220, y: 360 },
      duration: 25,
      delay: 0.4,
      className: "hidden md:block",
      stop: 56,
    },
    // Bottom-center (shift right, soften stop)
    {
      colorVar: "var(--blob-amber)",
      size: 320,
      initial: { x: 220, y: 300 },
      animateTo: { x: 300, y: 260 },
      duration: 26,
      delay: 0.45,
      className: "hidden sm:block",
      stop: 56,
    },
    // Bottom-right (slightly higher, soften stop)
    {
      colorVar: "var(--blob-emerald)",
      size: 360,
      initial: { x: 360, y: 240 },
      animateTo: { x: 320, y: 180 },
      duration: 27,
      delay: 0.5,
      className: "hidden lg:block",
      stop: 56,
    },
    // Footer underlay (left)
    {
      colorVar: "var(--blob-amber)",
      size: 420,
      initial: { x: -320, y: 500 },
      animateTo: { x: -220, y: 440 },
      duration: 29,
      delay: 0.5,
      className: "hidden sm:block",
    },
    // Footer underlay (right)
    {
      colorVar: "var(--blob-indigo)",
      size: 480,
      initial: { x: 300, y: 520 },
      animateTo: { x: 220, y: 460 },
      duration: 30,
      delay: 0.55,
      className: "hidden sm:block",
    },
  ]

  const globalBlobs: BlobConfig[] = [
    // Distribute around the viewport edges with fewer elements
    { colorVar: 'var(--blob-indigo)', size: 380, initial: { x: -520, y: -360 }, animateTo: { x: -360, y: -220 }, duration: 26, delay: 0.1, className: 'hidden md:block', stop: 52 },
    { colorVar: 'var(--blob-pink)', size: 300, initial: { x: 420, y: -320 }, animateTo: { x: 300, y: -200 }, duration: 24, delay: 0.2, className: 'hidden sm:block', stop: 50 },
    { colorVar: 'var(--blob-emerald)', size: 320, initial: { x: -440, y: 220 }, animateTo: { x: -300, y: 300 }, duration: 27, delay: 0.35, className: 'hidden md:block', stop: 54 },
    { colorVar: 'var(--blob-amber)', size: 280, initial: { x: 420, y: 280 }, animateTo: { x: 300, y: 360 }, duration: 28, delay: 0.4, className: 'hidden sm:block', stop: 54 },
    { colorVar: 'var(--blob-cyan)', size: 260, initial: { x: 0, y: 480 }, animateTo: { x: -80, y: 420 }, duration: 26, delay: 0.3, className: 'hidden sm:block', stop: 52 },
    { colorVar: 'var(--blob-indigo)', size: 220, initial: { x: 40, y: -160 }, animateTo: { x: -60, y: -120 }, duration: 22, delay: 0.25, className: 'block', stop: 46, blur: 22 },
  ]

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const blobs: BlobConfig[] = variant === 'home' ? homeBlobs : globalBlobs

  if (!mounted) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Center reference with scroll parallax */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ y: prefersReduced ? 0 : parallaxY, x: prefersReduced ? 0 : parallaxX }}
      >
        {blobs.map((b: BlobConfig, i: number) => {
          const baseStyle: React.CSSProperties = {
            background: `radial-gradient(closest-side, ${b.colorVar} 0%, transparent ${b.stop ?? 52}%)`,
            width: b.size,
            height: b.size,
            borderRadius: 9999,
            filter: `blur(${b.blur ?? 28}px)`,
            willChange: "transform, filter",
          }

          return (
            <motion.span
              key={i}
              className={["blob absolute", b.className].filter(Boolean).join(" ")}
              style={baseStyle}
              initial={{ x: b.initial.x, y: b.initial.y, opacity: 1 }}
              animate={
                prefersReduced
                  ? { x: b.initial.x, y: b.initial.y, opacity: 1 }
                  : {
                      x: [b.initial.x, b.animateTo.x, b.initial.x + 60, b.initial.x - 30, b.initial.x],
                      y: [b.initial.y, b.animateTo.y, b.initial.y - 60, b.initial.y + 30, b.initial.y],
                      scale: [1, 1.12, 1.04, 1],
                      opacity: 1,
                    }
              }
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : { duration: b.duration, delay: b.delay, repeat: Infinity, ease: "easeInOut" }
              }
            />
          )
        })}
      </motion.div>
    </div>
  )
}
