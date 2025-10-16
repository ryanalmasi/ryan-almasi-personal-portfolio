'use client'

import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { FaExternalLinkAlt, FaCalendarAlt } from 'react-icons/fa'

const BlogSection = styled.section`
  padding: ${({ theme }) => theme.spacing['5xl']} 0;
  background-color: ${({ theme }) => theme.colors.light.background};

  [data-theme='dark'] & {
    background-color: ${({ theme }) => theme.colors.dark.background};
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

const ComingSoonCard = styled.div`
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.light.surface}, 
    ${({ theme }) => theme.colors.light.background});
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing['3xl']};
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 2px solid ${({ theme }) => theme.colors.light.border};

  [data-theme='dark'] & {
    background: linear-gradient(135deg, 
      ${({ theme }) => theme.colors.dark.surface}, 
      ${({ theme }) => theme.colors.dark.background});
    border-color: ${({ theme }) => theme.colors.dark.border};
  }
`

const ComingSoonIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.light.primary}, 
    ${({ theme }) => theme.colors.light.secondary});
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: white;
  font-size: ${({ theme }) => theme.fontSizes['2xl']};

  [data-theme='dark'] & {
    background: linear-gradient(135deg, 
      ${({ theme }) => theme.colors.dark.primary}, 
      ${({ theme }) => theme.colors.dark.secondary});
  }
`

const ComingSoonTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.light.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.text};
  }
`

const ComingSoonDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.light.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.7;

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.textSecondary};
  }
`

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`

const BlogCard = styled.article`
  background-color: ${({ theme }) => theme.colors.light.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  [data-theme='dark'] & {
    background-color: ${({ theme }) => theme.colors.dark.surface};
  }
`

const BlogImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.light.primary}20, 
    ${({ theme }) => theme.colors.light.secondary}20);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.light.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};

  [data-theme='dark'] & {
    background: linear-gradient(135deg, 
      ${({ theme }) => theme.colors.dark.primary}20, 
      ${({ theme }) => theme.colors.dark.secondary}20);
    color: ${({ theme }) => theme.colors.dark.textSecondary};
  }
`

const BlogContent = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.light.textSecondary};

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.textSecondary};
  }
`

const BlogTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.light.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.text};
  }
`

const BlogExcerpt = styled.p`
  color: ${({ theme }) => theme.colors.light.textSecondary};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.textSecondary};
  }
`

const BlogLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.light.primary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.light.secondary};
  }

  [data-theme='dark'] & {
    color: ${({ theme }) => theme.colors.dark.primary};

    &:hover {
      color: ${({ theme }) => theme.colors.dark.secondary};
    }
  }
`

// Sample blog posts data (replace with actual blog posts)
const blogPosts = [
  {
    id: 1,
    title: "Building Modern Web Applications with React",
    excerpt: "Learn how to create scalable and maintainable React applications using modern development practices and tools.",
    date: "2024-01-15",
    readTime: "5 min read",
    image: "/images/blog-1.jpg",
    url: "#"
  },
  {
    id: 2,
    title: "The Future of JavaScript Development",
    excerpt: "Exploring the latest trends and features in JavaScript that are shaping the future of web development.",
    date: "2024-01-10",
    readTime: "7 min read",
    image: "/images/blog-2.jpg",
    url: "#"
  },
  {
    id: 3,
    title: "Getting Started with TypeScript",
    excerpt: "A beginner's guide to TypeScript and how it can improve your JavaScript development experience.",
    date: "2024-01-05",
    readTime: "6 min read",
    image: "/images/blog-3.jpg",
    url: "#"
  }
]

export default function Blog() {
  const blogRef = useRef<HTMLElement>(null)
  const showBlogPosts = false // Set to true when you have actual blog posts

  useEffect(() => {
    if (blogRef.current && typeof window !== 'undefined') {
      // Dynamically import GSAP
      import('gsap').then(({ gsap }) => {
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger)
          
          // Set initial state
          gsap.set(['.blog-header'], {
            opacity: 0,
            y: 50
          })
          gsap.set(['.blog-card', '.coming-soon'], {
            opacity: 0,
            y: 30
          })
          
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: blogRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          })

          tl.to('.blog-header', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          })

          if (showBlogPosts) {
            tl.to('.blog-card', {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power2.out'
            }, '-=0.4')
          } else {
            tl.to('.coming-soon', {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out'
            }, '-=0.4')
          }
        })
      })
    }
  }, [showBlogPosts])

  return (
    <BlogSection id="blog" ref={blogRef}>
      <Container>
        <SectionHeader className="blog-header">
          <SectionTitle>Blog & Articles</SectionTitle>
          <SectionSubtitle>
            Thoughts on technology, development, and learning
          </SectionSubtitle>
        </SectionHeader>

        {showBlogPosts ? (
          <BlogGrid>
            {blogPosts.map(post => (
              <BlogCard key={post.id} className="blog-card">
                <BlogImage>
                  {post.title} Preview
                </BlogImage>
                <BlogContent>
                  <BlogMeta>
                    <span>
                      <FaCalendarAlt /> {new Date(post.date).toLocaleDateString()}
                    </span>
                    <span>{post.readTime}</span>
                  </BlogMeta>
                  <BlogTitle>{post.title}</BlogTitle>
                  <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                  <BlogLink href={post.url}>
                    Read More <FaExternalLinkAlt />
                  </BlogLink>
                </BlogContent>
              </BlogCard>
            ))}
          </BlogGrid>
        ) : (
          <ComingSoonCard className="coming-soon">
            <ComingSoonIcon>📝</ComingSoonIcon>
            <ComingSoonTitle>Blog Coming Soon</ComingSoonTitle>
            <ComingSoonDescription>
              I'm working on creating valuable content about software development, 
              technology trends, and my learning journey. Check back soon for articles 
              on React, TypeScript, web development best practices, and more!
            </ComingSoonDescription>
          </ComingSoonCard>
        )}
      </Container>
    </BlogSection>
  )
}
