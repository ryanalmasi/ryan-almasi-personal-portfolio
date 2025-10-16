'use client'

import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { FaCode, FaGraduationCap, FaLightbulb, FaRocket } from 'react-icons/fa'

const AboutSection = styled.section`
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

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing['4xl']};
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing['5xl']};
  }
`

const AboutText = styled.div`
  h3 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.light.text};
    margin-bottom: ${({ theme }) => theme.spacing.lg};

    [data-theme='dark'] & {
      color: ${({ theme }) => theme.colors.dark.text};
    }
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.light.textSecondary};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    line-height: 1.7;

    [data-theme='dark'] & {
      color: ${({ theme }) => theme.colors.dark.textSecondary};
    }
  }
`

const AboutImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  img {
    width: 100%;
    max-width: 400px;
    border-radius: ${({ theme }) => theme.borderRadius['2xl']};
    box-shadow: ${({ theme }) => theme.shadows['2xl']};
  }

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: 20px;
    bottom: 20px;
    border: 2px solid ${({ theme }) => theme.colors.light.primary};
    border-radius: ${({ theme }) => theme.borderRadius['2xl']};
    z-index: -1;

    [data-theme='dark'] & {
      border-color: ${({ theme }) => theme.colors.dark.primary};
    }
  }
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing['4xl']};
`

const FeatureCard = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.light.background};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
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

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.light.primary}, 
    ${({ theme }) => theme.colors.light.secondary});
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.xl};

  [data-theme='dark'] & {
    background: linear-gradient(135deg, 
      ${({ theme }) => theme.colors.dark.primary}, 
      ${({ theme }) => theme.colors.dark.secondary});
  }
`

const FeatureTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.light.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.text};
  }
`

const FeatureDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.light.textSecondary};
  line-height: 1.6;

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.textSecondary};
  }
`

const PlaceholderImage = styled.div`
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.light.primary}20, 
    ${({ theme }) => theme.colors.light.secondary}20);
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.light.textSecondary};

  [data-theme='dark'] & {
    background: linear-gradient(135deg, 
      ${({ theme }) => theme.colors.dark.primary}20, 
      ${({ theme }) => theme.colors.dark.secondary}20);
    color: ${({ theme }) => theme.colors.dark.textSecondary};
  }
`

const features = [
  {
    icon: <FaCode />,
    title: 'Full-Stack Development',
    description: 'Building end-to-end applications with modern technologies and best practices.'
  },
  {
    icon: <FaGraduationCap />,
    title: 'Academic Excellence',
    description: '4th year Software Engineering student with strong foundation in computer science.'
  },
  {
    icon: <FaLightbulb />,
    title: 'Innovative Solutions',
    description: 'Passionate about creating efficient, scalable, and user-friendly applications.'
  },
  {
    icon: <FaRocket />,
    title: 'Continuous Learning',
    description: 'Always exploring new technologies and methodologies to stay current with industry trends.'
  }
]

export default function About() {
  const aboutRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (aboutRef.current && typeof window !== 'undefined') {
      // Dynamically import GSAP
      import('gsap').then(({ gsap }) => {
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger)
          
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: aboutRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          })

          // Set initial state
          gsap.set(['.about-header', '.about-content', '.feature-card'], {
            opacity: 0,
            y: 50
          })

          // Animate in sequence
          tl.to('.about-header', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          })
          .to('.about-content', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          }, '-=0.4')
          .to('.feature-card', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out'
          }, '-=0.2')
        })
      })
    }
  }, [])

  return (
    <AboutSection id="about" ref={aboutRef}>
      <Container>
        <SectionHeader className="about-header">
          <SectionTitle>About Me</SectionTitle>
          <SectionSubtitle>
            A passionate software engineering student with a drive to create meaningful solutions
          </SectionSubtitle>
        </SectionHeader>

        <AboutContent className="about-content">
          <AboutText>
            <h3>My Journey</h3>
            <p>
              I'm a 4th year Software Engineering student with a deep passion for technology and innovation. 
              My journey in software development began with curiosity about how applications work, and it has 
              evolved into a comprehensive understanding of full-stack development.
            </p>
            <p>
              Currently pursuing my degree with a focus on modern web technologies, I enjoy working with 
              React, Node.js, Python, and various cloud platforms. I believe in writing clean, maintainable 
              code and following industry best practices.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
              projects, or working on personal projects that challenge my skills and expand my knowledge.
            </p>
            <p>
              <strong>Expected Graduation:</strong> May 2026
            </p>
          </AboutText>

          <AboutImage>
            <PlaceholderImage>
              Professional Photo Coming Soon
            </PlaceholderImage>
          </AboutImage>
        </AboutContent>

        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index} className="feature-card">
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Container>
    </AboutSection>
  )
}
