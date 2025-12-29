import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { useHotkeys } from 'react-hotkeys-hook';

const ToggleButton = styled.button`
  background: transparent;
  border: 1px solid ${props => props.theme.border};
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.secondary};
    border-color: ${props => props.theme.accent};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.accent};
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.4rem 0.6rem;
  }
`;

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  useHotkeys('ctrl+t', (e) => {
    e.preventDefault();
    toggleTheme();
  });

  return (
    <ToggleButton
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title={`Toggle theme (${theme === 'light' ? 'Dark' : 'Light'}) - Ctrl+T`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </ToggleButton>
  );
};

export default ThemeToggle;
