import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { personal } from '../../config/personal';

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

const ASCIIArt = styled.pre`
  font-size: 0.7rem;
  line-height: 1;
  color: ${props => props.theme.accent};
  background: transparent;
  border: none;
  padding: 0;
  margin-bottom: 2rem;
  overflow-x: auto;
  white-space: pre;
`;

const Content = styled.div`
  line-height: 1.8;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const Paragraph = styled.p`
  margin-bottom: 1.5rem;
`;

const Highlight = styled.span`
  color: ${props => props.theme.accent};
  font-weight: 600;
`;

const Link = styled.a`
  color: ${props => props.theme.accent};
  text-decoration: none;
  border-bottom: 1px solid ${props => props.theme.accent};
  padding-bottom: 2px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.secondary};
  }
`;

const About = () => {
  const { currentTheme } = useTheme();

  return (
    <SectionContainer>
      <SectionTitle theme={currentTheme}>About Me</SectionTitle>

      <ASCIIArt theme={currentTheme}>
{`
 ██████╗ ███████╗ █████╗ ██╗     ███████╗██████╗
██╔════╝ ██╔════╝██╔══██╗██║     ██╔════╝██╔══██╗
██║  ███╗█████╗  ███████║██║     █████╗  ██║  ██║
██║   ██║██╔══╝  ██╔══██║██║     ██╔══╝  ██║  ██║
╚██████╔╝███████╗██║  ██║███████╗███████╗██████╔╝
 ╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚═════╝
`}
      </ASCIIArt>

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
          Feel free to explore my <Link href="/projects" theme={currentTheme}>projects</Link>,
          check out my <Link href="/blog" theme={currentTheme}>blog</Link>, or
          <Link href="/contact" theme={currentTheme}> get in touch</Link>!
        </Paragraph>

        <Paragraph>
          <Highlight theme={currentTheme}>Fun fact:</Highlight> This portfolio is fully
          keyboard-navigable! Press <code>?</code> to see all available commands.
        </Paragraph>
      </Content>
    </SectionContainer>
  );
};

export default About;
