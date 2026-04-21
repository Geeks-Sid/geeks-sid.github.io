import React, { useState, useMemo } from 'react';
import { useSEO } from '../hooks/useSEO';
import { useSearch } from '../hooks/useSearch';
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
}

const Publications: React.FC = () => {
  useSEO({
    title: 'sid@publications:~',
    description: 'Academic publications of Siddhesh Thakur in the field of medical imaging and deep learning.'
  });
  const [filter, setFilter] = useState<string>('all');

  const filteredByType = useMemo(() => {
    if (filter === 'all') return publicationsData;
    return publicationsData.filter(pub => pub.type === filter);
  }, [filter]);

  const { query, setQuery, results } = useSearch<Publication>({
    data: filteredByType,
    keys: ['title', 'authors', 'venue', 'year'],
  });

  const groupedByYear = useMemo(() => {
    const groups: { [key: number]: Publication[] } = {};
    results.forEach(pub => {
      if (!groups[pub.year]) groups[pub.year] = [];
      groups[pub.year].push(pub);
    });
    return Object.entries(groups)
      .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
      .map(([year, pubs]) => ({ year: Number(year), pubs }));
  }, [results]);

  return (
    <section className="publications-page">
      <h1>Publications</h1>

      <div className="search-container">
        <label htmlFor="pub-search" className="terminal-prompt">$ grep -i</label>
        <input
          id="pub-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search_publications..."
          className="terminal-input"
          autoComplete="off"
        />
      </div>
      
      <div className="filters">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>[ All ]</button>
        <button className={filter === 'journal' ? 'active' : ''} onClick={() => setFilter('journal')}>[ Journals ]</button>
        <button className={filter === 'conference' ? 'active' : ''} onClick={() => setFilter('conference')}>[ Conferences ]</button>
        <button className={filter === 'preprint' ? 'active' : ''} onClick={() => setFilter('preprint')}>[ Preprints ]</button>
      </div>

      <div className="publications-list">
        {groupedByYear.length > 0 ? (
          groupedByYear.map(({ year, pubs }) => (
            <div key={year} id={`year-${year}`} className="year-section">
              <h2 className="year-header">{year}</h2>
              <ul className="publication-items">
                {pubs.map(pub => (
                  <li key={pub.id} className="publication-item">
                    <span className="pub-title">{pub.title}</span>
                    <span className="pub-authors">{pub.authors}</span>
                    <span className="pub-venue">
                      <em>{pub.venue}</em>, {pub.year}
                    </span>
                    <div className="pub-links">
                      {pub.doi && <a href={pub.doi} target="_blank" rel="noopener noreferrer">DOI</a>}
                      {pub.pdf && <a href={pub.pdf} target="_blank" rel="noopener noreferrer">PDF</a>}
                    </div>
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
