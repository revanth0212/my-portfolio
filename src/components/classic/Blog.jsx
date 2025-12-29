import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { blogPosts } from '../../data/blogPosts';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Header = styled.div`
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.foreground};
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  color: ${props => props.theme.muted};
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const BlogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BlogCard = styled.article`
  background-color: ${props => props.theme.card};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: ${props => props.theme.cardShadow};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.accent};
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

const BlogTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.foreground};
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const BlogMeta = styled.div`
  display: flex;
  gap: 1rem;
  color: ${props => props.theme.muted};
  font-size: 0.85rem;
  margin-bottom: 1rem;
`;

const BlogExcerpt = styled.p`
  color: ${props => props.theme.foreground};
  line-height: 1.7;
  margin-bottom: 1.25rem;
  font-size: 0.95rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ReadMoreLink = styled(Link)`
  color: ${props => props.theme.accent};
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    gap: 0.75rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${props => props.theme.muted};
  background-color: ${props => props.theme.card};
  border-radius: 12px;
  border: 1px solid ${props => props.theme.border};
`;

const Blog = () => {
  const { currentTheme } = useTheme();

  if (blogPosts.length === 0) {
    return (
      <Container>
        <Header>
          <Title theme={currentTheme}>Blog</Title>
        </Header>
        <EmptyState theme={currentTheme}>
          No blog posts yet. Check back soon!
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title theme={currentTheme}>Blog</Title>
        <Subtitle theme={currentTheme}>
          Thoughts, tutorials, and insights from my journey
        </Subtitle>
      </Header>
      <BlogList>
        {blogPosts.map((post) => (
          <BlogCard key={post.id} theme={currentTheme}>
            <BlogTitle theme={currentTheme}>{post.title}</BlogTitle>
            <BlogMeta theme={currentTheme}>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </BlogMeta>
            <BlogExcerpt theme={currentTheme}>
              {post.excerpt}
            </BlogExcerpt>
            <ReadMoreLink
              to={`/blog/${post.id}`}
              theme={currentTheme}
            >
              Read more →
            </ReadMoreLink>
          </BlogCard>
        ))}
      </BlogList>
    </Container>
  );
};

export default Blog;
