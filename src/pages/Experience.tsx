import React from 'react';
import { useSEO } from '../hooks/useSEO';

interface ExperienceProps {
  isSection?: boolean;
}

const Experience: React.FC<ExperienceProps> = ({ isSection = false }) => {
  useSEO({
    title: 'sid@experience:~',
    description: 'Professional experience of Siddhesh Thakur in Deep Learning, MLOps, and Data Engineering.',
    disabled: isSection
  });

  return (
    <section className="experience-section">
      <h1>Experience</h1>

      <div className="experience-item" style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ margin: '0 0 0.25rem 0' }}>Data Engineer</h2>
        <div className="muted" style={{ marginBottom: '0.75rem' }}>
          Division of Computational Pathology, Department of Pathology and Laboratory Medicine, Indiana University School of Medicine & IU Health | Indianapolis, IN, U.S.A<br />
          <strong>September 2023 — Present</strong>
        </div>
        <ul style={{ paddingLeft: '1.5rem', margin: '0' }}>
          <li>Managing a team of 4 for digitization, data structuring and Quality control for Digital pathology.</li>
          <li>Created a Pipeline for Structured Data Extraction from unstructured data using LLM, enabling large-scale data extraction from untapped clinical data.</li>
          <li>Optimized Model for AI in Radiology achieving up to 5.4× inference speedup and ~80% reduction in memory use with negligible accuracy drop, enabling deployment on consumer-grade CPUs.</li>
          <li>Co-developed an unsupervised QC pipeline for brain extraction for neuro-oncology imaging studies, helping automate data-quality verification upstream of downstream segmentation/classification workflows.</li>
          <li>Engineered a comprehensive End-to-End pipeline for Whole Slide Images encompassing Tagging, Ingestion, Conversion, Anonymization, and Quality Control with Role-Based Access Control (RBAC) systems.</li>
          <li>Spearheaded the deployment and maintenance of Data Visualization tools for optimizing data interpretation and analysis with clinicians.</li>
        </ul>
      </div>

      <div className="experience-item" style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ margin: '0 0 0.25rem 0' }}>Data Analyst</h2>
        <div className="muted" style={{ marginBottom: '0.75rem' }}>
          CBICA, Perelman School of Medicine, University of Pennsylvania | Philadelphia, PA, U.S.A<br />
          <strong>September 2019 — September 2023</strong> <span className="supervision">(Under the supervision of Prof. Dr. S. Bakas)</span>
        </div>
        <ul style={{ paddingLeft: '1.5rem', margin: '0' }}>
          <li>Pioneered a user-friendly Deep Learning Framework for Medical Imaging, integrating cutting-edge Digital Pathology features, requiring no programming expertise for end users.</li>
          <li>Architected an end-to-end pipeline for Digital Pathology, streamlining Ingestion, Anonymization, Preprocessing, and Segmentation/Classification of Whole Slide Images.</li>
          <li>Implemented a Deep Learning algorithm for Brain Extraction, vital to a global Tumor Segmentation federation, validated over 10,000 cases, enhancing pre-processing efficiency.</li>
          <li>Devised innovative strategies for optimizing Deep Learning algorithms in low-resource settings, notably enhancing medical imaging capabilities in underserved communities.</li>
          <li>Led the deployment of a clinical Deep Learning pipeline for Multiple Sclerosis, significantly reducing Gadolinium usage and cutting runtime by 90%, thereby demonstrating substantial clinical improvements.</li>
          <li>Developed and validated a Brain Extraction software using Deep Learning, backed by comprehensive statistical analysis, ensuring high robustness and accuracy.</li>
        </ul>
      </div>

      <div className="experience-item" style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ margin: '0 0 0.25rem 0' }}>Research Intern</h2>
        <div className="muted" style={{ marginBottom: '0.75rem' }}>
          CBICA, Perelman School of Medicine, University of Pennsylvania | Philadelphia, PA, U.S.A<br />
          <strong>January 2019 — August 2019</strong> <span className="supervision">(Under the supervision of Prof. Dr. C. Davatzikos and Prof. Dr. S. Bakas)</span>
        </div>
        <ul style={{ paddingLeft: '1.5rem', margin: '0' }}>
          <li>Conducted in-depth analysis and evaluation of Brain Extraction techniques in the presence of diffuse gliomas.</li>
          <li>Developed and innovated a Deep Learning-based method for Brain Extraction, resulting in a deployable package, BrainMaGe.</li>
        </ul>
      </div>

      <div className="experience-item" style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ margin: '0 0 0.25rem 0' }}>Research Intern</h2>
        <div className="muted" style={{ marginBottom: '0.75rem' }}>
          COESIP, Department of Electronics and Telecommunication, SGGSIE&T | Nanded, MH, India<br />
          <strong>August 2018 — September 2018</strong> <span className="supervision">(Under the supervision of Prof. Dr. S.N. Talbar and Dr. Ujjwal Baid)</span>
        </div>
        <ul style={{ paddingLeft: '1.5rem', margin: '0' }}>
          <li>Secured 3rd position among 390 global research labs in the Brain Tumor Segmentation Challenge (BRaTS) 2018 at MICCAI, excelling in Survival Prediction of brain tumors.</li>
          <li>Implemented a Deep Learning-based workflow involving co-registration and Bias Field Correction using 3D-UNet for Brain Tumor Segmentation (BraTS).</li>
          <li>Engineered a post-segmentation pipeline for radiomic feature extraction in gliomas, and developed Machine Learning algorithms for Brain Tumor Survival Prediction.</li>
        </ul>
      </div>

      <div className="experience-item" style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ margin: '0 0 0.25rem 0' }}>Research Intern</h2>
        <div className="muted" style={{ marginBottom: '0.75rem' }}>
          COESIP, Department of Electronics and Telecommunication, SGGSIE&T | Nanded, MH, India<br />
          <strong>April 2018 — July 2018</strong> <span className="supervision">(Under the supervision of Prof. Dr. S.N. Talbar)</span>
        </div>
        <ul style={{ paddingLeft: '1.5rem', margin: '0' }}>
          <li>Developed Deep Learning and Computer Vision algorithms for the early detection of pulmonary lung nodules in lung cancer patients.</li>
          <li>Conducted extensive data preprocessing and analysis on a large dataset of lung CT scans, significantly enhancing the accuracy of the developed models.</li>
          <li>Created an innovative method for lung field extraction, substantially reducing the Region of Interest and boosting the model accuracy.</li>
        </ul>
      </div>

      <div className="experience-item" style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ margin: '0 0 0.25rem 0' }}>Research Intern</h2>
        <div className="muted" style={{ marginBottom: '0.75rem' }}>
          HPC Lab, Department of Computer Science, SGGSIE&T | Nanded, MH, India<br />
          <strong>May 2017 — July 2017</strong> <span className="supervision">(Under the supervision of Prof. H. P. Ambulgekar)</span>
        </div>
        <ul style={{ paddingLeft: '1.5rem', margin: '0' }}>
          <li>Developed a Recommender System utilizing PySpark to implement Collaborative Filtering for movie recommendations.</li>
        </ul>
      </div>
    </section>
  );
};

export default Experience;
