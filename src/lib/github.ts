export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  clone_url: string
  language: string | null
  languages_url: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  size: number
  default_branch: string
  open_issues_count: number
  topics: string[]
  has_issues: boolean
  has_projects: boolean
  has_wiki: boolean
  has_pages: boolean
  has_downloads: boolean
  archived: boolean
  disabled: boolean
  visibility: string
  pushed_at: string
  created_at: string
  updated_at: string
  license: {
    key: string
    name: string
    spdx_id: string
    url: string
    node_id: string
  } | null
  homepage: string | null
}

export interface GitHubRepoLanguages {
  [key: string]: number
}

export interface GitHubRepoStats {
  additions: number
  deletions: number
  total: number
}

interface GitHubContributorWeek {
  w: number
  a: number
  d: number
  c: number
}

interface GitHubContributor {
  weeks: GitHubContributorWeek[]
}

export interface EnhancedGitHubRepo extends GitHubRepo {
  languages: GitHubRepoLanguages
  primaryLanguage: string
  languagePercentages: { [key: string]: number }
  stats?: GitHubRepoStats
}

class GitHubService {
  private baseUrl = 'https://api.github.com'
  private username = 'Anupam0401'
  
  // Featured repositories from the requirements
  private featuredRepos = [
    'low-level-design-implementation',
    'Checkers-AI',
    'TeamGravitas/Software-Monitoring-Tool'
  ]

