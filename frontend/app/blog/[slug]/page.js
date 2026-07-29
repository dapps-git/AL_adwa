'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from './page.module.css';

const FALLBACK_ARTICLE = {
  title: 'The Art of Studio Lighting for Corporate Headshots',
  slug: 'art-of-studio-lighting-headshots',
  category: 'Studio Photography',
  author: 'AL ADHWA Team',
  createdAt: '2026-07-25',
  coverImg: '/img/data.png',
  excerpt: 'When it comes to corporate headshots, three-point lighting is the difference between a flat snapshot and a commanding executive portrait that communicates trust and competence.',
  content: `When updating executive team profiles or building a personal brand on LinkedIn, lighting is the single most critical factor. At AL ADHWA Studio in Sharjah, we combine key lights, fill softboxes, and hair kickers to sculpt natural features without harsh shadows.

### 1. The Key Light — Defining Feature Angles
The key light acts as the primary light source, angled 45 degrees relative to the subject. This creates subtle depth under the jawline while illuminating eye catchlights — essential for bringing energy and confidence into corporate headshots.

### 2. Fill Softboxes — Eliminating Harsh Contrast
High-contrast shadows work for dramatic portraits, but executive headshots require approachable, polished lighting. Diffused softboxes lift dark shadows while maintaining natural facial texture and skin tone.

### 3. Hair & Kick Lights — Separation From the Background
Without dedicated hair lighting, dark hair or dark suits tend to blend into dark studio backdrops. Hair lights separate subjects from the background, creating a 3D sense of depth.

Whether you are booking a solo headshot or a full corporate team session at AL ADHWA Studio, our technical light calibration ensures your team projects confidence and excellence.`
};

export default function BlogPostPage({ params }) {
  const [post, setPost] = useState(FALLBACK_ARTICLE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:4000/api/blog/${params.slug}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.title) setPost(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.slug]);

  if (loading) return (
    <>
      <Navbar />
      <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px' }}>
        <p style={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.8rem' }}>Loading article...</p>
      </div>
      <Footer />
    </>
  );

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* Full-width Hero Cover Banner */}
        <section className={styles.heroBanner}>
          <div className={styles.coverBg}>
            <Image src={post.coverImg} alt={post.title} fill sizes="100vw" priority />
            <div className={styles.coverOverlay} />
          </div>
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div className={styles.heroContent}>
              <span className={styles.cat}>{post.category}</span>
              <h1 className={styles.title}>{post.title}</h1>
              <div className={styles.meta}>
                <span>By {post.author || 'AL ADHWA Team'}</span>
                <span>·</span>
                <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Body Container */}
        <section className={styles.articleSection}>
          <div className={`container ${styles.articleInner}`}>
            <p className={styles.excerpt}>{post.excerpt}</p>

            <div className="editorial-divider centered" />

            <div className={styles.content}>
              {post.content}
            </div>

            <div className={styles.backRow}>
              <a href="/blog" className="btn-outline">← BACK TO ALL ARTICLES</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
