import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import './Blog.css';

// Dynamically load all Markdown files from the blog directory
const blogPosts = import.meta.glob('../content/blog/*.md', { eager: true }) as Record<string, { attributes: any, html: string }>;

export interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags?: string[];
  html: string;
}

export const getPosts = (): Post[] => {
  return Object.entries(blogPosts).map(([path, module]) => {
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    return {
      slug,
      ...module.attributes,
      html: module.html,
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const Blog: React.FC = () => {
  useSEO({
    title: 'sid@blog:~',
    description: 'Siddhesh Thakur\'s personal blog on AI, research, and engineering.'
  });
  const posts = useMemo(() => getPosts(), []);

  const groupedByYear = useMemo(() => {
    const groups: { [key: number]: Post[] } = {};
    posts.forEach(post => {
      const year = new Date(post.date).getFullYear();
      if (!groups[year]) groups[year] = [];
      groups[year].push(post);
    });
    return Object.entries(groups)
      .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
      .map(([year, posts]) => ({ year: Number(year), posts }));
  }, [posts]);

  return (
    <section className="blog-page">
      <h1>Blog</h1>
      <p className="muted">Reflections on AI, research, and engineering.</p>

      <div className="posts-list">
        {groupedByYear.map(({ year, posts }) => (
          <div key={year} id={`year-${year}`} className="blog-year-section">
            <h2 className="year-header">{year}</h2>
            {posts.map(post => (
              <article key={post.slug} className="post-preview">
                <h3 className="post-title">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <div className="post-meta muted">
                  <span>{post.date}</span>
                </div>
                <p className="post-summary">{post.summary}</p>
              </article>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
