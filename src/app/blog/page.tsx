'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  CalendarIcon, 
  ClockIcon, 
  TagIcon, 
  StarIcon,
  BookOpenIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'
import Layout from '@/components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import NewsletterSignup from '@/components/ui/NewsletterSignup'
import { blogPosts, blogTags } from '@/data/blog'

const BlogPage = () => {
  const [selectedTag, setSelectedTag] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPosts = blogPosts.filter(post => {
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag)
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesTag && matchesSearch
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  }

  const BlogCard = ({ post, featured = false }: { post: typeof blogPosts[0], featured?: boolean }) => {
    return (
    <motion.div
      variants={itemVariants}
      className={`${featured ? 'md:col-span-2' : ''} h-full`}
      whileHover={{ y: -5 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
    >
      <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="relative">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
                  <BookOpenIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                {post.featured && (
                  <Badge variant="success" size="sm" className="flex items-center">
                    <StarIcon className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              <CardTitle className={`${featured ? 'text-2xl' : 'text-xl'} font-semibold tracking-tight text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors`}>
                <Link href={`/blog/${post.id}`}>
                  {post.title}
                </Link>
              </CardTitle>
              <p className={`text-gray-600 dark:text-gray-400 ${featured ? 'text-base' : 'text-sm'} leading-relaxed mb-4`}>
                {post.excerpt}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-0">
          {/* Tags */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, featured ? 6 : 4).map((tag: string) => (
                <Badge 
                  key={tag} 
                  variant="info" 
                  size="sm"
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
              {post.tags.length > (featured ? 6 : 4) && (
                <Badge variant="secondary" size="sm">
                  +{post.tags.length - (featured ? 6 : 4)} more
                </Badge>
              )}
            </div>
          </div>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-1" />
                <span>
                  {new Date(post.publishedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="w-4 h-4 mr-1" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </div>

          {/* Read More Button */}
          <Button
            onClick={() => window.location.href = `/blog/${post.id}`}
            variant="outline"
            className="w-full"
          >
            Read More →
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )}

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">
              Blog & Writing
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Thoughts on backend development, system design, and the intersection of technology with creativity. 
              From technical deep-dives to personal reflections on the developer journey.
            </p>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="relative flex-1">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              
              {/* Clear Filters */}
              {(selectedTag !== 'all' || searchTerm) && (
                <Button
                  onClick={() => {
                    setSelectedTag('all')
                    setSearchTerm('')
                  }}
                  variant="outline"
                  className="flex items-center"
                >
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Tags Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setSelectedTag('all')}
                variant={selectedTag === 'all' ? 'primary' : 'outline'}
                size="sm"
                className="flex items-center"
              >
                <FunnelIcon className="w-4 h-4 mr-2" />
                All Posts
              </Button>
              {blogTags.map(tag => (
                <Button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  variant={selectedTag === tag ? 'primary' : 'outline'}
                  size="sm"
                  className="flex items-center"
                >
                  <TagIcon className="w-4 h-4 mr-2" />
                  {tag}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Featured Posts Section */}
          {featuredPosts.length > 0 && selectedTag === 'all' && !searchTerm && (
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white mb-8 flex items-center">
                <StarIcon className="w-6 h-6 mr-2 text-yellow-500" />
                Featured Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </motion.div>
          )}

          {/* All Posts Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white flex items-center">
                <PencilIcon className="w-6 h-6 mr-2 text-blue-600" />
                {selectedTag === 'all' && !searchTerm ? 'All Posts' : 'Search Results'}
              </h2>
              <span className="text-gray-500 dark:text-gray-400">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
              </span>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600">
                  <DocumentTextIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No posts found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </motion.div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16"
          >
            <NewsletterSignup className="max-w-2xl mx-auto" />
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default BlogPage
