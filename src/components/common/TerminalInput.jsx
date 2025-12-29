import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { useKeyboardNavigation, AVAILABLE_COMMANDS } from '../../utils/keyboardNavigation';
import { siteConfig } from '../../config/site';

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0;
  width: 100%;
`;

const Prompt = styled.span`
  color: ${props => props.theme.accent};
  font-weight: 600;
  white-space: nowrap;
`;

const InputWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  color: ${props => props.theme.foreground};
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 1rem;
  padding: 0.5rem;
  outline: none;
  caret-color: ${props => props.theme.foreground};

  &::placeholder {
    color: ${props => props.theme.muted};
    opacity: 0.6;
  }

  &:focus {
    background-color: ${props => props.theme.secondary};
    border-radius: 3px;
  }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 10px;
  height: 1.2rem;
  background-color: ${props => props.theme.foreground};
  animation: blink 1s infinite;
  margin-left: -10px;
  pointer-events: none;

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;

const Suggestions = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.background};
  border: 1px solid ${props => props.theme.accent};
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
  margin-bottom: 0.5rem;
`;

const SuggestionItem = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover,
  &:focus {
    background-color: ${props => props.theme.secondary};
    outline: none;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TerminalInput = ({ onExecuteCommand }) => {
  const { currentTheme } = useTheme();
  const [currentInput, setCurrentInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { inputRef, addToHistory, handleKeyDown } = useKeyboardNavigation(
    onExecuteCommand,
    null,
    null
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentInput.trim()) {
      addToHistory(currentInput);
      onExecuteCommand(currentInput);
      setCurrentInput('');
      setShowSuggestions(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setCurrentInput(value);

    // Show suggestions if there's input and matches
    if (value.trim()) {
      const matches = AVAILABLE_COMMANDS.filter(cmd =>
        cmd.startsWith(value.toLowerCase().trim())
      );
      setShowSuggestions(matches.length > 0 && matches.length < 5);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (command) => {
    setCurrentInput(command);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const suggestions = showSuggestions && currentInput.trim()
    ? AVAILABLE_COMMANDS.filter(cmd =>
        cmd.startsWith(currentInput.toLowerCase().trim())
      )
    : [];

  return (
    <InputContainer onSubmit={handleSubmit}>
      <Prompt theme={currentTheme}>{siteConfig.terminalPrompt}</Prompt>
      <InputWrapper>
        <StyledInput
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a command..."
          aria-label="Terminal command input"
          autoComplete="off"
        />
        {showSuggestions && suggestions.length > 0 && (
          <Suggestions theme={currentTheme}>
            {suggestions.map((suggestion) => (
              <SuggestionItem
                key={suggestion}
                theme={currentTheme}
                onClick={() => handleSuggestionClick(suggestion)}
                tabIndex={0}
              >
                {suggestion}
              </SuggestionItem>
            ))}
          </Suggestions>
        )}
      </InputWrapper>
    </InputContainer>
  );
};

export default TerminalInput;
