'use client'

import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaDownload, FaCheck, FaExclamationTriangle } from 'react-icons/fa'

const ContactSection = styled.section`
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

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing['4xl']};
  align-items: start;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`

const ContactInfo = styled.div`
  h3 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.light.text};
    margin-bottom: ${({ theme }) => theme.spacing.xl};

    [data-theme='dark'] & {
      color: ${({ theme }) => theme.colors.dark.text};
    }
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.light.textSecondary};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    line-height: 1.7;

    [data-theme='dark'] & {
      color: ${({ theme }) => theme.colors.dark.textSecondary};
    }
  }
`

const ContactItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.light.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  [data-theme='dark'] & {
    background-color: ${({ theme }) => theme.colors.dark.background};
  }
`

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.light.primary}, 
    ${({ theme }) => theme.colors.light.secondary});
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.lg};

  [data-theme='dark'] & {
    background: linear-gradient(135deg, 
      ${({ theme }) => theme.colors.dark.primary}, 
      ${({ theme }) => theme.colors.dark.secondary});
  }
`

const ContactDetails = styled.div`
  h4 {
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.light.text};
    margin-bottom: ${({ theme }) => theme.spacing.xs};

    [data-theme='dark'] & {
      color: ${({ theme }) => theme.colors.dark.text};
    }
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.light.textSecondary};
    margin: 0;

    [data-theme='dark'] & {
      color: ${({ theme }) => theme.colors.dark.textSecondary};
    }
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.light.background};
  color: ${({ theme }) => theme.colors.light.text};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  transition: all ${({ theme }) => theme.transitions.normal};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  &:hover {
    background-color: ${({ theme }) => theme.colors.light.primary};
    color: white;
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  [data-theme='dark'] & {
    background-color: ${({ theme }) => theme.colors.dark.background};
    color: ${({ theme }) => theme.colors.dark.text};

    &:hover {
      background-color: ${({ theme }) => theme.colors.dark.primary};
    }
  }
`

const ResumeButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.light.primary}, 
    ${({ theme }) => theme.colors.light.secondary});
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.normal};
  box-shadow: ${({ theme }) => theme.shadows.md};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  [data-theme='dark'] & {
    background: linear-gradient(135deg, 
      ${({ theme }) => theme.colors.dark.primary}, 
      ${({ theme }) => theme.colors.dark.secondary});
  }
`

// Form styles
const ContactForm = styled.form`
  background-color: ${({ theme }) => theme.colors.light.background};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};

  [data-theme='dark'] & {
    background-color: ${({ theme }) => theme.colors.dark.background};
  }
`

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.light.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.text};
  }
`

const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme, $hasError }) => 
    $hasError ? theme.colors.light.error : theme.colors.light.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.light.text};
  background-color: ${({ theme }) => theme.colors.light.background};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.light.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.light.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.light.textSecondary};
  }

  [data-theme='dark'] & {
    border-color: ${({ theme, $hasError }) => 
      $hasError ? theme.colors.dark.error : theme.colors.dark.border};
    color: ${({ theme }) => theme.colors.dark.text};
    background-color: ${({ theme }) => theme.colors.dark.background};

    &:focus {
      border-color: ${({ theme }) => theme.colors.dark.primary};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.dark.primary}20;
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.dark.textSecondary};
    }
  }
`

const TextArea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme, $hasError }) => 
    $hasError ? theme.colors.light.error : theme.colors.light.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.light.text};
  background-color: ${({ theme }) => theme.colors.light.background};
  transition: all ${({ theme }) => theme.transitions.fast};
  resize: vertical;
  min-height: 120px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.light.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.light.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.light.textSecondary};
  }

  [data-theme='dark'] & {
    border-color: ${({ theme, $hasError }) => 
      $hasError ? theme.colors.dark.error : theme.colors.dark.border};
    color: ${({ theme }) => theme.colors.dark.text};
    background-color: ${({ theme }) => theme.colors.dark.background};

    &:focus {
      border-color: ${({ theme }) => theme.colors.dark.primary};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.dark.primary}20;
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.dark.textSecondary};
    }
  }
`

const SubmitButton = styled.button<{ $isSubmitting: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.light.primary}, 
    ${({ theme }) => theme.colors.light.secondary});
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  opacity: ${({ $isSubmitting }) => $isSubmitting ? 0.7 : 1};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  &:disabled {
    cursor: not-allowed;
  }

  [data-theme='dark'] & {
    background: linear-gradient(135deg, 
      ${({ theme }) => theme.colors.dark.primary}, 
      ${({ theme }) => theme.colors.dark.secondary});
  }
