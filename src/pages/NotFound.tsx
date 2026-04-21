import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

const NotFound: React.FC = () => {
  useSEO({
    title: '404 - Not Found',
    description: 'The page you are looking for does not exist.'
  });

  return (
    <section className="center" style={{ marginTop: '10vh' }}>
      <div className="terminal-window" style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'left' }}>
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="terminal-title">error</div>
        </div>
        <div className="terminal-body" style={{ padding: '2rem' }}>
          <h1 style={{ marginTop: 0, color: '#ff5f56' }}>[ ERROR: 404 ]</h1>
          <p>Page not found in local system.</p>
          <p className="terminal-prompt">$ cd ..</p>
          <p>
            <Link to="/" style={{ textDecoration: 'underline' }}>Return to home</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
