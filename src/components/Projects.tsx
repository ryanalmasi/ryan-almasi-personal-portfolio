'use client'

import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { FaGithub, FaExternalLinkAlt, FaTimes, FaSpinner, FaExclamationTriangle, FaRedo } from 'react-icons/fa'
import { useGitHubProjects } from '../hooks/useGitHubProjects'
import { filterProjectsByTechnology } from '../services/github'
import type { ProcessedProject } from '../services/github'

const ProjectsSection = styled.section`
  padding: ${({ theme }) => theme.spacing['5xl']} 0;
  background-color: ${({ theme }) => theme.colors.light.background};

  [data-theme='dark'] & {
    background-color: ${({ theme }) => theme.colors.dark.background};
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 0 ${({ theme }) => theme.spacing.xl};
  }
`

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};
`

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.light.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.text};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }
`

const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.light.textSecondary};
  max-width: 600px;
  margin: 0 auto;

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.textSecondary};
  }
`

const FilterButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`

const FilterButton = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border: 2px solid ${({ theme }) => theme.colors.light.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ $active, theme }) => 
    $active ? theme.colors.light.primary : 'transparent'};
  color: ${({ $active, theme }) => 
    $active ? 'white' : theme.colors.light.text};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.light.primary};
    background-color: ${({ $active, theme }) => 
      $active ? theme.colors.light.primary : theme.colors.light.surface};
  }

  [data-theme='dark'] & {
    border-color: ${({ theme }) => theme.colors.dark.border};
    background-color: ${({ $active, theme }) => 
      $active ? theme.colors.dark.primary : 'transparent'};
    color: ${({ $active, theme }) => 
      $active ? 'white' : theme.colors.dark.text};

    &:hover {
      border-color: ${({ theme }) => theme.colors.dark.primary};
      background-color: ${({ $active, theme }) => 
        $active ? theme.colors.dark.primary : theme.colors.dark.surface};
    }
  }
`

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`

const ProjectCard = styled.div`
  background-color: ${({ theme }) => theme.colors.light.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all ${({ theme }) => theme.transitions.normal};
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  [data-theme='dark'] & {
    background-color: ${({ theme }) => theme.colors.dark.surface};
  }
`

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.light.primary}20, 
    ${({ theme }) => theme.colors.light.secondary}20);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.light.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};

  [data-theme='dark'] & {
    background: linear-gradient(135deg, 
      ${({ theme }) => theme.colors.dark.primary}20, 
      ${({ theme }) => theme.colors.dark.secondary}20);
    color: ${({ theme }) => theme.colors.dark.textSecondary};
  }
`

const ProjectContent = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`

const ProjectTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.light.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.text};
  }
`

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.light.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.6;

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.textSecondary};
  }
`

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const TechTag = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.light.primary}20;
  color: ${({ theme }) => theme.colors.light.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  [data-theme='dark'] & {
    background-color: ${({ theme }) => theme.colors.dark.primary}20;
    color: ${({ theme }) => theme.colors.dark.primary};
  }
`

const ProjectLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.light.surface};
  color: ${({ theme }) => theme.colors.light.primary};
  border: 1px solid ${({ theme }) => theme.colors.light.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: all ${({ theme }) => theme.transitions.fast};
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.light.primary};
    color: white;
  }

  [data-theme='dark'] & {
    background-color: ${({ theme }) => theme.colors.dark.surface};
    color: ${({ theme }) => theme.colors.dark.primary};
    border-color: ${({ theme }) => theme.colors.dark.border};

    &:hover {
      background-color: ${({ theme }) => theme.colors.dark.primary};
    }
  }
`

// Modal styles
const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: ${({ $isOpen }) => $isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: ${({ theme }) => theme.spacing.md};
`

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.light.background};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;

  [data-theme='dark'] & {
    background-color: ${({ theme }) => theme.colors.dark.background};
  }
`

const ModalCloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.light.text};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.light.surface};
  }

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.text};

    &:hover {
      background-color: ${({ theme }) => theme.colors.dark.surface};
    }
  }
`

const ModalImage = styled.div`
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.light.primary}20, 
    ${({ theme }) => theme.colors.light.secondary}20);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.light.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.xl};

  [data-theme='dark'] & {
    background: linear-gradient(135deg, 
      ${({ theme }) => theme.colors.dark.primary}20, 
      ${({ theme }) => theme.colors.dark.secondary}20);
    color: ${({ theme }) => theme.colors.dark.textSecondary};
  }
`

const ModalBody = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`

const ModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.light.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.text};
  }
`

const ModalDescription = styled.p`
  color: ${({ theme }) => theme.colors.light.textSecondary};
  line-height: 1.7;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.textSecondary};
  }
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing['4xl']} 0;
  text-align: center;
`

const LoadingSpinner = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.light.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  animation: spin 1s linear infinite;

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.primary};
  }
`

const LoadingText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.light.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.textSecondary};
  }
