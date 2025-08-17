import Link from 'next/link'
import { skills } from '@/data/portfolio'
import { getBrandIcon } from '@/lib/brand-icons'
import { ServerStackIcon, RectangleGroupIcon } from '@heroicons/react/24/outline'

const curated = ['Java', 'Kotlin', 'Spring Boot', 'PostgreSQL', 'Microservices', 'System Design']

export default function HomeSkillsOverview() {
  const items = curated
    .map(name => skills.find(s => s.name === name))
    .filter(Boolean) as Array<{ name: string; yearsOfExperience?: number }>

  const renderIcon = (name: string) => {
    const icon = getBrandIcon(name)
    if (icon) {
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-blue-600" aria-hidden>
          <path fill="currentColor" d={icon.path} />
        </svg>
      )
    }
    // Fallbacks for conceptual skills
    if (name.toLowerCase() === 'microservices') return <ServerStackIcon className="w-4 h-4 text-blue-600" aria-hidden />
    if (name.toLowerCase() === 'system design') return <RectangleGroupIcon className="w-4 h-4 text-blue-600" aria-hidden />
    return null
  }

  return (
    <section aria-labelledby="home-skills" className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between mb-6">
          <h2 id="home-skills" className="text-2xl font-semibold text-gray-900">Key Skills</h2>
          <Link href="/skills" className="text-sm text-blue-600 hover:underline">View all</Link>
        </div>
        <div className="rounded-2xl">
          <div className="rounded-2xl ring-1 ring-[color:var(--border-color)]/50 bg-white/10 glass-surface p-5">
            <div className="h-0.5 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {items.map((s) => (
                <div key={s.name} className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-gray-100 ring-1 ring-[color:var(--border-color)]/60">
                  <div className="flex items-center gap-2">
                    {renderIcon(s.name)}
                    <span className="text-sm font-medium text-gray-800">{s.name}</span>
                  </div>
                  {typeof s.yearsOfExperience === 'number' && (
                    <span className="text-[11px] text-gray-600">{s.yearsOfExperience}+ yrs</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
