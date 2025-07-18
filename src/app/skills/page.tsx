'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CodeBracketIcon, 
  CpuChipIcon, 
  CircleStackIcon, 
  WrenchScrewdriverIcon,
  CloudIcon,
  CogIcon,
  ChartBarIcon,
  FireIcon,
  SparklesIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'
import Layout from '@/components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { skills } from '@/data/portfolio'

const SkillsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', name: 'All Skills', icon: SparklesIcon, color: 'from-purple-500 to-pink-500' },
    { id: 'language', name: 'Languages', icon: CodeBracketIcon, color: 'from-blue-500 to-cyan-500' },
    { id: 'framework', name: 'Frameworks', icon: CpuChipIcon, color: 'from-green-500 to-emerald-500' },
    { id: 'database', name: 'Databases', icon: CircleStackIcon, color: 'from-orange-500 to-red-500' },
    { id: 'tool', name: 'Tools', icon: WrenchScrewdriverIcon, color: 'from-indigo-500 to-purple-500' },
    { id: 'cloud', name: 'Cloud', icon: CloudIcon, color: 'from-sky-500 to-blue-500' },
    { id: 'other', name: 'Other', icon: CogIcon, color: 'from-gray-500 to-slate-500' }
  ]

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory)

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return 'from-green-500 to-emerald-500'
      case 'advanced': return 'from-blue-500 to-cyan-500'
      case 'intermediate': return 'from-yellow-500 to-orange-500'
      case 'beginner': return 'from-gray-500 to-slate-500'
      default: return 'from-gray-500 to-slate-500'
    }
  }

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case 'expert': return 'success'
      case 'advanced': return 'info'
      case 'intermediate': return 'warning'
      case 'beginner': return 'secondary'
      default: return 'secondary'
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
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  const SkillCard = ({ skill, index }: { skill: any, index: number }) => (
    <motion.div
      variants={itemVariants}
      className="group"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card className="h-full p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-full bg-gradient-to-r ${getLevelColor(skill.level)} text-white shadow-lg`}>
              <span className="text-2xl font-bold">{skill.icon}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {skill.name}
              </h3>
              <Badge 
                variant={getLevelBadgeVariant(skill.level)} 
                size="sm"
                className="mt-1"
              >
                {skill.level}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {skill.yearsOfExperience}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {skill.yearsOfExperience === 1 ? 'year' : 'years'}
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Proficiency
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {skill.level}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full bg-gradient-to-r ${getLevelColor(skill.level)}`}
              initial={{ width: 0 }}
              animate={{ 
                width: skill.level === 'expert' ? '90%' : 
                       skill.level === 'advanced' ? '75%' : 
                       skill.level === 'intermediate' ? '60%' : '40%' 
              }}
              transition={{ duration: 1, delay: index * 0.1 }}
            />
          </div>
        </div>
        
        {/* Category Badge */}
        <div className="flex justify-between items-center">
          <Badge variant="secondary" size="sm" className="capitalize">
            {skill.category}
          </Badge>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <ChartBarIcon className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </Card>
    </motion.div>
  )

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
              Technical Skills
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A comprehensive overview of my technical expertise, built through years of 
              hands-on experience in backend development and system architecture.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={selectedCategory === category.id ? 'primary' : 'outline'}
                  className="flex items-center space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </Button>
              )
            })}
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredSkills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </motion.div>

          {/* Skills Summary */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {skills.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Total Skills
              </div>
            </Card>
            <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {skills.filter(s => s.level === 'expert').length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Expert Level
              </div>
            </Card>
            <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {skills.filter(s => s.level === 'advanced').length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Advanced Level
              </div>
            </Card>
            <Card className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                {Math.round(skills.reduce((sum, skill) => sum + skill.yearsOfExperience, 0) / skills.length)}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Avg. Experience
              </div>
            </Card>
          </motion.div>

          {/* Expertise Areas */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="p-8 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <div className="flex items-center mb-6">
                <FireIcon className="w-8 h-8 mr-4" />
                <h2 className="text-2xl font-bold">Core Strengths</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                  <span className="text-blue-100">Backend Development & Architecture</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                  <span className="text-blue-100">Microservices & Distributed Systems</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                  <span className="text-blue-100">Performance Optimization</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                  <span className="text-blue-100">System Design & Scalability</span>
                </div>
              </div>
            </Card>
            
            <Card className="p-8 bg-gradient-to-br from-green-600 to-emerald-600 text-white">
              <div className="flex items-center mb-6">
                <SparklesIcon className="w-8 h-8 mr-4" />
                <h2 className="text-2xl font-bold">Currently Learning</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                  <span className="text-green-100">Advanced Kubernetes</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                  <span className="text-green-100">Event-Driven Architecture</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                  <span className="text-green-100">Machine Learning Integration</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                  <span className="text-green-100">Advanced System Design Patterns</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card className="p-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
              <h2 className="text-2xl font-bold mb-4">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                With expertise across the full backend stack, I'm ready to tackle your next challenge. 
                Let's discuss how my skills can contribute to your project's success.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  onClick={() => window.location.href = '/contact'}
                  variant="secondary"
                  className="flex items-center"
                >
                  <span>Get In Touch</span>
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

export default SkillsPage
