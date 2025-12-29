import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { personal } from '../../config/personal';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Hero = styled.div`
  text-align: center;
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  color: ${props => props.theme.foreground};
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${props => props.theme.muted};
  margin-bottom: 2.5rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const Navigation = styled.nav`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const NavLink = styled(Link)`
  padding: 0.875rem 1.75rem;
  background-color: ${props => props.theme.card};
  color: ${props => props.theme.foreground};
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  border: 1px solid ${props => props.theme.border};
  box-shadow: ${props => props.theme.cardShadow};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.accent};
    color: ${props => props.theme.accent};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.accent}40;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
  }
`;

const Home = () => {
  const { currentTheme } = useTheme();

  return (
    <Container>
      <Hero>
        <Title theme={currentTheme}>Hi, I'm {personal.name.full}</Title>
        <Subtitle theme={currentTheme}>
          {personal.title} at {personal.company} with {personal.experience.text} of experience in frontend development and distributed systems.
        </Subtitle>
        <Navigation>
          <NavLink to="/about" theme={currentTheme}>About</NavLink>
          <NavLink to="/projects" theme={currentTheme}>Projects</NavLink>
          <NavLink to="/skills" theme={currentTheme}>Skills</NavLink>
          <NavLink to="/blog" theme={currentTheme}>Blog</NavLink>
          <NavLink to="/contact" theme={currentTheme}>Contact</NavLink>
        </Navigation>
      </Hero>
    </Container>
  );
};

export default Home;
