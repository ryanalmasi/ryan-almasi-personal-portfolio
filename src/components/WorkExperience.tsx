'use client'

import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { FaCalendarAlt, FaMapMarkerAlt, FaCode, FaTrophy } from 'react-icons/fa'
import { workExperiences } from '../data/workExperience'

const WorkExperienceSection = styled.section`
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
  margin-bottom: ${({ theme }) => theme.spacing.md};

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.text};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
  }
`

const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.light.textSecondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.textSecondary};
  }
`

const ExperienceGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing['2xl']};
`

const ExperienceCard = styled.div`
  background-color: ${({ theme }) => theme.colors.light.surface};
  border: 1px solid ${({ theme }) => theme.colors.light.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing['2xl']};
  transition: all ${({ theme }) => theme.transitions.normal};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.light.primary},
      ${({ theme }) => theme.colors.light.secondary}
    );
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-color: ${({ theme }) => theme.colors.light.primary};
  }

  [data-theme='dark'] & {
    background-color: ${({ theme }) => theme.colors.dark.surface};
    border-color: ${({ theme }) => theme.colors.dark.border};

    &::before {
      background: linear-gradient(
        to bottom,
        ${({ theme }) => theme.colors.dark.primary},
        ${({ theme }) => theme.colors.dark.secondary}
      );
    }

    &:hover {
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      border-color: ${({ theme }) => theme.colors.dark.primary};
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.spacing['3xl']};
  }
`

const ExperienceHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`

const PositionInfo = styled.div`
  flex: 1;
`

const CompanyName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.light.text};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.text};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }
`

const PositionTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.light.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.primary};
  }
`

const ExperienceMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: flex-start;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    align-items: flex-end;
    text-align: right;
  }
`

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.light.textSecondary};

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.textSecondary};
  }

  svg {
    color: ${({ theme }) => theme.colors.light.primary};
    flex-shrink: 0;

    [data-theme='dark'] & {
      color: ${({ theme }) => theme.colors.dark.primary};
    }
  }
`

const ExperienceType = styled.span`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.light.primary}20;
  color: ${({ theme }) => theme.colors.light.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: capitalize;

  [data-theme='dark'] & {
    background-color: ${({ theme }) => theme.colors.dark.primary}20;
    color: ${({ theme }) => theme.colors.dark.primary};
  }
`

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.light.textSecondary};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.textSecondary};
  }
`

const AchievementsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
`

const AchievementItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.light.textSecondary};
  line-height: 1.5;

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.textSecondary};
  }

  &::before {
    content: '🏆';
    flex-shrink: 0;
    margin-top: 2px;
  }
`

const TechnologiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`

const TechnologyTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.light.surface};
  color: ${({ theme }) => theme.colors.light.text};
  border: 1px solid ${({ theme }) => theme.colors.light.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  [data-theme='dark'] & {
    background-color: ${({ theme }) => theme.colors.dark.surface};
    color: ${({ theme }) => theme.colors.dark.text};
    border-color: ${({ theme }) => theme.colors.dark.border};
  }

  svg {
    color: ${({ theme }) => theme.colors.light.primary};

    [data-theme='dark'] & {
      color: ${({ theme }) => theme.colors.dark.primary};
    }
  }
`

export default function WorkExperience() {
  const workExperienceRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (workExperienceRef.current && typeof window !== 'undefined') {
      // Dynamically import GSAP
      import('gsap').then(({ gsap }) => {
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger)
          
          // Set initial state
          gsap.set(['.work-experience-header', '.experience-card'], {
            opacity: 0,
            y: 50
          })
          
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: workExperienceRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          })

          tl.to('.work-experience-header', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          })
          .to('.experience-card', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power2.out'
          }, '-=0.4')
        })
      })
    }
  }, [])

  return (
    <WorkExperienceSection id="work-experience" ref={workExperienceRef}>
      <Container>
        <SectionHeader className="work-experience-header">
          <SectionTitle>Work Experience</SectionTitle>
          <SectionSubtitle>
            My professional journey in software development and technology
          </SectionSubtitle>
        </SectionHeader>

        <ExperienceGrid>
          {workExperiences.map((experience) => (
            <ExperienceCard key={experience.id} className="experience-card">
              <ExperienceHeader>
                <PositionInfo>
                  <CompanyName>{experience.company}</CompanyName>
                  <PositionTitle>{experience.position}</PositionTitle>
                  <ExperienceType>{experience.type.replace('-', ' ')}</ExperienceType>
                </PositionInfo>
                
                <ExperienceMeta>
                  <MetaItem>
                    <FaCalendarAlt />
                    <span>
                      {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                    </span>
                  </MetaItem>
                  <MetaItem>
                    <FaMapMarkerAlt />
                    <span>{experience.location}</span>
                  </MetaItem>
                </ExperienceMeta>
              </ExperienceHeader>

              <Description>{experience.description}</Description>

              <AchievementsList>
                {experience.achievements.map((achievement, index) => (
                  <AchievementItem key={index}>
                    {achievement}
                  </AchievementItem>
                ))}
              </AchievementsList>

              <TechnologiesList>
                {experience.technologies.map((tech) => (
                  <TechnologyTag key={tech}>
                    <FaCode />
                    {tech}
                  </TechnologyTag>
                ))}
              </TechnologiesList>
            </ExperienceCard>
          ))}
        </ExperienceGrid>
      </Container>
    </WorkExperienceSection>
  )
}
