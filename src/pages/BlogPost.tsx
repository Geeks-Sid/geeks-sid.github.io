import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { getPosts } from './Blog';
import './Blog.css';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const post = useMemo(() => {
    const posts = getPosts();
    return posts.find(p => p.slug === slug);
  }, [slug]);

  useSEO({
    title: post?.title || 'Blog Post',
    description: post?.summary,
    meta: post ? [
      { name: 'citation_title', content: post.title },
      { name: 'citation_publication_date', content: post.date.replace(/-/g, '/') }
    ] : []
  });

  if (!post) {
    return (
      <section>
        <h1>Post Not Found</h1>
        <Link to="/blog">Back to blog</Link>
      </section>
    );
  }

  return (
    <article className="blog-post">
      <header className="post-header">
        <h1>{post.title}</h1>
        <div className="post-meta muted">
          <span>{post.date}</span>
        </div>
        <hr />
      </header>
      
      <div 
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.html }} 
      />
      
      <footer className="post-footer">
        <hr />
        <Link to="/blog" className="back-link">← Back to all posts</Link>
      </footer>
    </article>
  );
};

export default BlogPost;
