import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSizes.base};
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.light.text};
    background-color: ${({ theme }) => theme.colors.light.background};
    transition: color ${({ theme }) => theme.transitions.normal}, 
                background-color ${({ theme }) => theme.transitions.normal};
    overflow-x: hidden;
  }

  /* Dark theme styles */
  [data-theme='dark'] body {
    color: ${({ theme }) => theme.colors.dark.text};
    background-color: ${({ theme }) => theme.colors.dark.background};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: 1.2;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.fontSizes['4xl']};
    }
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.fontSizes['3xl']};
    }
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.fontSizes['2xl']};
    }
  }

  h4 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }

  h5 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }

  h6 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.light.text};
  }

  [data-theme='dark'] p {
    color: ${({ theme }) => theme.colors.dark.text};
  }

  a {
    color: ${({ theme }) => theme.colors.light.primary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.fast};
    
    &:hover {
      color: ${({ theme }) => theme.colors.light.secondary};
    }
  }

  [data-theme='dark'] a {
    color: ${({ theme }) => theme.colors.dark.primary};
    
    &:hover {
      color: ${({ theme }) => theme.colors.dark.secondary};
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
    outline: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.light.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.light.border};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.light.textSecondary};
  }

  [data-theme='dark'] ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.dark.surface};
  }

  [data-theme='dark'] ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.dark.border};
  }

  [data-theme='dark'] ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.dark.textSecondary};
  }

  /* Selection styling */
  ::selection {
    background-color: ${({ theme }) => theme.colors.light.primary};
    color: white;
  }

  [data-theme='dark'] ::selection {
    background-color: ${({ theme }) => theme.colors.dark.primary};
    color: white;
  }

  /* Focus styles */
  *:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.light.primary};
    outline-offset: 2px;
  }

  [data-theme='dark'] *:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.dark.primary};
  }

  /* Utility classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.md};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      padding: 0 ${({ theme }) => theme.spacing.xl};
    }
  }

  .section {
    padding: ${({ theme }) => theme.spacing['4xl']} 0;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      padding: ${({ theme }) => theme.spacing['2xl']} 0;
    }
  }
`
