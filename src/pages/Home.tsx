import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import About from './About';
import Experience from './Experience';
import Publications from './Publications';
import Blog from './Blog';
import Achievements from './Achievements';
import Dashboard from './Dashboard';

const Home: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Wait a brief moment to ensure layout is fully rendered
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [hash]);

  // Scroll reveal IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-scroll-container">
      <section id="about" className="home-section-wrapper reveal-on-scroll">
        <About isSection={true} />
      </section>
      
      <hr className="section-divider" />
      
      <section id="experience" className="home-section-wrapper reveal-on-scroll">
        <Experience isSection={true} />
      </section>
      
      <hr className="section-divider" />
      
      <section id="publications" className="home-section-wrapper reveal-on-scroll">
        <Publications isSection={true} />
      </section>
      
      <hr className="section-divider" />
      
      <section id="blog" className="home-section-wrapper reveal-on-scroll">
        <Blog isSection={true} />
      </section>
      
      <hr className="section-divider" />
      
      <section id="achievements" className="home-section-wrapper reveal-on-scroll">
        <Achievements isSection={true} />
      </section>
      
      <hr className="section-divider" />
      
      <section id="dashboard" className="home-section-wrapper reveal-on-scroll">
        <Dashboard isSection={true} />
      </section>
    </div>
  );
};

export default Home;
