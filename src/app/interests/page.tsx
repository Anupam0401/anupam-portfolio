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
  ChevronUpIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import Layout from '@/components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import MaterialIcon from '@/components/ui/MaterialIcon'
import InterestDetailsModal from '@/components/interests/InterestDetailsModal'

const InterestsPage = () => {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalInterest, setModalInterest] = useState<any | null>(null)
  const [modalCategory, setModalCategory] = useState<string | null>(null)

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
        id: 'creative-writing',
        name: 'Creative Writing',
        icon: '✍️',
        level: 'Passionate',
        description: 'Writing short stories and poetry exploring technology, human nature, and philosophical themes.',
        achievements: ['Published in local magazine', 'Poetry reading participant', '30+ pieces completed'],
        activities: ['Daily writing practice', 'Story competitions', 'Poetry open mic nights', 'Online writing communities'],
        why: 'Creative writing enhances my ability to think through complex narratives and express ideas concisely - skills that translate to better code architecture, documentation, and problem-solving.',
        gallery: [
          { type: 'publication', title: 'Published Short Story', year: '2023' },
          { type: 'workshop', title: 'Creative Writing Workshop', year: '2023' },
          { type: 'reading', title: 'Poetry Open Mic Night', year: '2024' }
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

  const getInterestIconName = (interest: any, category: string): string => {
    if (category === 'sports') return 'sports_tennis'
    if (category === 'arts') return interest.id === 'painting' ? 'brush' : 'draw'
    if (category === 'writing') {
      switch (interest.id) {
        case 'novels':
          return 'menu_book'
        case 'short-stories':
          return 'book'
        case 'poetry':
          return 'auto_awesome'
        case 'calligraphy':
          return 'ink_pen'
        default:
          return 'edit'
      }
    }
    return 'star'
  }

  const getInterestColor = (category: string) => {
    switch (category) {
      case 'sports':
        return 'from-green-600 to-emerald-600'
      case 'arts':
        return 'from-pink-500 to-purple-500'
      case 'writing':
        return 'from-blue-600 to-purple-600'
      default:
        return 'from-gray-500 to-slate-500'
    }
  }

  const InterestCard = ({ interest, category }: { interest: any, category: string }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
      className="self-start"
    >
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="relative">
          <div className="flex items-center justify-between mb-4">
            {(() => {
              const iconName = getInterestIconName(interest, category)
              const colorClass = getInterestColor(category)
              return (
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${colorClass} text-white shadow-lg`}>
                  <MaterialIcon name={iconName} className="text-[20px]" />
                </div>
              )
            })()}
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
            onClick={() => {
              setModalInterest(interest)
              setModalCategory(category)
              setModalOpen(true)
            }}
            variant="outline"
            size="sm"
            className="w-full flex items-center justify-center"
          >
            <EyeIcon className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
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
            <Card className="p-8 gradient-card">
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
                  variant="primary"
                  onClick={() => router.push('/blog')}
                  aria-label="Read my blog"
                >
                  <BookOpenIcon className="w-5 h-5 mr-2" />
                  Read My Blog
                </Button>
                <Button
                  variant="contrast"
                  onClick={() => router.push('/contact')}
                  aria-label="Get in touch"
                >
                  <HeartIcon className="w-5 h-5 mr-2" />
                  Get in Touch
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
        <InterestDetailsModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          interest={modalInterest}
          category={modalCategory}
        />
      </div>
    </Layout>
  )
}

export default InterestsPage
