import Link from 'next/link'
import { projects } from '@/data/portfolio'

function formatDateRange(start?: string, end?: string) {
  if (!start) return ''
  const s = new Date(start).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  const e = end ? new Date(end).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'
  return `${s} — ${e}`
}

export default function HomeFeaturedProjects() {
  const featured = projects
    .filter(p => p.featured)
    .sort((a, b) => new Date(b.endDate ?? b.startDate ?? 0).getTime() - new Date(a.endDate ?? a.startDate ?? 0).getTime())
    .slice(0, 2)

  return (
    <section aria-labelledby="home-projects" className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between mb-6">
          <h2 id="home-projects" className="text-2xl font-semibold text-gray-900">Featured Projects</h2>
          <Link href="/projects" className="text-sm text-blue-600 hover:underline">View all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {featured.map(p => (
            <div key={p.id} className="rounded-2xl">
              <Link href={`/projects`} className="block rounded-2xl overflow-hidden border border-transparent [background:linear-gradient(rgba(255,255,255,0.06),rgba(255,255,255,0.06))_padding-box,linear-gradient(90deg,rgba(59,130,246,0.25),rgba(139,92,246,0.25))_border-box] glass-surface p-5 min-h-[112px]">
                <div className="h-0.5 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{p.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{p.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {p.technologies.slice(0, 3).map(t => (
                    <span key={t} className="text-[11px] px-2 py-1 rounded-full bg-gray-100 text-gray-700">{t}</span>
                  ))}
                </div>
                <div className="text-xs text-gray-500">{formatDateRange(p.startDate, (p as any).endDate)}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
