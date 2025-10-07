import { PersonalInfo, Experience, Project, Skill, Achievement, Education, SocialLink } from '@/types/portfolio'

export const personalInfo: PersonalInfo = {
  name: "Anupam Kumar",
  title: "Backend Developer | Java | Kotlin | Spring Boot",
  email: "anupamkumar0401@gmail.com",
  location: "India",
  github: "https://github.com/Anupam0401",
  linkedin: "https://linkedin.com/in/anupam-kumar-17b0b9210",
  resume: "/resume/ANUPAM_KUMAR_resume.pdf"
}

export const experiences: Experience[] = [
  // Navi SDE II - Backend (Promotion Jul 2025)
  {
    id: 'navi-sde-2',
    company: 'Navi Technologies',
    companyUrl: 'https://navi.com/',
    position: 'SDE II - Backend',
    startDate: '2025-07-01',
    location: 'Bangalore, India',
    description: 'Leading backend initiatives in the Personal Loan team with focus on scalability, reliability, and performance. Mentoring engineers and driving architecture improvements.',
    achievements: [
      'Database Optimization & Cost Savings: Optimized DB storage by partitioning large tables using pg_partman and migrating to a smaller instance, reducing overhead and saving $600 per month with zero downtime',
      'Processing Fee Introduction: Led the end-to-end backend delivery of a new Processing Fee feature, contributing ₹1CR per day in revenue. Mentored and guided junior engineers to ensure seamless and on-time rollout',
      'Service Scalability & Performance: Improved service performance by re-architecting backend services with asynchronous processing via Kafka and optimizing database queries, enabling a 5x increase in requests with zero downtime'
    ],
    keyProjects: [
      'Database Optimization with pg_partman',
      'Processing Fee System',
      'Service Scalability & Kafka Integration'
    ],
    technologies: ['Java', 'Kotlin', 'Spring Boot', 'PostgreSQL', 'Apache Kafka', 'Docker', 'Kubernetes'],
    metrics: [
      { label: 'System Uptime', value: '99.9%' },
      { label: 'Latency Reduction', value: 'Targeted < p95 200ms' }
    ]
  },

  // Navi SDE I - Backend (Apr 2024 - Jun 2025)
  {
    id: 'navi-sde-1',
    company: 'Navi Technologies',
    companyUrl: 'https://navi.com/',
    position: 'SDE I - Backend',
    startDate: '2024-04-01',
    endDate: '2025-06-30',
    location: 'Bangalore, India',
    description: 'Built and scaled backend services for fintech products with Java/Kotlin and Spring Boot.',
    achievements: [
      'Revamped Loan Journeys: Redesigned Personal Loan Repeat and Top-Up flows. Increased approval-to-disbursal rates (24% → 29%, 14% → 25%) and boosted daily gross disbursal by 33.5% (₹17.6 Cr → ₹23.5 Cr) and 26.6% (₹10.5 Cr → ₹13.3 Cr)',
      'EMI Date Standardization: Streamlined EMI date logic by consolidating to 4 dates and integrating with a decisioning service. Revamped API workflows, eliminating redundancy and significantly improving collection efficiency',
      'Comms in Vernacular Languages: Enhanced customer experience by implementing multi-language communication in 15+ vernacular languages, optimizing workflows, and reducing redundant reads',
      'OKYC Integration: Integrated Aadhaar and PAN verification using Digilocker, increasing KYC completion rate by 10.2% and reducing completion time',
      'Workflow & Production Optimization: Automated QA processes (reducing time from 10 minutes to <1 minute), simplified KYC verification for faster onboarding, and resolved high-priority issues during on-call rotations to ensure minimal downtime and consistent service reliability'
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
      { label: 'Revenue Impact', value: '₹10M+ annually' },
      { label: 'Transaction Volume', value: '1M+ daily' }
    ]
  },

  // Navi Android Developer (Jul 2023 - Mar 2024)
  {
    id: 'navi-android',
    company: 'Navi Technologies',
    companyUrl: 'https://navi.com/',
    position: 'SDE I - Android',
    startDate: '2023-07-01',
    endDate: '2024-03-31',
    location: 'Bangalore, India',
    description: 'Built Android app features and integrations for fintech flows, collaborating closely with backend teams before transitioning full-time to backend engineering.',
    achievements: [
      'Delivered several Android app features aligned with loan journey improvements',
      'Collaborated on API design and integration with backend services',
      'Contributed to performance and UX polish across critical screens'
    ],
    keyProjects: [
      'Loan Journey App Enhancements',
      'Comms & Notifications Client Work',
      'Experimentation & A/B Rollouts in App'
    ],
    technologies: ['Kotlin', 'Java', 'REST APIs'],
  },

  // Click2Cloud Internship
  {
    id: 'click2cloud',
    company: 'Click2Cloud',
    companyUrl: 'https://www.click2cloud.com/home',
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
    id: "evolvdb",
    title: "EvolvDB — Educational Database Engine",
    description: "Personal Project - A from-scratch relational database engine built in Java to deeply understand database internals",
    longDescription: "Built a from-scratch relational DB engine in Java to deeply understand database internals, covering the full query pipeline: SQL Parsing → Planning → Optimization → Execution. Designed a modular system with catalog, planner, optimizer, and Volcano-style execution engine.",
    technologies: ["Java", "Database Systems", "SQL Parsing", "Query Optimization", "Volcano Model"],
    features: [
      "Full query pipeline: SQL Parsing → Planning → Optimization → Execution",
      "Modular system with catalog, planner, optimizer, and Volcano-style execution engine",
      "Core relational operators implementation",
      "Cost-based optimizer with join reordering, predicate pushdown, and projection pruning",
      "Unit and end-to-end tests with comprehensive documentation"
    ],
    challenges: [
      "Building SQL parser from scratch",
      "Implementing cost-based query optimization",
      "Designing efficient execution engine"
    ],
    learnings: [
      "Deep understanding of database internals",
      "Query optimization techniques",
      "Relational algebra and execution models"
    ],
    links: {
      github: "https://github.com/Anupam0401/evolvdb"
    },
    status: "completed",
    featured: true,
    startDate: "2024-06-01",
    endDate: "2024-12-01"
  },
  {
    id: "network-software-monitoring-tool",
    title: "Network Software Monitoring Tool",
    description: "Smart India Hackathon Project - Tool to monitor and regulate software installations on network devices",
    longDescription: "Developed a comprehensive monitoring solution for network devices that tracks software installations, provides real-time updates, and enables efficient management through an admin dashboard. The project was developed as part of Smart India Hackathon and showcases advanced networking concepts.",
    technologies: ["Java", "Spring Boot", "React", "PostgreSQL", "Network Programming", "REST APIs"],
    features: [
      "Real-time software installation monitoring",
      "Admin Dashboard for streamlined management",
      "IP address discovery within local networks",
      "Hot reload feature for real-time updates",
      "Network search APIs based on IP addresses and software names"
    ],
    challenges: [
      "Implementing real-time monitoring across network devices",
      "Efficient IP address discovery algorithms",
      "Managing network communication protocols"
    ],
    learnings: [
      "Network programming concepts",
      "Real-time system design",
      "Admin dashboard development"
    ],
    links: {
      design: "https://drive.google.com/file/d/1qiZesrt7hEhPYErSuQzsLiEyiWKDYhZi/view?usp=sharing",
      github: "https://github.com/TeamGravitas/Software-Monitoring-Tool"
    },
    status: "completed",
    featured: true,
    startDate: "2022-08-01",
    endDate: "2022-12-01"
  },
  {
    id: "medical-diagnosis-application",
    title: "Medical Diagnosis Application",
    description: "Personal Project - Decision Tree Classifier model to predict diseases based on patient symptoms",
    longDescription: "Developed a machine learning-based medical diagnosis system that uses a Decision Tree Classifier to predict diseases based on patient symptoms. The application can identify and rank the top 10 most probable diseases, providing healthcare professionals with valuable diagnostic insights.",
    technologies: ["Python", "Scikit-learn", "Streamlit", "Pandas", "NumPy", "Decision Tree Classifier"],
    features: [
      "Decision Tree Classifier model for disease prediction",
      "Top 10 disease ranking based on symptoms",
      "User-friendly web interface using Streamlit",
      "Interactive symptom input system",
      "Visualization of prediction results"
    ],
    challenges: [
      "Handling imbalanced medical datasets",
      "Ensuring model accuracy for reliable predictions",
      "Creating intuitive user interface for medical professionals"
    ],
    learnings: [
      "Machine learning model development",
      "Medical data processing and analysis",
      "Streamlit web application development"
    ],
    links: {
      github: "https://github.com/Anupam0401/Medical-Diagnosis-App"
    },
    status: "completed",
    featured: true,
    startDate: "2022-01-01",
    endDate: "2022-04-01"
  },
  {
    id: "client-server-application",
    title: "Client Server Application",
    description: "Personal Project - Echo Client-Server application in Python for Network Analysis",
    longDescription: "Developed a protocol-independent Echo Client-Server application designed for network analysis. The application features file viewing capabilities, interactive messaging, and robust network communication protocols, making it suitable for various networking scenarios.",
    technologies: ["Python", "Socket Programming", "Network Protocols", "Threading", "File I/O"],
    features: [
      "Echo Client-Server architecture",
      "Protocol-independent design for broader applicability",
      "File viewing capabilities",
      "Interactive messaging system",
      "Network analysis and monitoring tools"
    ],
    challenges: [
      "Implementing protocol-independent communication",
      "Handling concurrent client connections",
      "Ensuring robust error handling and recovery"
    ],
    learnings: [
      "Network programming fundamentals",
      "Socket programming in Python",
      "Client-server architecture patterns"
    ],
    links: {
      github: "https://github.com/Anupam0401/Client_Server_Application"
    },
    status: "completed",
    featured: true,
    startDate: "2021-09-01",
    endDate: "2021-12-01"
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
  { name: "C++", category: "language", level: "intermediate", yearsOfExperience: 2, icon: "⚙️" },
  { name: "Python", category: "language", level: "intermediate", yearsOfExperience: 2, icon: "🐍" },
  { name: "SQL", category: "language", level: "advanced", yearsOfExperience: 3, icon: "🗃️" },
  { name: "JavaScript", category: "language", level: "intermediate", yearsOfExperience: 2, icon: "⚡" },
  { name: "XML", category: "language", level: "intermediate", yearsOfExperience: 1, icon: "📄" },
  
  // Frameworks
  { name: "Spring Boot", category: "framework", level: "expert", yearsOfExperience: 3, icon: "🍃" },
  { name: "Spring Framework", category: "framework", level: "advanced", yearsOfExperience: 3, icon: "🌱" },
  { name: "Hibernate", category: "framework", level: "advanced", yearsOfExperience: 2, icon: "🔄" },
  { name: "JUnit", category: "framework", level: "advanced", yearsOfExperience: 3, icon: "✅" },
  { name: "Mockito", category: "framework", level: "advanced", yearsOfExperience: 2, icon: "🎭" },
  { name: "GraphQL", category: "framework", level: "intermediate", yearsOfExperience: 1, icon: "📊" },
  // Android-adjacent basics retained at beginner level
  { name: "Room Database", category: "framework", level: "beginner", yearsOfExperience: 1, icon: "🗄️" },
  
  // Databases
  { name: "PostgreSQL", category: "database", level: "advanced", yearsOfExperience: 3, icon: "🐘" },
  { name: "MySQL", category: "database", level: "intermediate", yearsOfExperience: 2, icon: "🐬" },
  { name: "MongoDB", category: "database", level: "intermediate", yearsOfExperience: 1, icon: "🍃" },
  { name: "Redis", category: "database", level: "intermediate", yearsOfExperience: 2, icon: "🔴" },
  
  // Tools
  { name: "Docker", category: "tool", level: "advanced", yearsOfExperience: 2, icon: "🐳" },
  { name: "Kubernetes", category: "tool", level: "intermediate", yearsOfExperience: 2, icon: "⚙️" },
  { name: "Kafka", category: "tool", level: "intermediate", yearsOfExperience: 2, icon: "📡" },
  { name: "Prometheus", category: "tool", level: "intermediate", yearsOfExperience: 1, icon: "📈" },
  { name: "Grafana", category: "tool", level: "intermediate", yearsOfExperience: 1, icon: "📊" },
  { name: "Git", category: "tool", level: "advanced", yearsOfExperience: 4, icon: "🔧" },
  { name: "Maven", category: "tool", level: "advanced", yearsOfExperience: 3, icon: "📦" },
  { name: "Gradle", category: "tool", level: "intermediate", yearsOfExperience: 2, icon: "🔨" },
  { name: "Shell", category: "tool", level: "intermediate", yearsOfExperience: 3, icon: "💻" },
  
  // Cloud
  { name: "AWS", category: "cloud", level: "intermediate", yearsOfExperience: 2, icon: "☁️" },
  
  // Other
  { name: "Microservices", category: "other", level: "advanced", yearsOfExperience: 2, icon: "🏗️" },
  { name: "Low Level Design", category: "other", level: "advanced", yearsOfExperience: 2, icon: "🔧" },
  { name: "High Level Design", category: "other", level: "advanced", yearsOfExperience: 2, icon: "🎯" },
  { name: "Database Systems", category: "other", level: "advanced", yearsOfExperience: 3, icon: "🗄️" },
  { name: "API Design", category: "other", level: "advanced", yearsOfExperience: 3, icon: "🔌" },
  { name: "Performance Optimization", category: "other", level: "advanced", yearsOfExperience: 2, icon: "⚡" },
  // Android-adjacent basics retained at beginner level
  { name: "MVVM Architecture", category: "other", level: "beginner", yearsOfExperience: 1, icon: "🏛️" }
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
    title: "Google Hash Code - Global Rank 2329",
    description: "Secured Global Rank 2329 in Google Hash Code programming competition",
    date: "2022-03-20",
    type: "competition",
    organization: "Google",
    icon: "🥇"
  },
  {
    id: "google-kickstart",
    title: "Google KickStart - Global Rank 2436",
    description: "Secured Global Rank 2436 in Google KickStart Round D",
    date: "2021-12-01",
    type: "competition",
    organization: "Google",
    icon: "🏅"
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
    institution: "Indian Institute of Technology Bhilai",
    degree: "Bachelor of Technology",
    field: "Computer Science",
    startDate: "2019-07-01",
    endDate: "2023-04-01",
    location: "Raipur, Chhattisgarh",
    gpa: "8.66",
    achievements: [
      "CGPA: 8.66",
      "Relevant Courses: Data Structures and Algorithms, OOPS, Operating Systems, Database Management System, Machine Learning",
      "Smart India Hackathon 2022 Grand Finalist",
      "Global Rank 2329 in Google Hash Code 2022"
    ]
  },
  {
    id: "senior-secondary",
    institution: "St. Paul Public School",
    degree: "12th Board",
    field: "CBSE",
    startDate: "2017-04-01",
    endDate: "2019-05-01",
    location: "Begusarai",
    percentage: "92.2%",
    achievements: [
      "Percentage: 92.2%",
      "Graduated May 2019"
    ]
  },
  {
    id: "secondary",
    institution: "Victoria Boys' School",
    degree: "10th Board",
    field: "ICSE",
    startDate: "2015-04-01",
    endDate: "2017-05-01",
    location: "Darjeeling",
    percentage: "96%",
    achievements: [
      "Percentage: 96%",
      "Rank 1 in Darjeeling district in ICSE 10th Board Exams",
      "Graduated May 2017"
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
