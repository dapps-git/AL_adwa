'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './BlogSection.module.css';

export default function BlogSection() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/blog')
      .then(res => res.json())
      .then(data => setPosts(data.slice(0, 3)))
      .catch(() => {
        setPosts([
          {
            _id: '1',
            title: 'The Art of Studio Lighting for Corporate Headshots',
            slug: 'art-of-studio-lighting-headshots',
            excerpt: 'Discover how professional three-point lighting creates powerful corporate headshots.',
            coverImg: '/img/data.png',
            createdAt: '2026-07-25'
          },
          {
            _id: '2',
            title: 'Choosing the Right Teleprompter System for Broadcast Events',
            slug: 'choosing-right-teleprompter-system',
            excerpt: 'From Presidential podium glass setups to DSLR camera-mounted rigs.',
            coverImg: '/img/teleprompt.webp',
            createdAt: '2026-07-20'
          },
          {
            _id: '3',
            title: 'How Custom Gift Printing Creates Lasting Brand Impressions',
            slug: 'custom-gift-printing-brand-impressions',
            excerpt: 'Magic mugs, custom t-shirts, and printed pillows in Sharjah.',
            coverImg: '/img/gift.webp',
            createdAt: '2026-07-15'
          }
        ]);
      });
  }, []);

  return (
    <section className={`${styles.section} section`} id="blog">
      <div className="container">
        <div className={styles.header}>
          <div className="eyebrow-pill"><span className="dot" />Latest Articles</div>
          <h2 className={`heading-display ${styles.title}`}>
            From Our <span className="serif">Studio Journal</span>
          </h2>
          <p className="subtext">Tips, news, and behind-the-scenes insights from AL ADHWA Studio.</p>
        </div>

        <div className={styles.grid}>
          {posts.map((post) => (
            <article key={post._id || post.slug} className={styles.card}>
              <div className={styles.imgWrap}>
                <Image src={post.coverImg} alt={post.title} fill sizes="(max-width:768px) 100vw, 33vw" />
              </div>
              <div className={styles.cardBody}>
                <span className={styles.date}>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <p className={styles.excerpt}>{post.excerpt}</p>
                <a href={`/blog/${post.slug}`} className={styles.readMore}>Read Article →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
