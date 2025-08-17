import Link from 'next/link'

export default function HomeContactCta() {
  return (
    <section aria-labelledby="home-contact" className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 ring-1 ring-[color:var(--border-color)]/60 p-8 md:p-10 text-center">
          <h2 id="home-contact" className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">Let’s build something great together</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Have a role, project, or idea in mind? I focus on scalable backend systems, clean design, and measurable impact.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center h-12 px-6 rounded-xl text-white bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] shadow-lg hover:shadow-xl transition-colors">Contact Me</Link>
            <Link href="/projects" className="inline-flex items-center justify-center h-12 px-6 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">View Projects</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
