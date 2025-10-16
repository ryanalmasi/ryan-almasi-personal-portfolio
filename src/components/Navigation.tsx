'use client'

import React, { useState, useEffect } from 'react'
import { useTheme } from './ThemeProvider'
import styled from 'styled-components'
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa'

const Nav = styled.nav<{ $isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: ${({ theme, $isScrolled }) => 
    $isScrolled ? theme.colors.light.background : 'transparent'};
  backdrop-filter: ${({ $isScrolled }) => $isScrolled ? 'blur(10px)' : 'none'};
  border-bottom: ${({ theme, $isScrolled }) => 
    $isScrolled ? `1px solid ${theme.colors.light.border}` : 'none'};
  transition: all ${({ theme }) => theme.transitions.normal};
  padding: ${({ theme }) => theme.spacing.md} 0;

  [data-theme='dark'] & {
    background-color: ${({ theme, $isScrolled }) => 
      $isScrolled ? theme.colors.dark.background : 'transparent'};
    border-bottom: ${({ theme, $isScrolled }) => 
      $isScrolled ? `1px solid ${theme.colors.dark.border}` : 'none'};
  }
`

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 0 ${({ theme }) => theme.spacing.xl};
  }
`

const Logo = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.light.text};
  cursor: pointer;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.light.primary};
  }

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.text};

    &:hover {
      color: ${({ theme }) => theme.colors.dark.primary};
    }
  }
`

const NavLinks = styled.ul<{ $isOpen: boolean }>`
  display: flex;
  list-style: none;
  gap: ${({ theme }) => theme.spacing.xl};
  margin: 0;
  padding: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: fixed;
    top: 100%;
    left: 0;
    right: 0;
    background-color: ${({ theme }) => theme.colors.light.background};
    border-top: 1px solid ${({ theme }) => theme.colors.light.border};
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.xl};
    gap: ${({ theme }) => theme.spacing.lg};
    transform: ${({ $isOpen }) => $isOpen ? 'translateY(0)' : 'translateY(-100%)'};
    opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};
    visibility: ${({ $isOpen }) => $isOpen ? 'visible' : 'hidden'};
    transition: all ${({ theme }) => theme.transitions.normal};

    [data-theme='dark'] & {
      background-color: ${({ theme }) => theme.colors.dark.background};
      border-top: 1px solid ${({ theme }) => theme.colors.dark.border};
    }
  }
`

const NavLink = styled.li`
  a {
    color: ${({ theme }) => theme.colors.light.text};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    transition: color ${({ theme }) => theme.transitions.fast};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.light.primary};
    }

    &.active {
      color: ${({ theme }) => theme.colors.light.primary};
    }
  }

  [data-theme='dark'] & a {
    color: ${({ theme }) => theme.colors.dark.text};

    &:hover {
      color: ${({ theme }) => theme.colors.dark.primary};
    }

    &.active {
      color: ${({ theme }) => theme.colors.dark.primary};
    }
  }
`

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.light.text};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.light.surface};
    color: ${({ theme }) => theme.colors.light.primary};
  }

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.text};

    &:hover {
      background-color: ${({ theme }) => theme.colors.dark.surface};
      color: ${({ theme }) => theme.colors.dark.primary};
    }
  }
`

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.light.text};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.text};
  }
`

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work-experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const handleSectionChange = () => {
      const sections = ['home', 'about', 'work-experience', 'projects', 'skills', 'blog', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('scroll', handleSectionChange)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleSectionChange)
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
    } else {
      // Fallback: scroll to top if section not found
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <Nav $isScrolled={isScrolled}>
      <NavContainer>
        <Logo onClick={() => scrollToSection('home')}>
          Ryan Almasi
        </Logo>

        <NavLinks $isOpen={isMobileMenuOpen}>
          {sections.map((section) => (
            <NavLink key={section.id}>
              <a
                className={activeSection === section.id ? 'active' : ''}
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(section.id)
                }}
              >
                {section.label}
              </a>
            </NavLink>
          ))}
        </NavLinks>

        <NavActions>
          <ThemeToggle onClick={toggleTheme}>
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </ThemeToggle>

          <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </NavActions>
      </NavContainer>
    </Nav>
  )
}
