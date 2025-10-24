'use client'

import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaCalendarAlt, FaMapMarkerAlt, FaCode, FaTrophy } from 'react-icons/fa'
import { getAllExperiences, CompanyExperience, WorkExperience as WorkExp } from '../data/workExperience'
import FlipClock from './FlipClock'

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

const SectionSubtitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.light.textSecondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

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

const JobTitle = styled.h4`
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
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  &:last-child {
    margin-bottom: 0;
  }
`

const AchievementTitle = styled.h5`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.light.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.primary};
  }

  &::before {
    content: '🏆';
    flex-shrink: 0;
  }
`

const AchievementDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.light.textSecondary};
  line-height: 1.5;
  margin: 0;
  padding-left: calc(1.2em + ${({ theme }) => theme.spacing.sm});

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.textSecondary};
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

// Grouped Experience Components
const GroupedCard = styled.div`
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

const GroupedHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.light.border};

  [data-theme='dark'] & {
    border-bottom-color: ${({ theme }) => theme.colors.dark.border};
  }
`

const CompanyDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.light.textSecondary};
  line-height: 1.6;
  margin: ${({ theme }) => theme.spacing.md} 0 0 0;
  font-style: italic;

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.textSecondary};
  }
`

const PositionsList = styled.div`
  position: relative;
`

const PositionItem = styled.div`
  position: relative;
  padding-left: ${({ theme }) => theme.spacing['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  &:last-child {
    margin-bottom: 0;
  }

  &::before {
    content: '';
    position: absolute;
    left: 8px;
    top: 6px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.light.primary};
    border: 3px solid ${({ theme }) => theme.colors.light.surface};
    z-index: 2;

    [data-theme='dark'] & {
      background-color: ${({ theme }) => theme.colors.dark.primary};
      border-color: ${({ theme }) => theme.colors.dark.surface};
    }
  }

  &::after {
    content: '';
    position: absolute;
    left: 16px;
    top: 24px;
    bottom: -16px;
    width: 2px;
    background-color: ${({ theme }) => theme.colors.light.border};

    [data-theme='dark'] & {
      background-color: ${({ theme }) => theme.colors.dark.border};
    }
  }

  &:last-child::after {
    display: none;
  }
`

const PositionHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const PositionTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.light.text};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.text};
  }
`

