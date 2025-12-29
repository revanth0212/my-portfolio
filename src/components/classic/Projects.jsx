import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { projects } from '../../data/projects';

const Container = styled.div`
  max-width: 1000px;
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ProjectCard = styled.div`
  background-color: ${props => props.theme.card};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  padding: 1.75rem;
  box-shadow: ${props => props.theme.cardShadow};
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: ${props => props.theme.accent};
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 600;
  color: ${props => props.theme.foreground};
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    font-size: 1.15rem;
  }
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme.foreground};
  line-height: 1.7;
  margin-bottom: 1.25rem;
  font-size: 0.95rem;
  flex: 1;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;

  @media (max-width: 768px) {
    gap: 0.4rem;
    margin-bottom: 1rem;
  }
`;

const TechTag = styled.span`
  background-color: ${props => props.theme.accent}15;
  color: ${props => props.theme.accent};
  padding: 0.35rem 0.85rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;

  @media (max-width: 768px) {
    padding: 0.3rem 0.65rem;
    font-size: 0.75rem;
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: auto;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const ProjectLink = styled.a`
  color: ${props => props.theme.accent};
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.6rem 1.1rem;
  border: 1px solid ${props => props.theme.accent};
  border-radius: 6px;
  transition: all 0.2s ease;
  flex: 1;
  text-align: center;

  &:hover {
    background-color: ${props => props.theme.accent};
    color: ${props => props.theme.name === 'normal-light' ? '#fff' : props.theme.background};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.accent}40;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.5rem 0.9rem;
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

const Projects = () => {
  const { currentTheme } = useTheme();

  if (projects.length === 0) {
    return (
      <Container>
        <Header>
          <Title theme={currentTheme}>Projects</Title>
        </Header>
        <EmptyState theme={currentTheme}>
          No projects yet. Check back soon!
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title theme={currentTheme}>Projects</Title>
        <Subtitle theme={currentTheme}>
          Here are some of my recent projects. Feel free to explore!
        </Subtitle>
      </Header>
      <ProjectsGrid>
        {projects.map((project) => (
          <ProjectCard key={project.id} theme={currentTheme}>
            <ProjectTitle theme={currentTheme}>{project.name}</ProjectTitle>
            <ProjectDescription theme={currentTheme}>
              {project.description}
            </ProjectDescription>
            <TechStack>
              {project.techStack.map((tech) => (
                <TechTag key={tech} theme={currentTheme}>
                  {tech}
                </TechTag>
              ))}
            </TechStack>
            <ProjectLinks>
              {project.githubUrl && (
                <ProjectLink
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  theme={currentTheme}
                >
                  View Code
                </ProjectLink>
              )}
              {project.liveUrl && (
                <ProjectLink
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  theme={currentTheme}
                >
                  Live Demo
                </ProjectLink>
              )}
            </ProjectLinks>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </Container>
  );
};

export default Projects;
