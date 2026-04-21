import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  meta?: Array<{ name?: string; property?: string; content: string }>;
}

export const useSEO = ({ title, description, meta = [] }: SEOProps) => {
  useEffect(() => {
    document.title = `${title} | Siddhesh Thakur`;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', description || 'Academic portfolio of Siddhesh Thakur');
    }

    // Clean up previous dynamic tags
    const dynamicTags = document.querySelectorAll('meta[data-dynamic="true"]');
    dynamicTags.forEach(tag => tag.remove());

    // Add new dynamic tags
    meta.forEach(m => {
      const tag = document.createElement('meta');
      if (m.name) tag.setAttribute('name', m.name);
      if (m.property) tag.setAttribute('property', m.property);
      tag.setAttribute('content', m.content);
      tag.setAttribute('data-dynamic', 'true');
      document.head.appendChild(tag);
    });
  }, [title, description, meta]);
};