`

const Alert = styled.div<{ $type: 'success' | 'error' }>`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme, $type }) => 
    $type === 'success' ? theme.colors.light.success + '20' : theme.colors.light.error + '20'};
  color: ${({ theme, $type }) => 
    $type === 'success' ? theme.colors.light.success : theme.colors.light.error};
  border: 1px solid ${({ theme, $type }) => 
    $type === 'success' ? theme.colors.light.success : theme.colors.light.error};

  [data-theme='dark'] & {
    background-color: ${({ theme, $type }) => 
      $type === 'success' ? theme.colors.dark.success + '20' : theme.colors.dark.error + '20'};
    color: ${({ theme, $type }) => 
      $type === 'success' ? theme.colors.dark.success : theme.colors.dark.error};
    border-color: ${({ theme, $type }) => 
      $type === 'success' ? theme.colors.dark.success : theme.colors.dark.error};
  }
`

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const contactRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (contactRef.current && typeof window !== 'undefined') {
      // Dynamically import GSAP
      import('gsap').then(({ gsap }) => {
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger)
          
          // Set initial state
          gsap.set(['.contact-header'], {
            opacity: 0,
            y: 50
          })
          gsap.set(['.contact-info'], {
            opacity: 0,
            x: -30
          })
          gsap.set(['.contact-form'], {
            opacity: 0,
            x: 30
          })
          
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: contactRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          })

          tl.to('.contact-header', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          })
          .to('.contact-info', {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out'
          }, '-=0.4')
          .to('.contact-form', {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out'
          }, '-=0.6')
        })
      })
    }
  }, [])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate form submission (replace with actual email service)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would typically send the form data to your backend or email service
      console.log('Form submitted:', formData)
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ContactSection id="contact" ref={contactRef}>
      <Container>
        <SectionHeader className="contact-header">
          <SectionTitle>Get In Touch</SectionTitle>
          <SectionSubtitle>
            Have a project in mind or just want to chat? I'd love to hear from you!
          </SectionSubtitle>
        </SectionHeader>

        <ContactContent>
          <ContactInfo className="contact-info">
            <h3>Let's Connect</h3>
            <p>
              I'm always interested in new opportunities, collaborations, and interesting projects. 
              Whether you have a question about my work or just want to say hello, feel free to reach out!
            </p>

            <ContactItems>
              <ContactItem>
                <ContactIcon>
                  <FaEnvelope />
                </ContactIcon>
                <ContactDetails>
                  <h4>Email</h4>
                  <p>your.email@example.com</p>
                </ContactDetails>
              </ContactItem>

              <ContactItem>
                <ContactIcon>
                  <FaPhone />
                </ContactIcon>
                <ContactDetails>
                  <h4>Phone</h4>
                  <p>+1 (555) 123-4567</p>
                </ContactDetails>
              </ContactItem>

              <ContactItem>
                <ContactIcon>
                  <FaMapMarkerAlt />
                </ContactIcon>
                <ContactDetails>
                  <h4>Location</h4>
                  <p>Your City, Country</p>
                </ContactDetails>
              </ContactItem>
            </ContactItems>

            <SocialLinks>
              <SocialLink href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </SocialLink>
              <SocialLink href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </SocialLink>
              <SocialLink href="mailto:your.email@example.com">
                <FaEnvelope />
              </SocialLink>
            </SocialLinks>

            <ResumeButton href="/resume.pdf" download="Ryan-Almasi-Resume.pdf">
              <FaDownload />
              Download Resume
            </ResumeButton>
          </ContactInfo>

          <ContactForm onSubmit={handleSubmit} className="contact-form">
            {submitStatus === 'success' && (
              <Alert $type="success">
                <FaCheck />
                Message sent successfully! I'll get back to you soon.
              </Alert>
            )}

            {submitStatus === 'error' && (
              <Alert $type="error">
                <FaExclamationTriangle />
                Something went wrong. Please try again or email me directly.
              </Alert>
            )}

            <FormGroup>
              <Label htmlFor="name">Name *</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                $hasError={!!errors.name}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                $hasError={!!errors.email}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="subject">Subject *</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="What's this about?"
                $hasError={!!errors.subject}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Message *</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me about your project or just say hello!"
                $hasError={!!errors.message}
              />
            </FormGroup>

            <SubmitButton type="submit" $isSubmitting={isSubmitting} disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </SubmitButton>
          </ContactForm>
        </ContactContent>
      </Container>
    </ContactSection>
  )
}
