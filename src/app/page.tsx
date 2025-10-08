import HeroSection from '@/components/sections/HeroSection'
import Layout from '@/components/layout/Layout'
import HomeQuickAccess from '@/components/sections/HomeQuickAccess'
import HomeFeaturedProjects from '@/components/sections/HomeFeaturedProjects'
import HomeJourneySnapshot from '@/components/sections/HomeJourneySnapshot'
import HomeAchievementsHighlights from '@/components/sections/HomeAchievementsHighlights'
import HomeContactCta from '@/components/sections/HomeContactCta'
import HomeSkillsOverview from '@/components/sections/HomeSkillsOverview'

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HomeQuickAccess />
      </div>
      <HomeJourneySnapshot />
      <HomeSkillsOverview />
      <HomeFeaturedProjects />
      <HomeAchievementsHighlights />
      <HomeContactCta />
    </Layout>
  )
}
