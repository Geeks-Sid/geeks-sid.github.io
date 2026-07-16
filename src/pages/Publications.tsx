import React, { useState, useMemo } from 'react';
import { useSEO } from '../hooks/useSEO';
import { useSearch } from '../hooks/useSearch';
import TerminalCommand from '../components/TerminalCommand';
import publicationsData from '../data/publications.json';
import './Publications.css';

interface Publication {
  id: string;
  type: string;
  year: number;
  title: string;
  authors: string;
  venue: string;
  doi?: string;
  pdf?: string;
  abstract?: string;
}

const Publications: React.FC<{ isSection?: boolean }> = ({ isSection = false }) => {
  useSEO({
    title: 'sid@publications:~',
    description: 'Academic publications of Siddhesh Thakur in the field of medical imaging and deep learning.',
    disabled: isSection
  });
  const [filter, setFilter] = useState<string>('all');
  const [expandedPubs, setExpandedPubs] = useState<Record<string, boolean>>({});

  // Search across ALL publications first
  const { query, setQuery, results } = useSearch<Publication>({
    data: publicationsData,
    keys: ['title', 'authors', 'venue', 'year'],
  });

  // Then filter the search results by type
  const finalResults = useMemo(() => {
    if (filter === 'all') return results;
    return results.filter(pub => pub.type === filter);
  }, [results, filter]);

  const groupedByYear = useMemo(() => {
    const groups: { [key: number]: Publication[] } = {};
    finalResults.forEach(pub => {
      if (!groups[pub.year]) groups[pub.year] = [];
      groups[pub.year].push(pub);
    });
    return Object.entries(groups)
      .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
      .map(([year, pubs]) => ({ year: Number(year), pubs }));
  }, [finalResults]);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'journal': return 'Journal';
      case 'conference': return 'Conference';
      case 'preprint': return 'Preprint';
      case 'abstract': return 'Abstract';
      default: return type;
    }
  };

  const toggleAbstract = (id: string) => {
    setExpandedPubs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="publications-page">
      <h1>Publications</h1>

      <div className="search-container">
        <label htmlFor="pub-search">
          <TerminalCommand command="grep -i" />
        </label>
        <input
          id="pub-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search_all_papers..."
          className="terminal-input"
          autoComplete="off"
        />
      </div>
      
      <div className="filters">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>[ All ]</button>
        <button className={filter === 'journal' ? 'active' : ''} onClick={() => setFilter('journal')}>[ Journals ]</button>
        <button className={filter === 'conference' ? 'active' : ''} onClick={() => setFilter('conference')}>[ Conferences ]</button>
        <button className={filter === 'preprint' ? 'active' : ''} onClick={() => setFilter('preprint')}>[ Preprints ]</button>
        <button className={filter === 'abstract' ? 'active' : ''} onClick={() => setFilter('abstract')}>[ Abstracts ]</button>
      </div>

      <div className="publications-list">
        {groupedByYear.length > 0 ? (
          groupedByYear.map(({ year, pubs }) => (
            <div key={year} id={`year-${year}`} className="year-section">
              <h2 className="year-header">{year}</h2>
              <ul className="publication-items">
                {pubs.map(pub => (
                  <li key={pub.id} id={pub.id} className="publication-item">
                    <div className="pub-header">
                      <span className={`pub-type-badge ${pub.type}`}>
                        [{getTypeLabel(pub.type)}]
                      </span>
                      <span className="pub-title">{pub.title}</span>
                    </div>
                    <span className="pub-authors">{pub.authors}</span>
                    <span className="pub-venue">
                      <em>{pub.venue}</em>, {pub.year}
                    </span>
                    <div className="pub-links">
                      {pub.doi && <a href={pub.doi} target="_blank" rel="noopener noreferrer">DOI</a>}
                      {pub.pdf && <a href={pub.pdf} target="_blank" rel="noopener noreferrer">PDF</a>}
                      {pub.abstract && (
                        <button 
                          onClick={() => toggleAbstract(pub.id)} 
                          className="toggle-abstract-btn"
                          aria-expanded={!!expandedPubs[pub.id]}
                        >
                          {expandedPubs[pub.id] ? '[- Abstract]' : '[+ Abstract]'}
                        </button>
                      )}
                    </div>
                    {pub.abstract && expandedPubs[pub.id] && (
                      <div className="pub-abstract-drawer">
                        {pub.abstract}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div className="no-results muted center">
            <p>0 matches found for "{query}"</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Publications;
