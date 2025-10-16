'use client'

import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { skills, getSkillCategories } from '../data/skills'

const SkillsSection = styled.section`
  padding: ${({ theme }) => theme.spacing['5xl']} 0;
  background-color: ${({ theme }) => theme.colors.light.surface};

  [data-theme='dark'] & {
    background-color: ${({ theme }) => theme.colors.dark.surface};
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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing['3xl']};
`

const SkillCategory = styled.div`
  background-color: ${({ theme }) => theme.colors.light.background};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  [data-theme='dark'] & {
    background-color: ${({ theme }) => theme.colors.dark.background};
  }
`

const CategoryTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.light.text};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  text-transform: capitalize;

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.text};
  }
`

const SkillsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const SkillItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

const SkillName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.light.text};

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.text};
  }
`

const SkillLevel = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`

const LevelDot = styled.div<{ $filled: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ $filled, theme }) => 
    $filled ? theme.colors.light.primary : theme.colors.light.border};
  transition: all ${({ theme }) => theme.transitions.fast};

  [data-theme='dark'] & {
    background-color: ${({ $filled, theme }) => 
      $filled ? theme.colors.dark.primary : theme.colors.dark.border};
  }
`

const SkillLevelBar = styled.div`
  flex: 1;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.light.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
  position: relative;

  [data-theme='dark'] & {
    background-color: ${({ theme }) => theme.colors.dark.border};
  }
`

const SkillLevelFill = styled.div<{ $level: number }>`
  height: 100%;
  width: ${({ $level }) => ($level / 5) * 100}%;
  background: linear-gradient(90deg, 
    ${({ theme }) => theme.colors.light.primary}, 
    ${({ theme }) => theme.colors.light.secondary});
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: width 1s ease-out;

  [data-theme='dark'] & {
    background: linear-gradient(90deg, 
      ${({ theme }) => theme.colors.dark.primary}, 
      ${({ theme }) => theme.colors.dark.secondary});
  }
`

const AlternativeSkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`

const SkillCard = styled.div`
  background-color: ${({ theme }) => theme.colors.light.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all ${({ theme }) => theme.transitions.normal};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, 
      ${({ theme }) => theme.colors.light.primary}, 
      ${({ theme }) => theme.colors.light.secondary});
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  [data-theme='dark'] & {
    background-color: ${({ theme }) => theme.colors.dark.background};
  }
`

const SkillCardTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.light.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.text};
  }
`

const SkillCardLevel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.light.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.textSecondary};
  }
`

const getLevelText = (level: number) => {
  const levels = ['Beginner', 'Novice', 'Intermediate', 'Advanced', 'Expert']
  return levels[level - 1] || 'Beginner'
}

export default function Skills() {
  const skillsRef = useRef<HTMLElement>(null)
  const skillCategories = getSkillCategories()

  useEffect(() => {
    if (skillsRef.current && typeof window !== 'undefined') {
      // Dynamically import GSAP
      import('gsap').then(({ gsap }) => {
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger)
          
          // Set initial state
          gsap.set(['.skills-header', '.skill-category'], {
            opacity: 0,
            y: 50
          })
          gsap.set('.skill-fill', {
            width: 0
          })
          
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: skillsRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          })

          tl.to('.skills-header', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          })
          .to('.skill-category', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out'
          }, '-=0.4')
          .to('.skill-fill', {
            width: '100%',
            duration: 1,
            stagger: 0.05,
            ease: 'power2.out'
          }, '-=0.2')
        })
      })
    }
  }, [])

  return (
    <SkillsSection id="skills" ref={skillsRef}>
      <Container>
        <SectionHeader className="skills-header">
          <SectionTitle>Skills & Technologies</SectionTitle>
          <SectionSubtitle>
            My technical expertise and proficiency levels
          </SectionSubtitle>
        </SectionHeader>

        <SkillsGrid>
          {skillCategories.map(category => {
            const categorySkills = skills.filter(skill => skill.category === category)
            
            return (
              <SkillCategory key={category} className="skill-category">
                <CategoryTitle>{category}</CategoryTitle>
                <SkillsList>
                  {categorySkills.map(skill => (
                    <SkillItem key={skill.name}>
                      <SkillName>{skill.name}</SkillName>
                      <SkillLevelBar>
                        <SkillLevelFill 
                          $level={skill.level} 
                          className="skill-fill"
                        />
                      </SkillLevelBar>
                    </SkillItem>
                  ))}
                </SkillsList>
              </SkillCategory>
            )
          })}
        </SkillsGrid>

        {/* Alternative view - Top skills */}
        <SectionHeader style={{ marginTop: '4rem' }}>
          <SectionTitle>Top Skills</SectionTitle>
          <SectionSubtitle>
            My most proficient technologies and tools
          </SectionSubtitle>
        </SectionHeader>

        <AlternativeSkillsGrid>
          {skills
            .sort((a, b) => b.level - a.level)
            .slice(0, 8)
            .map(skill => (
              <SkillCard key={skill.name}>
                <SkillCardTitle>{skill.name}</SkillCardTitle>
                <SkillCardLevel>{getLevelText(skill.level)}</SkillCardLevel>
                <SkillLevelBar>
                  <SkillLevelFill $level={skill.level} className="skill-fill" />
                </SkillLevelBar>
              </SkillCard>
            ))}
        </AlternativeSkillsGrid>
      </Container>
    </SkillsSection>
  )
}
