# Ryan Almasi - Personal Portfolio Website

A modern, responsive personal portfolio website built with Next.js, React, TypeScript, and styled-components. Features smooth animations, dark/light theme toggle, and a comprehensive showcase of projects and skills.

## 🚀 Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Responsive**: Fully responsive design that works on all devices
- **Animations**: GSAP-powered animations for smooth user experience
- **Project Showcase**: Interactive project gallery with filtering
- **Skills Section**: Visual representation of technical skills
- **Contact Form**: Functional contact form with validation
- **Blog Section**: Ready for future blog posts
- **SEO Optimized**: Built with Next.js for optimal SEO

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Styled Components
- **Animations**: GSAP (GreenSock Animation Platform)
- **Icons**: React Icons
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Blog.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── ThemeProvider.tsx
│   ├── styles/            # Global styles and theme
│   │   ├── theme.ts
│   │   └── GlobalStyles.ts
│   ├── data/              # Static data
│   │   ├── projects.ts
│   │   └── skills.ts
│   └── utils/             # Utility functions
│       └── animations.ts
├── public/                # Static assets
│   ├── resume.pdf
│   └── images/
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ryan-almasi-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Customization

### Personal Information

1. **Contact Information**: Update contact details in `src/components/Contact.tsx`
2. **Social Links**: Update GitHub, LinkedIn, and email links throughout the components
3. **About Section**: Modify the about content in `src/components/About.tsx`
4. **Projects**: Update project data in `src/data/projects.ts`
5. **Skills**: Update skills data in `src/data/skills.ts`
6. **Resume**: Replace `public/resume.pdf` with your resume

### Styling

- **Theme Colors**: Modify colors in `src/styles/theme.ts`
- **Global Styles**: Update global styles in `src/styles/GlobalStyles.ts`
- **Component Styles**: Each component has its own styled-components

### Content

- **Hero Section**: Update name, title, and description in `src/components/Hero.tsx`
- **About Section**: Modify personal information and features in `src/components/About.tsx`
- **Projects**: Add/remove projects in `src/data/projects.ts`
- **Skills**: Update skills and proficiency levels in `src/data/skills.ts`

## 🎨 Design Features

### Animations
- Smooth scroll-triggered animations using GSAP
- Hover effects and transitions
- Loading animations
- Parallax effects

### Theme System
- Dark and light mode support
- System preference detection
- Smooth theme transitions
- Persistent theme selection

### Responsive Design
- Mobile-first approach
- Breakpoints: 320px, 640px, 768px, 1024px, 1280px, 1536px
- Touch-friendly interactions
- Optimized for all devices

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- GitHub Pages
- AWS Amplify
- Railway

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Ryan Almasi**
- Email: your.email@example.com
- LinkedIn: [Your LinkedIn Profile]
- GitHub: [Your GitHub Profile]

---

Built with ❤️ by Ryan Almasi
