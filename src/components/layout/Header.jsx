import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useView } from '../../context/ViewContext';
import ThemeToggle from '../common/ThemeToggle';
import ViewToggle from '../common/ViewToggle';
import { siteConfig } from '../../config/site';

const HeaderContainer = styled.header`
  padding: 1.5rem 2rem;
  border-bottom: ${props => props.view === 'classic' ? '1px' : '2px'} solid ${props => props.theme.accent};
  background-color: ${props => props.theme.secondary};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
`;

const Title = styled(Link)`
  font-size: ${props => props.view === 'classic' ? '1.5rem' : '1.25rem'};
  font-weight: ${props => props.view === 'classic' ? '700' : '600'};
  color: ${props => props.theme.foreground};
  margin: 0;
  font-family: ${props => props.view === 'classic' ? 'system-ui, -apple-system, sans-serif' : "'Fira Code', monospace"};
  letter-spacing: ${props => props.view === 'classic' ? '-0.02em' : 'normal'};
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    color: ${props => props.theme.accent};
  }

  &:focus {
    outline: none;
    text-decoration: underline;
    text-decoration-color: ${props => props.theme.accent};
  }

  @media (max-width: 768px) {
    font-size: ${props => props.view === 'classic' ? '1.2rem' : '0.9rem'};
    word-break: break-all;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
`;

const HelpButton = styled.button`
  background: transparent;
  border: 1px solid ${props => props.theme.border};
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-weight: 600;
  transition: all 0.3s ease;
  color: ${props => props.theme.foreground};

  &:hover {
    background-color: ${props => props.theme.accent};
    border-color: ${props => props.theme.accent};
    color: ${props => props.theme.name === 'light' || props.theme.name === 'classic-light' ? '#fff' : props.theme.background};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.accent};
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.4rem 0.6rem;
  }
`;

const Header = ({ onToggleHelp }) => {
  const { currentTheme } = useTheme();
  const { view } = useView();

  const getTitle = () => {
    return view === 'classic' ? siteConfig.classicTitle : siteConfig.terminalPrompt;
  };

  return (
    <HeaderContainer theme={currentTheme} view={view}>
      <Title to="/" theme={currentTheme} view={view}>{getTitle()}</Title>
      <Controls>
        <ViewToggle />
        <ThemeToggle />
        {view === 'terminal' && (
          <HelpButton
            theme={currentTheme}
            onClick={onToggleHelp}
            aria-label="Show keyboard shortcuts"
            title="Help (?)"
          >
            ?
          </HelpButton>
        )}
      </Controls>
    </HeaderContainer>
  );
};

export default Header;
