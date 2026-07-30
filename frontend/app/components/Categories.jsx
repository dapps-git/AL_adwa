'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { API_URL } from '../config';
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

const DEFAULT_GALLERY_SLIDES = [
  { _id: 'f1', title: 'Studio Production & Setup', imageUrl: '/gallery.webp', category: 'Studio' },
  { _id: 'f2', title: 'Outdoor Commercial Shoot', imageUrl: '/gallery1.webp', category: 'Outdoor' },
  { _id: 'f3', title: 'Broadcast Teleprompter Rig', imageUrl: '/gallery2.webp', category: 'Teleprompter' },
  { _id: 'f4', title: 'Video Production & Editing', imageUrl: '/gallery3.webp', category: 'Videography' },
  { _id: 'f5', title: 'Custom Printed Gifts & Framing', imageUrl: '/gallery4.webp', category: 'Printing' },
];

export default function Categories() {
  const [slides, setSlides] = useState(DEFAULT_GALLERY_SLIDES);
  const [activeIdx, setActiveIdx] = useState(0);

  // ── Fetch dynamic gallery images from backend ────────────────
  useEffect(() => {
    fetch(`${API_URL}/gallery`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const valid = data.filter((i) => Boolean(i.imageUrl && i.imageUrl.trim()));
          if (valid.length > 0) {
            setSlides(valid);
          }
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
                  src={slide.imageUrl || '/gallery.webp'}
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
