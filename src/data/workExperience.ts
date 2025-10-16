export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  type: 'full-time' | 'part-time' | 'internship' | 'contract' | 'freelance';
}

export const workExperiences: WorkExperience[] = [
  {
    id: '1',
    company: 'RBC Borealis.',
    position: 'Data Engineering Co-op',
    location: 'Hybrid',
    startDate: 'May 2025',
    endDate: 'December 2025',
    current: false,
    description: 'Worked as a software engineering intern focusing on full-stack development and modern web technologies.',
    achievements: [
      'Developed responsive web applications using React and Node.js',
      'Collaborated with senior developers on feature implementation',
      'Improved application performance by 25% through code optimization',
      'Participated in agile development processes and code reviews'
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Git'],
    type: 'internship'
  },
  {
    id: '2',
    company: 'StartupXYZ',
    position: 'Frontend Developer',
    location: 'San Francisco, CA',
    startDate: 'January 2024',
    endDate: 'May 2024',
    current: false,
    description: 'Part-time frontend development role working on user interface components and user experience improvements.',
    achievements: [
      'Built reusable React components used across multiple projects',
      'Implemented responsive design patterns for mobile and desktop',
      'Reduced page load times by 30% through optimization techniques',
      'Mentored junior developers and conducted code reviews'
    ],
    technologies: ['React', 'TypeScript', 'CSS3', 'Figma', 'Jest'],
    type: 'part-time'
  },
  {
    id: '3',
    company: 'Freelance Projects',
    position: 'Full-Stack Developer',
    location: 'Remote',
    startDate: 'September 2023',
    endDate: 'December 2023',
    current: false,
    description: 'Worked on various freelance projects including e-commerce platforms and business websites.',
    achievements: [
      'Delivered 5+ client projects on time and within budget',
      'Implemented secure payment processing systems',
      'Created custom content management systems',
      'Maintained 100% client satisfaction rate'
    ],
    technologies: ['React', 'Next.js', 'MongoDB', 'Stripe', 'Vercel'],
    type: 'freelance'
  }
];

export const getExperienceTypes = (): string[] => {
  return Array.from(new Set(workExperiences.map(exp => exp.type)));
};

export const getExperienceTechnologies = (): string[] => {
  const allTechs = workExperiences.flatMap(exp => exp.technologies);
  return Array.from(new Set(allTechs));
};
