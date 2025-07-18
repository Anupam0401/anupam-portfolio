import { PersonalInfo, Experience, Project, Skill, Achievement, Education, SocialLink } from '@/types/portfolio'

export const personalInfo: PersonalInfo = {
  name: "Anupam Kumar",
  title: "Backend Developer | Java | Kotlin | Spring Boot | Android",
  email: "anupamkumar0401@gmail.com",
  location: "India",
  github: "https://github.com/Anupam0401",
  linkedin: "https://linkedin.com/in/anupam-kumar-17b0b9210",
  resume: "/resume/ANUPAM_KUMAR_resume.pdf"
}

export const experiences: Experience[] = [
  {
    id: 'navi-technologies',
    company: 'Navi Technologies',
    position: 'Software Developer',
    startDate: "2023-07-01",
    location: 'Bangalore, India',
    description: 'Working on Personal Loan team, developing scalable backend systems for fintech solutions using Java and Kotlin.',
    achievements: [
      'Processing Fee Introduction: Led end-to-end backend delivery contributing ₹1CR per day in revenue',
      'Revamped Loan Journeys: Increased approval-to-disbursal rates (24% → 29%, 14% → 25%) and daily gross disbursal by 33.5% and 26.6%',
      'EMI Date Standardization: Streamlined EMI date logic, enhanced collection efficiency by consolidating to 4 dates',
      'Comms in Vernacular Languages: Implemented multi-language communication in 10 vernacular languages',
      'OKYC Integration: Implemented Aadhaar and PAN verification using Digilocker, increased KYC completion by 10.2%',
      'Workflow Optimization: Automated QA processes, reduced time from 10 minutes to less than 1 minute'
    ],
    keyProjects: [
      'Personal Loan Processing Fee System',
      'Loan Journey Redesign (Repeat & Top-Up)',
      'EMI Date Standardization Service',
      'Multi-language Communication System',
      'OKYC Integration with Digilocker'
    ],
    technologies: ['Java', 'Kotlin', 'Spring Boot', 'PostgreSQL', 'Apache Kafka', 'Docker', 'Kubernetes'],
    metrics: [
      { label: "Revenue Impact", value: "₹10M+ annually" },
      { label: "Transaction Volume", value: "1M+ daily" },
      { label: "System Uptime", value: "99.9%" }
    ]
  },
  {
    id: "android-development",
    company: "Personal Projects & Learning",
    position: "Android Developer",
    startDate: "2022-01-01",
    endDate: "2022-07-31",
    location: "India",
    description: "Focused on mobile application development using Android SDK, Java, and Kotlin. Built several mobile applications with modern Android development practices including MVVM architecture and Room database.",
    keyProjects: [
      "Medical Diagnosis App - Android application for healthcare diagnostics",
      "Client Server App - Mobile client with backend integration",
      "Learning Projects - Various Android apps exploring different features and APIs"
    ],
    technologies: ["Android SDK", "Java", "Kotlin", "MVVM", "Room Database", "Retrofit", "Material Design"],
    achievements: [
      "Built 3+ fully functional Android applications",
      "Implemented modern Android architecture patterns",
      "Integrated REST APIs with mobile interfaces",
      "Gained proficiency in mobile UI/UX design principles"
    ]
  },
  {
    id: 'click2cloud',
    company: 'Click2Cloud',
    position: 'SDE Intern',
    startDate: '2022-05-01',
    endDate: '2022-07-31',
    location: 'Bhilai, India (On-site)',
    description: 'Worked on cloud infrastructure migration and data processing using Python and SQL.',
    achievements: [
      'Cloud Migration: Executed migration of cloud infrastructure from Microsoft Azure to Google BigQuery',
      'Key-Value Extraction: Implemented algorithms to extract key-value pairs from diverse document formats',
      'SQL Injection Analysis: Implemented techniques for information retrieval through SQL injection analysis and testing'
    ],
    keyProjects: [
      'Azure to BigQuery Migration',
      'Document Processing System',
      'Security Testing Framework'
    ],
    technologies: ['Python', 'SQL', 'Microsoft Azure', 'Google BigQuery', 'Data Processing']
  }
]

