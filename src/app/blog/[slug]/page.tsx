'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import MermaidDiagram from '@/components/ui/MermaidDiagram'
import { 
  CalendarIcon, 
  ClockIcon, 
  TagIcon, 
  ArrowLeftIcon,
  ShareIcon,
  BookOpenIcon,
  LinkIcon
} from '@heroicons/react/24/outline'
import Layout from '@/components/layout/Layout'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { blogPosts } from '@/data/blog'
import 'highlight.js/styles/github-dark.css'

const BlogPostPage = () => {
  const params = useParams()
  const slug = params.slug as string
  const [mounted, setMounted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [authorImgOk, setAuthorImgOk] = useState(true)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  // Reading progress bar (rAF-throttled)
  useEffect(() => {
    if (!mounted) return
    let ticking = false
    let rafId = 0
    const update = () => {
      const scrollTop = typeof window !== 'undefined' ? (window.scrollY || document.documentElement.scrollTop) : 0
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const p = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0
      setProgress(p)
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        rafId = requestAnimationFrame(() => {
          update()
          ticking = false
        })
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [mounted])
  
  const post = blogPosts.find(p => p.id === slug)

  const slugify = (str: string) =>
    str.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')

  const headings = useMemo(() => {
    const hs: { id: string; text: string; level: 2 | 3 }[] = []
    const lines = post?.content?.split('\n') || []
    for (const line of lines) {
      const h2 = line.match(/^##\s+(.*)$/)
      if (h2) { const text = h2[1].trim(); hs.push({ id: slugify(text), text, level: 2 }); continue }
      const h3 = line.match(/^###\s+(.*)$/)
      if (h3) { const text = h3[1].trim(); hs.push({ id: slugify(text), text, level: 3 }); continue }
    }
    return hs
  }, [post?.content])

  // Handle post not found in client component
  if (!mounted) {
    return <div>Loading...</div>
  }

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </Layout>
    )
  }

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const shareOnTwitter = () => {
    const text = `Check out this post: ${post.title}`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank')
  }

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank')
  }

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    // You could add a toast notification here
  }

  

  // Simple markdown-to-HTML converter for content (adds ids for headings)
  const formatContent = (content: string) => {
    return content
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-8">$1</h1>')
      .replace(/^## (.*)$/gm, (_m, t) => `<h2 id="${slugify(t)}" class="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-6">${t}</h2>`)
      .replace(/^### (.*)$/gm, (_m, t) => `<h3 id="${slugify(t)}" class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-5">${t}</h3>`)
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code class="language-$1">$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1 rounded font-mono text-sm">$1</code>')
      .replace(/^\- (.*$)/gm, '<li class="mb-2">$1</li>')
      .replace(/(\n<li.*<\/li>\n)/g, '<ul class="list-disc list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300">$1</ul>')
      .replace(/^\d+\. (.*$)/gm, '<li class="mb-2">$1</li>')
      .replace(/(\n<li.*<\/li>\n)/g, '<ol class="list-decimal list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300">$1</ol>')
      .replace(/\n\n/g, '</p><p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">')
      .replace(/^(?!<[h|u|o|p])(.*$)/gm, '<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">$1</p>')
  }

  return (
    <Layout>
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1.5 z-[9999]" aria-hidden>
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
          style={{ width: `${Math.round(progress * 100)}%`, transition: 'width 80ms linear' }}
        />
      </div>
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link href="/blog">
              <Button variant="outline" className="flex items-center">
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <Card className="overflow-hidden shadow-xl">
              <CardContent className="p-8 md:p-12">
                {/* Featured Badge */}
                {post.featured && (
                  <div className="mb-6">
                    <Badge variant="success" className="flex items-center w-fit">
                      <BookOpenIcon className="w-4 h-4 mr-2" />
                      Featured Post
                    </Badge>
                  </div>
                )}

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-2" />
                    <span>
                      {new Date(post.publishedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 mr-2" />
                    <span>{post.readingTime} min read</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map(tag => (
                    <Link key={tag} href={`/blog?tag=${tag}`}>
                      <Badge variant="info" className="cursor-pointer hover:scale-105 transition-transform">
                        <TagIcon className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>

                {/* Excerpt */}
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-blue-500">
                  {post.excerpt}
                </p>

                {/* Share Buttons */}
                <div className="flex items-center gap-4 mb-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">Share:</span>
                  <Button
                    onClick={shareOnTwitter}
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                  >
                    <ShareIcon className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                  <Button
                    onClick={shareOnLinkedIn}
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                  >
                    <ShareIcon className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button
                    onClick={copyLink}
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                  >
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.article>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-8 md:p-12">
                {headings.length > 0 && (
                  <div className="mb-6 hidden md:flex flex-wrap gap-2">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-2">On this page:</span>
                    {headings.map((h) => (
                      <a key={h.id} href={`#${h.id}`} className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        {h.text}
                      </a>
                    ))}
                  </div>
                )}
                <div className="prose prose-lg max-w-none dark:prose-invert 
                  prose-headings:font-bold prose-headings:tracking-tight
                  prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12
                  prose-h2:text-3xl prose-h2:mb-5 prose-h2:mt-12 prose-h2:border-b prose-h2:border-gray-200 prose-h2:dark:border-gray-700 prose-h2:pb-3
                  prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-gray-900 prose-h3:dark:text-gray-100
                  prose-h4:text-lg prose-h4:mb-3 prose-h4:mt-6 prose-h4:text-gray-800 prose-h4:dark:text-gray-200 prose-h4:font-semibold
                  prose-p:text-gray-700 prose-p:dark:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                  prose-li:text-gray-700 prose-li:dark:text-gray-300 prose-li:my-2
                  prose-ul:my-6 prose-ol:my-6
                  prose-strong:text-gray-900 prose-strong:dark:text-gray-100 prose-strong:font-semibold
                  prose-code:text-sm prose-code:font-mono
                  prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:my-6 prose-pre:overflow-x-auto
                  prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-6
                  prose-table:my-6
                  prose-img:rounded-lg prose-img:my-6
                  prose-hr:my-8 prose-hr:border-gray-300 prose-hr:dark:border-gray-700
                  ">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeHighlight]}
                    components={{
                      h2: ({ node, ...props }) => {
                        const text = props.children?.toString() || ''
                        const id = slugify(text)
                        return <h2 id={id} className="scroll-mt-20 group" {...props}>
                          <span>{props.children}</span>
                        </h2>
                      },
                      h3: ({ node, ...props }) => {
                        const text = props.children?.toString() || ''
                        const id = slugify(text)
                        return <h3 id={id} className="scroll-mt-20 group" {...props}>
                          <span>{props.children}</span>
                        </h3>
                      },
                      h4: ({ node, ...props }) => {
                        const text = props.children?.toString() || ''
                        const id = slugify(text)
                        return <h4 id={id} className="scroll-mt-20" {...props}>
                          <span>{props.children}</span>
                        </h4>
                      },
                      p: ({ node, ...props }) => {
                        return <p className="text-base leading-7" {...props} />
                      },
                      ul: ({ node, ...props }) => {
                        return <ul className="list-disc pl-6 space-y-2" {...props} />
                      },
                      ol: ({ node, ...props }) => {
                        return <ol className="list-decimal pl-6 space-y-2" {...props} />
                      },
                      table: ({ node, ...props }) => {
                        return (
                          <div className="overflow-x-auto my-6">
                            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700" {...props} />
                          </div>
                        )
                      },
                      thead: ({ node, ...props }) => {
                        return <thead className="bg-gray-50 dark:bg-gray-800" {...props} />
                      },
                      tbody: ({ node, ...props }) => {
                        return <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900" {...props} />
                      },
                      th: ({ node, ...props }) => {
                        return <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider" {...props} />
                      },
                      td: ({ node, ...props }) => {
                        return <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300" {...props} />
                      },
                      code: ({ node, className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || '')
                        const language = match ? match[1] : ''
                        const isInline = !className
                        
                        if (isInline) {
                          return <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>{children}</code>
                        }
                        
                        // Handle mermaid blocks with full rendering
                        if (language === 'mermaid') {
                          const chartCode = String(children).replace(/\n$/, '')
                          return <MermaidDiagram chart={chartCode} />
                        }
                        
                        return (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        )
                      },
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Author Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden ring-1 ring-[color:var(--border-color)]/60 shadow-md flex-shrink-0">
                    {authorImgOk ? (
                      <Image
                        src="/images/anupam.png"
                        alt="Anupam Kumar"
                        fill
                        placeholder="empty"
                        quality={95}
                        sizes="64px"
                        className="object-cover"
                        onError={() => setAuthorImgOk(false)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-xl">
                        AK
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Anupam Kumar
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Backend Developer passionate about system design, microservices architecture, and creative writing. 
                      Currently building scalable systems at Navi Technologies while exploring the intersection of technology and creativity.
                    </p>
                    <div className="flex space-x-4">
                      <Link href="/about">
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                      </Link>
                      <Link href="/contact">
                        <Button variant="primary" size="sm">
                          Get in Touch
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Related Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 transition-colors">
                        <Link href={`/blog/${relatedPost.id}`}>
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {relatedPost.excerpt.substring(0, 100)}...
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>
                          {new Date(relatedPost.publishedDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <span>{relatedPost.readingTime} min read</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white">
              <h2 className="text-2xl font-bold mb-4">
                Enjoyed this post?
              </h2>
              <p className="text-lg text-blue-100 mb-6">
                Subscribe to get notified when I publish new content about backend development and system design.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 bg-white/90 focus:bg-white focus:ring-2 focus:ring-blue-300 focus:outline-none"
                />
                <Button
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Subscribe
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default BlogPostPage
