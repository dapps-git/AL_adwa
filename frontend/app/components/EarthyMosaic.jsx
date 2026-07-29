'use client';
import Image from 'next/image';
import styles from './EarthyMosaic.module.css';

export default function EarthyMosaic() {
  return (
    <section className={styles.section} id="mosaic">
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
            <h2 className={styles.cellTitle}>WHERE SERENITY<br />MEETS STYLE</h2>
            <p className={styles.cellDesc}>
              At AL ADHWA Studio, we specialize in elevated visual storytelling — where natural lighting, authentic emotions, and artisan details come together in perfect harmony.
            </p>
            <a href="/#categories" className="btn-white">SEE SERVICES</a>
          </div>
        </div>

        {/* BOTTOM LEFT: Sage Green Block — CREATIVE BY HEART */}
        <div className={styles.sageCell}>
          <div className={styles.cellContent}>
            <h2 className={styles.cellTitle}>CREATIVE BY HEART,<br />REFINED BY DESIGN</h2>
            <p className={styles.cellDesc}>
              Our approach is deeply collaborative, rooted in understanding your brand lifestyle, values, and vision. The result? Media that feels as good as it looks.
            </p>
            <a href="/#contact" className="btn-white">SEE SERVICES</a>
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
