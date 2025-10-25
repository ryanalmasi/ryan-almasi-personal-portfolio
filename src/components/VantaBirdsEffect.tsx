'use client'

import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'

// Vanta Birds Effect Container
const VantaContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  background: transparent;
  
  /* Ensure the canvas is transparent */
  canvas {
    background: transparent !important;
  }
`

interface VantaBirdsEffectProps {
  enabled?: boolean;
  backgroundColor?: number;
  color1?: number;
  color2?: number;
  colorMode?: string;
  quantity?: number;
  birdSize?: number;
  wingSpan?: number;
  speedLimit?: number;
  separation?: number;
  alignment?: number;
  cohesion?: number;
}

const VantaBirdsEffect: React.FC<VantaBirdsEffectProps> = ({
  enabled = true,
  backgroundColor,
  color1,
  color2,
  colorMode = 'variance',
  quantity = 4,
  birdSize = 1.0,
  wingSpan = 25.0,
  speedLimit = 5.0,
  separation = 20.0,
  alignment = 20.0,
  cohesion = 20.0,
}) => {
  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const vantaRef = useRef<HTMLDivElement>(null)

  // Get theme-aware colors
  const getThemeColors = () => {
    const isDark = document.querySelector('[data-theme="dark"]')
    const currentTheme = isDark ? theme.colors.dark : theme.colors.light
    
    return {
      backgroundColor: backgroundColor || 0x000000, // Will be transparent
      color1: color1 || parseInt(currentTheme.primary.replace('#', ''), 16),
      color2: color2 || parseInt(currentTheme.secondary.replace('#', ''), 16),
    }
  }

  useEffect(() => {
    if (!enabled || !vantaRef.current) return

    // Wait for scripts to load and initialize Vanta
    const initializeVanta = () => {
      if (typeof window === 'undefined') return

      const checkAndInit = () => {
        if ((window as any).THREE && (window as any).VANTA?.BIRDS && !vantaEffect && vantaRef.current) {
          try {
            console.log('Initializing Vanta Birds effect...')
            const themeColors = getThemeColors()
            const effect = (window as any).VANTA.BIRDS({
              el: vantaRef.current,
              THREE: (window as any).THREE,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.00,
              minWidth: 200.00,
              scale: 1.00,
              scaleMobile: 1.00,
              backgroundColor: 0x000000, // Black background
              backgroundAlpha: 0.0, // Make it transparent
              color1: themeColors.color1,
              color2: themeColors.color2,
              colorMode,
              quantity,
              birdSize,
              wingSpan,
              speedLimit,
              separation,
              alignment,
              cohesion,
            })
            setVantaEffect(effect)
            console.log('Vanta Birds effect initialized successfully with theme colors')
          } catch (error) {
            console.warn('Vanta Birds Effect initialization failed:', error)
          }
        } else {
          // Retry after a short delay if scripts aren't ready
          setTimeout(checkAndInit, 200)
        }
      }

      // Start checking after a short delay
      setTimeout(checkAndInit, 100)
    }

    initializeVanta()

    // Cleanup function
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy()
        setVantaEffect(null)
      }
    }
  }, [
    enabled,
    backgroundColor,
    color1,
    color2,
    colorMode,
    quantity,
    birdSize,
    wingSpan,
    speedLimit,
    separation,
    alignment,
    cohesion
  ])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (vantaEffect) {
        vantaEffect.resize()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [vantaEffect])

  // Handle theme changes
  useEffect(() => {
    if (!vantaEffect) return

    const handleThemeChange = () => {
      if (vantaEffect) {
        const themeColors = getThemeColors()
        vantaEffect.setOptions({
          backgroundColor: 0x000000, // Keep transparent
          backgroundAlpha: 0.0, // Keep transparent
          color1: themeColors.color1,
          color2: themeColors.color2,
        })
      }
    }

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          handleThemeChange()
        }
      })
    })

    // Observe the document for theme changes
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    })

    return () => {
      observer.disconnect()
    }
  }, [vantaEffect])

  if (!enabled) return null

  return <VantaContainer ref={vantaRef} />
}

export default VantaBirdsEffect
