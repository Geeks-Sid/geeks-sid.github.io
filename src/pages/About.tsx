import React from 'react';
import { useSEO } from '../hooks/useSEO';
import TerminalCommand from '../components/TerminalCommand';

interface AboutProps {
  isSection?: boolean;
}

const About: React.FC<AboutProps> = ({ isSection = false }) => {
  useSEO({
    title: 'sid@about:~',
    description: 'Siddhesh Thakur is a Data Engineer and Machine Learning researcher specializing in deep learning, medical imaging, and MLOps.',
    disabled: isSection
  });

  return (
    <section className="about-section">
      <h1>About Me</h1>
      <p>
        Machine Learning Engineer with 7 years of experience in <em>developing and implementing reproducible and publicly available</em> deep learning algorithms for medical imaging, multi-modal AI and Large Language Models. Specializes in whole slide image analysis in digital pathology and radiology imaging to improve diagnostic accuracy.
      </p>

      <h2>Research Interests</h2>
      <p>
        Multi-modal Medical Image Analysis, Large Language Models, Whole Slide Image Analysis, Radiology Imaging, Deep Learning, Low-Resource Optimization
      </p>

      <h2>Programming Skills</h2>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        <li>
          <TerminalCommand command="cat skills/languages" /><br />
          <span style={{ paddingLeft: '1.5rem', display: 'inline-block' }}>Python</span>
        </li>
        <li style={{ marginTop: '1rem' }}>
          <TerminalCommand command="cat skills/frameworks" /><br />
          <span style={{ paddingLeft: '1.5rem', display: 'inline-block' }}>
            PyTorch, Lightning, OpenVINO, TensorRT, Docker, Scikit*, Nodejs, Langchain, DICOM, Git, Node, Docker, AWS
          </span>
        </li>
      </ul>

      <h2>Education Credentials</h2>
      <div className="education-list">
        <div className="education-item" style={{ marginBottom: '1.5rem' }}>
          <strong>Georgia Institute of Technology (GATECH)</strong> — Atlanta, GA, USA<br />
          <span className="muted">Jan 2024 — Dec 2025</span><br />
          Masters of Science in Computer Science
        </div>
        <div className="education-item">
          <strong>Department of Computer Science and Engineering, SGGSIE&T</strong> — Nanded, MH, IN<br />
          <span className="muted">July 2015 — August 2019</span><br />
          Bachelor of Technology in Computer Science
        </div>
      </div>

      <h2>Reviewer Roles</h2>
      <ul style={{ paddingLeft: '1.5rem' }}>
        <li><em>Nature Communications Medicine</em></li>
        <li><em>BrainLes: Glioma, Multiple Sclerosis, Stroke, and Traumatic Brain Injuries</em></li>
        <li><em>Frontiers in Computational Neurosciences</em></li>
        <li><em>Frontiers in NeuroScience</em></li>
        <li><em>Frontiers in Medicine</em></li>
        <li><em>IET Image Processing</em></li>
      </ul>
    </section>
  );
};

export default About;
