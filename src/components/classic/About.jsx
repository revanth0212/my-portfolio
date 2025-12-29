import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { personal } from '../../config/personal';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.foreground};
  margin-bottom: 2rem;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }
`;

const Content = styled.div`
  color: ${props => props.theme.foreground};
  line-height: 1.8;
  font-size: 1.05rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Paragraph = styled.p`
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    margin-bottom: 1.25rem;
  }
`;

const Highlight = styled.span`
  color: ${props => props.theme.accent};
  font-weight: 600;
`;

const StyledLink = styled(Link)`
  color: ${props => props.theme.accent};
  text-decoration: none;
  border-bottom: 2px solid ${props => props.theme.accent}40;
  transition: all 0.2s ease;

  &:hover {
    border-bottom-color: ${props => props.theme.accent};
  }
`;

const InfoCard = styled.div`
  background-color: ${props => props.theme.card};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
  box-shadow: ${props => props.theme.cardShadow};

  @media (max-width: 768px) {
    padding: 1rem;
    margin-top: 1.5rem;
  }
`;

const InfoCardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.foreground};
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const About = () => {
  const { currentTheme } = useTheme();

  return (
    <Container>
      <Title theme={currentTheme}>About Me</Title>

      <Content>
        <Paragraph>
          <Highlight theme={currentTheme}>Hello!</Highlight> I'm {personal.name.full},
          a {personal.title} at {personal.company} with {personal.experience.text} of experience in
          frontend development and software engineering.
        </Paragraph>

        <Paragraph>
          I specialize in <Highlight theme={currentTheme}>{personal.about.specialization}</Highlight>,
          distributed systems, and developer tools. My expertise spans frontend frameworks,
          backend architecture, database design, and network security.
        </Paragraph>

        <Paragraph>
          I hold a {personal.education.degree} from <Highlight theme={currentTheme}>{personal.education.school}</Highlight>
          and have a {personal.education.certification}. Throughout my career,
          I've worked on projects ranging from IoT systems to real-time e-commerce platforms
          and distributed database systems.
        </Paragraph>

        <Paragraph>
          Currently based in <Highlight theme={currentTheme}>{personal.location}</Highlight>, I'm passionate
          about {personal.about.interests.join(', ')}.
        </Paragraph>

        <Paragraph>
          Feel free to explore my <StyledLink to="/projects">projects</StyledLink>,
          check out my <StyledLink to="/blog">blog</StyledLink>, or
          <StyledLink to="/contact"> get in touch</StyledLink>!
        </Paragraph>
      </Content>

      <InfoCard theme={currentTheme}>
        <InfoCardTitle theme={currentTheme}>Quick Tip</InfoCardTitle>
        <Content>
          You can switch between the Normal view and Terminal view using the toggle button
          in the header. The terminal view offers keyboard navigation for quick access.
        </Content>
      </InfoCard>
    </Container>
  );
};

export default About;
