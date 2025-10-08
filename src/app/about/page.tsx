'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { DocumentArrowDownIcon, AcademicCapIcon, BriefcaseIcon, TrophyIcon, HeartIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import Layout from '@/components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { personalInfo, experiences, education, achievements } from '@/data/portfolio'
import { calculateDuration } from '@/lib/utils'

const AboutPage = () => {
  const [imgOk, setImgOk] = useState(true)
  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = personalInfo.resume || '#'
    link.download = 'anupam-kumar-resume.pdf'
    link.click()
  }

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
              About Me
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Passionate about building scalable systems and crafting elegant solutions that make a difference.
            </p>
          </motion.div>

          {/* Introduction Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Software Development Engineer
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    With over 2 years of experience in backend development, I specialize in building 
                    high-performance, scalable systems using Java, Kotlin, and Spring Boot. My expertise 
                    lies in microservices architecture, system design, and performance optimization.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Currently at Navi Technologies, I work on fintech applications that serve millions 
                    of users, focusing on processing fee systems, EMI logic optimization, and 
                    multi-language communications that directly impact business metrics.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="secondary">Backend Development</Badge>
                    <Badge variant="secondary">System Design</Badge>
                    <Badge variant="secondary">Microservices</Badge>
                    <Badge variant="secondary">Performance Optimization</Badge>
                  </div>
                  <Button onClick={handleDownloadResume} className="flex items-center gap-2">
                    <DocumentArrowDownIcon className="w-5 h-5" />
                    Download Resume
                  </Button>
                </div>
                <div className="flex justify-center">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
                  >
                    <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden ring-1 ring-[color:var(--border-color)]/60 shadow-2xl">
                      {imgOk ? (
                        <Image
                          src="/images/anupam.png"
                          alt="Anupam Kumar"
                          fill
                          priority
                          placeholder="empty"
                          quality={95}
                          sizes="(min-width: 1024px) 18rem, (min-width: 768px) 18rem, 16rem"
                          className="object-cover"
                          onError={() => setImgOk(false)}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-6xl font-bold">
                          AK
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Timeline Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Professional Journey
            </h2>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-blue-200 dark:bg-blue-800"></div>
              
              {/* Experience Items */}
              <div className="space-y-8 snap-y snap-proximity">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    className={`relative flex items-center snap-start ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10"></div>
                    
                    {/* Content */}
                    <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'} md:w-5/12`}>
                      <Card hoverable className="p-6 bg-gradient-to-br from-white to-gray-50">
                        <div className="flex items-center mb-4">
                          <BriefcaseIcon className="w-6 h-6 text-blue-600 mr-3" />
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                              {exp.position}
                            </h3>
                            <p className="text-blue-600 dark:text-blue-400 font-medium">
                            {('companyUrl' in exp && (exp as any).companyUrl) ? (
                              <a
                                href={(exp as any).companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline-offset-4 hover:underline"
                              >
                                {exp.company}
                              </a>
                            ) : (
                              exp.company
                            )}
                          </p>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
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
                          <span className="mx-2">•</span>
                          <span className="text-sm">
                            {calculateDuration(exp.startDate, exp.endDate)}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.slice(0, 4).map((tech) => (
                            <Badge key={tech} variant="info" size="sm">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Education
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                >
                  <Card hoverable className="p-6 h-full">
                    <div className="flex items-center mb-4">
                      <AcademicCapIcon className="w-6 h-6 text-blue-600 mr-3" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {edu.degree}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                          {edu.institution}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {edu.field}
                    </p>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
                      <span className="text-sm">
                        {new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}
                      </span>
                      <span className="mx-2">•</span>
                      <span className="text-sm">{edu.location}</span>
                    </div>
                    {edu.achievements && (
                      <div className="space-y-2">
                        {edu.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            <span className="text-gray-600 dark:text-gray-400 text-sm">
                              {achievement}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Achievements & Recognition
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                >
                  <Card hoverable className="p-6 h-full">
                    <div className="flex items-center mb-4">
                      <TrophyIcon className="w-6 h-6 text-yellow-500 mr-3" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {achievement.title}
                        </h3>
                        {achievement.organization && (
                          <p className="text-blue-600 dark:text-blue-400 font-medium">
                            {achievement.organization}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {achievement.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(achievement.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long'
                        })}
                      </span>
                      <Badge variant="success" size="sm">
                        {achievement.type}
                      </Badge>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Interests Section */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              When I'm Not Coding
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8 max-w-2xl mx-auto">
              Beyond software development, I'm passionate about various activities that keep me balanced and inspired.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Sports */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <Card hoverable className="p-6 h-full text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-3xl">
                      🏸
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Sports
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Badminton, Table Tennis
                  </p>
                  <Badge variant="secondary" size="sm">Fitness & Strategy</Badge>
                </Card>
              </motion.div>

              {/* Arts */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <Card hoverable className="p-6 h-full text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-3xl">
                      🎨
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Arts
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Drawing, Painting
                  </p>
                  <Badge variant="secondary" size="sm">Creative Expression</Badge>
                </Card>
              </motion.div>

              {/* Reading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
              >
                <Card hoverable className="p-6 h-full text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-3xl">
                      📚
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Reading
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Novels, Sci-Fi, Philosophy
                  </p>
                  <Badge variant="secondary" size="sm">Mind Expansion</Badge>
                </Card>
              </motion.div>

              {/* Entertainment */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <Card hoverable className="p-6 h-full text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-3xl">
                      🎬
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Entertainment
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Movies, Music, Cricket
                  </p>
                  <Badge variant="secondary" size="sm">Relaxation</Badge>
                </Card>
              </motion.div>
            </div>

            {/* Call to action */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              <Link href="/interests">
                <Button variant="outline" className="group">
                  <HeartIcon className="w-5 h-5 mr-2" />
                  Explore My Interests
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage
