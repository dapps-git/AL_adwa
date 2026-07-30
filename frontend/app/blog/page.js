'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { API_URL } from '../config';
import styles from './page.module.css';

const FALLBACK_POSTS = [
  {
    _id: '1',
    slug: 'art-of-studio-lighting-headshots',
    title: 'The Art of Studio Lighting for Corporate Headshots',
    excerpt: 'Discover how professional three-point lighting setups create commanding, high-confidence corporate headshots for executive profiles and company team branding.',
    coverImg: '/img/data.png',
    category: 'Studio Photography',
    author: 'AL ADHWA Team',
    createdAt: '2026-07-25'
  },
  {
    _id: '2',
    slug: 'choosing-right-teleprompter-system',
    title: 'Choosing the Right Teleprompter System for Broadcast Events',
    excerpt: 'From Presidential podium glass setups to DSLR camera-mounted autocue rigs — your complete UAE guide to confidence on stage and lens.',
    coverImg: '/img/teleprompt.webp',
    category: 'Teleprompter',
    author: 'Najeeb Abdul Noor',
    createdAt: '2026-07-20'
  },
  {
    _id: '3',
    slug: 'custom-gift-printing-brand-impressions',
    title: 'How Custom Gift Printing Creates Lasting Brand Impressions',
    excerpt: 'Magic heat-reveal mugs, custom-printed t-shirts, and photo pillows: why personalized corporate gifts remain Sharjah’s favorite brand touchpoint.',
    coverImg: '/img/gift.webp',
    category: 'Custom Printing',
    author: 'AL ADHWA Team',
    createdAt: '2026-07-15'
  }
];

export default function BlogPage() {
  const [posts, setPosts] = useState(FALLBACK_POSTS);

  useEffect(() => {
    fetch(`${API_URL}/blogs`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setPosts(data);
      })
      .catch(() => {});
  }, []);

  const featured = posts[0];
  const remaining = posts.slice(1);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* ── HERO BANNER ─────────────────────────── */}
        <section className={styles.banner}>
          <div className="container">
            <div className={styles.bannerContent}>
              <span className={styles.eyebrow}>Editorial &amp; Insights</span>
              <h1 className={styles.bannerTitle}>THE STUDIO JOURNAL</h1>
              <div className={styles.divider} />
              <p className={styles.bannerSub}>
                Photography guides, broadcast teleprompter tips, and creative storytelling from AL ADHWA Studio.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.blogSection}>
          <div className="container">
            {/* ── FEATURED POST ───────────────────────── */}
            {featured && (
              <article className={styles.featuredCard}>
                <a href={`/blog/${featured.slug}`} className={styles.featuredImgWrap}>
                  <Image src={featured.coverImg} alt={featured.title} fill sizes="(max-width:900px) 100vw, 50vw" priority />
                  <span className={styles.featuredBadge}>Featured Article</span>
                </a>
                <div className={styles.featuredBody}>
                  <span className={styles.cat}>{featured.category}</span>
                  <h2 className={styles.featuredTitle}>
                    <a href={`/blog/${featured.slug}`}>{featured.title}</a>
                  </h2>
                  <div className={styles.metaRow}>
                    <span>By {featured.author || 'AL ADHWA Team'}</span>
                    <span>·</span>
                    <span>{new Date(featured.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                  <a href={`/blog/${featured.slug}`} className="btn-terracotta" style={{ marginTop: '1rem', width: 'fit-content' }}>
                    READ FULL STORY ↗
                  </a>
                </div>
              </article>
            )}

            {/* ── SECONDARY POSTS GRID ────────────────── */}
            <div className={styles.grid}>
              {remaining.map((post) => (
                <article key={post._id || post.slug} className={styles.card}>
                  <a href={`/blog/${post.slug}`} className={styles.imgWrap}>
                    <Image src={post.coverImg} alt={post.title} fill sizes="(max-width:768px) 100vw, 33vw" />
                    <span className={styles.catBadge}>{post.category}</span>
                  </a>
                  <div className={styles.cardBody}>
                    <span className={styles.date}>
                      {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    <h3 className={styles.cardTitle}>
                      <a href={`/blog/${post.slug}`}>{post.title}</a>
                    </h3>
                    <p className={styles.excerpt}>{post.excerpt}</p>
                    <a href={`/blog/${post.slug}`} className={styles.readLink}>
                      READ ARTICLE ↗
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
