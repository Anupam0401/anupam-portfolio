import Link from 'next/link'
import { blogPosts } from '@/data/blog'
import { CalendarIcon, ClockIcon, BookOpenIcon } from '@heroicons/react/24/outline'

export default function HomeBlogTeasers() {
  const recent = [...blogPosts]
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, 2)

  return (
    <section aria-labelledby="home-blog" className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between mb-6">
          <h2 id="home-blog" className="text-2xl font-semibold text-gray-900">Latest from the Blog</h2>
          <Link href="/blog" className="text-sm text-blue-600 hover:underline">Read all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {recent.map(post => (
            <Link key={post.id} href={`/blog/${post.id}`} className="block rounded-xl ring-1 ring-[color:var(--border-color)]/60 bg-gradient-to-br from-white to-gray-50 p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <BookOpenIcon className="w-5 h-5 text-blue-600" />
                </div>
                {post.readingTime && (
                  <span className="text-xs text-gray-600">{post.readingTime} min read</span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{post.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{post.excerpt}</p>
              <div className="flex items-center text-xs text-gray-500">
                <CalendarIcon className="w-4 h-4 mr-1" />
                {new Date(post.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
