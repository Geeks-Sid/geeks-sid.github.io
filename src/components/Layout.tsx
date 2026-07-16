import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useTheme } from '../context/ThemeContext';
import { useSearch } from '../hooks/useSearch';
import publicationsData from '../data/publications.json';
import { getPosts } from '../pages/Blog';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [activeSection, setActiveSection] = useState('about');
  const [scrollPercent, setScrollPercent] = useState(0);

  // Typewriter effect for brand name (runs once on mount)
  const brandName = "Siddhesh Thakur";
  const [typedBrandName, setTypedBrandName] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < brandName.length) {
        setTypedBrandName(brandName.slice(0, idx + 1));
        idx++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 70);
    return () => clearInterval(interval);
  }, []);

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

  // Track active section and scroll progress during scroll
  useEffect(() => {
    if (location.pathname !== '/') {
      setScrollPercent(0);
      return;
    }

    const sections = ['about', 'experience', 'publications', 'blog', 'achievements', 'dashboard'];
    const handleScroll = () => {
      let currentActive = 'about';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of the section is above 40% of viewport height
          if (rect.top <= window.innerHeight * 0.4) {
            currentActive = section;
          }
        }
      }
      setActiveSection(currentActive);

      // Track scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercent(percent);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

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

  const handleNavClick = (sectionId: string, e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSearchResultClick = (type: 'pub' | 'blog', idOrSlug: string, e: React.MouseEvent) => {
    setPubQuery('');
    setBlogQuery('');
    
    if (type === 'pub') {
      e.preventDefault();
      if (location.pathname !== '/') {
        navigate(`/#publications`);
        // Wait for navigation and mount
        setTimeout(() => {
          const el = document.getElementById(idOrSlug) || document.getElementById('publications');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            el.classList.add('highlight-flash');
            setTimeout(() => el.classList.remove('highlight-flash'), 2000);
          }
        }, 150);
      } else {
        const el = document.getElementById(idOrSlug) || document.getElementById('publications');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          el.classList.add('highlight-flash');
          setTimeout(() => el.classList.remove('highlight-flash'), 2000);
        }
      }
    }
  };

  return (
    <div className="app-container">
      <header className="top-nav-header">
        <div className="nav-brand">
          <Link to="/" onClick={(e) => handleNavClick('about', e)} className="brand-name">
            {typedBrandName}
            {isTyping && <span className="brand-cursor">▊</span>}
          </Link>
        </div>
        
        <div className="header-center-search">
          <div className="global-search-container">
            <span className="search-icon">🔍</span>
            <input
              ref={searchInputRef}
              type="text"
              value={pubQuery || blogQuery}
              onChange={(e) => handleGlobalSearch(e.target.value)}
              placeholder="Search... (⌘K or /)"
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
                          <a href={`/#${pub.id}`} onClick={(e) => handleSearchResultClick('pub', pub.id, e)}>
                            <span className="result-title">{pub.title}</span>
                            <span className="result-meta">{pub.year} • {pub.venue}</span>
                          </a>
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
                          <Link to={`/blog/${post.slug}`} onClick={() => { setPubQuery(''); setBlogQuery(''); }}>
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
        <div className="header-scroll-progress-container">
          <div className="header-scroll-progress-bar" style={{ width: `${scrollPercent}%` }} />
        </div>
      </header>

      <div className="layout-content">
        <Sidebar activeSection={activeSection} />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
