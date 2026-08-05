'use client';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.heroSection} id="home">
      {/* ── RESPONSIVE BACKGROUND IMAGES ───────────── */}
      <div className={styles.heroBg}>
        {/* Desktop: CSS background */}
        <div className={styles.desktopBg} aria-hidden="true" />
        {/* Tablet (769–1024px): tab.webp */}
        <div className={styles.tabBg} aria-hidden="true" />
        {/* Mobile: CSS background — no iOS zoom/parallax */}
        <div className={styles.mobileBg} aria-hidden="true" />
      </div>

      {/* ── CENTERED OVERLAY CONTENT ───────────────── */}
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <h1 className={styles.mainTitle}>
            Premium Media &amp;<br />Studio Production
          </h1>
          <p className={styles.subTitle}>
            Studio Photography, Videography &amp;<br />Autocue Teleprompter Solutions<br />with State-of-the-Art Facilities
          </p>
          <div className={styles.btnRow}>
            <a href="/#categories" className="btn-terracotta">Explore Services ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
}
