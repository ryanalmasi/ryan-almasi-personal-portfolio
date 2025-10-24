// GitHub API Configuration
export const GITHUB_CONFIG = {
  // Replace with your actual GitHub username
  USERNAME: 'ryanalmasi',
  
  // API settings
  API_BASE: 'https://api.github.com',
  
  // Repository filtering
  MAX_REPOSITORIES: 12,
  MAX_LANGUAGES_PER_REPO: 5,
  
  // Activity threshold (days)
  ACTIVE_THRESHOLD_DAYS: 90,
  
  // Excluded repository names (repositories to hide from portfolio)
  EXCLUDED_REPOS: [
    'ryanalmasi', // Profile README
    'portfolio', // If you have a separate portfolio repo
    'resume', // Resume repository
  ] as string[],
  
  // Repository topics to prioritize (repositories with these topics will be shown first)
  PRIORITY_TOPICS: [
    'portfolio',
    'web-development',
    'react',
    'typescript',
    'fullstack',
    'frontend',
    'backend',
    'api',
    'javascript',
    'nodejs',
  ],
} as const;
