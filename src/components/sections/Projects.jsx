import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { projects } from '../../data/projects';

const SectionContainer = styled.section`
  padding: 2rem;
  max-width: 1000px;
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
    margin-bottom: 1rem;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 1rem;
  }
`;

const ProjectCard = styled.div`
  border: 1px solid ${props => props.theme.border};
  border-radius: 5px;
  padding: 1.5rem;
  background-color: ${props => props.theme.secondary};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.accent};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  color: ${props => props.theme.accent};
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme.foreground};
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.95rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TechTag = styled.span`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.accent};
  padding: 0.25rem 0.75rem;
  border-radius: 3px;
  font-size: 0.85rem;
  border: 1px solid ${props => props.theme.border};

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.2rem 0.6rem;
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const ProjectLink = styled.a`
  color: ${props => props.theme.accent};
  text-decoration: none;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.theme.border};
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.accent};
    color: ${props => props.theme.name === 'light' ? '#fff' : props.theme.background};
    border-color: ${props => props.theme.accent};
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.4rem 0.8rem;
    justify-content: center;
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

const Projects = () => {
  const { currentTheme } = useTheme();

  if (projects.length === 0) {
    return (
      <SectionContainer>
        <SectionTitle theme={currentTheme}>Projects</SectionTitle>
        <EmptyState theme={currentTheme}>
          No projects yet. Check back soon!
        </EmptyState>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer>
      <SectionTitle theme={currentTheme}>Projects</SectionTitle>
      <p style={{ color: currentTheme.muted, marginBottom: '1rem' }}>
        Here are some of my recent projects. Feel free to explore!
      </p>
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
                  📝 Code
                </ProjectLink>
              )}
              {project.liveUrl && (
                <ProjectLink
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  theme={currentTheme}
                >
                  🔗 Live Demo
                </ProjectLink>
              )}
            </ProjectLinks>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </SectionContainer>
  );
};

export default Projects;
