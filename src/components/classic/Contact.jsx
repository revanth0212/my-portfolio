import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { contactInfo, social } from '../../config/social';
import { personal } from '../../config/personal';

const Container = styled.div`
  max-width: 700px;
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
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  color: ${props => props.theme.muted};
  font-size: 1.1rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const ContactCard = styled.div`
  background-color: ${props => props.theme.card};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: ${props => props.theme.cardShadow};
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background-color: ${props => props.theme.secondary};
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  text-decoration: none;
  color: ${props => props.theme.foreground};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.accent};
    transform: translateX(4px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.accent}40;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
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
  font-size: 0.8rem;
  color: ${props => props.theme.muted};
  margin-bottom: 0.25rem;
`;

const ContactValue = styled.div`
  font-weight: 500;
  color: ${props => props.theme.foreground};
`;

const FooterText = styled.p`
  text-align: center;
  color: ${props => props.theme.muted};
  font-size: 0.95rem;
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Contact = () => {
  const { currentTheme } = useTheme();

  const contacts = [contactInfo.email, contactInfo.linkedin, contactInfo.github];

  return (
    <Container>
      <Title theme={currentTheme}>Get in Touch</Title>
      <Subtitle theme={currentTheme}>
        Feel free to reach out! I'd love to hear from you.
      </Subtitle>

      <ContactCard theme={currentTheme}>
        <ContactList>
          {contacts.map((contact, index) => (
            <ContactItem
              key={index}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              theme={currentTheme}
            >
              <ContactIcon>{contact.icon}</ContactIcon>
              <ContactInfo>
                <ContactLabel theme={currentTheme}>{contact.label}</ContactLabel>
                <ContactValue theme={currentTheme}>{contact.value}</ContactValue>
              </ContactInfo>
            </ContactItem>
          ))}
        </ContactList>
      </ContactCard>

      <FooterText theme={currentTheme}>
        I'm currently a {personal.title} at {personal.company}. Feel free to reach out!
      </FooterText>
    </Container>
  );
};

export default Contact;