const PositionDates = styled.div`
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

// Type guard functions
const isGroupedExperience = (exp: WorkExp | CompanyExperience): exp is CompanyExperience => {
  return 'positions' in exp && 'isGrouped' in exp;
}

// Helper function to get all technologies for a grouped experience
const getGroupedTechnologies = (company: CompanyExperience): string[] => {
  const allTechs = company.positions.flatMap(pos => pos.technologies);
  return Array.from(new Set(allTechs));
}

// Date parsing and experience calculation
const parseDate = (dateStr: string): Date => {
  return new Date(dateStr + ' 1');
}

const calculateTotalExperience = (): { years: number; months: number; totalMonths: number } => {
  const allExperiences = getAllExperiences();
  const periods: Array<{ start: Date; end: Date }> = [];

  // Collect all experience periods
  allExperiences.forEach((exp) => {
    if (isGroupedExperience(exp)) {
      exp.positions.forEach((position) => {
        periods.push({
          start: parseDate(position.startDate),
          end: position.current ? new Date() : parseDate(position.endDate)
        });
      });
    } else {
      periods.push({
        start: parseDate(exp.startDate),
        end: exp.current ? new Date() : parseDate(exp.endDate)
      });
    }
  });

  // Sort periods by start date
  periods.sort((a, b) => a.start.getTime() - b.start.getTime());

  // Merge overlapping periods
  const mergedPeriods: Array<{ start: Date; end: Date }> = [];
  periods.forEach((period) => {
    if (mergedPeriods.length === 0) {
      mergedPeriods.push(period);
    } else {
      const last = mergedPeriods[mergedPeriods.length - 1];
      if (period.start <= last.end) {
        last.end = new Date(Math.max(last.end.getTime(), period.end.getTime()));
      } else {
        mergedPeriods.push(period);
      }
    }
  });

  // Calculate total months
  let totalMonths = 0;
  mergedPeriods.forEach((period) => {
    const yearsDiff = period.end.getFullYear() - period.start.getFullYear();
    const monthsDiff = period.end.getMonth() - period.start.getMonth();
    totalMonths += yearsDiff * 12 + monthsDiff;
  });

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return { years, months, totalMonths };
}


export default function WorkExperience() {
  const workExperienceRef = useRef<HTMLElement>(null)
  const allExperiences = getAllExperiences()
  const experienceData = calculateTotalExperience()
  const [shouldAnimateFlipClock, setShouldAnimateFlipClock] = useState(false)

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
              toggleActions: 'play none none reverse',
              onEnter: () => setShouldAnimateFlipClock(true),
              onLeave: () => setShouldAnimateFlipClock(false),
              onEnterBack: () => setShouldAnimateFlipClock(true),
              onLeaveBack: () => setShouldAnimateFlipClock(false)
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

  const renderIndividualExperience = (experience: WorkExp) => (
    <ExperienceCard key={experience.id} className="experience-card">
      <ExperienceHeader>
        <PositionInfo>
          <CompanyName>{experience.company}</CompanyName>
          <JobTitle>{experience.position}</JobTitle>
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
            <AchievementTitle>{achievement.title}</AchievementTitle>
            <AchievementDescription>{achievement.description}</AchievementDescription>
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
  )

  const renderGroupedExperience = (company: CompanyExperience) => (
    <GroupedCard key={company.id} className="experience-card">
      <GroupedHeader>
        <ExperienceHeader>
          <PositionInfo>
            <CompanyName>{company.company}</CompanyName>
            <MetaItem>
              <FaMapMarkerAlt />
              <span>{company.location}</span>
            </MetaItem>
          </PositionInfo>
        </ExperienceHeader>
        <CompanyDescription>{company.description}</CompanyDescription>
      </GroupedHeader>

      <PositionsList>
        {company.positions.map((position) => (
          <PositionItem key={position.id}>
            <PositionHeader>
              <PositionTitle>{position.position}</PositionTitle>
              <PositionDates>
                <FaCalendarAlt />
                <span>
                  {position.startDate} - {position.current ? 'Present' : position.endDate}
                </span>
                <ExperienceType>{position.type.replace('-', ' ')}</ExperienceType>
              </PositionDates>
            </PositionHeader>

            <Description>{position.description}</Description>

            <AchievementsList>
              {position.achievements.map((achievement, index) => (
                <AchievementItem key={index}>
                  <AchievementTitle>{achievement.title}</AchievementTitle>
                  <AchievementDescription>{achievement.description}</AchievementDescription>
                </AchievementItem>
              ))}
            </AchievementsList>

            <TechnologiesList>
              {position.technologies.map((tech) => (
                <TechnologyTag key={tech}>
                  <FaCode />
                  {tech}
                </TechnologyTag>
              ))}
            </TechnologiesList>
          </PositionItem>
        ))}
      </PositionsList>
    </GroupedCard>
  )

  return (
    <WorkExperienceSection id="work-experience" ref={workExperienceRef}>
      <Container>
        <SectionHeader className="work-experience-header">
          <SectionTitle>Work Experience</SectionTitle>
          <SectionSubtitle>
            <span>My professional journey in software development and technology</span>
            <FlipClock years={experienceData.years} months={experienceData.months} shouldAnimate={shouldAnimateFlipClock} />
          </SectionSubtitle>
        </SectionHeader>

        <ExperienceGrid>
          {allExperiences.map((experience) => {
            if (isGroupedExperience(experience)) {
              return renderGroupedExperience(experience)
            } else {
              return renderIndividualExperience(experience)
            }
          })}
        </ExperienceGrid>
      </Container>
    </WorkExperienceSection>
  )
}
