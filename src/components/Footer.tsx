'use client'

import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa'

const FooterSection = styled.footer`
  background-color: ${({ theme }) => theme.colors.light.background};
  color: ${({ theme }) => theme.colors.light.text};
  padding: ${({ theme }) => theme.spacing['2xl']} 0 ${({ theme }) => theme.spacing.md};

  [data-theme='dark'] & {
    background-color: ${({ theme }) => theme.colors.dark.background};
    color: ${({ theme }) => theme.colors.dark.text};
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

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`

const FooterBrand = styled.div`
  h3 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.light.text};
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.base};
    line-height: 1.6;
    opacity: 0.8;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.light.textSecondary};
  }

  [data-theme='dark'] & {
    h3 {
      color: ${({ theme }) => theme.colors.dark.text};
    }

    p {
      color: ${({ theme }) => theme.colors.dark.textSecondary};
    }
  }
`

const FooterLinks = styled.div`
  h4 {
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.light.text};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  a {
    color: ${({ theme }) => theme.colors.light.textSecondary};
    text-decoration: none;
    opacity: 0.8;
    transition: all ${({ theme }) => theme.transitions.fast};

    &:hover {
      opacity: 1;
      color: ${({ theme }) => theme.colors.light.primary};
    }
  }

  [data-theme='dark'] & {
    h4 {
      color: ${({ theme }) => theme.colors.dark.text};
    }

    a {
      color: ${({ theme }) => theme.colors.dark.textSecondary};

      &:hover {
        color: ${({ theme }) => theme.colors.dark.primary};
      }
    }
  }
`

const SocialLinks = styled.div`
  h4 {
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.light.text};
  }

  div {
    display: flex;
    gap: ${({ theme }) => theme.spacing.lg};
  }

  [data-theme='dark'] & {
    h4 {
      color: ${({ theme }) => theme.colors.dark.text};
    }
  }
`

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.light.primary}20;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.light.primary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  transition: all ${({ theme }) => theme.transitions.normal};
  border: 1px solid ${({ theme }) => theme.colors.light.primary}30;

  &:hover {
    background-color: ${({ theme }) => theme.colors.light.primary};
    color: white;
    transform: translateY(-3px);
  }

  [data-theme='dark'] & {
    background-color: ${({ theme }) => theme.colors.dark.primary}20;
    color: ${({ theme }) => theme.colors.dark.primary};
    border-color: ${({ theme }) => theme.colors.dark.primary}30;

    &:hover {
      background-color: ${({ theme }) => theme.colors.dark.primary};
      color: white;
    }
  }
`

const FooterBottom = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.light.border};
  padding-top: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }

  [data-theme='dark'] & {
    border-top-color: ${({ theme }) => theme.colors.dark.border};
  }
`

const Copyright = styled.p`
  opacity: 0.8;
  margin: 0;
  color: ${({ theme }) => theme.colors.light.textSecondary};

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.textSecondary};
  }
`

const BackToTopButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.light.primary}20;
  color: ${({ theme }) => theme.colors.light.primary};
  border: 1px solid ${({ theme }) => theme.colors.light.primary}30;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    background-color: ${({ theme }) => theme.colors.light.primary};
    color: white;
    transform: translateY(-2px);
  }

  [data-theme='dark'] & {
    background-color: ${({ theme }) => theme.colors.dark.primary}20;
    color: ${({ theme }) => theme.colors.dark.primary};
    border-color: ${({ theme }) => theme.colors.dark.primary}30;

    &:hover {
      background-color: ${({ theme }) => theme.colors.dark.primary};
      color: white;
    }
  }
`

const FooterDivider = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent, 
    ${({ theme }) => theme.colors.light.border}, 
    transparent);
  margin: ${({ theme }) => theme.spacing.lg} 0;

  [data-theme='dark'] & {
    background: linear-gradient(90deg, 
      transparent, 
      ${({ theme }) => theme.colors.dark.border}, 
      transparent);
  }
`

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  // Footer is static - no animations needed

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const currentYear = new Date().getFullYear()

  return (
    <FooterSection ref={footerRef}>
      <Container>
        <FooterContent className="footer-content">
          <FooterBrand>
            <h3>Ryan Almasi</h3>
            <p>
              A passionate Software Engineering student dedicated to creating 
              innovative solutions and bringing ideas to life through code. 
              Let's build something amazing together!
            </p>
            <SocialLinks>
              <h4>Connect With Me</h4>
              <div>
                <SocialLink href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </SocialLink>
                <SocialLink href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </SocialLink>
                <SocialLink href="mailto:your.email@example.com">
                  <FaEnvelope />
                </SocialLink>
              </div>
            </SocialLinks>
          </FooterBrand>

          <FooterLinks>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </FooterLinks>

          <FooterLinks>
            <h4>Resources</h4>
            <ul>
              <li><a href="/resume.pdf" download="Ryan-Almasi-Resume.pdf">Resume</a></li>
              <li><a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="mailto:your.email@example.com">Email</a></li>
            </ul>
          </FooterLinks>
        </FooterContent>

        <FooterDivider />

        <FooterBottom className="footer-bottom">
          <Copyright>
            © {currentYear} Ryan Almasi. All rights reserved. Built with React & Next.js.
          </Copyright>
          <BackToTopButton onClick={scrollToTop}>
            <FaArrowUp />
            Back to Top
          </BackToTopButton>
        </FooterBottom>
      </Container>
    </FooterSection>
  )
}
