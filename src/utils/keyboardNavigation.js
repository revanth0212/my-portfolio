import { useState, useCallback, useRef, useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

// Available commands in the terminal
export const AVAILABLE_COMMANDS = [
  'about',
  'blog',
  'blogs',
  'contact',
  'help',
  'clear',
  'theme',
  'home',
  'list',
];

export const useKeyboardNavigation = (onExecuteCommand, onToggleHelp, onClearCommand) => {
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);

  // Focus command input
  useHotkeys(
    ['ctrl+k', '/'],
    () => {
      inputRef.current?.focus();
    },
    { preventDefault: true },
    [inputRef]
  );

  // Navigate history up
  useHotkeys(
    'up',
    () => {
      if (inputRef.current && inputRef.current === document.activeElement) {
        if (historyIndex < history.length - 1) {
          const newIndex = historyIndex + 1;
          setHistoryIndex(newIndex);
          inputRef.current.value = history[history.length - 1 - newIndex];
        }
      }
    },
    { enableOnTags: ['INPUT'] },
    [history, historyIndex]
  );

  // Navigate history down
  useHotkeys(
    'down',
    () => {
      if (inputRef.current && inputRef.current === document.activeElement) {
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          inputRef.current.value = history[history.length - 1 - newIndex];
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          inputRef.current.value = '';
        }
      }
    },
    { enableOnTags: ['INPUT'] },
    [history, historyIndex]
  );

  // Clear input
  useHotkeys(
    'escape',
    () => {
      if (inputRef.current && inputRef.current === document.activeElement) {
        inputRef.current.value = '';
        setHistoryIndex(-1);
        if (onClearCommand) {
          onClearCommand();
        }
      }
    },
    { enableOnTags: ['INPUT'] },
    [inputRef, onClearCommand]
  );

  // Show help
  useHotkeys(
    '?',
    () => {
      if (onToggleHelp) {
        onToggleHelp();
      }
    },
    { preventDefault: true },
    [onToggleHelp]
  );

  // Auto-complete with Tab
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Tab' && inputRef.current) {
        e.preventDefault();
        const inputValue = inputRef.current.value.toLowerCase().trim();

        if (inputValue) {
          const matches = AVAILABLE_COMMANDS.filter(cmd =>
            cmd.startsWith(inputValue)
          );

          if (matches.length === 1) {
            inputRef.current.value = matches[0];
          }
        }
      }
    },
    []
  );

  // Add command to history
  const addToHistory = useCallback((command) => {
    setHistory(prev => [...prev, command]);
    setHistoryIndex(-1);
  }, []);

  // Clear history
  const clearHistory = useCallback(() => {
    setHistory([]);
    setHistoryIndex(-1);
  }, []);

  return {
    inputRef,
    addToHistory,
    clearHistory,
    handleKeyDown,
  };
};
