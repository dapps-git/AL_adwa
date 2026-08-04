'use client';
import Image from 'next/image';
import { useTypewriter } from '../hooks/useTypewriter';
import styles from './EarthyMosaic.module.css';

export default function EarthyMosaic() {
  const title1Text = 'WHERE SERENITY MEETS STYLE';
  const title2Text = 'CREATIVE BY HEART, REFINED BY DESIGN';

  // First hook owns the ref/observer
  const { ref, typedText: typed1, isVisible } = useTypewriter(title1Text, 60, 0.15);
  // Second hook reuses the same isVisible — no need for its own observer
  const { typedText: typed2 } = useTypewriter(title2Text, 60, 0.15, isVisible);

  const isDone1 = typed1.length === title1Text.length;
  const isDone2 = typed2.length === title2Text.length;

  return (
    <section
      className={`${styles.section} reveal-on-scroll ${isVisible ? 'is-visible' : ''}`}
      id="mosaic"
      ref={ref}
    >
      <div className={styles.mosaicGrid}>
        {/* TOP LEFT: Image Cell with ABOUT1.webp */}
        <div className={styles.imgCellTall}>
          <Image
            src="/ABOUT1.webp"
            alt="AL ADHWA Visual Storytelling"
            fill
            sizes="(max-width:900px) 100vw, 50vw"
            unoptimized
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* TOP RIGHT: Terracotta Block — WHERE SERENITY MEETS STYLE */}
        <div className={styles.terracottaCell}>
          <div className={styles.cellContent}>
            <h2 className={`${styles.cellTitle} typewriter-title ${isDone1 ? 'typing-done' : ''}`}>
              {typed1}
            </h2>
            <p className={styles.cellDesc}>
              At AL ADHWA Studio, we specialize in elevated visual storytelling — where natural lighting, authentic emotions, and artisan details come together in perfect harmony.
            </p>
            <a href="/#categories" className="btn-white">SEE SERVICES</a>
          </div>
        </div>

        {/* BOTTOM LEFT: Sage Green Block — CREATIVE BY HEART */}
        <div className={styles.sageCell}>
          <div className={styles.cellContent}>
            <h2 className={`${styles.cellTitle} typewriter-title ${isDone2 ? 'typing-done' : ''}`}>
              {typed2}
            </h2>
            <p className={styles.cellDesc}>
              Our approach is deeply collaborative, rooted in understanding your brand lifestyle, values, and vision. The result? Media that feels as good as it looks.
            </p>
            <a href="/#categories" className="btn-white">SEE SERVICES</a>
          </div>
        </div>

        {/* BOTTOM RIGHT: Image Cell with ABOUT.webp */}
        <div className={styles.imgCell}>
          <Image
            src="/ABOUT.webp"
            alt="Studio Setting"
            fill
            sizes="(max-width:900px) 100vw, 50vw"
            unoptimized
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </section>
  );
}

