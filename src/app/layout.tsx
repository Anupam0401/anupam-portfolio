import type { Metadata, Viewport } from "next";
import { Suspense } from 'react'
import { Geist, Geist_Mono, Inter, Caveat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import AppBackground from '@/components/layout/AppBackground'
import PerfHUD from '@/components/debug/PerfHUD'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Anupam Kumar - Backend Developer | Java, Kotlin, Spring Boot",
    template: "%s | Anupam Kumar - Backend Developer"
  },
  description: "Backend Developer specializing in Java, Kotlin, and Spring Boot. IIT Bhilai graduate with experience at Navi Technologies and Click2Cloud. Explore my projects, blog posts, and technical expertise.",
  keywords: [
    "Backend Developer",
    "Java Developer",
    "Kotlin Developer", 
    "Spring Boot",
    
    "Software Engineer",
    "IIT Bhilai",
    "Navi Technologies",
    "Click2Cloud",
    "Full Stack Developer",
    "API Development",
    "Microservices",
    "Software Architecture"
  ],
  authors: [{ name: "Anupam Kumar" }],
  creator: "Anupam Kumar",
  publisher: "Anupam Kumar",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anupam-portfolio.vercel.app",
    title: "Anupam Kumar - Backend Developer | Java, Kotlin, Spring Boot",
    description: "Backend Developer specializing in Java, Kotlin, and Spring Boot. IIT Bhilai graduate with experience at Navi Technologies and Click2Cloud.",
    siteName: "Anupam Kumar Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Anupam Kumar - Backend Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anupam Kumar - Backend Developer | Java, Kotlin, Spring Boot",
    description: "Backend Developer specializing in Java, Kotlin, and Spring Boot. IIT Bhilai graduate with experience at Navi Technologies and Click2Cloud.",
    images: ["/og-image.png"],
    creator: "@anupamkumar",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  metadataBase: new URL("https://anupam-portfolio.vercel.app"),
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/icon.svg?v=2", type: "image/svg+xml" }],
    shortcut: ["/icon.svg?v=2"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f6f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c10" }
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24..48,300..700,0..1,-50..200"
        />
        <link rel="icon" href="/icon.svg?v=2" type="image/svg+xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${caveat.variable} antialiased`}
      >
        <ThemeProvider>
          <AppBackground>
            <main className="relative z-10 pt-16">
              {children}
            </main>
            {/* Dev-only Perf HUD (enabled via ?perf=1&glowdebug=1) */}
            <Suspense fallback={null}>
              <PerfHUD />
            </Suspense>
          </AppBackground>
        </ThemeProvider>
      </body>
    </html>
  );
}
