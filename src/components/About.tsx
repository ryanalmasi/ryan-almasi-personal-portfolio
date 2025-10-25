'use client'

import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaCode, FaGraduationCap, FaLightbulb, FaRocket } from 'react-icons/fa'

const AboutSection = styled.section`
  padding: ${({ theme }) => theme.spacing['5xl']} 0;
  background-color: ${({ theme }) => theme.colors.light.surface};

  [data-theme='dark'] & {
    background-color: ${({ theme }) => theme.colors.dark.surface};
  }

  @property --imgRotate {
    syntax: "<angle>";
    inherits: true;
    initial-value: 0deg;
  }

  @keyframes straightenImages {
    50% {
      --imgRotate: 0deg;
    }
  }

  @keyframes moveOutIn {
    50% {
      translate: -100% 0;
      scale: 1.15;
    }
    100% {
      translate: 0 0;
      z-index: 1;
    }
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

const ActivitiesWidget = styled.div`
  container: activities-widget / inline-size;
  inline-size: min(100%, 550px);
  margin-inline: auto;
  position: relative;
  height: 400px;
  transition: transform 0.3s ease;

  > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &:hover {
    transform: scale(1.025);
  }

  &.children-animating {
    .img {
      animation: 0.75s straightenImages;
    }
  }

  @container activities-widget (width < 300px) {
    display: block;
    padding: 1rem;
    height: auto;

    .activity {
      position: relative;
      margin-block-end: 3rem;
      .img {
        max-inline-size: 200px;
        margin-inline: auto;
        margin-block-end: 0.5rem;
      }
    }
  }
