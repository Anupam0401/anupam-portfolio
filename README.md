# Anupam Kumar - Professional Portfolio

A modern, responsive portfolio website showcasing my expertise as a Senior Backend Engineer specializing in Java, Kotlin, and Spring Boot. Built with Next.js 15, TypeScript, and Tailwind CSS.

🚀 **Live Portfolio**: [Your Portfolio URL]

## ✨ Features

- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Interactive Animations**: Smooth micro-interactions using Framer Motion
- **SEO Optimized**: Server-side rendering with proper meta tags
- **Accessibility**: WCAG compliant with keyboard navigation support
- **Performance**: Optimized for Core Web Vitals
- **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS

## 🏗️ Architecture

### Pages
- **Home**: Hero section with introduction and call-to-actions
- **About**: Professional timeline, education, and downloadable resume
- **Experience**: Detailed work history with metrics and achievements
- **Projects**: Featured projects with technical details and links
- **Skills**: Interactive skill categorization with proficiency levels
- **Achievements**: Awards, certifications, and milestones
- **Contact**: Contact form with social links and availability status

### Tech Stack
- **Frontend**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom components
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Heroicons for consistent iconography
- **TypeScript**: Full type safety throughout
- **Accessibility**: eslint-plugin-jsx-a11y integration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Anupam0401/anupam-portfolio.git
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the portfolio

## 🔧 Customization

### Personal Information
Update your details in `src/data/portfolio.ts`:

```typescript
export const personalInfo: PersonalInfo = {
  name: "Your Name",
  title: "Your Title",
  email: "your.email@example.com",
  // ... other details
}
```

### Experience & Projects
Modify the `experiences` and `projects` arrays in `src/data/portfolio.ts` to reflect your professional journey.

### Skills & Achievements
Update the `skills` and `achievements` arrays with your expertise and accomplishments.

### Resume
Replace `public/resume/anupam-kumar-resume.pdf` with your actual resume file.

### Styling
Customize the design by modifying:
- `tailwind.config.ts` for theme customization
- Component styles in `src/components/`
- Color schemes and gradients throughout the application

## 📱 Responsive Design

- **Mobile First**: Designed for mobile devices and scaled up
- **Breakpoints**: Tailwind's responsive utilities (sm, md, lg, xl, 2xl)
- **Touch Friendly**: Optimized for touch interactions
- **Performance**: Optimized images and lazy loading

## ♿ Accessibility

- **WCAG 2.1 AA Compliant**: Meets accessibility standards
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Sufficient contrast ratios
- **Focus Management**: Clear focus indicators

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (blue-600 to purple-600)
- **Secondary**: Gray scale for text and backgrounds
- **Accent**: Green for success, Yellow for warnings, Red for errors
- **Dark Mode**: Automatic theme switching support

### Typography
- **Font Stack**: Inter/Roboto/Poppins for modern readability
- **Hierarchy**: Consistent heading sizes and spacing
- **Line Height**: Optimized for reading comfort

### Components
- **Reusable**: Modular component architecture
- **Consistent**: Design tokens for spacing, colors, and typography
- **Interactive**: Hover states and smooth transitions

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with automatic CI/CD

### Manual Build
```bash
npm run build
npm run start
```

### Environment Variables
Create `.env.local` for any environment-specific configurations:
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 📈 Performance

- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic code splitting for optimal loading
- **Caching**: Static generation with ISR where applicable

## 🔍 SEO

- **Meta Tags**: Dynamic meta descriptions and titles
- **Open Graph**: Social media sharing optimization
- **Structured Data**: JSON-LD for better search engine understanding
- **Sitemap**: Automatic sitemap generation

## 🛠️ Development

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

### Code Quality
- **ESLint**: Code linting with accessibility rules
- **TypeScript**: Type checking and better development experience
- **Prettier**: Code formatting (add if needed)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Anupam0401/anupam-portfolio/issues).

## 📞 Contact

- **Email**: anupamkumar0401@gmail.com
- **LinkedIn**: [anupam-kumar-17b0b9210](https://linkedin.com/in/anupam-kumar-17b0b9210)
- **GitHub**: [Anupam0401](https://github.com/Anupam0401)

---

⭐ **Star this repository if you found it helpful!**

Built with ❤️ by [Anupam Kumar](https://github.com/Anupam0401)
