import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { blogPosts } from '../../data/blogPosts';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Navigate } from 'react-router-dom';

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

const BackButton = styled(Link)`
  background: transparent;
  border: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.foreground};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Fira Code', monospace;
  margin-bottom: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  text-decoration: none;

  &:hover {
    border-color: ${props => props.theme.accent};
    background-color: ${props => props.theme.secondary};
  }
`;

const PostMeta = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.muted};
  margin-bottom: 2rem;
`;

const PostContent = styled.div`
  line-height: 1.8;
  color: ${props => props.theme.foreground};

  h1, h2, h3, h4, h5, h6 {
    color: ${props => props.theme.accent};
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  h1 { font-size: 2rem; }
  h2 { font-size: 1.5rem; }
  h3 { font-size: 1.25rem; }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: ${props => props.theme.accent};
    text-decoration: underline;
  }

  code {
    font-family: 'Fira Code', monospace;
    font-size: 0.9em;
  }

  pre {
    margin: 1.5rem 0;
    border-radius: 5px;
    overflow-x: auto;
  }

  blockquote {
    border-left: 4px solid ${props => props.theme.accent};
    padding-left: 1rem;
    margin: 1.5rem 0;
    color: ${props => props.theme.muted};
    font-style: italic;
  }

  ul, ol {
    margin-left: 2rem;
    margin-bottom: 1rem;
  }

  img {
    max-width: 100%;
    border-radius: 5px;
    margin: 1.5rem 0;
  }

  @media (max-width: 768px) {
    h1 { font-size: 1.5rem; }
    h2 { font-size: 1.25rem; }
    h3 { font-size: 1.1rem; }
    p { font-size: 0.9rem; }
    ul, ol { margin-left: 1.5rem; }
  }
`;

const BlogPost = () => {
  const { currentTheme, theme } = useTheme();
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <SectionContainer>
      <BackButton
        to="/blog"
        theme={currentTheme}
        aria-label="Back to blog list"
      >
        ← Back to Posts
      </BackButton>
      <PostContent theme={currentTheme}>
        <h1>{post.title}</h1>
        <PostMeta theme={currentTheme}>
          {post.date} • {post.readTime}
        </PostMeta>
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={theme === 'dark' ? vscDarkPlus : vs}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </PostContent>
    </SectionContainer>
  );
};

export default BlogPost;
