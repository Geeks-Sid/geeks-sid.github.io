import React from 'react';
import { useSEO } from '../hooks/useSEO';

interface AchievementsProps {
  isSection?: boolean;
}

const Achievements: React.FC<AchievementsProps> = ({ isSection = false }) => {
  useSEO({
    title: 'sid@achievements:~',
    description: 'Awards and achievements of Siddhesh Thakur in the field of AI and medical imaging.',
    disabled: isSection
  });
  return (
    <section>
      <h1>Awards & Achievements</h1>
      <ul>
        <li>
          <strong>Brain Tumor Segmentation (BraTS) Challenge 2018:</strong> Secured 3rd position among 390 global research labs.
        </li>
        <li>
          <strong>Structured Data Generation with LLMs:</strong> Awarded a $200,000 grant from National Cancer Institute.
        </li>
      </ul>
    </section>
  );
};

export default Achievements;
