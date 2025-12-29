import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Fira Code', 'JetBrains Mono', monospace;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.foreground};
    line-height: 1.6;
    transition: background-color 0.3s ease, color 0.3s ease;
    overflow-x: hidden;
    min-height: 100vh;
  }

  /* Mobile responsive base styles */
  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }

    h1 {
      font-size: 1.5rem;
    }

    h2 {
      font-size: 1.25rem;
    }

    h3 {
      font-size: 1.1rem;
    }
  }

  /* Skip navigation for accessibility */
  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: ${props => props.theme.accent};
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
  }

  .skip-link:focus {
    top: 0;
  }

  /* Scanline effect - subtle */
  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.03),
      rgba(0, 0, 0, 0.03) 1px,
      transparent 1px,
      transparent 2px
    );
    z-index: 9999;
    opacity: 0.5;
  }

  /* Cursor blink animation */
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  .cursor-blink {
    animation: blink 1s infinite;
  }

  /* Focus styles for accessibility */
  *:focus {
    outline: 2px solid ${props => props.theme.accent};
    outline-offset: 2px;
  }

  *:focus:not(:focus-visible) {
    outline: none;
  }

  *:focus-visible {
    outline: 2px solid ${props => props.theme.accent};
    outline-offset: 2px;
  }

  /* Links */
  a {
    color: ${props => props.theme.accent};
    text-decoration: none;
    transition: opacity 0.2s ease;
  }

  a:hover {
    opacity: 0.8;
    text-decoration: underline;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.accent};
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    opacity: 0.8;
  }

  /* Selection */
  ::selection {
    background: ${props => props.theme.accent};
    color: white;
  }

  /* Code blocks */
  code {
    font-family: 'Fira Code', 'JetBrains Mono', monospace;
    background-color: ${props => props.theme.secondary};
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-size: 0.9em;
  }

  pre {
    background-color: ${props => props.theme.terminal};
    color: ${props => props.theme.terminalText};
    padding: 1rem;
    border-radius: 5px;
    overflow-x: auto;
    border: 1px solid ${props => props.theme.border};
  }

  pre code {
    background-color: transparent;
    padding: 0;
  }

  /* Headings */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
  }

  /* Buttons */
  button {
    font-family: inherit;
    cursor: pointer;
  }

  /* Input fields */
  input, textarea {
    font-family: inherit;
  }

  /* Lists */
  ul, ol {
    margin-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }

  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid ${props => props.theme.border};
  }

  th {
    background-color: ${props => props.theme.secondary};
    font-weight: 600;
  }

  /* Blockquotes */
  blockquote {
    border-left: 4px solid ${props => props.theme.accent};
    padding-left: 1rem;
    margin: 1rem 0;
    font-style: italic;
    color: ${props => props.theme.muted};
  }

  /* HR */
  hr {
    border: none;
    border-top: 1px solid ${props => props.theme.border};
    margin: 2rem 0;
  }
`;

export default GlobalStyle;
