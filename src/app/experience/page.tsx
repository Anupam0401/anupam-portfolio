'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { 
  BuildingOfficeIcon, 
  CalendarDaysIcon, 
  MapPinIcon, 
  ChartBarIcon,
  CogIcon,
  LightBulbIcon,
  RocketLaunchIcon 
} from '@heroicons/react/24/outline'
import Layout from '@/components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { experiences } from '@/data/portfolio'
import { calculateDuration } from '@/lib/utils'

const ExperiencePage = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
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
              Professional Experience
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Building scalable fintech solutions and contributing to high-impact projects that serve millions of users.
            </p>
          </motion.div>

          {/* Experience Cards */}
          <motion.div
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className="relative"
              >
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-white/20 dark:bg-white/10 rounded-full">
                          <BuildingOfficeIcon className="w-8 h-8" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-bold text-white">
                            {exp.position}
                          </CardTitle>
                          <p className="text-blue-100 dark:text-blue-200 text-lg font-medium">
                            {exp.company}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex flex-col md:items-end space-y-2">
                        <div className="flex items-center text-blue-100">
                          <CalendarDaysIcon className="w-4 h-4 mr-2" />
                          <span className="text-sm">
                            {new Date(exp.startDate).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short' 
                            })} - {
                              exp.endDate 
                                ? new Date(exp.endDate).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'short' 
                                  }) 
                                : 'Present'
                            }
                          </span>
                        </div>
                        <div className="flex items-center text-blue-100">
                          <MapPinIcon className="w-4 h-4 mr-2" />
                          <span className="text-sm">{exp.location}</span>
                        </div>
                        <Badge variant="secondary" className="bg-white/20 dark:bg-white/10 text-white border-white/30 dark:border-white/20">
                          {calculateDuration(exp.startDate, exp.endDate)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-8">
                    {/* Description */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <CogIcon className="w-5 h-5 mr-2 text-blue-600" />
                        Role Overview
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>

                    {/* Key Projects */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <RocketLaunchIcon className="w-5 h-5 mr-2 text-blue-600" />
                        Key Projects
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {exp.keyProjects.map((project, projIndex) => (
                          <motion.div
                            key={projIndex}
                            className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
                          >
                            <div className="flex items-start">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                {project}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <LightBulbIcon className="w-5 h-5 mr-2 text-blue-600" />
                        Key Achievements
                      </h3>
                      <div className="space-y-3">
                        {exp.achievements.map((achievement, achIndex) => (
                          <motion.div
                            key={achIndex}
                            className="flex items-start bg-green-50 dark:bg-green-900/20 rounded-lg p-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: achIndex * 0.1 }}
                          >
                            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {achievement}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    {exp.metrics && (
                      <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                          <ChartBarIcon className="w-5 h-5 mr-2 text-blue-600" />
                          Impact Metrics
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {exp.metrics.map((metric, metricIndex) => (
                            <motion.div
                              key={metricIndex}
                              className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 text-center border border-blue-200 dark:border-blue-800"
                              whileHover={{ y: -8, scale: 1.02 }}
                              transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
                            >
                              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                {metric.value}
                              </div>
                              <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                                {metric.label}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technologies */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Technologies & Tools
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: techIndex * 0.05 }}
                          >
                            <Badge 
                              variant="info" 
                              className="hover:scale-105 transition-transform duration-200"
                            >
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Summary Section */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white">
              <h2 className="text-2xl font-bold mb-4">
                Ready for the Next Challenge
              </h2>
              <p className="text-lg text-blue-100 mb-6">
                With proven experience in building scalable fintech solutions and leading high-impact projects, 
                I'm excited to contribute to innovative teams and tackle complex engineering challenges.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  3+ Years Experience
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Fintech Domain Expert
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Scalable Systems
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Team Leadership
                </Badge>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default ExperiencePage
