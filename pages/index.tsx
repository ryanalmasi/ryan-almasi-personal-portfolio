import React, { useEffect } from 'react'
import Navigation from '../src/components/Navigation'
import Hero from '../src/components/Hero'
import About from '../src/components/About'
import WorkExperience from '../src/components/WorkExperience'
import Projects from '../src/components/Projects'
import Skills from '../src/components/Skills'
import Blog from '../src/components/Blog'
import Contact from '../src/components/Contact'
import Footer from '../src/components/Footer'

export default function Home() {
  useEffect(() => {
    // Dynamically import GSAP and register ScrollTrigger on client side
    if (typeof window !== 'undefined') {
      import('gsap').then(({ gsap }) => {
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger)
        })
      })
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
