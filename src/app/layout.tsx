import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/providers/ThemeProvider'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Anupam Kumar - Backend Developer | Java, Kotlin, Spring Boot",
    template: "%s | Anupam Kumar - Backend Developer"
  },
  description: "Backend Developer specializing in Java, Kotlin, Spring Boot, and Android development. IIT Bhilai graduate with experience at Navi Technologies and Click2Cloud. Explore my projects, blog posts, and technical expertise.",
  keywords: [
    "Backend Developer",
    "Java Developer",
    "Kotlin Developer", 
    "Spring Boot",
    "Android Development",
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
    description: "Backend Developer specializing in Java, Kotlin, Spring Boot, and Android development. IIT Bhilai graduate with experience at Navi Technologies and Click2Cloud.",
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
    description: "Backend Developer specializing in Java, Kotlin, Spring Boot, and Android development. IIT Bhilai graduate with experience at Navi Technologies and Click2Cloud.",
    images: ["/og-image.png"],
    creator: "@anupamkumar",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  metadataBase: new URL("https://anupam-portfolio.vercel.app"),
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f6f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c10" }
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