  private async fetchWithRetry(url: string, retries = 3): Promise<Response> {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'anupam-portfolio'
          }
        })
        
        if (response.ok) {
          return response
        }
        
        // If rate limited, wait and retry
        if (response.status === 403) {
          const resetTime = response.headers.get('x-ratelimit-reset')
          if (resetTime) {
            const waitTime = parseInt(resetTime) * 1000 - Date.now()
            if (waitTime > 0 && waitTime < 60000) { // Wait max 1 minute
              await new Promise(resolve => setTimeout(resolve, waitTime))
              continue
            }
          }
        }
        
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      } catch (error) {
        if (i === retries - 1) throw error
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
      }
    }
    throw new Error('Max retries exceeded')
  }

  async getRepo(owner: string, repo: string): Promise<GitHubRepo | null> {
    try {
      const response = await this.fetchWithRetry(`${this.baseUrl}/repos/${owner}/${repo}`)
      return await response.json()
    } catch (error) {
      console.error(`Error fetching repo ${owner}/${repo}:`, error)
      return null
    }
  }

  async getRepoLanguages(owner: string, repo: string): Promise<GitHubRepoLanguages> {
    try {
      const response = await this.fetchWithRetry(`${this.baseUrl}/repos/${owner}/${repo}/languages`)
      return await response.json()
    } catch (error) {
      console.error(`Error fetching languages for ${owner}/${repo}:`, error)
      return {}
    }
  }

  async getUserRepos(username: string = this.username): Promise<GitHubRepo[]> {
    try {
      const response = await this.fetchWithRetry(
        `${this.baseUrl}/users/${username}/repos?sort=updated&per_page=100`
      )
      return await response.json()
    } catch (error) {
      console.error(`Error fetching repos for ${username}:`, error)
      return []
    }
  }

  async getFeaturedRepos(): Promise<EnhancedGitHubRepo[]> {
    const repos: EnhancedGitHubRepo[] = []
    
    for (const repoPath of this.featuredRepos) {
      try {
        const [owner, repoName] = repoPath.includes('/') 
          ? repoPath.split('/')
          : [this.username, repoPath]
        
        const repo = await this.getRepo(owner, repoName)
        if (!repo) continue
        
        const languages = await this.getRepoLanguages(owner, repoName)
        const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0)
        
        const languagePercentages: { [key: string]: number } = {}
        for (const [lang, bytes] of Object.entries(languages)) {
          languagePercentages[lang] = (bytes / totalBytes) * 100
        }
        
        const primaryLanguage = Object.entries(languages)
          .sort(([, a], [, b]) => b - a)[0]?.[0] || repo.language || 'Unknown'
        
        repos.push({
          ...repo,
          languages,
          primaryLanguage,
          languagePercentages
        })
      } catch (error) {
        console.error(`Error processing repo ${repoPath}:`, error)
      }
    }
    
    return repos
  }

  async getRepoStats(owner: string, repo: string): Promise<GitHubRepoStats | null> {
    try {
      const response = await this.fetchWithRetry(
        `${this.baseUrl}/repos/${owner}/${repo}/stats/contributors`
      )
      const contributors = (await response.json()) as unknown as GitHubContributor[]
      
      if (Array.isArray(contributors)) {
        const stats = contributors.reduce<GitHubRepoStats>((total, contributor) => {
          const weeks: GitHubContributorWeek[] = Array.isArray(contributor.weeks) ? contributor.weeks : []
          const authorStats = weeks.reduce<GitHubRepoStats>((sum, week) => ({
            additions: sum.additions + (week.a ?? 0),
            deletions: sum.deletions + (week.d ?? 0),
            total: sum.total + (week.c ?? 0)
          }), { additions: 0, deletions: 0, total: 0 })

          return {
            additions: total.additions + authorStats.additions,
            deletions: total.deletions + authorStats.deletions,
            total: total.total + authorStats.total
          }
        }, { additions: 0, deletions: 0, total: 0 })

        return stats
      }
      
      return null
    } catch (error) {
      console.error(`Error fetching stats for ${owner}/${repo}:`, error)
      return null
    }
  }

  // Fallback data for when GitHub API is not available
  getFallbackFeaturedRepos(): EnhancedGitHubRepo[] {
    return [
      {
        id: 1,
        name: 'low-level-design-implementation',
        full_name: 'Anupam0401/low-level-design-implementation',
        description: 'Implementation of various low-level design patterns and system design concepts using Java and Spring Boot',
        html_url: 'https://github.com/Anupam0401/low-level-design-implementation',
        clone_url: 'https://github.com/Anupam0401/low-level-design-implementation.git',
        language: 'Java',
        languages_url: '',
        stargazers_count: 25,
        forks_count: 8,
        watchers_count: 25,
        size: 1024,
        default_branch: 'main',
        open_issues_count: 2,
        topics: ['java', 'spring-boot', 'design-patterns', 'system-design', 'backend'],
        has_issues: true,
        has_projects: true,
        has_wiki: false,
        has_pages: false,
        has_downloads: false,
        archived: false,
        disabled: false,
        visibility: 'public',
        pushed_at: '2024-01-15T10:30:00Z',
        created_at: '2023-06-01T14:20:00Z',
        updated_at: '2024-01-15T10:30:00Z',
        license: {
          key: 'mit',
          name: 'MIT License',
          spdx_id: 'MIT',
          url: 'https://api.github.com/licenses/mit',
          node_id: 'MDc6TGljZW5zZW1pdA=='
        },
        homepage: null,
        languages: { 'Java': 15000, 'XML': 2000, 'Properties': 500 },
        primaryLanguage: 'Java',
        languagePercentages: { 'Java': 85.7, 'XML': 11.4, 'Properties': 2.9 }
      },
      {
        id: 2,
        name: 'Checkers-AI',
        full_name: 'Anupam0401/Checkers-AI',
        description: 'AI-powered checkers game with minimax algorithm and alpha-beta pruning implementation',
        html_url: 'https://github.com/Anupam0401/Checkers-AI',
        clone_url: 'https://github.com/Anupam0401/Checkers-AI.git',
        language: 'Python',
        languages_url: '',
        stargazers_count: 18,
        forks_count: 5,
        watchers_count: 18,
        size: 512,
        default_branch: 'main',
        open_issues_count: 1,
        topics: ['python', 'ai', 'minimax', 'game-development', 'machine-learning'],
        has_issues: true,
        has_projects: false,
        has_wiki: false,
        has_pages: true,
        has_downloads: false,
        archived: false,
        disabled: false,
        visibility: 'public',
        pushed_at: '2023-12-20T16:45:00Z',
        created_at: '2023-04-15T09:15:00Z',
        updated_at: '2023-12-20T16:45:00Z',
        license: {
          key: 'apache-2.0',
          name: 'Apache License 2.0',
          spdx_id: 'Apache-2.0',
          url: 'https://api.github.com/licenses/apache-2.0',
          node_id: 'MDc6TGljZW5zZWFwYWNoZS0yLjA='
        },
        homepage: null,
        languages: { 'Python': 12000, 'HTML': 1500, 'CSS': 800 },
        primaryLanguage: 'Python',
        languagePercentages: { 'Python': 83.9, 'HTML': 10.5, 'CSS': 5.6 }
      },
      {
        id: 3,
        name: 'Software-Monitoring-Tool',
        full_name: 'TeamGravitas/Software-Monitoring-Tool',
        description: 'Real-time software monitoring and analytics tool built with Spring Boot and React',
        html_url: 'https://github.com/TeamGravitas/Software-Monitoring-Tool',
        clone_url: 'https://github.com/TeamGravitas/Software-Monitoring-Tool.git',
        language: 'Java',
        languages_url: '',
        stargazers_count: 42,
        forks_count: 12,
        watchers_count: 42,
        size: 2048,
        default_branch: 'main',
        open_issues_count: 3,
        topics: ['java', 'spring-boot', 'react', 'monitoring', 'analytics', 'microservices'],
        has_issues: true,
        has_projects: true,
        has_wiki: true,
        has_pages: false,
        has_downloads: true,
        archived: false,
        disabled: false,
        visibility: 'public',
        pushed_at: '2024-02-01T14:20:00Z',
        created_at: '2023-08-10T11:30:00Z',
        updated_at: '2024-02-01T14:20:00Z',
        license: {
          key: 'gpl-3.0',
          name: 'GNU General Public License v3.0',
          spdx_id: 'GPL-3.0',
          url: 'https://api.github.com/licenses/gpl-3.0',
          node_id: 'MDc6TGljZW5zZWdwbC0zLjA='
        },
        homepage: 'https://teamgravitas.github.io/Software-Monitoring-Tool',
        languages: { 'Java': 18000, 'JavaScript': 8000, 'TypeScript': 4000, 'HTML': 2000, 'CSS': 1500 },
        primaryLanguage: 'Java',
        languagePercentages: { 'Java': 53.7, 'JavaScript': 23.9, 'TypeScript': 11.9, 'HTML': 6.0, 'CSS': 4.5 }
      }
    ]
  }
}

export const githubService = new GitHubService()
export default githubService
