import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SearchBar from '../common/SearchBar';
import { useStore } from '../../state/store';

/**
 * PUBLIC_INTERFACE
 * Header renders top navigation, search, and theme toggle.
 */
export default function Header({ onToggleTheme, theme }) {
  const { state, dispatch } = useStore();
  const loc = useLocation();

  const onSearch = (q) => {
    dispatch({ type: 'ui/setSearchQuery', payload: q });
  };

  return (
    <header className="header" role="banner">
      <div className="container" style={{ paddingBlock: '0.75rem' }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div className="row" style={{ gap: '1rem' }}>
            <NavLink to="/" className="row" aria-label="Recipe Explorer Home" style={{ fontWeight: 700, color: 'var(--primary)' }}>
              <span role="img" aria-label="wave">🌊</span>
              <span>Recipe Explorer</span>
            </NavLink>
            <nav aria-label="Primary">
              <div className="row">
                <NavLink
                  to="/"
                  className={({ isActive }) => isActive ? 'btn ghost' : 'btn ghost'}
                  aria-current={loc.pathname === '/' ? 'page' : undefined}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/favorites"
                  className={({ isActive }) => isActive ? 'btn ghost' : 'btn ghost'}
                  aria-current={loc.pathname === '/favorites' ? 'page' : undefined}
                >
                  Favorites
                </NavLink>
              </div>
            </nav>
          </div>
          <div className="row" style={{ gap: '.5rem' }}>
            <SearchBar value={state.ui.searchQuery} onChange={onSearch} />
            <button className="btn" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