export const projects: Project[] = [
  {
    id: "processing-fee-system",
    title: "Processing Fee Introduction System",
    description: "Architected and developed a comprehensive fee processing system for fintech applications",
    longDescription: "Led the design and implementation of a scalable processing fee system that handles multiple fee types, calculation engines, and real-time processing. The system integrates with existing loan processing workflows and provides detailed analytics for business insights.",
    technologies: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Kafka", "Docker"],
    features: [
      "Dynamic fee calculation engine",
      "Real-time processing capabilities",
      "Comprehensive audit trail",
      "Integration with existing loan systems",
      "Advanced analytics and reporting"
    ],
    challenges: [
      "Handling high-frequency transactions without performance degradation",
      "Ensuring data consistency across distributed systems",
      "Implementing complex business rules with flexibility"
    ],
    learnings: [
      "Advanced distributed systems design patterns",
      "Performance optimization techniques",
      "Business domain modeling in fintech"
    ],
    links: {
      github: "https://github.com/Anupam0401/processing-fee-system"
    },
    status: "completed",
    featured: true,
    startDate: "2023-03-01",
    endDate: "2023-08-01"
  },
  {
    id: "emi-logic-revamp",
    title: "EMI Logic Revamp",
    description: "Redesigned and optimized EMI calculation algorithms for better accuracy and performance",
    longDescription: "Completely overhauled the existing EMI calculation system to handle complex financial scenarios, improve accuracy, and enhance performance. The new system supports multiple loan types, variable interest rates, and advanced repayment options.",
    technologies: ["Kotlin", "Spring Boot", "PostgreSQL", "JUnit", "Mockito"],
    features: [
      "Advanced EMI calculation algorithms",
      "Support for variable interest rates",
      "Multiple loan type handling",
      "Comprehensive unit testing",
      "Performance optimization"
    ],
    challenges: [
      "Maintaining backward compatibility with existing data",
      "Ensuring calculation accuracy for complex scenarios",
      "Optimizing performance for high-volume calculations"
    ],
    learnings: [
      "Financial mathematics and algorithms",
      "Test-driven development practices",
      "Performance profiling and optimization"
    ],
    links: {
      github: "https://github.com/Anupam0401/emi-logic-revamp"
    },
    status: "completed",
    featured: true,
    startDate: "2023-09-01",
    endDate: "2023-12-01"
  },
  {
    id: "multi-language-comms",
    title: "Multi-language Communications",
    description: "Implemented internationalization system for customer communications across multiple languages",
    longDescription: "Built a comprehensive internationalization system that supports multiple languages for customer communications, including SMS, email, and in-app notifications. The system includes translation management, locale-specific formatting, and real-time language switching.",
    technologies: ["Java", "Spring Boot", "PostgreSQL", "Redis", "RabbitMQ", "React"],
    features: [
      "Multi-language support system",
      "Translation management interface",
      "Locale-specific formatting",
      "Real-time language switching",
      "Automated translation workflow"
    ],
    challenges: [
      "Handling complex text formatting across languages",
      "Ensuring cultural sensitivity in translations",
      "Managing translation workflow efficiently"
    ],
    learnings: [
      "Internationalization best practices",
      "Cultural considerations in software design",
      "Translation management systems"
    ],
    links: {
      github: "https://github.com/Anupam0401/multi-language-comms"
    },
    status: "completed",
    featured: true,
    startDate: "2024-01-01",
    endDate: "2024-05-01"
  }
]

