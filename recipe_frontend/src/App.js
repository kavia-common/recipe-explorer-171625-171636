import React, { useEffect, useState } from 'react';
import './App.css';
import AppRouter from './router/Router';
import Header from './components/layout/Header';
import { useStore } from './state/store';

/**
 * Root App component that sets up the theme and renders the main layout with Router.
 * Applies Ocean Professional theme via CSS variables and supports dark mode.
 */
// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const { state } = useStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // aria-live region updates when results count changes
  const resultsCount = state.recipes.filtered.length;

  return (
    <div className="app-shell">
      <Header onToggleTheme={toggleTheme} theme={theme} />
      <main id="main" className="main-content" role="main" aria-labelledby="page-title">
        <div className="visually-hidden" aria-live="polite">
          {resultsCount} results
        </div>
        <AppRouter />
      </main>
      <footer className="footer" role="contentinfo">
        <div className="container">
          <small>&copy; {new Date().getFullYear()} Recipe Explorer</small>
        </div>
      </footer>
    </div>
  );
}

export default App;
