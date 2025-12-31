import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ViewProvider, useView } from './context/ViewContext';
import GlobalStyle from './styles/globalStyles';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HelpModal from './components/common/HelpModal';
import TerminalInput from './components/common/TerminalInput';
// Terminal view components
import About from './components/sections/About';
import Blog from './components/sections/Blog';
import BlogPost from './components/sections/BlogPost';
import Contact from './components/sections/Contact';
// Classic view components
import ClassicHome from './components/classic/Home';
import ClassicAbout from './components/classic/About';
import ClassicBlog from './components/classic/Blog';
import ClassicBlogPost from './components/classic/BlogPost';
import ClassicContact from './components/classic/Contact';
import { AVAILABLE_COMMANDS } from './utils/keyboardNavigation';
import { blogPosts } from './content/blog';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  width: 100%;
`;

const TerminalOutput = styled.div`
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const OutputLine = styled.div`
  margin-bottom: 0.5rem;
  font-family: 'Fira Code', monospace;
  color: ${props => props.theme.foreground};

  &.command {
    color: ${props => props.theme.accent};
    font-weight: 600;
  }

  &.error {
    color: ${props => props.theme.error};
  }

  &.success {
    color: ${props => props.theme.success};
  }

  &.info {
    color: ${props => props.theme.info};
  }
`;

const NavigationMenu = styled.nav`
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const MenuTitle = styled.h2`
  font-size: 1.75rem;
  color: ${props => props.theme.accent};
  border-bottom: 2px solid ${props => props.theme.accent};
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

const MenuLink = styled(Link)`
  color: ${props => props.theme.foreground};
  text-decoration: none;
  font-size: 1.1rem;
  display: block;
  padding: 0.75rem;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover,
  &:focus {
    background-color: ${props => props.theme.secondary};
    color: ${props => props.theme.accent};
    transform: translateX(5px);
  }

  &:before {
    content: '> ';
    color: ${props => props.theme.accent};
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.6rem;
  }
`;

