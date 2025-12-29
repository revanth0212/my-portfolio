import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { useHotkeys } from 'react-hotkeys-hook';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.foreground};
  padding: 2rem;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  font-family: 'Fira Code', monospace;
  border: 2px solid ${props => props.theme.accent};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
`;

const ShortcutTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
`;

const ShortcutRow = styled.tr`
  border-bottom: 1px solid ${props => props.theme.border};

  &:last-child {
    border-bottom: none;
  }
`;

const ShortcutKey = styled.td`
  padding: 0.75rem 0;
  font-weight: 600;
  color: ${props => props.theme.accent};
  width: 35%;
  font-family: 'Fira Code', monospace;
`;

const ShortcutDesc = styled.td`
  padding: 0.75rem 0;
`;

const CommandList = styled.div`
  margin-top: 1.5rem;
`;

const CommandTitle = styled.h3`
  color: ${props => props.theme.accent};
  margin-bottom: 0.75rem;
`;

const CommandItem = styled.div`
  padding: 0.5rem 0;
  color: ${props => props.theme.foreground};
`;

const CommandCode = styled.code`
  background-color: ${props => props.theme.secondary};
  color: ${props => props.theme.accent};
  padding: 0.2em 0.5em;
  border-radius: 3px;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background-color: ${props => props.theme.accent};
  color: ${props => props.theme.name === 'light' ? '#fff' : props.theme.background};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1.5rem;
  font-family: inherit;
  font-weight: 600;
  width: 100%;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.foreground};
  }
`;

const HelpModal = ({ isOpen, onClose }) => {
  const { currentTheme } = useTheme();

  useHotkeys('escape', onClose, { enabled: isOpen });

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent theme={currentTheme} onClick={e => e.stopPropagation()}>
        <h2>Keyboard Shortcuts</h2>

        <ShortcutTable>
          <tbody>
            <ShortcutRow>
              <ShortcutKey theme={currentTheme}>Ctrl + K</ShortcutKey>
              <ShortcutDesc theme={currentTheme}>Focus command input</ShortcutDesc>
            </ShortcutRow>
            <ShortcutRow>
              <ShortcutKey theme={currentTheme}>/</ShortcutKey>
              <ShortcutDesc theme={currentTheme}>Focus command input</ShortcutDesc>
            </ShortcutRow>
            <ShortcutRow>
              <ShortcutKey theme={currentTheme}>Ctrl + T</ShortcutKey>
              <ShortcutDesc theme={currentTheme}>Toggle theme (Light/Dark)</ShortcutDesc>
            </ShortcutRow>
            <ShortcutRow>
              <ShortcutKey theme={currentTheme}>↑ / ↓</ShortcutKey>
              <ShortcutDesc theme={currentTheme}>Navigate command history</ShortcutDesc>
            </ShortcutRow>
            <ShortcutRow>
              <ShortcutKey theme={currentTheme}>Tab</ShortcutKey>
              <ShortcutDesc theme={currentTheme}>Auto-complete commands</ShortcutDesc>
            </ShortcutRow>
            <ShortcutRow>
              <ShortcutKey theme={currentTheme}>Esc</ShortcutKey>
              <ShortcutDesc theme={currentTheme}>Clear input / Close modal</ShortcutDesc>
            </ShortcutRow>
            <ShortcutRow>
              <ShortcutKey theme={currentTheme}>?</ShortcutKey>
              <ShortcutDesc theme={currentTheme}>Show this help modal</ShortcutDesc>
            </ShortcutRow>
          </tbody>
        </ShortcutTable>

        <CommandList>
          <CommandTitle theme={currentTheme}>Terminal Commands</CommandTitle>
          <CommandItem><CommandCode theme={currentTheme}>about</CommandCode> - View information about me</CommandItem>
          <CommandItem><CommandCode theme={currentTheme}>blog</CommandCode> - Browse blog posts</CommandItem>
          <CommandItem><CommandCode theme={currentTheme}>blogs</CommandCode> - List all blog posts</CommandItem>
          <CommandItem><CommandCode theme={currentTheme}>blog &lt;id&gt;</CommandCode> - Open a specific blog post (e.g., "blog 1")</CommandItem>
          <CommandItem><CommandCode theme={currentTheme}>contact</CommandCode> - Get in touch</CommandItem>
          <CommandItem><CommandCode theme={currentTheme}>home</CommandCode> - Return to home</CommandItem>
          <CommandItem><CommandCode theme={currentTheme}>theme</CommandCode> - Toggle theme</CommandItem>
          <CommandItem><CommandCode theme={currentTheme}>clear</CommandCode> - Clear terminal output</CommandItem>
          <CommandItem><CommandCode theme={currentTheme}>help</CommandCode> - Show this help</CommandItem>
        </CommandList>

        <CloseButton theme={currentTheme} onClick={onClose}>
          Close (Esc)
        </CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default HelpModal;
