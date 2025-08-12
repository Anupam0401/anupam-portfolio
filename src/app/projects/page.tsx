'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { 
  CodeBracketIcon, 
  GlobeAltIcon, 
  DocumentTextIcon,
  CalendarDaysIcon,
  FunnelIcon,
  StarIcon,
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon,
  LightBulbIcon,
  CogIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'
import Layout from '@/components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { projects } from '@/data/portfolio'

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'featured' | 'completed'>('all')

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true
    if (filter === 'featured') return project.featured
    if (filter === 'completed') return project.status === 'completed'
    return true
  })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
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

  const ProjectCard = ({ project, index }: { project: any, index: number }) => (
    <motion.div
      variants={itemVariants}
      className="h-full"
      whileHover={{ y: -5 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
    >
      <Card className="h-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-bl-full opacity-10"></div>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
                  <CodeBracketIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                {project.featured && (
                  <Badge variant="success" size="sm" className="flex items-center">
                    <StarIcon className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {project.title}
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Technologies */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech: string) => (
                <Badge key={tech} variant="info" size="sm">
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 4 && (
                <Badge variant="secondary" size="sm">
                  +{project.technologies.length - 4} more
                </Badge>
              )}
            </div>
          </div>

          {/* Project Timeline */}
          <div className="mb-6">
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <CalendarDaysIcon className="w-4 h-4 mr-2" />
              <span>
                {new Date(project.startDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short' 
                })} - {
                  project.endDate 
                    ? new Date(project.endDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short' 
                      }) 
                    : 'Present'
                }
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col space-y-3">
            <Button
              onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
              variant="outline"
              className="w-full flex items-center justify-center"
            >
              <span>View Details</span>
              <ChevronRightIcon className="w-4 h-4 ml-2" />
            </Button>
            {project.links.github && (
              <Button
                onClick={() => window.open(project.links.github, '_blank')}
                variant="ghost"
                className="w-full flex items-center justify-center"
              >
                <CodeBracketIcon className="w-4 h-4 mr-2" />
                View Code
                <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  const ProjectDetails = ({ project }: { project: any }) => (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-6 overflow-hidden"
    >
      <Card className="border-l-4 border-blue-600 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              {project.longDescription && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <DocumentTextIcon className="w-5 h-5 mr-2 text-blue-600" />
                    Project Overview
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {project.longDescription}
                  </p>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <CogIcon className="w-5 h-5 mr-2 text-blue-600" />
                  Key Features
                </h3>
                <div className="space-y-2">
                  {project.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              {project.challenges && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <LightBulbIcon className="w-5 h-5 mr-2 text-blue-600" />
                    Technical Challenges
                  </h3>
                  <div className="space-y-2">
                    {project.challenges.map((challenge: string, index: number) => (
                      <div key={index} className="flex items-start bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">
                          {challenge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.learnings && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <AcademicCapIcon className="w-5 h-5 mr-2 text-blue-600" />
                    Key Learnings
                  </h3>
                  <div className="space-y-2">
                    {project.learnings.map((learning: string, index: number) => (
                      <div key={index} className="flex items-start bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">
                          {learning}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  All Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <Badge key={tech} variant="info" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
              Featured Projects
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Showcase of my technical expertise through real-world projects that solve complex problems 
              and deliver measurable business impact.
            </p>
          </motion.div>

          {/* Filter Section */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button
              onClick={() => setFilter('all')}
              variant={filter === 'all' ? 'primary' : 'outline'}
              className="flex items-center"
            >
              <FunnelIcon className="w-4 h-4 mr-2" />
              All Projects
            </Button>
            <Button
              onClick={() => setFilter('featured')}
              variant={filter === 'featured' ? 'primary' : 'outline'}
              className="flex items-center"
            >
              <StarIcon className="w-4 h-4 mr-2" />
              Featured
            </Button>
            <Button
              onClick={() => setFilter('completed')}
              variant={filter === 'completed' ? 'primary' : 'outline'}
              className="flex items-center"
            >
              Completed
            </Button>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
            
            {/* Project Details - Rendered outside grid */}
            <AnimatePresence>
              {selectedProject && (
                <ProjectDetails project={filteredProjects.find(p => p.id === selectedProject)} />
              )}
            </AnimatePresence>
          </motion.div>

          {/* Project Stats */}
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {projects.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Total Projects
              </div>
            </Card>
            <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {projects.filter(p => p.featured).length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Featured Projects
              </div>
            </Card>
            <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {projects.filter(p => p.status === 'completed').length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Completed Projects
              </div>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="p-8 gradient-card">
              <h2 className="text-2xl font-bold mb-4">
                Interested in My Work?
              </h2>
              <p className="text-lg mb-6">
                I'm always excited to discuss new projects and opportunities. 
                Let's connect and explore how we can work together.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  onClick={() => window.open('https://github.com/Anupam0401', '_blank')}
                  variant="primary"
                  className="flex items-center"
                >
                  <CodeBracketIcon className="w-5 h-5 mr-2" />
                  View GitHub
                </Button>
                <Button
                  onClick={() => window.location.href = 'mailto:anupamkumar0401@gmail.com'}
                  variant="contrast"
                  className="flex items-center"
                >
                  <span>Get In Touch</span>
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default ProjectsPage