`

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing['4xl']} 0;
  text-align: center;
`

const ErrorIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.light.error};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.error};
  }
`

const ErrorText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.light.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.textSecondary};
  }
`

const RetryButton = styled.button`
  background-color: ${({ theme }) => theme.colors.light.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &:hover {
    background-color: ${({ theme }) => theme.colors.light.secondary};
    transform: translateY(-2px);
  }

  [data-theme='dark'] & {
    background-color: ${({ theme }) => theme.colors.dark.primary};

    &:hover {
      background-color: ${({ theme }) => theme.colors.dark.secondary};
    }
  }
`

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProcessedProject | null>(null)
  const [activeFilter, setActiveFilter] = useState('All Projects')
  const projectsRef = useRef<HTMLElement>(null)
  
  const { projects, technologies, loading, error, refetch } = useGitHubProjects()
  const filteredProjects = filterProjectsByTechnology(projects, activeFilter)

  useEffect(() => {
    if (projectsRef.current && typeof window !== 'undefined') {
      // Dynamically import GSAP
      import('gsap').then(({ gsap }) => {
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger)
          
          // Set initial state
          gsap.set(['.projects-header', '.project-card'], {
            opacity: 0,
            y: 50
          })
          
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: projectsRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          })

          tl.to('.projects-header', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          })
          .to('.project-card', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out'
          }, '-=0.4')
        })
      })
    }
  }, [])

  return (
    <ProjectsSection id="projects" ref={projectsRef}>
      <Container>
        <SectionHeader className="projects-header">
          <SectionTitle>Featured Projects</SectionTitle>
          <SectionSubtitle>
            A showcase of my recent work and side projects
          </SectionSubtitle>
        </SectionHeader>

        {loading ? (
          <LoadingContainer>
            <LoadingSpinner>
              <FaSpinner />
            </LoadingSpinner>
            <LoadingText>Fetching projects from GitHub...</LoadingText>
          </LoadingContainer>
        ) : error ? (
          <ErrorContainer>
            <ErrorIcon>
              <FaExclamationTriangle />
            </ErrorIcon>
            <ErrorText>
              Failed to load projects: {error}
            </ErrorText>
            <RetryButton onClick={refetch}>
              <FaRedo />
              Try Again
            </RetryButton>
          </ErrorContainer>
        ) : (
          <>
            <FilterButtons>
              {technologies.slice(0, 7).map(tech => (
                <FilterButton
                  key={tech}
                  $active={activeFilter === tech}
                  onClick={() => setActiveFilter(tech)}
                >
                  {tech}
                </FilterButton>
              ))}
            </FilterButtons>

            <ProjectsGrid>
              {filteredProjects.map(project => (
                <ProjectCard 
                  key={project.id} 
                  className="project-card"
                  onClick={() => setSelectedProject(project)}
                >
                  <ProjectImage>
                    {project.name} Preview
                  </ProjectImage>
                  <ProjectContent>
                    <ProjectTitle>{project.name}</ProjectTitle>
                    <ProjectDescription>{project.description}</ProjectDescription>
                    <TechStack>
                      {project.languages.slice(0, 4).map(tech => (
                        <TechTag key={tech}>{tech}</TechTag>
                      ))}
                    </TechStack>
                    <ProjectLinks>
                      <ProjectLink 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGithub />
                        Code
                      </ProjectLink>
                      {project.liveUrl && (
                        <ProjectLink 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaExternalLinkAlt />
                          Live Demo
                        </ProjectLink>
                      )}
                    </ProjectLinks>
                  </ProjectContent>
                </ProjectCard>
              ))}
            </ProjectsGrid>
          </>
        )}

        {/* Project Modal */}
        <ModalOverlay 
          $isOpen={!!selectedProject}
          onClick={() => setSelectedProject(null)}
        >
          {selectedProject && (
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalCloseButton onClick={() => setSelectedProject(null)}>
                <FaTimes />
              </ModalCloseButton>
              <ModalImage>
                {selectedProject.name} - Full Preview
              </ModalImage>
              <ModalBody>
                <ModalTitle>{selectedProject.name}</ModalTitle>
                <ModalDescription>{selectedProject.description}</ModalDescription>
                <TechStack>
                  {selectedProject.languages.map(tech => (
                    <TechTag key={tech}>{tech}</TechTag>
                  ))}
                </TechStack>
                <ProjectLinks>
                  {selectedProject.githubUrl && (
                    <ProjectLink 
                      href={selectedProject.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <FaGithub />
                      View Code
                    </ProjectLink>
                  )}
                  {selectedProject.liveUrl && (
                    <ProjectLink 
                      href={selectedProject.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <FaExternalLinkAlt />
                      Live Demo
                    </ProjectLink>
                  )}
                </ProjectLinks>
              </ModalBody>
            </ModalContent>
          )}
        </ModalOverlay>
      </Container>
    </ProjectsSection>
  )
}
