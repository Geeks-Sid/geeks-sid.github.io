import React from 'react';
import { useSEO } from '../hooks/useSEO';

const About: React.FC = () => {
  useSEO({
    title: 'sid@about:~',
    description: 'Siddhesh Thakur is a machine learning engineer specializing in deep learning, medical imaging, and MLOps.'
  });
  return (
    <section>
      <h1>About</h1>
      <p>
        Machine Learning Engineer with 7+ years of experience in developing and implementing reproducible and publicly available deep learning algorithms for medical imaging, multi-modal AI and Large Language Models. 
        Specializes in whole slide image analysis in digital pathology and radiology imaging to improve diagnostic accuracy.
      </p>
      
      <h2>Background</h2>
      <ul>
        <li>
          <strong>Bachelor of Technology in Computer Science</strong><br />
          SGGSIE&T, Nanded, MH, India | Jul 2015 – Aug 2019
        </li>
        <li>
          Focused on building production-grade AI systems for clinical and research environments.
        </li>
      </ul>

      <h2>Research Interests</h2>
      <p>
        My research focuses on the intersection of deep learning and medical imaging. You can find a full list of my work on the <a href="/publications">publications page</a>.
      </p>
      <ul>
        <li>Multi-modal Medical Image Analysis</li>
        <li>Large Language Models (LLMs) in Healthcare</li>
        <li>Digital Pathology & Radiology Imaging</li>
        <li>End-to-End MLOps</li>
      </ul>
    </section>
  );
};

export default About;
