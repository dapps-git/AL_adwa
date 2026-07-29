'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Categories.module.css';

const pillars = [
  {
    id: 'cat-studio',
    num: '01',
    title: 'Studio Services & Printing',
    sub: 'Indoor Photography & Custom Gifts',
    img: '/img/indoor.webp',
    href: '/categories/studio-services',
  },
  {
    id: 'cat-outdoor-photo',
    num: '02',
    title: 'Outdoor Photography',
    sub: 'Portrait, Travel & Commercial',
    img: '/img/com.webp',
    href: '/categories/outdoor-photography',
  },
  {
    id: 'cat-outdoor-video',
    num: '03',
    title: 'Outdoor Videography',
    sub: 'Commercial, Events & Digital',
    img: '/img/outdoor.webp',
    href: '/categories/outdoor-videography',
  },
  {
    id: 'cat-teleprompter',
    num: '04',
    title: 'Teleprompter Services',
    sub: 'Camera Rigs, Presidential & Floor Monitors',
    img: '/img/teleprompt.webp',
    href: '/categories/teleprompter-services',
  },
];

const FALLBACK_SLIDES = [
  { _id: 'f1', title: 'Studio Portrait Session', imageUrl: '/img/indoor.webp', category: 'Studio' },
  { _id: 'f2', title: 'Outdoor Commercial Shoot', imageUrl: '/img/com.webp', category: 'Outdoor' },
  { _id: 'f3', title: 'Broadcast Teleprompter Rig', imageUrl: '/img/teleprompt.webp', category: 'Teleprompter' },
  { _id: 'f4', title: 'Video Production & Editing', imageUrl: '/img/outdoor.webp', category: 'Videography' },
];

export default function Categories() {
  const [slides, setSlides] = useState(FALLBACK_SLIDES);
  const [activeIdx, setActiveIdx] = useState(0);

  // ── Fetch dynamic gallery images from backend ────────────────
  useEffect(() => {
    fetch('http://localhost:4000/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setSlides(data);
        }
      })
      .catch(() => {});
  }, []);

  // ── Auto-slide timer (every 3.5 seconds) ────────────────────
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className={styles.section} id="categories">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Spaces that speak</span>
        </div>

        {/* ── 2-COLUMN CATEGORY CARDS ─────────────────────── */}
        <div className={styles.grid}>
          {pillars.map((p) => (
            <a key={p.id} href={p.href} className={styles.card} id={p.id}>
              <div className={styles.imgWrap}>
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  unoptimized
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.cardInfo}>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <span className={styles.seeMore}>see design →</span>
              </div>
            </a>
          ))}
        </div>

        {/* ── VIEW ALL WORK BUTTON ────────────────────────────── */}
        <div className={styles.ctaWrap}>
          <a href="/gallery" className="btn-outline">View All Work</a>
        </div>
      </div>

      {/* ── DYNAMIC GALLERY PREVIEW SLIDER (100% FULL BLEED EDGE-TO-EDGE) ── */}
      <div className={styles.sliderSection}>
        <div className={styles.sliderContainer}>
          {slides.map((slide, index) => (
            <div
              key={slide._id || index}
              className={`${styles.slide} ${index === activeIdx ? styles.slideActive : ''}`}
            >
              <div className={styles.slideImgWrap}>
                <Image
                  src={slide.imageUrl || slide.url || '/img/indoor.webp'}
                  alt={slide.title || 'Gallery Preview'}
                  fill
                  sizes="100vw"
                  unoptimized
                  style={{ objectFit: 'cover' }}
                />
                <div className={styles.slideOverlay}>
                  <span className={styles.slideCat}>{slide.category}</span>
                  <h4 className={styles.slideItemTitle}>{slide.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Gallery Button */}
        <div className={styles.sliderCtaWrap}>
          <a href="/gallery" className="btn-terracotta">View All Gallery ↗</a>
        </div>
      </div>
    </section>
  );
}
