import React from 'react';
import { useSEO } from '../hooks/useSEO';

const Experience: React.FC = () => {
  useSEO({
    title: 'sid@experience:~',
    description: 'Professional experience of Siddhesh Thakur in Deep Learning, MLOps, and Data Engineering.'
  });
  return (
    <section>
      <h1>Experience</h1>
      
      <div className="experience-item">
        <h2>Data Engineer</h2>
        <p className="muted">Division of Computational Pathology, Indiana University School of Medicine | Sep 2023 – Present</p>
        <ul>
          <li>Production Optimization: Achieved a 5.4x inference speedup and 80% reduction in memory footprint for Radiology AI models using OpenVINO and TensorRT.</li>
          <li>LLM Integration: Architected an automated pipeline using LLMs (LangChain) for structured data extraction from unstructured clinical reports.</li>
          <li>Leadership: Directing a cross-functional team of 4 on data structuring and QC for digital pathology.</li>
          <li>End-to-End MLOps: Engineered a full-stack WSI pipeline featuring anonymization, RBAC, and automated QC.</li>
        </ul>
      </div>

      <div className="experience-item">
        <h2>Data Analyst</h2>
        <p className="muted">CBICA, Perelman School of Medicine, University of Pennsylvania | Sep 2019 – Sep 2023</p>
        <ul>
          <li>Pioneered a user-friendly Deep Learning Framework for Medical Imaging (GaNDLF), integrating cutting-edge features.</li>
          <li>Implemented a Deep Learning algorithm for Brain Extraction, vital to a global Federated Tumor Segmentation (FeTS).</li>
          <li>Led the deployment of a clinical Deep Learning pipeline for Multiple Sclerosis, reducing runtime by 90%.</li>
        </ul>
      </div>
    </section>
  );
};

export default Experience;
