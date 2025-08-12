'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  CalendarIcon, 
  ClockIcon, 
  TagIcon, 
  ArrowLeftIcon,
  ShareIcon,
  BookOpenIcon,
  UserIcon,
  LinkIcon
} from '@heroicons/react/24/outline'
import Layout from '@/components/layout/Layout'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { blogPosts } from '@/data/blog'

const BlogPostPage = () => {
  const params = useParams()
  const slug = params.slug as string
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const post = blogPosts.find(p => p.id === slug)
  
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

  // Simple markdown-to-HTML converter for content
  const formatContent = (content: string) => {
    return content
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-8">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-6">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-5">$1</h3>')
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
                    <UserIcon className="w-5 h-5 mr-2" />
                    <span className="font-medium">Anupam Kumar</span>
                  </div>
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
                <div 
                  className="prose prose-lg max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
                />
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
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    AK
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
                  <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