const Welcome = styled.div`
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const WelcomeTitle = styled.h1`
  font-size: 2rem;
  color: ${props => props.theme.accent};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const WelcomeText = styled.p`
  color: ${props => props.theme.muted};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const AppContent = () => {
  const { currentTheme, toggleTheme } = useTheme();
  const { view } = useView();
  const [output, setOutput] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const location = useLocation();

  const executeCommand = (command) => {
    const cmd = command.toLowerCase().trim();
    const parts = cmd.split(' ');
    const mainCommand = parts[0];
    const args = parts.slice(1).join(' ');

    // Add command to output
    setOutput(prev => [...prev, { text: `$ ${command}`, type: 'command' }]);

    // Handle multi-word commands
    if (cmd === 'blogs' || cmd === 'list blogs') {
      setOutput(prev => [...prev, { text: 'Available blog posts:', type: 'info' }]);
      blogPosts.forEach(post => {
        setOutput(prev => [...prev, { text: `  [${post.id}] ${post.title}`, type: 'success' }]);
        setOutput(prev => [...prev, { text: `      ${post.excerpt}`, type: 'muted' }]);
        setOutput(prev => [...prev, { text: `      Date: ${post.date} | ${post.readTime}`, type: 'muted' }]);
      });
      setOutput(prev => [...prev, { text: '', type: 'text' }]);
      setOutput(prev => [...prev, { text: 'Use "blog <id>" to read a post (e.g., "blog moe-scaling")', type: 'info' }]);
      setOutput(prev => [...prev, { text: 'Use "blogs search <query>" to search posts', type: 'info' }]);
      setOutput(prev => [...prev, { text: 'Use "blogs tag <tag>" to filter by tag', type: 'info' }]);
      return;
    }

    // Handle search command
    if (cmd.startsWith('blogs search ') || cmd.startsWith('search blogs ')) {
      const query = cmd.replace('blogs search ', '').replace('search blogs ', '').toLowerCase().trim();

      if (!query) {
        setOutput(prev => [...prev, { text: 'Please provide a search query.', type: 'error' }]);
        setOutput(prev => [...prev, { text: 'Usage: blogs search <query>', type: 'info' }]);
        return;
      }

      const filteredPosts = blogPosts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );

      if (filteredPosts.length === 0) {
        setOutput(prev => [...prev, { text: `No posts found matching "${query}"`, type: 'error' }]);
        return;
      }

      setOutput(prev => [...prev, { text: `Found ${filteredPosts.length} post(s) matching "${query}":`, type: 'info' }]);
      filteredPosts.forEach(post => {
        setOutput(prev => [...prev, { text: `  [${post.id}] ${post.title}`, type: 'success' }]);
        setOutput(prev => [...prev, { text: `      ${post.excerpt}`, type: 'muted' }]);
        setOutput(prev => [...prev, { text: `      Date: ${post.date} | ${post.readTime}`, type: 'muted' }]);
      });
      setOutput(prev => [...prev, { text: '', type: 'text' }]);
      setOutput(prev => [...prev, { text: 'Use "blog <id>" to read a post', type: 'info' }]);
      return;
    }

    // Handle tag filter command
    if (cmd.startsWith('blogs tag ') || cmd.startsWith('tag blogs ')) {
      const tag = cmd.replace('blogs tag ', '').replace('tag blogs ', '').trim();

      if (!tag) {
        setOutput(prev => [...prev, { text: 'Please provide a tag name.', type: 'error' }]);
        setOutput(prev => [...prev, { text: 'Usage: blogs tag <tag>', type: 'info' }]);
        return;
      }

      const filteredPosts = blogPosts.filter(post =>
        post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
      );

      if (filteredPosts.length === 0) {
        setOutput(prev => [...prev, { text: `No posts found with tag "${tag}"`, type: 'error' }]);
        return;
      }

      setOutput(prev => [...prev, { text: `Found ${filteredPosts.length} post(s) tagged with "${tag}":`, type: 'info' }]);
      filteredPosts.forEach(post => {
        setOutput(prev => [...prev, { text: `  [${post.id}] ${post.title}`, type: 'success' }]);
        setOutput(prev => [...prev, { text: `      ${post.excerpt}`, type: 'muted' }]);
        setOutput(prev => [...prev, { text: `      Date: ${post.date} | ${post.readTime}`, type: 'muted' }]);
        setOutput(prev => [...prev, { text: `      Tags: ${post.tags.join(', ')}`, type: 'muted' }]);
      });
      setOutput(prev => [...prev, { text: '', type: 'text' }]);
      setOutput(prev => [...prev, { text: 'Use "blog <id>" to read a post', type: 'info' }]);
      return;
    }

    // Handle list tags command
    if (cmd === 'blogs tags' || cmd === 'list tags' || cmd === 'tags') {
      const allTags = new Set();
      blogPosts.forEach(post => {
        post.tags.forEach(tag => allTags.add(tag));
      });
      const sortedTags = Array.from(allTags).sort();

      setOutput(prev => [...prev, { text: `Available tags (${sortedTags.length}):`, type: 'info' }]);
      sortedTags.forEach(tag => {
        const count = blogPosts.filter(post => post.tags.includes(tag)).length;
        setOutput(prev => [...prev, { text: `  [${tag}] ${count} post(s)`, type: 'success' }]);
      });
      setOutput(prev => [...prev, { text: '', type: 'text' }]);
      setOutput(prev => [...prev, { text: 'Use "blogs tag <tag>" to filter posts by tag', type: 'info' }]);
      return;
    }

    // Handle "blog <id>" to open a specific post
    if (mainCommand === 'blog' && args) {
      const id = args.trim();

      const post = blogPosts.find(p => p.id === id);
      if (post) {
        setOutput(prev => [...prev, { text: `Opening "${post.title}"...`, type: 'success' }]);
        window.location.hash = `#/blog/${id}`;
      } else {
        setOutput(prev => [...prev, { text: `Blog post with ID "${id}" not found.`, type: 'error' }]);
        setOutput(prev => [...prev, { text: `Use "blogs" to see available posts.`, type: 'info' }]);
      }
      return;
    }

    switch (mainCommand) {
      case 'about':
        setOutput(prev => [...prev, { text: 'Navigating to About...', type: 'success' }]);
        window.location.hash = '#/about';
        break;
      case 'blog':
        setOutput(prev => [...prev, { text: 'Navigating to Blog...', type: 'success' }]);
        window.location.hash = '#/blog';
        break;
      case 'contact':
        setOutput(prev => [...prev, { text: 'Navigating to Contact...', type: 'success' }]);
        window.location.hash = '#/contact';
        break;
      case 'home':
        setOutput(prev => [...prev, { text: 'Navigating to Home...', type: 'success' }]);
        window.location.hash = '#/';
        break;
      case 'help':
        setOutput(prev => [...prev, { text: 'Opening help...', type: 'info' }]);
        setShowHelp(true);
        break;
      case 'theme':
        toggleTheme();
        setOutput(prev => [...prev, { text: 'Theme toggled!', type: 'success' }]);
        break;
      case 'clear':
        setOutput([]);
        break;
      default:
        setOutput(prev => [
          ...prev,
          { text: `Command not found: ${mainCommand}. Type 'help' for available commands.`, type: 'error' }
        ]);
    }
  };

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  const clearCommand = () => {
    // Keep output but clear focus
  };

  // Terminal View
  if (view === 'terminal') {
    return (
      <AppWrapper>
        <GlobalStyle />
        <Header onToggleHelp={toggleHelp} />

        <Main>
          <Content>
            <Routes>
              <Route path="/" element={
                <>
                  <Welcome theme={currentTheme}>
                    <WelcomeTitle theme={currentTheme}>Welcome to My Portfolio</WelcomeTitle>
                    <WelcomeText theme={currentTheme}>
                      Navigate using the commands below or type a command in the terminal.
                    </WelcomeText>
                  </Welcome>
                  <NavigationMenu theme={currentTheme}>
                    <MenuTitle theme={currentTheme}>Quick Navigation</MenuTitle>
                    <MenuList>
                      <MenuItem><MenuLink to="/about" theme={currentTheme}>about</MenuLink></MenuItem>
                      <MenuItem><MenuLink to="/blog" theme={currentTheme}>blog</MenuLink></MenuItem>
                      <MenuItem><MenuLink to="/contact" theme={currentTheme}>contact</MenuLink></MenuItem>
                    </MenuList>
                  </NavigationMenu>
                </>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>

            {output.length > 0 && (
              <TerminalOutput theme={currentTheme}>
                {output.map((line, index) => (
                  <OutputLine key={index} className={line.type} theme={currentTheme}>
                    {line.text}
                  </OutputLine>
                ))}
              </TerminalOutput>
            )}

            <TerminalOutput theme={currentTheme}>
              <TerminalInput onExecuteCommand={executeCommand} />
            </TerminalOutput>
          </Content>
        </Main>

        <Footer />

        <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
      </AppWrapper>
    );
  }

  // Classic View
  return (
    <AppWrapper>
      <GlobalStyle />
      <Header onToggleHelp={toggleHelp} />

      <Main>
        <Content>
          <Routes>
            <Route path="/" element={<ClassicHome />} />
            <Route path="/about" element={<ClassicAbout />} />
            <Route path="/blog" element={<ClassicBlog />} />
            <Route path="/blog/:id" element={<ClassicBlogPost />} />
            <Route path="/contact" element={<ClassicContact />} />
          </Routes>
        </Content>
      </Main>

      <Footer />

      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </AppWrapper>
  );
};

const App = () => {
  return (
    <Router>
      <ViewProvider>
        <AppContentWrapper />
      </ViewProvider>
    </Router>
  );
};

const AppContentWrapper = () => {
  const { view } = useView();
  return (
    <ThemeProvider viewMode={view}>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
