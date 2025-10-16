export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  languages_url: string;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  stargazers_count: number;
  forks_count: number;
  size: number;
  default_branch: string;
  archived: boolean;
  disabled: boolean;
  private: boolean;
}

export interface GitHubLanguage {
  [language: string]: number;
}

export interface ProcessedProject {
  id: number;
  name: string;
  description: string;
  githubUrl: string;
  liveUrl: string | null;
  languages: string[];
  topics: string[];
  stars: number;
  forks: number;
  lastUpdated: string;
  isActive: boolean;
}

import { GITHUB_CONFIG } from '../config/github';

/**
 * Fetch all public repositories for a user
 */
export async function fetchUserRepositories(): Promise<GitHubRepository[]> {
  try {
    const response = await fetch(`${GITHUB_CONFIG.API_BASE}/users/${GITHUB_CONFIG.USERNAME}/repos?sort=updated&per_page=100`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    
    const repos: GitHubRepository[] = await response.json();
    
    // Filter out archived, disabled, and private repositories
    return repos.filter(repo => 
      !repo.archived && 
      !repo.disabled && 
      !repo.private &&
      !GITHUB_CONFIG.EXCLUDED_REPOS.includes(repo.name)
    );
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    throw error;
  }
}

/**
 * Fetch languages for a specific repository
 */
export async function fetchRepositoryLanguages(repoName: string): Promise<GitHubLanguage> {
  try {
    const response = await fetch(`${GITHUB_CONFIG.API_BASE}/repos/${GITHUB_CONFIG.USERNAME}/${repoName}/languages`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching languages for ${repoName}:`, error);
    return {};
  }
}

/**
 * Process GitHub repositories into our project format
 */
export async function processGitHubRepositories(repos: GitHubRepository[]): Promise<ProcessedProject[]> {
  const processedProjects: ProcessedProject[] = [];
  
  // Limit to top repositories based on configuration
  const topRepos = repos.slice(0, GITHUB_CONFIG.MAX_REPOSITORIES);
  
  for (const repo of topRepos) {
    try {
      // Fetch languages for this repository
      const languages = await fetchRepositoryLanguages(repo.name);
      const languageNames = Object.keys(languages).slice(0, GITHUB_CONFIG.MAX_LANGUAGES_PER_REPO);
      
      // Determine if project has a live URL
      const liveUrl = repo.homepage && repo.homepage.startsWith('http') 
        ? repo.homepage 
        : null;
      
      // Create a more user-friendly description if none exists
      const description = repo.description || 
        `A ${languageNames[0] || 'software'} project showcasing modern development practices.`;
      
      processedProjects.push({
        id: repo.id,
        name: repo.name,
        description,
        githubUrl: repo.html_url,
        liveUrl,
        languages: languageNames,
        topics: repo.topics,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        lastUpdated: repo.updated_at,
        isActive: new Date(repo.pushed_at) > new Date(Date.now() - GITHUB_CONFIG.ACTIVE_THRESHOLD_DAYS * 24 * 60 * 60 * 1000)
      });
    } catch (error) {
      console.error(`Error processing repository ${repo.name}:`, error);
      // Continue with other repositories even if one fails
    }
  }
  
  return processedProjects;
}

/**
 * Get all unique technologies from repositories
 */
export function getAllTechnologiesFromRepos(projects: ProcessedProject[]): string[] {
  const allTechs = new Set<string>();
  
  projects.forEach(project => {
    project.languages.forEach(lang => allTechs.add(lang));
    project.topics.forEach(topic => allTechs.add(topic));
  });
  
  return Array.from(allTechs).sort();
}

/**
 * Filter projects by technology
 */
export function filterProjectsByTechnology(projects: ProcessedProject[], technology: string): ProcessedProject[] {
  if (technology === 'All Projects') {
    return projects;
  }
  
  return projects.filter(project => 
    project.languages.includes(technology) || 
    project.topics.includes(technology.toLowerCase())
  );
}

/**
 * Main function to fetch and process all project data
 */
export async function fetchAllProjectData(): Promise<{
  projects: ProcessedProject[];
  technologies: string[];
}> {
  try {
    const repos = await fetchUserRepositories();
    const projects = await processGitHubRepositories(repos);
    const technologies = getAllTechnologiesFromRepos(projects);
    
    return {
      projects,
      technologies: ['All Projects', ...technologies]
    };
  } catch (error) {
    console.error('Error fetching project data:', error);
    throw error;
  }
}
