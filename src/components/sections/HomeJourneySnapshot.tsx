import Link from 'next/link'
import { experiences } from '@/data/portfolio'
import { BriefcaseIcon, CalendarDaysIcon, MapPinIcon } from '@heroicons/react/24/outline'

function formatRange(start?: string, end?: string) {
  if (!start) return ''
  const s = new Date(start).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  const e = end ? new Date(end).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'
  return `${s} — ${e}`
}

export default function HomeJourneySnapshot() {
  const recent = [...experiences]
    .sort((a, b) => new Date(b.endDate ?? b.startDate ?? '').getTime() - new Date(a.endDate ?? a.startDate ?? '').getTime())
    .slice(0, 2)

  return (
    <section aria-labelledby="home-journey" className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between mb-6">
          <h2 id="home-journey" className="text-2xl font-semibold text-gray-900">Professional Journey</h2>
          <Link href="/about" className="text-sm text-blue-600 hover:underline">View full timeline</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {recent.map(exp => (
            <div key={exp.id} className="rounded-2xl">
              <Link
                href="/about"
                className="block rounded-2xl overflow-hidden border border-transparent [background:linear-gradient(rgba(255,255,255,0.06),rgba(255,255,255,0.06))_padding-box,linear-gradient(90deg,rgba(59,130,246,0.25),rgba(139,92,246,0.25))_border-box] glass-surface p-5 min-h-[112px]"
              >
                <div className="h-0.5 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-3" />
                <div className="flex items-start gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <BriefcaseIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-sm text-blue-600 font-medium">{exp.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span className="inline-flex items-center"><CalendarDaysIcon className="w-4 h-4 mr-1" />{formatRange(exp.startDate, (exp as any).endDate)}</span>
                  {exp.location && (
                    <span className="inline-flex items-center"><MapPinIcon className="w-4 h-4 mr-1" />{exp.location}</span>
                  )}
                </div>
                {Array.isArray((exp as any).metrics) && (exp as any).metrics.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {((exp as any).metrics as { label: string; value: string }[]).slice(0, 2).map(m => (
                      <span key={m.label} className="inline-flex items-center text-[11px] px-2 py-1 rounded-full bg-gray-100 text-gray-700 ring-1 ring-[color:var(--border-color)]/60">
                        {m.label}: <span className="ml-1 font-medium">{m.value}</span>
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
