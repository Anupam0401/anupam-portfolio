'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrophyIcon, 
  AcademicCapIcon, 
  SparklesIcon, 
  CalendarDaysIcon,
  BuildingOfficeIcon,
  LinkIcon,
  FireIcon,
  StarIcon,
  ChartBarIcon,
  RocketLaunchIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'
import Layout from '@/components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { achievements } from '@/data/portfolio'

const AchievementsPage = () => {
  const [selectedType, setSelectedType] = useState<string>('all')

  const achievementTypes = [
    { id: 'all', name: 'All Achievements', icon: SparklesIcon, color: 'from-purple-500 to-pink-500' },
    { id: 'competition', name: 'Competitions', icon: TrophyIcon, color: 'from-yellow-500 to-orange-500' },
    { id: 'certification', name: 'Certifications', icon: AcademicCapIcon, color: 'from-blue-500 to-cyan-500' },
    { id: 'award', name: 'Awards', icon: StarIcon, color: 'from-green-500 to-emerald-500' },
    { id: 'milestone', name: 'Milestones', icon: RocketLaunchIcon, color: 'from-indigo-500 to-purple-500' }
  ]

  const filteredAchievements = selectedType === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.type === selectedType)

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'competition': return TrophyIcon
      case 'certification': return AcademicCapIcon
      case 'award': return StarIcon
      case 'milestone': return RocketLaunchIcon
      default: return SparklesIcon
    }
  }

  const getAchievementColor = (type: string) => {
    switch (type) {
      case 'competition': return 'from-yellow-500 to-orange-500'
      case 'certification': return 'from-blue-500 to-cyan-500'
      case 'award': return 'from-green-500 to-emerald-500'
      case 'milestone': return 'from-indigo-500 to-purple-500'
      default: return 'from-purple-500 to-pink-500'
    }
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

  const AchievementCard = ({ achievement, index }: { achievement: any, index: number }) => {
    const Icon = getAchievementIcon(achievement.type)
    const colorClass = getAchievementColor(achievement.type)
    
    return (
      <motion.div
        variants={itemVariants}
        className="h-full"
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Card className="h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <CardHeader className="relative">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
              <div className={`w-full h-full bg-gradient-to-br ${colorClass} rounded-bl-full`}></div>
            </div>
            
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <motion.div 
                  className={`p-4 rounded-full bg-gradient-to-r ${colorClass} text-white shadow-lg`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-8 h-8" />
                </motion.div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {achievement.title}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="capitalize">
                      {achievement.type}
                    </Badge>
                    {achievement.organization && (
                      <Badge variant="secondary" size="sm">
                        {achievement.organization}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl">
                  {achievement.icon}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              {achievement.description}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <CalendarDaysIcon className="w-4 h-4 mr-2" />
                <span>
                  {new Date(achievement.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              {achievement.link && (
                <motion.a
                  href={achievement.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LinkIcon className="w-4 h-4 mr-1" />
                  View Details
                </motion.a>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Achievements & Recognition
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A collection of milestones, awards, and recognition earned through dedication, 
              hard work, and continuous learning in the field of software engineering.
            </p>
          </motion.div>

          {/* Filter Section */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {achievementTypes.map((type) => {
              const Icon = type.icon
              return (
                <Button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  variant={selectedType === type.id ? 'primary' : 'outline'}
                  className="flex items-center space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span>{type.name}</span>
                </Button>
              )
            })}
          </motion.div>

          {/* Achievements Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredAchievements.map((achievement, index) => (
              <AchievementCard key={achievement.id} achievement={achievement} index={index} />
            ))}
          </motion.div>

          {/* Statistics Section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-900/20 dark:to-orange-800/20">
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                {achievements.filter(a => a.type === 'competition').length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Competition Wins
              </div>
            </Card>
            <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-800/20">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {achievements.filter(a => a.type === 'certification').length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Certifications
              </div>
            </Card>
            <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {achievements.filter(a => a.type === 'award').length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Awards
              </div>
            </Card>
            <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-800/20">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {achievements.filter(a => a.type === 'milestone').length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Milestones
              </div>
            </Card>
          </motion.div>

          {/* Featured Achievements */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Featured Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* SIH Finalist */}
              <Card className="p-8 bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-white/20 rounded-full mr-4">
                    <TrophyIcon className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Smart India Hackathon</h3>
                    <p className="text-yellow-100">National Level Finalist</p>
                  </div>
                </div>
                <p className="text-lg text-yellow-100 mb-6">
                  Selected among thousands of participants nationwide, demonstrating exceptional 
                  problem-solving skills and innovative thinking in developing tech solutions 
                  for real-world challenges.
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    2022
                  </Badge>
                  <div className="flex items-center text-yellow-100">
                    <FireIcon className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Top 1% Nationwide</span>
                  </div>
                </div>
              </Card>

              {/* Google Hash Code */}
              <Card className="p-8 bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-white/20 rounded-full mr-4">
                    <ChartBarIcon className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Google Hash Code</h3>
                    <p className="text-blue-100">Top Performer</p>
                  </div>
                </div>
                <p className="text-lg text-blue-100 mb-6">
                  Achieved top ranking in Google's annual Hash Code programming competition, 
                  showcasing advanced algorithmic problem-solving skills and competitive 
                  programming expertise.
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    2022
                  </Badge>
                  <div className="flex items-center text-blue-100">
                    <StarIcon className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Global Recognition</span>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>

          {/* Timeline View */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Achievement Timeline
            </h2>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-blue-200 dark:bg-blue-800"></div>
              <div className="space-y-8">
                {achievements
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      className={`relative flex items-center ${
                        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                    >
                      <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10"></div>
                      
                      <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'} md:w-5/12`}>
                        <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                          <div className="flex items-center mb-3">
                            <div className="text-2xl mr-3">{achievement.icon}</div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {achievement.title}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(achievement.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long'
                                })}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {achievement.description}
                          </p>
                        </Card>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <Card className="p-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
              <h2 className="text-2xl font-bold mb-4">
                Ready to Achieve More Together?
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                These achievements represent my commitment to excellence and continuous growth. 
                I'm excited to bring this same dedication to your next project.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  onClick={() => window.location.href = '/contact'}
                  variant="secondary"
                  className="flex items-center"
                >
                  <span>Let's Connect</span>
                </Button>
                <Button
                  onClick={() => window.location.href = '/projects'}
                  variant="outline"
                  className="flex items-center bg-white/10 text-white border-white/30 hover:bg-white/20"
                >
                  <span>View My Work</span>
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default AchievementsPage
