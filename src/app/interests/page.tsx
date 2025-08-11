'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  HeartIcon,
  PaintBrushIcon,
  PencilIcon,
  BookOpenIcon,
  TrophyIcon,
  StarIcon,
  PlayIcon,
  EyeIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline'
import Layout from '@/components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const InterestsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const interests = {
    sports: [
      {
        id: 'badminton',
        name: 'Badminton',
        icon: '🏸',
        level: 'Intermediate',
        description: 'Been playing for 5+ years, love the strategic gameplay and quick reflexes required.',
        achievements: ['Local tournament participant', 'College team member'],
        activities: ['Weekend matches', 'Coaching beginners', 'Tournament participation'],
        why: 'Badminton taught me the importance of strategy, quick decision-making, and staying calm under pressure - skills that translate directly to software development.',
        gallery: [
          { type: 'achievement', title: 'First Tournament Win', year: '2019' },
          { type: 'team', title: 'College Championship Team', year: '2020' },
          { type: 'coaching', title: 'Mentoring Young Players', year: '2023' }
        ]
      },
      {
        id: 'table-tennis',
        name: 'Table Tennis',
        icon: '🏓',
        level: 'Intermediate',
        description: 'Fast-paced sport that sharpens reflexes and hand-eye coordination.',
        achievements: ['Office champion 2 years running', 'State-level participation'],
        activities: ['Daily practice sessions', 'Office tournaments', 'Weekend competitions'],
        why: 'Table tennis enhances my focus and reaction time, which helps with debugging complex code issues and maintaining concentration during long coding sessions.',
        gallery: [
          { type: 'championship', title: 'Office Championship Trophy', year: '2022' },
          { type: 'tournament', title: 'State Tournament Certificate', year: '2023' },
          { type: 'practice', title: 'Daily Training Session', year: '2024' }
        ]
      }
    ],
    arts: [
      {
        id: 'drawing',
        name: 'Drawing',
        icon: '✏️',
        level: 'Intermediate',
        description: 'Pencil sketches, charcoal drawings, and digital art exploring various subjects.',
        achievements: ['Local art exhibition participant', '50+ completed portraits'],
        activities: ['Weekend sketching sessions', 'Digital art creation', 'Portrait commissions'],
        why: 'Drawing helps me visualize system architectures and user flows. The attention to detail required in art directly improves my code quality and UI/UX sensibility.',
        gallery: [
          { type: 'portrait', title: 'Family Portrait Series', year: '2023' },
          { type: 'landscape', title: 'Nature Study Collection', year: '2022' },
          { type: 'digital', title: 'Digital Art Experiments', year: '2024' }
        ]
      },
      {
        id: 'painting',
        name: 'Painting',
        icon: '🎨',
        level: 'Beginner to Intermediate',
        description: 'Watercolor and acrylic paintings, mostly landscapes and abstract compositions.',
        achievements: ['First painting sold', 'Art class completion certificate'],
        activities: ['Plein air painting', 'Still life studies', 'Abstract experimentation'],
        why: 'Painting teaches patience and the iterative process of refinement - much like refactoring code. Color theory also helps with UI design and data visualization.',
        gallery: [
          { type: 'landscape', title: 'Mountain Sunrise Series', year: '2023' },
          { type: 'abstract', title: 'Emotion in Colors', year: '2024' },
          { type: 'workshop', title: 'Art Workshop Certificate', year: '2022' }
        ]
      }
    ],
    writing: [
      {
        id: 'novels',
        name: 'Novel Writing',
        icon: '📚',
        level: 'Passionate Amateur',
        description: 'Working on a science fiction novel exploring the intersection of AI and human consciousness.',
        achievements: ['First draft completed', 'Writing group member'],
        activities: ['Daily writing sessions', 'Story plotting', 'Character development'],
        why: 'Novel writing improves my ability to think through complex systems and user journeys. The narrative structure helps me design better software architectures.',
        gallery: [
          { type: 'manuscript', title: '"Digital Dreams" - First Novel', year: '2024' },
          { type: 'workshop', title: 'Creative Writing Workshop', year: '2023' },
          { type: 'reading', title: 'Book Club Leadership', year: '2022' }
        ]
      },
      {
        id: 'short-stories',
        name: 'Short Stories',
        icon: '📖',
        level: 'Intermediate',
        description: 'Science fiction and contemporary fiction exploring technology\'s impact on humanity.',
        achievements: ['Published in local magazine', '20+ completed stories'],
        activities: ['Weekly writing prompts', 'Story competitions', 'Online writing communities'],
        why: 'Short stories teach conciseness and impact - valuable skills for writing clean, efficient code and technical documentation.',
        gallery: [
          { type: 'publication', title: 'First Published Story', year: '2023' },
          { type: 'contest', title: 'Writing Contest Finalist', year: '2022' },
          { type: 'collection', title: 'Personal Story Collection', year: '2024' }
        ]
      },
      {
        id: 'poetry',
        name: 'Poetry',
        icon: '✨',
        level: 'Passionate',
        description: 'Free verse and structured poetry about technology, nature, and human experience.',
        achievements: ['Poetry reading participant', 'Online poetry featured'],
        activities: ['Daily poetry practice', 'Open mic nights', 'Poetry communities'],
        why: 'Poetry enhances my ability to express complex ideas concisely and beautifully - crucial for code comments, documentation, and user interface copy.',
        gallery: [
          { type: 'reading', title: 'Poetry Open Mic Night', year: '2024' },
          { type: 'feature', title: 'Featured Online Poet', year: '2023' },
          { type: 'collection', title: 'Personal Poetry Journal', year: '2024' }
        ]
      },
      {
        id: 'calligraphy',
        name: 'Calligraphy',
        icon: '🖋️',
        level: 'Beginner',
        description: 'Traditional and modern calligraphy in both Devanagari and Latin scripts.',
        achievements: ['Basic certification', 'Custom invitation designs'],
        activities: ['Daily practice sheets', 'Wedding invitations', 'Artistic quotes'],
        why: 'Calligraphy teaches precision and attention to detail - qualities essential for writing bug-free code and creating pixel-perfect UIs.',
        gallery: [
          { type: 'certificate', title: 'Calligraphy Course Certificate', year: '2022' },
          { type: 'project', title: 'Wedding Invitation Design', year: '2023' },
          { type: 'practice', title: 'Daily Practice Sheets', year: '2024' }
        ]
      }
    ]
  }

  const categories = [
    { id: 'all', name: 'All Interests', icon: HeartIcon, color: 'text-red-500' },
    { id: 'sports', name: 'Sports', icon: TrophyIcon, color: 'text-green-500' },
    { id: 'arts', name: 'Arts', icon: PaintBrushIcon, color: 'text-blue-500' },
    { id: 'writing', name: 'Writing', icon: PencilIcon, color: 'text-purple-500' }
  ]

  const getAllInterests = () => {
    return [...interests.sports, ...interests.arts, ...interests.writing]
  }

  const getFilteredInterests = () => {
    if (selectedCategory === 'all') return getAllInterests()
    return interests[selectedCategory as keyof typeof interests] || []
  }

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

  const InterestCard = ({ interest, category }: { interest: any, category: string }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">{interest.icon}</div>
            <Badge variant="info" size="sm">
              {interest.level}
            </Badge>
          </div>
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {interest.name}
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {interest.description}
          </p>
        </CardHeader>

        <CardContent className="p-6 pt-0">
          {/* Achievements */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
              <StarIcon className="w-4 h-4 mr-1 text-yellow-500" />
              Achievements
            </h4>
            <div className="space-y-1">
              {interest.achievements.map((achievement: string, index: number) => (
                <div key={index} className="text-xs text-gray-600 dark:text-gray-400">
                  • {achievement}
                </div>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
              <PlayIcon className="w-4 h-4 mr-1 text-green-500" />
              Current Activities
            </h4>
            <div className="flex flex-wrap gap-1">
              {interest.activities.slice(0, 3).map((activity: string, index: number) => (
                <Badge key={index} variant="secondary" size="sm" className="text-xs">
                  {activity}
                </Badge>
              ))}
            </div>
          </div>

          {/* Gallery Preview */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
              <EyeIcon className="w-4 h-4 mr-1 text-blue-500" />
              Gallery ({interest.gallery.length})
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {interest.gallery.slice(0, 3).map((item: any, index: number) => (
                <div key={index} className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400 text-center p-1">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Expand/Collapse Button */}
          <Button
            onClick={() => setExpandedItem(expandedItem === interest.id ? null : interest.id)}
            variant="outline"
            size="sm"
            className="w-full flex items-center justify-center"
          >
            {expandedItem === interest.id ? (
              <>
                <ChevronUpIcon className="w-4 h-4 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDownIcon className="w-4 h-4 mr-2" />
                Learn More
              </>
            )}
          </Button>

          {/* Expanded Content */}
          {expandedItem === interest.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Why It Matters to Me
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {interest.why}
                  </p>
                </div>

                <div>
                  <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Complete Gallery
                  </h5>
                  <div className="grid grid-cols-2 gap-2">
                    {interest.gallery.map((item: any, index: number) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-900 dark:text-white">
                          {item.title}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {item.year}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    All Activities
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {interest.activities.map((activity: string, index: number) => (
                      <Badge key={index} variant="secondary" size="sm" className="text-xs">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Personal Interests
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Beyond code and algorithms, I find inspiration in sports, arts, and creative writing. 
              These pursuits shape my perspective as a developer and enrich my problem-solving approach.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map(category => {
                const IconComponent = category.icon
                return (
                  <Button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    variant={selectedCategory === category.id ? 'primary' : 'outline'}
                    className="flex items-center"
                  >
                    <IconComponent className={`w-5 h-5 mr-2 ${category.color}`} />
                    {category.name}
                  </Button>
                )
              })}
            </div>
          </motion.div>

          {/* Interests Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getFilteredInterests().map((interest, index) => {
                const category = selectedCategory === 'all' 
                  ? (interests.sports.includes(interest) ? 'sports' 
                    : interests.arts.includes(interest) ? 'arts' 
                    : 'writing')
                  : selectedCategory
                return (
                  <InterestCard key={interest.id} interest={interest} category={category} />
                )
              })}
            </div>
          </motion.div>

          {/* Philosophy Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="p-8 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white">
              <h2 className="text-2xl font-bold mb-4">
                The Developer's Renaissance
              </h2>
              <p className="text-lg text-purple-100 mb-6 max-w-3xl mx-auto">
                I believe the best developers are Renaissance individuals who draw inspiration from diverse fields. 
                Sports teach discipline and strategy, arts develop creativity and attention to detail, 
                and writing hones communication and storytelling skills. 
                Together, they make me a more well-rounded engineer and human being.
              </p>
              <div className="flex justify-center space-x-4">
                <Button
                  variant="secondary"
                  className="bg-white text-purple-600 hover:bg-gray-100"
                >
                  <BookOpenIcon className="w-5 h-5 mr-2" />
                  Read My Blog
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-600 dark:hover:bg-white/90 dark:hover:text-purple-500"
                >
                  <HeartIcon className="w-5 h-5 mr-2" />
                  Get in Touch
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default InterestsPage
