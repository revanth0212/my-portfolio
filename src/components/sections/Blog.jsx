import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { blogPosts } from '../../data/blogPosts';

const SectionContainer = styled.section`
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  color: ${props => props.theme.accent};
  border-bottom: 2px solid ${props => props.theme.accent};
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const BlogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BlogCard = styled(Link)`
  border: 1px solid ${props => props.theme.border};
  border-radius: 5px;
  padding: 1.5rem;
  background-color: ${props => props.theme.secondary};
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  text-decoration: none;

  &:hover {
    border-color: ${props => props.theme.accent};
    transform: translateX(5px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.accent};
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const PostTitle = styled.h3`
  font-size: 1.5rem;
  color: ${props => props.theme.accent};
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const PostMeta = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.muted};
  margin-bottom: 1rem;
`;

const PostExcerpt = styled.p`
  color: ${props => props.theme.foreground};
  line-height: 1.6;
  font-size: 0.95rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${props => props.theme.muted};

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Blog = () => {
  const { currentTheme } = useTheme();

  if (blogPosts.length === 0) {
    return (
      <SectionContainer>
        <SectionTitle theme={currentTheme}>Blog</SectionTitle>
        <EmptyState theme={currentTheme}>
          No blog posts yet. Check back soon!
        </EmptyState>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer>
      <SectionTitle theme={currentTheme}>Blog Posts</SectionTitle>
      <p style={{ color: currentTheme.muted, marginBottom: '1.5rem' }}>
        Thoughts, tutorials, and insights about software development
      </p>
      <BlogList>
        {blogPosts.map((post) => (
          <BlogCard
            key={post.id}
            to={`/blog/${post.id}`}
            theme={currentTheme}
            aria-label={`Read ${post.title}`}
          >
            <PostTitle theme={currentTheme}>{post.title}</PostTitle>
            <PostMeta theme={currentTheme}>
              {post.date} • {post.readTime}
            </PostMeta>
            <PostExcerpt theme={currentTheme}>{post.excerpt}</PostExcerpt>
          </BlogCard>
        ))}
      </BlogList>
    </SectionContainer>
  );
};

export default Blog;