export const skills: Skill[] = [
  // Languages
  { name: "Java", category: "language", level: "expert", yearsOfExperience: 4, icon: "☕" },
  { name: "Kotlin", category: "language", level: "advanced", yearsOfExperience: 2, icon: "🔥" },
  { name: "Python", category: "language", level: "intermediate", yearsOfExperience: 2, icon: "🐍" },
  { name: "SQL", category: "language", level: "advanced", yearsOfExperience: 3, icon: "🗃️" },
  { name: "JavaScript", category: "language", level: "intermediate", yearsOfExperience: 2, icon: "⚡" },
  { name: "XML", category: "language", level: "intermediate", yearsOfExperience: 1, icon: "📄" },
  
  // Frameworks
  { name: "Spring Boot", category: "framework", level: "expert", yearsOfExperience: 3, icon: "🍃" },
  { name: "Spring Framework", category: "framework", level: "advanced", yearsOfExperience: 3, icon: "🌱" },
  { name: "Android SDK", category: "framework", level: "intermediate", yearsOfExperience: 1, icon: "📱" },
  { name: "Retrofit", category: "framework", level: "intermediate", yearsOfExperience: 1, icon: "🔌" },
  { name: "Room Database", category: "framework", level: "intermediate", yearsOfExperience: 1, icon: "🗄️" },
  { name: "Hibernate", category: "framework", level: "advanced", yearsOfExperience: 2, icon: "🔄" },
  { name: "JUnit", category: "framework", level: "advanced", yearsOfExperience: 3, icon: "✅" },
  { name: "Mockito", category: "framework", level: "advanced", yearsOfExperience: 2, icon: "🎭" },
  
  // Databases
  { name: "PostgreSQL", category: "database", level: "advanced", yearsOfExperience: 3, icon: "🐘" },
  { name: "Redis", category: "database", level: "intermediate", yearsOfExperience: 2, icon: "🔴" },
  { name: "MongoDB", category: "database", level: "intermediate", yearsOfExperience: 1, icon: "🍃" },
  
  // Tools
  { name: "Docker", category: "tool", level: "advanced", yearsOfExperience: 2, icon: "🐳" },
  { name: "Kafka", category: "tool", level: "intermediate", yearsOfExperience: 2, icon: "📡" },
  { name: "RabbitMQ", category: "tool", level: "intermediate", yearsOfExperience: 1, icon: "🐰" },
  { name: "Git", category: "tool", level: "advanced", yearsOfExperience: 4, icon: "🔧" },
  { name: "Maven", category: "tool", level: "advanced", yearsOfExperience: 3, icon: "📦" },
  { name: "Gradle", category: "tool", level: "intermediate", yearsOfExperience: 2, icon: "🔨" },
  
  // Cloud
  { name: "AWS", category: "cloud", level: "intermediate", yearsOfExperience: 2, icon: "☁️" },
  { name: "Kubernetes", category: "cloud", level: "beginner", yearsOfExperience: 1, icon: "⚙️" },
  
  // Other
  { name: "Microservices", category: "other", level: "advanced", yearsOfExperience: 2, icon: "🏗️" },
  { name: "System Design", category: "other", level: "advanced", yearsOfExperience: 2, icon: "🎯" },
  { name: "API Design", category: "other", level: "advanced", yearsOfExperience: 3, icon: "🔌" },
  { name: "Performance Optimization", category: "other", level: "advanced", yearsOfExperience: 2, icon: "⚡" },
  { name: "Mobile Development", category: "other", level: "intermediate", yearsOfExperience: 1, icon: "📱" },
  { name: "MVVM Architecture", category: "other", level: "intermediate", yearsOfExperience: 1, icon: "🏛️" }
]

export const achievements: Achievement[] = [
  {
    id: "sih-finalist",
    title: "Smart India Hackathon Finalist",
    description: "Reached the finals of Smart India Hackathon, one of India's biggest coding competitions",
    date: "2022-08-15",
    type: "competition",
    organization: "Government of India",
    icon: "🏆"
  },
  {
    id: "google-hash-code",
    title: "Google Hash Code Top Performer",
    description: "Achieved top ranking in Google Hash Code programming competition",
    date: "2022-03-20",
    type: "competition",
    organization: "Google",
    icon: "🥇"
  },
  {
    id: "jee-percentile",
    title: "JEE Main High Percentile",
    description: "Secured excellent percentile in JEE Main examination",
    date: "2019-05-01",
    type: "milestone",
    organization: "NTA",
    icon: "📚"
  },
  {
    id: "production-systems",
    title: "Production Systems Excellence",
    description: "Successfully maintained 99.9% uptime for critical production systems",
    date: "2023-12-01",
    type: "milestone",
    organization: "Navi Technologies",
    icon: "🚀"
  }
]

export const education: Education[] = [
  {
    id: "college-education",
    institution: "Engineering College",
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering",
    startDate: "2019-08-01",
    endDate: "2023-06-01",
    location: "India",
    achievements: [
      "Graduated with distinction",
      "Active member of coding club",
      "Participated in multiple hackathons",
      "Led technical workshops"
    ]
  }
]

export const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/Anupam0401",
    icon: "github"
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/anupam-kumar-17b0b9210",
    icon: "linkedin"
  },
  {
    platform: "Email",
    url: "mailto:anupamkumar0401@gmail.com",
    icon: "mail"
  }
]
