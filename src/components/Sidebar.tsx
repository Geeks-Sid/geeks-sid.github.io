import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import publicationsData from '../data/publications.json';
import { getPosts } from '../pages/Blog';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isPublicationsPage = location.pathname === '/publications';
  const isBlogPage = location.pathname.startsWith('/blog');

  // Only render sidebar if there is sub-navigation or on a specific page needing it.
  const showSidebar = isPublicationsPage || isBlogPage;

  const pubYears = useMemo(() => {
    if (!isPublicationsPage) return [];
    const uniqueYears = Array.from(new Set(publicationsData.map(pub => pub.year)));
    return uniqueYears.sort((a, b) => b - a);
  }, [isPublicationsPage]);

  const blogYears = useMemo(() => {
    if (!isBlogPage) return [];
    const posts = getPosts();
    const uniqueYears = Array.from(new Set(posts.map(post => new Date(post.date).getFullYear())));
    return uniqueYears.sort((a, b) => b - a);
  }, [isBlogPage]);

  const scrollToYear = (year: number) => {
    const element = document.getElementById(`year-${year}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBlogYearClick = (year: number) => {
    if (location.pathname !== '/blog') {
      navigate('/blog');
      setTimeout(() => scrollToYear(year), 100);
    } else {
      scrollToYear(year);
    }
  };

  if (!showSidebar) {
    // If not on a page that needs vertical navigation, render a smaller utility column or nothing
    return (
      <aside className="sidebar utility-only">
        <div className="sidebar-footer">
          <span className="terminal-prompt">$ contact</span>
          <a href="/Data_Engineer_Siddhesh_Latest_CV_All_Ed.pdf" target="_blank" rel="noopener noreferrer" className="cv-link">├── CV (PDF)</a>
          <a href="mailto:siddhesh0011@gmail.com">├── Email</a>
          <a href="https://github.com/geeks-sid" target="_blank" rel="noopener noreferrer">├── GitHub</a>
          <a href="https://www.linkedin.com/in/siddheshthakur04" target="_blank" rel="noopener noreferrer">├── LinkedIn</a>
          <a href="https://scholar.google.com/citations?user=N-MzecYAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">├── Google Scholar</a>
          <a href="https://x.com/Geeks_Sid" target="_blank" rel="noopener noreferrer">└── Twitter/X</a>
        </div>
      </aside>
    );
  }

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav" aria-label="Sub Navigation">
        {isPublicationsPage && (
          <div className="subnav-section">
            <span className="terminal-prompt">&gt; grep _year publications</span>
            <ul className="sidebar-subnav" aria-label="Publications by Year">
              {pubYears.map(year => (
                <li key={year}>
                  <button onClick={() => scrollToYear(year)} className="year-link" aria-label={`Scroll to year ${year}`}>
                    └── {year}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {isBlogPage && (
          <div className="subnav-section">
            <span className="terminal-prompt">&gt; ls -l blog/</span>
            <ul className="sidebar-subnav" aria-label="Blog posts by Year">
              {blogYears.map(year => (
                <li key={year}>
                  <button onClick={() => handleBlogYearClick(year)} className="year-link" aria-label={`View blog posts from ${year}`}>
                    └── {year}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
      <div className="sidebar-footer" aria-label="Contact and Social Links">
        <span className="terminal-prompt">$ contact</span>
        <a href="/Data_Engineer_Siddhesh_Latest_CV_All_Ed.pdf" target="_blank" rel="noopener noreferrer" className="cv-link">├── CV (PDF)</a>
        <a href="mailto:siddhesh0011@gmail.com">├── Email</a>
        <a href="https://github.com/geeks-sid" target="_blank" rel="noopener noreferrer">├── GitHub</a>
        <a href="https://www.linkedin.com/in/siddheshthakur04" target="_blank" rel="noopener noreferrer">├── LinkedIn</a>
        <a href="https://scholar.google.com/citations?user=N-MzecYAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">├── Google Scholar</a>
        <a href="https://x.com/Geeks_Sid" target="_blank" rel="noopener noreferrer">└── Twitter/X</a>
      </div>
    </aside>
  );
};

export default Sidebar;
