'use client'

import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from 'react-icons/fa'

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.light.background} 0%, 
    ${({ theme }) => theme.colors.light.surface} 100%);
  overflow: hidden;

  [data-theme='dark'] & {
    background: linear-gradient(135deg, 
      ${({ theme }) => theme.colors.dark.background} 0%, 
      ${({ theme }) => theme.colors.dark.surface} 100%);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, 
      ${({ theme }) => theme.colors.light.primary}05 0%, 
      transparent 50%),
      radial-gradient(circle at 80% 20%, 
      ${({ theme }) => theme.colors.light.secondary}05 0%, 
      transparent 50%);
    pointer-events: none;

    [data-theme='dark'] & {
      background: radial-gradient(circle at 20% 80%, 
        ${({ theme }) => theme.colors.dark.primary}05 0%, 
        transparent 50%),
        radial-gradient(circle at 80% 20%, 
        ${({ theme }) => theme.colors.dark.secondary}05 0%, 
        transparent 50%);
    }
  }
`

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  text-align: center;
  position: relative;
  z-index: 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 0 ${({ theme }) => theme.spacing.xl};
  }
`

const Greeting = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.light.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.primary};
  }
`

const Name = styled.h1`
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  color: ${({ theme }) => theme.colors.light.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.light.primary}, 
    ${({ theme }) => theme.colors.light.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.text};
    background: linear-gradient(135deg, 
      ${({ theme }) => theme.colors.dark.primary}, 
      ${({ theme }) => theme.colors.dark.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const Title = styled.h2`
  font-size: clamp(1.25rem, 4vw, 2rem);
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.light.text};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.text};
  }
`

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.light.text};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.text};
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`

const Button = styled.a<{ $variant?: 'primary' | 'secondary' }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.normal};
  cursor: pointer;
  border: 2px solid transparent;
  box-shadow: ${({ theme }) => theme.shadows.md};

  ${({ $variant = 'primary', theme }) => 
    $variant === 'primary' 
      ? `
        background-color: ${theme.colors.light.primary};
        color: white;
        
        &:hover {
          background-color: ${theme.colors.light.secondary};
          transform: translateY(-2px);
          box-shadow: ${theme.shadows.lg};
        }

        [data-theme='dark'] & {
          background-color: ${theme.colors.dark.primary};
          
          &:hover {
            background-color: ${theme.colors.dark.secondary};
          }
        }
      `
      : `
        background-color: transparent;
        color: ${theme.colors.light.primary};
        border-color: ${theme.colors.light.primary};
        
        &:hover {
          background-color: ${theme.colors.light.primary};
          color: white;
          transform: translateY(-2px);
        }

        [data-theme='dark'] & {
          color: ${theme.colors.dark.primary};
          border-color: ${theme.colors.dark.primary};
          
          &:hover {
            background-color: ${theme.colors.dark.primary};
          }
        }
      `
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.light.surface};
  color: ${({ theme }) => theme.colors.light.text};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    background-color: ${({ theme }) => theme.colors.light.primary};
    color: white;
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  [data-theme='dark'] & {
    background-color: ${({ theme }) => theme.colors.dark.surface};
    color: ${({ theme }) => theme.colors.dark.text};

    &:hover {
      background-color: ${({ theme }) => theme.colors.dark.primary};
    }
  }
`

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.xl};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.light.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    40% {
      transform: translateX(-50%) translateY(-10px);
    }
    60% {
      transform: translateX(-50%) translateY(-5px);
    }
  }

  &::after {
    content: '↓';
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.textSecondary};
  }
`

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (heroRef.current && typeof window !== 'undefined') {
      // Dynamically import GSAP
      import('gsap').then(({ gsap }) => {
        const tl = gsap.timeline()
        
        // Set initial state
        gsap.set(['.hero-greeting', '.hero-name', '.hero-title', '.hero-description', '.hero-buttons', '.hero-social', '.scroll-indicator'], {
          opacity: 0,
          y: 50
        })
        
        // Animate in sequence
        tl.to('.hero-greeting', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        })
        .to('.hero-name', {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out'
        }, '-=0.4')
        .to('.hero-title', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        }, '-=0.6')
        .to('.hero-description', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        }, '-=0.4')
        .to('.hero-buttons', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        }, '-=0.4')
        .to('.hero-social', {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        }, '-=0.2')
        .to('.scroll-indicator', {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        }, '-=0.2')
      })
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 100
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <HeroSection id="home" ref={heroRef}>
      <HeroContainer>
        <Greeting className="hero-greeting">
          Hello, I'm
        </Greeting>
        
        <Name className="hero-name">
          Ryan Almasi
        </Name>
        
        <Title className="hero-title">
          Software Engineering Student
        </Title>
        
        <Description className="hero-description">
          A passionate 4th year Software Engineering student with a love for creating 
          innovative solutions and bringing ideas to life through code. Graduating in May 2026.
        </Description>
        
        <ButtonGroup className="hero-buttons">
          <Button 
            $variant="primary" 
            href="#work-experience"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('work-experience')
            }}
          >
            View My Work
          </Button>
          <Button 
            $variant="secondary"
            href="/resume.pdf"
            download="Ryan-Almasi-Resume.pdf"
          >
            <FaDownload />
            Download Resume
          </Button>
        </ButtonGroup>
        
        <SocialLinks className="hero-social">
          <SocialLink href="https://github.com/ryanalmasi" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </SocialLink>
          <SocialLink href="https://linkedin.com/in/ryanalmasi" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </SocialLink>
          <SocialLink href="mailto:ryan.almasi@gmail.com">
            <FaEnvelope />
          </SocialLink>
        </SocialLinks>
      </HeroContainer>
      
      <ScrollIndicator className="scroll-indicator">
        Scroll to explore
      </ScrollIndicator>
    </HeroSection>
  )
}
