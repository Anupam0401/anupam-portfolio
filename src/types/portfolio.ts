export interface PersonalInfo {
  name: string
  title: string
  email: string
  phone?: string
  location: string
  github: string
  linkedin: string
  website?: string
  resume?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  location: string
  description: string
  keyProjects: string[]
  technologies: string[]
  achievements: string[]
  metrics?: {
    label: string
    value: string
  }[]
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  technologies: string[]
  features: string[]
  challenges?: string[]
  learnings?: string[]
  links: {
    github?: string
    demo?: string
    case_study?: string
    design?: string
  }
  images?: string[]
  status: 'completed' | 'in-progress' | 'planned'
  featured: boolean
  startDate: string
  endDate?: string
}

export interface Skill {
  name: string
  category: 'language' | 'framework' | 'database' | 'tool' | 'cloud' | 'other'
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  yearsOfExperience: number
  icon?: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  date: string
  type: 'competition' | 'certification' | 'award' | 'milestone'
  organization?: string
  link?: string
  icon?: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  grade?: string
  gpa?: string
  percentage?: string
  location: string
  achievements?: string[]
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  publishedDate: string
  tags: string[]
  readingTime: number
  featured: boolean
}
