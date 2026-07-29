'use client';
import Image from 'next/image';
import styles from './ThreePhotoStrip.module.css';

const photos = [
  { src: '/img1.webp', alt: 'Photography Portfolio 1', title: 'PORTRAIT & WEDDING' },
  { src: '/img2.webp', alt: 'Photography Portfolio 2', title: 'EVENT & COMMERCIAL' },
  { src: '/img3.webp', alt: 'Photography Portfolio 3', title: 'STUDIO & OUTDOOR' },
];

export default function ThreePhotoStrip() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.eyebrow}>SELECTED WORK</span>
          <h2 className={styles.title}>Visual Excellence in Action</h2>
        </div>

        {/* ── 3-COLUMN SIDE-BY-SIDE PHOTO GRID (MATCHING USER REF) ── */}
        <div className={styles.grid}>
          {photos.map((item, idx) => (
            <div key={idx} className={styles.photoCard}>
              <div className={styles.imgWrap}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  unoptimized
                  style={{ objectFit: 'cover' }}
                />
                <div className={styles.overlay}>
                  <span className={styles.cardTitle}>{item.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
