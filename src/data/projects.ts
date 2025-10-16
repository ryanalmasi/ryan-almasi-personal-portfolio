export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  image: string
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  category: 'web' | 'mobile' | 'desktop' | 'other'
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with modern UI/UX and secure payment integration.',
    longDescription: 'Built a comprehensive e-commerce platform using React and Node.js with features including user authentication, product management, shopping cart, payment processing, and admin dashboard. Implemented responsive design and optimized for performance.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    image: '/images/project-1.jpg',
    githubUrl: 'https://github.com/yourusername/ecommerce-platform',
    liveUrl: 'https://your-ecommerce-site.com',
    featured: true,
    category: 'web'
  },
  {
    id: 'project-2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team collaboration features.',
    longDescription: 'Developed a task management application using React and Socket.io for real-time collaboration. Features include drag-and-drop interface, team management, deadline tracking, and progress visualization.',
    technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL', 'Material-UI'],
    image: '/images/project-2.jpg',
    githubUrl: 'https://github.com/yourusername/task-manager',
    featured: true,
    category: 'web'
  },
  {
    id: 'project-3',
    title: 'Weather Dashboard',
    description: 'A responsive weather dashboard with location-based forecasts and interactive maps.',
    longDescription: 'Created a weather dashboard that provides current weather conditions, 7-day forecasts, and interactive weather maps. Includes location search, weather alerts, and customizable widgets.',
    technologies: ['React', 'TypeScript', 'OpenWeather API', 'Leaflet', 'Styled Components'],
    image: '/images/project-3.jpg',
    githubUrl: 'https://github.com/yourusername/weather-dashboard',
    liveUrl: 'https://your-weather-app.com',
    featured: true,
    category: 'web'
  },
  {
    id: 'project-4',
    title: 'Blog CMS',
    description: 'A content management system for blogs with markdown support and SEO optimization.',
    longDescription: 'Built a headless CMS for blogs using Next.js and Sanity. Features include markdown editing, image optimization, SEO tools, and a custom admin interface.',
    technologies: ['Next.js', 'Sanity', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    image: '/images/project-4.jpg',
    githubUrl: 'https://github.com/yourusername/blog-cms',
    featured: false,
    category: 'web'
  },
  {
    id: 'project-5',
    title: 'Mobile Expense Tracker',
    description: 'A React Native app for tracking personal expenses with data visualization.',
    longDescription: 'Developed a mobile expense tracking application using React Native with features for categorizing expenses, setting budgets, and viewing spending analytics through interactive charts.',
    technologies: ['React Native', 'Expo', 'Firebase', 'Reanimated', 'Victory Native'],
    image: '/images/project-5.jpg',
    githubUrl: 'https://github.com/yourusername/expense-tracker',
    featured: false,
    category: 'mobile'
  },
  {
    id: 'project-6',
    title: 'Data Visualization Tool',
    description: 'A Python application for creating interactive data visualizations and dashboards.',
    longDescription: 'Created a data visualization tool using Python and Streamlit that allows users to upload CSV files and create interactive charts, graphs, and dashboards with customizable styling.',
    technologies: ['Python', 'Streamlit', 'Pandas', 'Plotly', 'NumPy'],
    image: '/images/project-6.jpg',
    githubUrl: 'https://github.com/yourusername/data-viz-tool',
    featured: false,
    category: 'other'
  }
]

export const getFeaturedProjects = () => projects.filter(project => project.featured)
export const getProjectsByCategory = (category: string) => 
  projects.filter(project => project.category === category)
export const getAllTechnologies = () => {
  const techs = new Set<string>()
  projects.forEach(project => {
    project.technologies.forEach(tech => techs.add(tech))
  })
  return Array.from(techs).sort()
}
