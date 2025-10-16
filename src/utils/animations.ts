import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Animation presets
export const fadeInUp = {
  from: { opacity: 0, y: 50 },
  to: { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
}

export const fadeInLeft = {
  from: { opacity: 0, x: -50 },
  to: { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }
}

export const fadeInRight = {
  from: { opacity: 0, x: 50 },
  to: { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }
}

export const scaleIn = {
  from: { opacity: 0, scale: 0.8 },
  to: { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
}

// Scroll-triggered animations
export const createScrollTrigger = (trigger: string, options: any = {}) => {
  return ScrollTrigger.create({
    trigger,
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
    ...options
  })
}

// Stagger animations for multiple elements
export const staggerAnimation = (elements: string, options: any = {}) => {
  return gsap.fromTo(elements, 
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      ...options
    }
  )
}

// Timeline animations
export const createTimeline = (options: any = {}) => {
  return gsap.timeline(options)
}

// Text reveal animation
export const textReveal = (element: string, options: any = {}) => {
  return gsap.fromTo(element,
    { opacity: 0, y: 100 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      ...options
    }
  )
}

// Parallax effect
export const createParallax = (element: string, speed: number = 0.5) => {
  return gsap.to(element, {
    yPercent: -50 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  })
}

// Hover animations
export const hoverScale = (element: string, scale: number = 1.05) => {
  const el = document.querySelector(element)
  if (!el) return

  const handleMouseEnter = () => {
    gsap.to(el, { scale, duration: 0.3, ease: 'power2.out' })
  }

  const handleMouseLeave = () => {
    gsap.to(el, { scale: 1, duration: 0.3, ease: 'power2.out' })
  }

  el.addEventListener('mouseenter', handleMouseEnter)
  el.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    el.removeEventListener('mouseenter', handleMouseEnter)
    el.removeEventListener('mouseleave', handleMouseLeave)
  }
}

// Loading animations
export const loadingSequence = (elements: string[]) => {
  const tl = gsap.timeline()
  
  elements.forEach((element, index) => {
    tl.from(element, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power2.out'
    }, index * 0.1)
  })

  return tl
}

// Page transition animations
export const pageTransitionIn = () => {
  return gsap.fromTo('body',
    { opacity: 0 },
    { opacity: 1, duration: 0.5, ease: 'power2.out' }
  )
}

export const pageTransitionOut = () => {
  return gsap.to('body', {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in'
  })
}

// Smooth scrolling utility
export const smoothScrollTo = (target: string, offset: number = 80) => {
  const element = document.querySelector(target)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - offset

    gsap.to(window, {
      scrollTo: { y: offsetPosition, autoKill: false },
      duration: 1,
      ease: 'power2.inOut'
    })
  }
}

// Counter animation
export const animateCounter = (element: string, endValue: number, duration: number = 2) => {
  return gsap.fromTo(element,
    { innerText: 0 },
    {
      innerText: endValue,
      duration,
      ease: 'power2.out',
      snap: { innerText: 1 },
      onUpdate: function() {
        const el = document.querySelector(element) as HTMLElement
        if (el) {
          el.innerText = Math.round(this.targets()[0].innerText).toString()
        }
      }
    }
  )
}

// Magnetic hover effect
export const magneticHover = (element: string, strength: number = 0.3) => {
  const el = document.querySelector(element) as HTMLElement
  if (!el) return

  const handleMouseMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  const handleMouseLeave = () => {
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    })
  }

  el.addEventListener('mousemove', handleMouseMove)
  el.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    el.removeEventListener('mousemove', handleMouseMove)
    el.removeEventListener('mouseleave', handleMouseLeave)
  }
}

export default {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  createScrollTrigger,
  staggerAnimation,
  createTimeline,
  textReveal,
  createParallax,
  hoverScale,
  loadingSequence,
  pageTransitionIn,
  pageTransitionOut,
  smoothScrollTo,
  animateCounter,
  magneticHover
}
