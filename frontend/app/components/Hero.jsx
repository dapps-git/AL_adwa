'use client';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.heroSection} id="home">
      {/* ── RESPONSIVE BACKGROUND IMAGES ───────────── */}
      <div className={styles.heroBg}>
        {/* Desktop / Laptop View Image (lapview1.webp) */}
        <Image
          src="/img/lapview1.webp"
          alt="AL ADHWA Studio Desktop Banner"
          fill
          priority
          unoptimized
          className={styles.desktopImg}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* Mobile View Image (mobileview3.png) */}
        <Image
          src="/img/mobileview3.webp"
          alt="AL ADHWA Studio Mobile Banner"
          fill
          priority
          unoptimized
          className={styles.mobileImg}
        />
      </div>

      {/* ── CENTERED OVERLAY CONTENT ───────────────── */}
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <h1 className={styles.mainTitle}>Premium Media &amp; Studio Production</h1>
          <p className={styles.subTitle}>
            Studio ,  Photography, Videography &amp; Autocue Teleprompter Solutions with State-of-the-Art Facilities
          </p>
          <div className={styles.btnRow}>
            <a href="/#categories" className="btn-terracotta">Explore Services ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
}
