import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './Sidebar.css';

interface SidebarProps {
  activeSection?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection = 'about' }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const [scrollPercent, setScrollPercent] = useState(0);
  const scrollbarTrackRef = useRef<HTMLDivElement>(null);

  const sections = useMemo(() => [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'publications', label: 'Publications' },
    { id: 'blog', label: 'Blog' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'dashboard', label: 'System Status' },
  ], []);

  const activeIndex = useMemo(() => {
    return sections.findIndex(s => s.id === activeSection);
  }, [activeSection, sections]);

  // Track page scroll percentage
  useEffect(() => {
    if (!isHomePage) return;

    const handleScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercent(percent);
    };

    window.addEventListener('scroll', handleScrollProgress);
    // Initial check
    handleScrollProgress();
    return () => window.removeEventListener('scroll', handleScrollProgress);
  }, [isHomePage]);

  // Handle click on custom scrollbar track
  const handleScrollbarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollbarTrackRef.current) return;
    const rect = scrollbarTrackRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const ratio = Math.max(0, Math.min(1, clickY / rect.height));
    const targetScroll = ratio * (document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const handleSectionClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="sidebar">
      {isHomePage ? (
        <div className="sidebar-scroll-nav">
          <div className="smart-scrollbar-container">
            <span className="scrollbar-header-label">SCROLL</span>
            <div 
              className="smart-scrollbar-track" 
              ref={scrollbarTrackRef}
              onClick={handleScrollbarClick}
              title="Click to scroll page"
            >
              <div 
                className="smart-scrollbar-thumb" 
                style={{ top: `${scrollPercent}%` }}
              >
                <span className="thumb-cursor">█</span>
              </div>
            </div>
            <span className="scrollbar-percentage-label">{Math.round(scrollPercent)}%</span>
          </div>

          <div className="section-menu-container">
            <span className="terminal-prompt">&gt; navigation</span>
            <div className="sliding-cursor-menu">
              {/* Vertical line indicator */}
              <div className="menu-track-line">
                <div 
                  className="menu-track-cursor" 
                  style={{ transform: `translateY(${activeIndex >= 0 ? activeIndex * 36 : 0}px)` }}
                >
                  ▶
                </div>
              </div>
              
              <ul className="section-menu-list">
                {sections.map((sec) => (
                  <li key={sec.id} className={activeSection === sec.id ? 'active' : ''}>
                    <button 
                      onClick={() => handleSectionClick(sec.id)}
                      className="section-menu-btn"
                      aria-label={`Scroll to ${sec.label}`}
                    >
                      {sec.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="sidebar-back-nav">
          <span className="terminal-prompt">&gt; navigation</span>
          <ul className="section-menu-list">
            <li>
              <Link to="/" className="section-menu-btn back-btn">
                ← Back to Home
              </Link>
            </li>
          </ul>
        </div>
      )}

      <div className="sidebar-footer" aria-label="Contact and Social Links">
        <span className="terminal-prompt">$ social_links</span>
        <div className="social-icons-row">
          <a href="/Data_Engineer_Siddhesh_Latest_CV_All_Ed.pdf" target="_blank" rel="noopener noreferrer" title="CV (PDF)" className="social-icon-link">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </a>
          <a href="mailto:siddhesh0011@gmail.com" title="Email" className="social-icon-link">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </a>
          <a href="https://github.com/geeks-sid" target="_blank" rel="noopener noreferrer" title="GitHub" className="social-icon-link">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
          <a href="https://www.linkedin.com/in/siddheshthakur04" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="social-icon-link">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="https://scholar.google.com/citations?user=N-MzecYAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" title="Google Scholar" className="social-icon-link">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
          </a>
          <a href="https://x.com/Geeks_Sid" target="_blank" rel="noopener noreferrer" title="Twitter/X" className="social-icon-link">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
