'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import mermaid from 'mermaid'

interface MermaidDiagramProps {
  chart: string
}

// Global cache for rendered diagrams
const diagramCache = new Map<string, string>()

// Global mermaid initialization flag
let mermaidInitialized = false

const initializeMermaid = () => {
  if (!mermaidInitialized) {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#3b82f6',
        primaryTextColor: '#fff',
        primaryBorderColor: '#2563eb',
        lineColor: '#60a5fa',
        secondaryColor: '#8b5cf6',
        tertiaryColor: '#06b6d4',
        background: '#1f2937',
        mainBkg: '#374151',
        secondBkg: '#4b5563',
        textColor: '#f3f4f6',
        fontSize: '14px',
      },
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      securityLevel: 'loose',
    })
    mermaidInitialized = true
  }
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasRendered = useRef<boolean>(false)
  
  // Generate stable cache key from chart content
  const cacheKey = useMemo(() => {
    return `mermaid-${chart.substring(0, 50).replace(/\s/g, '')}-${chart.length}`
  }, [chart])
  
  // Check cache immediately on mount
  const cachedSvg = diagramCache.get(cacheKey)
  const [svg, setSvg] = useState<string>(cachedSvg || '')
  const [isLoading, setIsLoading] = useState<boolean>(!cachedSvg)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '200px', // Start loading 200px before visible
        threshold: 0.01,
      }
    )

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [])

  // Render diagram only when visible and not already rendered
  useEffect(() => {
    // Skip if already rendered or not visible yet
    if (hasRendered.current || !isVisible || !chart) return
    
    // Skip if already in cache (should have been loaded on mount)
    if (diagramCache.has(cacheKey)) {
      hasRendered.current = true
      return
    }

    const renderDiagram = async () => {
      try {
        // Double-check cache (race condition protection)
        if (diagramCache.has(cacheKey)) {
          setSvg(diagramCache.get(cacheKey)!)
          setIsLoading(false)
          hasRendered.current = true
          return
        }

        // Initialize mermaid once globally
        initializeMermaid()

        // Render with unique ID
        const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        const { svg: renderedSvg } = await mermaid.render(id, chart)
        
        // Cache the result
        diagramCache.set(cacheKey, renderedSvg)
        
        setSvg(renderedSvg)
        setError('')
        setIsLoading(false)
        hasRendered.current = true
      } catch (err) {
        console.error('Mermaid rendering error:', err)
        setError('Failed to render diagram')
        setIsLoading(false)
        hasRendered.current = true
      }
    }

    renderDiagram()
  }, [isVisible, chart, cacheKey])

  if (error) {
    return (
      <div className="my-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium">{error}</span>
        </div>
      </div>
    )
  }

  // If we have SVG (from cache or rendered), show it immediately
  if (svg) {
    return (
      <div 
        ref={containerRef}
        className="my-8"
      >
        <div 
          className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>
    )
  }

  // Show loading state only if we're actually loading (no cache, visible, rendering)
  return (
    <div 
      ref={containerRef}
      className="my-8 relative"
      style={{ minHeight: '300px' }}
    >
      {isLoading && isVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-gray-500 dark:text-gray-400">Rendering diagram...</span>
          </div>
        </div>
      )}
      {/* Placeholder for lazy loading (before visible) */}
      {!isVisible && (
        <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700" />
      )}
    </div>
  )
}

export default MermaidDiagram
