import { NextResponse } from 'next/server'

// This would typically fetch from your blog data source
// For now, using the static blog data from your portfolio
const getBlogPosts = () => {
  return [
    {
      title: "Building Scalable Microservices with Spring Boot",
      description: "Learn how to design and implement scalable microservices architecture using Spring Boot, focusing on best practices for backend development.",
      slug: "scalable-microservices-spring-boot",
      publishedAt: "2024-01-15",
      updatedAt: "2024-01-15",
    },
    {
      title: "Kotlin vs Java: A Backend Developer's Perspective",
      description: "A comprehensive comparison of Kotlin and Java for backend development, exploring performance, syntax, and ecosystem differences.",
      slug: "kotlin-vs-java-backend",
      publishedAt: "2024-01-10",
      updatedAt: "2024-01-10",
    },
    {
      title: "Optimizing Database Performance in Enterprise Applications",
      description: "Strategies and techniques for optimizing database performance in large-scale enterprise applications, with practical examples.",
      slug: "database-performance-optimization",
      publishedAt: "2024-01-05",
      updatedAt: "2024-01-05",
    }
  ]
}

export async function GET() {
  const baseUrl = 'https://anupam-portfolio.vercel.app'
  const posts = getBlogPosts()
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Anupam Kumar - Backend Developer Blog</title>
    <description>Insights and tutorials on backend development, Java, Kotlin, Spring Boot, and software architecture from a passionate backend developer.</description>
    <link>${baseUrl}</link>
    <language>en-US</language>
    <managingEditor>anupamkumar0401@gmail.com (Anupam Kumar)</managingEditor>
    <webMaster>anupamkumar0401@gmail.com (Anupam Kumar)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/og-image.png</url>
      <title>Anupam Kumar - Backend Developer Blog</title>
      <link>${baseUrl}</link>
      <width>1200</width>
      <height>630</height>
      <description>Backend Developer Blog</description>
    </image>
    ${posts.map(post => `
    <item>
      <title>${post.title}</title>
      <description><![CDATA[${post.description}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author>anupamkumar0401@gmail.com (Anupam Kumar)</author>
      <category>Backend Development</category>
      <category>Programming</category>
    </item>`).join('')}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600',
    },
  })
}
