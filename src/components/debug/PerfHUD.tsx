'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'

function usePerf(show: boolean) {
  const [lcp, setLcp] = useState<number | null>(null)
  const [cls, setCls] = useState(0)
  const [inp, setInp] = useState<number | null>(null)
  const [fps, setFps] = useState(0)

  useEffect(() => {
    if (!show || typeof window === 'undefined' || !('PerformanceObserver' in window)) return

    let clsValue = 0
    let rafId: number | null = null
    let last = performance.now()
    let frames = 0

    // FPS approx
    const loop = (t: number) => {
      frames++
      if (t - last >= 1000) {
        setFps(frames)
        frames = 0
        last = t
      }
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    // LCP
    try {
      const poLcp = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as any
        if (lastEntry && lastEntry.startTime) setLcp(Number(lastEntry.startTime))
      })
      poLcp.observe({ type: 'largest-contentful-paint', buffered: true } as any)
    } catch {}

    // CLS
    try {
      const poCls = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value || 0
            setCls(Number(clsValue.toFixed(3)))
          }
        }
      })
      poCls.observe({ type: 'layout-shift', buffered: true } as any)
    } catch {}

    // INP approx using EventTiming (not exact spec)
    try {
      const poInp = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any) {
          if (entry.duration != null) {
            const d = Number(entry.duration)
            // keep the max as a rough proxy
            setInp((prev) => (prev == null ? d : Math.max(prev, d)))
          }
        }
      })
      // use a modest threshold to avoid tiny events
      ;(poInp as any).observe({ type: 'event', buffered: true, durationThreshold: 16 })
    } catch {}

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [show])

  return { lcp, cls, inp, fps }
}

function useGlowAudit(enabled: boolean) {
  const [glowCount, setGlowCount] = useState(0)
  const [strongCount, setStrongCount] = useState(0)
  const styleInjected = useRef(false)

  useEffect(() => {
    if (!enabled || typeof document === 'undefined') return

    // Inject highlight style once
    if (!styleInjected.current) {
      const style = document.createElement('style')
      style.setAttribute('data-glowdebug-style', '1')
      style.textContent = `
        [data-glowdebug] { outline: 1px dashed #60a5fa; outline-offset: 2px; }
        [data-glowdebug-strong] { outline: 1px dashed #f59e0b; outline-offset: 3px; }
      `
      document.head.appendChild(style)
      styleInjected.current = true
    }

    const scan = () => {
      const nodes = Array.from(document.querySelectorAll('.card-radiant')) as HTMLElement[]
      const strongNodes = Array.from(document.querySelectorAll('.card-radiant-strong')) as HTMLElement[]
      setGlowCount(nodes.length)
      setStrongCount(strongNodes.length)
      nodes.forEach((el) => el.setAttribute('data-glowdebug', ''))
      strongNodes.forEach((el) => el.setAttribute('data-glowdebug-strong', ''))
    }

    scan()
    const id = window.setInterval(scan, 2000)
    return () => window.clearInterval(id)
  }, [enabled])

  return { glowCount, strongCount }
}

const Box: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      position: 'fixed',
      right: 12,
      bottom: 12,
      zIndex: 2147483647,
      background: 'rgba(17,24,39,0.9)',
      color: '#fff',
      padding: '10px 12px',
      borderRadius: 8,
      fontSize: 12,
      boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
      pointerEvents: 'none',
    }}
  >
    {children}
  </div>
)

const PerfHUD: React.FC = () => {
  const params = useSearchParams()
  const showPerf = params.get('perf') === '1'
  const showGlow = params.get('glowdebug') === '1'

  const { lcp, cls, inp, fps } = usePerf(showPerf)
  const { glowCount, strongCount } = useGlowAudit(showGlow)

  if (!showPerf && !showGlow) return null

  return (
    <Box>
      {showPerf && (
        <div style={{ marginBottom: showGlow ? 8 : 0 }}>
          <div><strong>Perf</strong></div>
          <div>FPS: {fps}</div>
          <div>LCP: {lcp ? `${Math.round(lcp)} ms` : '—'}</div>
          <div>CLS: {cls}</div>
          <div>INP (approx): {inp ? `${Math.round(inp)} ms` : '—'}</div>
        </div>
      )}
      {showGlow && (
        <div>
          <div><strong>GlowAudit</strong></div>
          <div>.card-radiant: {glowCount}</div>
          <div>.card-radiant-strong: {strongCount}</div>
        </div>
      )}
    </Box>
  )
}

export default PerfHUD
