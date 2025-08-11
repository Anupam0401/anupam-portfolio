# Deployment Guide

This document provides comprehensive instructions for deploying and updating the Anupam Kumar Backend Developer Portfolio.

## 🚀 Quick Deployment

### Prerequisites
- Node.js 18+ 
- Git
- Vercel CLI (optional)
- GitHub account

### 1. Initial Setup
```bash
# Clone the repository
git clone https://github.com/Anupam0401/anupam-portfolio.git
cd anupam-portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

### 2. Vercel Deployment (Recommended)

#### Option A: GitHub Integration (Automated)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will automatically deploy on every push to main

#### Option B: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### 3. Manual Deployment (Alternative Platforms)

#### Netlify
```bash
# Build the project
npm run build

# Deploy the 'out' folder to Netlify
```

#### Railway/Render
- Connect your GitHub repository
- Set build command: `npm run build`
- Set start command: `npm start`

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for local development:
```env
# Optional: Google Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Optional: Google Site Verification
GOOGLE_SITE_VERIFICATION=your_verification_code

# Optional: Newsletter API (if using external service)
NEWSLETTER_API_KEY=your_api_key
```

### Vercel Environment Variables
In your Vercel dashboard, add:
- `GOOGLE_SITE_VERIFICATION` (for SEO)
- Any other production environment variables

## 📊 Performance Optimization

### Built-in Optimizations
- Image optimization with Next.js Image component
- Automatic code splitting
- Static generation where possible
- Bundle analysis with `npm run analyze`
- CSS/JS minification in production
- Gzip compression enabled

### Lighthouse Score Targets
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

### Monitoring Performance
```bash
# Run Lighthouse audit
npx lighthouse https://your-domain.com --output html --output-path ./lighthouse-report.html

# Analyze bundle size
npm run analyze
```

## 🔄 Update Process

### Content Updates
1. **Portfolio Data**: Update `src/data/portfolio.ts`
2. **Blog Posts**: Add new posts to blog data structure
3. **Resume**: Replace PDF in `public/resume/`
4. **Images**: Add new images to `public/images/`

### Code Updates
```bash
# 1. Create feature branch
git checkout -b feature/update-description

# 2. Make changes
# ... edit files ...

# 3. Test locally
npm run dev
npm run build  # Ensure build passes

# 4. Commit and push
git add .
git commit -m "feat: update portfolio description"
git push origin feature/update-description

# 5. Create pull request
# Merge to main when ready

# 6. Deployment (automatic with Vercel GitHub integration)
# Or manually: vercel --prod
```

### Regular Maintenance
- **Weekly**: Check for dependency updates with `npm outdated`
- **Monthly**: Review and update portfolio content
- **Quarterly**: Performance audit with Lighthouse
- **Annually**: Update resume and work experience

## 🛠️ Troubleshooting

### Common Build Issues
```bash
# Clear Next.js cache
rm -rf .next

# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run type-check
```

### Deployment Failures
1. Check build logs in Vercel dashboard
2. Ensure all environment variables are set
3. Verify Node.js version compatibility
4. Check for missing dependencies

### Performance Issues
1. Run bundle analyzer: `npm run analyze`
2. Check image sizes and formats
3. Review unused dependencies
4. Optimize third-party scripts

## 📈 Analytics & Monitoring

### Google Analytics (Optional)
Add your GA tracking ID to environment variables and update the tracking code in the layout.

### Error Monitoring
Consider integrating:
- Sentry for error tracking
- Vercel Analytics for performance monitoring
- Google Search Console for SEO monitoring

## 🔒 Security

### Best Practices Implemented
- CSP headers configured
- HTTPS enforced
- No sensitive data in client-side code
- Dependencies regularly updated
- Environment variables used for secrets

### Security Checklist
- [ ] All dependencies up to date
- [ ] No hardcoded secrets
- [ ] HTTPS enforced
- [ ] CSP headers configured
- [ ] Regular security audits

## 📞 Support

### Getting Help
- **Documentation**: Check this guide and README.md
- **Issues**: Create GitHub issue for bugs
- **Updates**: Follow the update process above
- **Contact**: anupamkumar0401@gmail.com

### Useful Commands
```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript

# Analysis
npm run analyze      # Bundle analyzer
npm run lighthouse   # Performance audit (custom script)

# Deployment
vercel               # Deploy to Vercel
vercel --prod        # Production deployment
```

---

**Last Updated**: January 2024  
**Version**: 1.0  
**Maintainer**: Anupam Kumar (anupamkumar0401@gmail.com)
