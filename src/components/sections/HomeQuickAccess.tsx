import Link from 'next/link'
import { Squares2X2Icon, BriefcaseIcon, TrophyIcon, BookOpenIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

const items = [
  { href: '/projects', label: 'Projects', Icon: Squares2X2Icon },
  { href: '/about', label: 'Journey', Icon: BriefcaseIcon },
  { href: '/achievements', label: 'Achievements', Icon: TrophyIcon },
  { href: '/blog', label: 'Blog', Icon: BookOpenIcon },
  { href: '/contact', label: 'Contact', Icon: EnvelopeIcon },
]

export default function HomeQuickAccess() {
  return (
    <section aria-labelledby="quick-access-heading" className="py-8">
      <h2 id="quick-access-heading" className="sr-only">Quick Access</h2>
      <div className="-mx-4 px-4 overflow-x-auto">
        <div className="flex gap-3 snap-x snap-mandatory">
          {items.map(({ href, label, Icon }) => (
            <Link key={href} href={href} className="snap-start inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 ring-1 ring-[color:var(--border-color)]/50 hover:bg-gray-200 transition-colors whitespace-nowrap">
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
