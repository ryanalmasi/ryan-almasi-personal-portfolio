import { useState, useEffect } from 'react';
import { fetchAllProjectData, ProcessedProject } from '../services/github';

interface UseGitHubProjectsReturn {
  projects: ProcessedProject[];
  technologies: string[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useGitHubProjects(): UseGitHubProjectsReturn {
  const [projects, setProjects] = useState<ProcessedProject[]>([]);
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchAllProjectData();
      setProjects(data.projects);
      setTechnologies(data.technologies);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch projects';
      setError(errorMessage);
      console.error('Error in useGitHubProjects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    projects,
    technologies,
    loading,
    error,
    refetch: fetchData
  };
}
