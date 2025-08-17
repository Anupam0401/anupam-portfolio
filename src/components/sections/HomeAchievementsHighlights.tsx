import Link from 'next/link'
import { achievements } from '@/data/portfolio'
import { TrophyIcon, StarIcon, RocketLaunchIcon, AcademicCapIcon } from '@heroicons/react/24/outline'

function iconFor(type?: string) {
  switch (type) {
    case 'competition': return TrophyIcon
    case 'award': return StarIcon
    case 'milestone': return RocketLaunchIcon
    case 'certification': return AcademicCapIcon
    default: return StarIcon
  }
}

export default function HomeAchievementsHighlights() {
  const top = [...achievements]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2)

  return (
    <section aria-labelledby="home-achievements" className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between mb-6">
          <h2 id="home-achievements" className="text-2xl font-semibold text-gray-900">Achievements</h2>
          <Link href="/achievements" className="text-sm text-blue-600 hover:underline">View all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {top.map(item => {
            const Icon = iconFor(item.type)
            return (
              <div key={item.id} className="rounded-2xl">
                <Link href="/achievements" className="block rounded-2xl overflow-hidden border border-transparent [background:linear-gradient(rgba(255,255,255,0.06),rgba(255,255,255,0.06))_padding-box,linear-gradient(90deg,rgba(59,130,246,0.25),rgba(139,92,246,0.25))_border-box] glass-surface p-5 min-h-[112px]">
                  <div className="h-0.5 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-3" />
                  <div className="flex items-start gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      {item.organization && (
                        <p className="text-sm text-gray-600">{item.organization}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
