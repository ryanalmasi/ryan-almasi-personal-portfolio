'use client'

import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import About from '../components/About'
import WorkExperience from '../components/WorkExperience'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Blog from '../components/Blog'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  useEffect(() => {
    // Initialize GSAP animations only if elements exist
    const animateElements = document.querySelectorAll('.animate-on-scroll')
    
    if (animateElements.length > 0) {
      gsap.set('.animate-on-scroll', { opacity: 0, y: 50 })
      
      ScrollTrigger.batch('.animate-on-scroll', {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out'
          })
        },
        start: 'top 80%',
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <main>
      <Navigation />
      <Hero />
      <About />
      <WorkExperience />
      <Projects />
      <Skills />
      <Blog />
      <Contact />
      <Footer />
    </main>
  )
}
