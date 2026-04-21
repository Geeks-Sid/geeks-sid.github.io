import React, { useState, useMemo, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useTheme } from '../context/ThemeContext';
import { useSearch } from '../hooks/useSearch';
import publicationsData from '../data/publications.json';
import { getPosts, Post } from '../pages/Blog';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const posts = useMemo(() => getPosts(), []);
  
  const { query: pubQuery, setQuery: setPubQuery, results: pubResults } = useSearch({
    data: publicationsData,
    keys: ['title', 'authors', 'venue', 'year'],
  });

  const { query: blogQuery, setQuery: setBlogQuery, results: blogResults } = useSearch({
    data: posts,
    keys: ['title', 'summary', 'tags'],
  });

  const handleGlobalSearch = (val: string) => {
    setPubQuery(val);
    setBlogQuery(val);
  };

  const hasResults = (pubQuery || blogQuery) && (pubResults.length > 0 || blogResults.length > 0);
  const isSearching = pubQuery || blogQuery;

  // Keyboard shortcut CMD+K or / to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setPubQuery('');
        setBlogQuery('');
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setPubQuery, setBlogQuery]);

  // Close search results on navigation
  useEffect(() => {
    setPubQuery('');
    setBlogQuery('');
  }, [location.pathname, setPubQuery, setBlogQuery]);

  return (
    <div className="app-container">
      <header className="top-nav-header">
        <div className="nav-brand">
          <NavLink to="/" className="brand-name">Siddhesh Thakur</NavLink>
        </div>
        
        <div className="header-center">
          <nav className="horizontal-nav" aria-label="Main Navigation">
            <ul>
              <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>[ About ]</NavLink></li>
              <li><NavLink to="/experience" className={({ isActive }) => isActive ? 'active' : ''}>[ Experience ]</NavLink></li>
              <li><NavLink to="/publications" className={({ isActive }) => isActive ? 'active' : ''}>[ Publications ]</NavLink></li>
              <li><NavLink to="/blog" className={({ isActive }) => isActive ? 'active' : ''}>[ Blog ]</NavLink></li>
              <li><NavLink to="/achievements" className={({ isActive }) => isActive ? 'active' : ''}>[ Achievements ]</NavLink></li>
              <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>[ Dashboard ]</NavLink></li>
            </ul>

          </nav>

          <div className="global-search-container">
            <span className="search-icon">🔍</span>
            <input
              ref={searchInputRef}
              type="text"
              value={pubQuery || blogQuery}
              onChange={(e) => handleGlobalSearch(e.target.value)}
              placeholder="Search... (⌘K)"
              className="global-search-input"
              autoComplete="off"
            />
            
            {isSearching && (
              <div className="global-search-results">
                {pubResults.length > 0 && (
                  <div className="search-section">
                    <div className="search-section-header">[ Publications ]</div>
                    <ul>
                      {pubResults.slice(0, 5).map(pub => (
                        <li key={pub.id}>
                          <Link to="/publications" onClick={() => {
                            // Ideally this would scroll to the item, but for now just navigate
                          }}>
                            <span className="result-title">{pub.title}</span>
                            <span className="result-meta">{pub.year} • {pub.venue}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {blogResults.length > 0 && (
                  <div className="search-section">
                    <div className="search-section-header">[ Blog Posts ]</div>
                    <ul>
                      {blogResults.slice(0, 5).map(post => (
                        <li key={post.slug}>
                          <Link to={`/blog/${post.slug}`}>
                            <span className="result-title">{post.title}</span>
                            <span className="result-meta">{post.date}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {!hasResults && (
                  <div className="no-results-msg muted">0 matches found.</div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="nav-controls">
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle dark mode">
            {theme === 'light' ? '☾' : '☼'}
          </button>
        </div>
      </header>

      <div className="layout-content">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
