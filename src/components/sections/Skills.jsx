import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 1.5rem;
  }
`;

const SkillCategory = styled.div`
  border: 1px solid ${props => props.theme.border};
  border-radius: 5px;
  padding: 1.5rem;
  background-color: ${props => props.theme.secondary};

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.25rem;
  color: ${props => props.theme.accent};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
`;

const SkillList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SkillItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background-color: ${props => props.theme.background};
  border-radius: 4px;
  border: 1px solid ${props => props.theme.border};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.accent};
    transform: translateX(5px);
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 0.75rem;
    padding: 0.5rem;
  }
`;

const SkillName = styled.span`
  flex: 1;
  font-weight: 500;
`;

const SkillLevel = styled.div`
  display: flex;
  gap: 3px;
`;

const SkillDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props =>
    props.filled ? props.theme.accent : props.theme.border};
`;

const skillsData = [
  {
    category: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'JavaScript', level: 5 },
      { name: 'React', level: 5 },
      { name: 'TypeScript', level: 4 },
      { name: 'HTML5/CSS3', level: 5 },
      { name: 'Frontend Architecture', level: 5 },
    ],
  },
  {
    category: 'Backend & Languages',
    icon: '⚙️',
    skills: [
      { name: 'Java', level: 5 },
      { name: 'Python', level: 4 },
      { name: 'Node.js', level: 4 },
      { name: 'SQL Server', level: 5 },
      { name: 'REST APIs', level: 5 },
    ],
  },
  {
    category: 'Systems & Network',
    icon: '🌐',
    skills: [
      { name: 'Distributed Systems', level: 5 },
      { name: 'Networking', level: 5 },
      { name: 'Network Security', level: 4 },
      { name: 'SDN/OpenDayLight', level: 4 },
      { name: 'Linux', level: 4 },
    ],
  },
  {
    category: 'Tools & Platforms',
    icon: '🛠️',
    skills: [
      { name: 'Git', level: 5 },
      { name: 'Docker', level: 4 },
      { name: 'AWS', level: 4 },
      { name: 'MSSQL', level: 5 },
      { name: 'IoT/Raspberry Pi', level: 4 },
    ],
  },
];

const Skills = () => {
  const { currentTheme } = useTheme();

  return (
    <SectionContainer>
      <SectionTitle theme={currentTheme}>Skills & Technologies</SectionTitle>
      <p style={{ color: currentTheme.muted, marginBottom: '1rem' }}>
        Technologies and tools I work with regularly
      </p>
      <SkillsGrid>
        {skillsData.map((category) => (
          <SkillCategory key={category.category} theme={currentTheme}>
            <CategoryTitle theme={currentTheme}>
              {category.icon} {category.category}
            </CategoryTitle>
            <SkillList>
              {category.skills.map((skill) => (
                <SkillItem key={skill.name} theme={currentTheme}>
                  <SkillName>{skill.name}</SkillName>
                  <SkillLevel theme={currentTheme}>
                    {[1, 2, 3, 4, 5].map((level) => (
                      <SkillDot
                        key={level}
                        theme={currentTheme}
                        filled={level <= skill.level}
                      />
                    ))}
                  </SkillLevel>
                </SkillItem>
              ))}
            </SkillList>
          </SkillCategory>
        ))}
      </SkillsGrid>
    </SectionContainer>
  );
};

export default Skills;
