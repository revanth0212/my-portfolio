import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { social } from '../../config/social';
import { personal } from '../../config/personal';

const SectionContainer = styled.section`
  padding: 2rem;
  max-width: 800px;
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

const ContactCard = styled.div`
  border: 1px solid ${props => props.theme.border};
  border-radius: 5px;
  padding: 2rem;
  background-color: ${props => props.theme.secondary};
  margin-top: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
    margin-top: 1.5rem;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid ${props => props.theme.border};
  border-radius: 4px;
  background-color: ${props => props.theme.background};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.accent};
    transform: translateX(5px);
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    gap: 0.75rem;
  }
`;

const ContactIcon = styled.span`
  font-size: 1.5rem;
  width: 40px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    width: 32px;
  }
`;

const ContactInfo = styled.div`
  flex: 1;
`;

const ContactLabel = styled.div`
  font-size: 0.85rem;
  color: ${props => props.theme.muted};
  margin-bottom: 0.25rem;
`;

const ContactValue = styled.a`
  color: ${props => props.theme.foreground};
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;

  &:hover {
    color: ${props => props.theme.accent};
    text-decoration: underline;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    margin-top: 1.5rem;
    gap: 0.75rem;
  }
`;

const SocialButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.theme.background};
  border: 1px solid ${props => props.theme.border};
  border-radius: 4px;
  color: ${props => props.theme.foreground};
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.accent};
    background-color: ${props => props.theme.accent};
    color: ${props => props.theme.name === 'light' ? '#fff' : props.theme.background};
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
`;

const Contact = () => {
  const { currentTheme } = useTheme();

  return (
    <SectionContainer>
      <SectionTitle theme={currentTheme}>Get In Touch</SectionTitle>
      <p style={{ color: currentTheme.muted }}>
        I'm a {personal.title} at {personal.company} with {personal.experience.text} of experience.
        Always open to discussing new opportunities and ideas.
      </p>

      <ContactCard theme={currentTheme}>
        <ContactItem theme={currentTheme}>
          <ContactIcon>📧</ContactIcon>
          <ContactInfo>
            <ContactLabel theme={currentTheme}>Email</ContactLabel>
            <ContactValue href={`mailto:${social.email}`} theme={currentTheme}>
              {social.email}
            </ContactValue>
          </ContactInfo>
        </ContactItem>

        <ContactItem theme={currentTheme}>
          <ContactIcon>📍</ContactIcon>
          <ContactInfo>
            <ContactLabel theme={currentTheme}>Location</ContactLabel>
            <ContactValue theme={currentTheme}>{personal.location}</ContactValue>
          </ContactInfo>
        </ContactItem>

        <ContactItem theme={currentTheme}>
          <ContactIcon>💼</ContactIcon>
          <ContactInfo>
            <ContactLabel theme={currentTheme}>Company</ContactLabel>
            <ContactValue theme={currentTheme}>{personal.company}</ContactValue>
          </ContactInfo>
        </ContactItem>
      </ContactCard>

      <SocialLinks>
        <SocialButton
          href={social.github.url}
          target="_blank"
          rel="noopener noreferrer"
          theme={currentTheme}
        >
          <span>🐙</span> GitHub
        </SocialButton>
        <SocialButton
          href={social.linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
          theme={currentTheme}
        >
          <span>💼</span> LinkedIn
        </SocialButton>
      </SocialLinks>
    </SectionContainer>
  );
};

export default Contact;