`

const Activity = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 1;
  pointer-events: auto;

  &:nth-child(1) {
    z-index: 5;
  }
  &:nth-child(2) {
    z-index: 4;
  }
  &:nth-child(3) {
    z-index: 3;
  }
  &:nth-child(4) {
    z-index: 2;
  }
  &:nth-child(5) {
    z-index: 1;
  }

  .img {
    width: 100%;
    height: 100%;
    overflow: clip;
    border-radius: 12px;
    border: 3px solid ${({ theme }) => theme.colors.light.background};
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    rotate: var(--imgRotate, 0deg);
    transition: 0.2s;

    [data-theme='dark'] & {
      border-color: ${({ theme }) => theme.colors.dark.background};
    }

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  &:nth-child(1) {
    .img {
      --imgRotate: 4deg;
    }
  }
  &:nth-child(2) {
    .img {
      --imgRotate: -2deg;
    }
  }
  &:nth-child(3) {
    .img {
      --imgRotate: -9deg;
    }
  }
  &:nth-child(4) {
    .img {
      --imgRotate: 7deg;
    }
  }
  &:nth-child(5) {
    .img {
      --imgRotate: -5deg;
    }
  }

  &.active {
    z-index: 10 !important;
    
    .img {
      animation: 0.66s moveOutIn cubic-bezier(0.34, 1.56, 0.64, 1);
      animation-fill-mode: forwards;
    }
  }

  @container activities-widget (width < 300px) {
    position: relative;
    margin-block-end: 3rem;
    
    .img {
      max-inline-size: 200px;
      margin-inline: auto;
      margin-block-end: 0.5rem;
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

const cardData = [
  {
    title: 'Image 1',
    image: '/images/headshot.jpg'
  },
  {
    title: 'Image 2',
    image: '/images/codingpic.png'
  },
  {
    title: 'Image 3',
    image: '/images/dogpic.png'
  },
  {
    title: 'Image 4',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzI3MjQ5Nzh8&ixlib=rb-4.0.3&q=80&w=600'
  },
  {
    title: 'Image 5',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzI3MjQ5Nzh8&ixlib=rb-4.0.3&q=80&w=600'
  }
]

const features = [
  {
    icon: <FaCode />,
    title: 'Full-Stack Development',
    description: 'Building end-to-end applications with modern technologies and best practices.'
  },
  {
    icon: <FaGraduationCap />,
    title: 'Academic Excellence',
    description: '5th year Software Engineering student with strong foundation in computer engineering.'
  },
  {
    icon: <FaLightbulb />,
    title: 'Innovative Thinking',
    description: 'Passionate about using software to solve real-world problems and improve people\'s lives.'
  },
  {
    icon: <FaRocket />,
    title: 'Continuous Learning',
    description: 'Constantly exploring new technologies and methodologies (I\'m a geek).'
  }
]

// Singly linked list node for card management
interface CardNode {
  id: number
  next: CardNode | null
}

export default function About() {
  const aboutRef = useRef<HTMLElement>(null)
  const widgetRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [cardList, setCardList] = useState<CardNode[]>([])
  const [headId, setHeadId] = useState(1) // Card 1 is initially the head

  // Initialize the singly linked list in order: 1 -> 5 -> 4 -> 3 -> 2
  useEffect(() => {
    const initializeCardList = () => {
      const cards: CardNode[] = []
      
      // Create nodes for cards 1-5
      for (let i = 1; i <= 5; i++) {
        cards.push({
          id: i,
          next: null
        })
      }
      
      // Link them in the specified order: 1 -> 5 -> 4 -> 3 -> 2
      const order = [1, 5, 4, 3, 2]
      for (let i = 0; i < order.length - 1; i++) {
        const currentCard = cards.find(card => card.id === order[i])!
        const nextCard = cards.find(card => card.id === order[i + 1])!
        currentCard.next = nextCard
      }
      
      setCardList(cards)
      console.log('Initialized singly linked list:', order)
    }
    
    initializeCardList()
  }, [])

  // Set first card as active by default and set correct z-index for all cards
  useEffect(() => {
    if (widgetRef.current && cardList.length > 0) {
      console.log('=== Initial setup ===')
      
      // Remove active from all cards
      Array.from(widgetRef.current.children).forEach((child) => {
        child.classList.remove('active')
      })
      
      // Get initial order and set z-index for all cards
      const initialOrder = getCurrentOrder()
      console.log('Initial order:', initialOrder.map(card => card.id))
      
      initialOrder.forEach((card, index) => {
        const cardElement = widgetRef.current!.children[card.id - 1] as HTMLElement
        const zIndex = initialOrder.length - index // Head gets highest z-index
        cardElement.style.setProperty('z-index', zIndex.toString(), 'important')
        console.log(`Card ${card.id} z-index set to ${zIndex} (position ${index + 1})`)
      })
      
      // Set head card (Card 1) as active
      const headCard = widgetRef.current.children[0] as HTMLElement
      if (headCard) {
        headCard.classList.add('active')
        console.log('Set Card 1 as head (active)')
      }
    }
  }, [cardList])

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

  // Rotate cards using singly linked list with head/tail manipulation
  const rotateCards = () => {
    if (isAnimating || cardList.length === 0) return
    
    console.log('=== ROTATING CARDS ===')
    console.log('Current head ID:', headId)
    
    // Log current linked list state
    console.log('--- Current Linked List State ---')
    const currentOrder = getCurrentOrder()
    console.log('Current order:', currentOrder.map(card => card.id))
    
    setIsAnimating(true)
    
    if (widgetRef.current) {
      // Find current head and tail
      const currentHead = cardList.find(card => card.id === headId)!
      const tail = findTail(currentHead)
      
      console.log('--- Rotation Details ---')
      console.log('Current head:', currentHead.id)
      console.log('Tail to move:', tail.id)
      
      // Get DOM elements
      const currentHeadElement = widgetRef.current.children[currentHead.id - 1] as HTMLElement
      const tailElement = widgetRef.current.children[tail.id - 1] as HTMLElement
      
      console.log('--- DOM Elements ---')
      console.log('Current head element:', currentHeadElement)
      console.log('Tail element:', tailElement)
      
      // Update z-index for all cards based on their position in the new order
      const newOrder = getNewOrderAfterRotation(currentHead, tail)
      console.log('--- Z-Index Changes ---')
      console.log('New order after rotation:', newOrder.map(card => card.id))
      
      // Set z-index for all cards based on their new position
      newOrder.forEach((card, index) => {
        const cardElement = widgetRef.current!.children[card.id - 1] as HTMLElement
        const zIndex = newOrder.length - index // Head gets highest z-index, tail gets lowest
        cardElement.style.setProperty('z-index', zIndex.toString(), 'important')
        console.log(`Card ${card.id} z-index set to ${zIndex} (position ${index + 1})`)
      })
      
      // Remove active from current head
      currentHeadElement.classList.remove('active')
      
      // Add active to tail (new head)
      tailElement.classList.add('active')
      
      console.log('--- Active Class Changes ---')
      console.log(`Card ${currentHead.id} active class removed`)
      console.log(`Card ${tail.id} active class added`)
      
      // Update the linked list: move tail to head
      updateLinkedList(currentHead, tail)
      
      // Update head to tail
      setHeadId(tail.id)
      
      console.log('--- State Update ---')
      console.log(`Head ID updated from ${currentHead.id} to ${tail.id}`)
      
      // Add animation class
      widgetRef.current.classList.add('children-animating')
      
      // Handle animation end
      const handleAnimationEnd = () => {
        widgetRef.current?.classList.remove('children-animating')
        setIsAnimating(false)
        console.log('=== ANIMATION COMPLETE ===')
        console.log('New head ID:', tail.id)
        console.log('Animation class removed')
        console.log('--- Final State ---')
        const newOrder = getCurrentOrder()
        console.log('New order:', newOrder.map(card => card.id))
      }
      
      tailElement.addEventListener('animationend', handleAnimationEnd, { once: true })
    }
  }
  
  // Helper function to get current order of cards
  const getCurrentOrder = () => {
    const currentHead = cardList.find(card => card.id === headId)!
    const order = [currentHead]
    let current = currentHead.next
    
    while (current) {
      order.push(current)
      current = current.next
    }
    
    return order
  }
  
  // Helper function to find the tail
  const findTail = (head: CardNode) => {
    let current = head
    while (current.next) {
      current = current.next
    }
    return current
  }
  
  // Helper function to update the linked list by moving tail to head
  const updateLinkedList = (oldHead: CardNode, tail: CardNode) => {
    // Find the node before the tail
    let current = oldHead
    while (current.next && current.next !== tail) {
      current = current.next
    }
    
    // Remove tail from end
    current.next = null
    
    // Add tail to beginning
    tail.next = oldHead
  }
  
  // Helper function to get the new order after rotation (tail becomes head)
  const getNewOrderAfterRotation = (oldHead: CardNode, tail: CardNode) => {
    const newOrder = [tail] // Tail becomes the new head
    let current = oldHead
    
    // Add all remaining cards in their current order
    while (current) {
      if (current !== tail) { // Don't add tail twice
        newOrder.push(current)
      }
      current = current.next
    }
    
    return newOrder
  }

  const handleCardClick = () => {
    if (isAnimating) return
    rotateCards()
  }


  return (
    <AboutSection id="about" ref={aboutRef}>
      <Container>
        <SectionHeader className="about-header">
          <SectionTitle>About Me</SectionTitle>
          <SectionSubtitle>
            A passionate software engineer with a drive to change the world via software
          </SectionSubtitle>
        </SectionHeader>

        <AboutContent className="about-content">
          <AboutText>
            <h3>My Journey</h3>
            <p>
              I'm a 5th year Software Engineering student with a deep passion for technology, innovation, and machine learning! 
              This journey began with a simple curiosity about how our brains work, intrigued by its close relation to the modelling of computer and software systems. It has since
              evolved into a comprehensive understanding of data engineering, machine learning engineering, full-stack development, and end-to-end software engineering.
            </p>
            <p>
              Currently pursuing my engineering degree with a focus on honing my engineering capabilities. I enjoy working with 
              React, Node.js, Python, TensorFlow, and various cloud platforms. I believe in writing clean, maintainable and scalable
              code by following industry best practices.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
              projects, or working on personal projects that challenge my skills and expand my knowledge. I'm also a gym rat and am super passionate about bodybuilding and fitness.
            </p>
            <p>
              <strong>Expected Graduation:</strong> May 2026
            </p>
          </AboutText>

          <ActivitiesWidget ref={widgetRef}>
            {cardData.map((card, index) => (
              <Activity
                key={index}
                className={`activity ${index === (headId - 1) ? 'active' : ''}`}
                onClick={handleCardClick}
              >
                <div className="img">
                  <img src={card.image} alt={card.title} />
                </div>
              </Activity>
            ))}
          </ActivitiesWidget>
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
