export interface Skill {
  name: string
  level: number // 1-5 scale
  category: 'languages' | 'frameworks' | 'tools' | 'databases' | 'other'
  icon?: string
}

export const skills: Skill[] = [
  // Languages
  { name: 'JavaScript', level: 5, category: 'languages' },
  { name: 'TypeScript', level: 4, category: 'languages' },
  { name: 'Python', level: 4, category: 'languages' },
  { name: 'Java', level: 3, category: 'languages' },
  { name: 'C++', level: 3, category: 'languages' },
  { name: 'HTML/CSS', level: 5, category: 'languages' },
  { name: 'SQL', level: 4, category: 'languages' },

  // Frameworks & Libraries
  { name: 'React', level: 5, category: 'frameworks' },
  { name: 'Next.js', level: 4, category: 'frameworks' },
  { name: 'Node.js', level: 4, category: 'frameworks' },
  { name: 'Express', level: 4, category: 'frameworks' },
  { name: 'React Native', level: 3, category: 'frameworks' },
  { name: 'Vue.js', level: 3, category: 'frameworks' },
  { name: 'Django', level: 3, category: 'frameworks' },
  { name: 'Flask', level: 3, category: 'frameworks' },

  // Tools & Technologies
  { name: 'Git', level: 4, category: 'tools' },
  { name: 'Docker', level: 3, category: 'tools' },
  { name: 'AWS', level: 3, category: 'tools' },
  { name: 'Vercel', level: 4, category: 'tools' },
  { name: 'Firebase', level: 3, category: 'tools' },
  { name: 'Webpack', level: 3, category: 'tools' },
  { name: 'Jest', level: 3, category: 'tools' },
  { name: 'Cypress', level: 2, category: 'tools' },

  // Databases
  { name: 'MongoDB', level: 4, category: 'databases' },
  { name: 'PostgreSQL', level: 4, category: 'databases' },
  { name: 'MySQL', level: 3, category: 'databases' },
  { name: 'Redis', level: 2, category: 'databases' },

  // Other
  { name: 'REST APIs', level: 4, category: 'other' },
  { name: 'GraphQL', level: 3, category: 'other' },
  { name: 'WebSocket', level: 3, category: 'other' },
  { name: 'Microservices', level: 2, category: 'other' }
]

export const getSkillsByCategory = (category: string) => 
  skills.filter(skill => skill.category === category)

export const getSkillCategories = () => {
  const categories = new Set<string>()
  skills.forEach(skill => categories.add(skill.category))
  return Array.from(categories)
}

export const getTopSkills = (limit: number = 8) => 
  skills.sort((a, b) => b.level - a.level).slice(0, limit)
