'use client';
import { useTypewriter } from '../hooks/useTypewriter';
import styles from './Hero.module.css';

export default function Hero() {
  const line1Text = 'Premium Media &';
  const line2Text = 'Studio Production';

  const { ref, typedText: typedLine1, isVisible } = useTypewriter(line1Text, 55, 0.1);
  const { typedText: typedLine2 } = useTypewriter(line2Text, 55, 0.1, isVisible);

  return (
    <section className={styles.heroSection} id="home" ref={ref}>
      {/* ── RESPONSIVE BACKGROUND IMAGES WITH RIGHT SLIDE-IN ───────────── */}
      <div className={`${styles.heroBg} ${isVisible ? styles.heroBgVisible : ''}`}>
        {/* Desktop: CSS background */}
        <div className={styles.desktopBg} aria-hidden="true" />
        {/* Tablet (769–1024px): tab.webp */}
        <div className={styles.tabBg} aria-hidden="true" />
        {/* Mobile: CSS background */}
        <div className={styles.mobileBg} aria-hidden="true" />
      </div>

      {/* ── CENTERED OVERLAY CONTENT ───────────────── */}
      <div className={styles.heroContainer}>
        <div className={`${styles.heroContent} ${isVisible ? styles.heroContentVisible : ''}`}>
          <h1 className={styles.mainTitle}>
            <span className={styles.titleLine}>{typedLine1 || line1Text}</span>
            <span className={styles.titleLine}>{typedLine2 || line2Text}</span>
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
