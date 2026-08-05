'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTypewriter } from '../hooks/useTypewriter';
import styles from './ThreePhotoStrip.module.css';

const imageList = [
  { src: '/img1.webp', alt: 'Photography Portfolio 1', title: 'PORTRAIT & WEDDING' },
  { src: '/img2.webp', alt: 'Photography Portfolio 2', title: 'EVENT & COMMERCIAL' },
  { src: '/img3.webp', alt: 'Photography Portfolio 3', title: 'STUDIO & OUTDOOR' },
];

export default function ThreePhotoStrip() {
  const stripTitle = 'VISUAL EXCELLENCE IN ACTION';
  const { ref, typedText, isVisible } = useTypewriter(stripTitle, 60, 0.2);

  // Active image index for each container (offset by 0, 1, 2)
  const [activeIdx1, setActiveIdx1] = useState(0);
  const [activeIdx2, setActiveIdx2] = useState(1);
  const [activeIdx3, setActiveIdx3] = useState(2);

  // 4.5-Second Luxurious Smooth Cross-Fade Rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx1((prev) => (prev + 1) % imageList.length);
      setActiveIdx2((prev) => (prev + 1) % imageList.length);
      setActiveIdx3((prev) => (prev + 1) % imageList.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const containerStates = [activeIdx1, activeIdx2, activeIdx3];

  return (
    <section
      className={`${styles.section} ${isVisible ? styles.visible : ''}`}
      ref={ref}
    >
      <div className="container">
        <div className={styles.header}>
          <span className={styles.eyebrow}>SELECTED WORK</span>
          <h2 className={styles.title}>
            {typedText || stripTitle}
          </h2>
        </div>

        {/* ── 3-CONTAINER ULTRA-SMOOTH CROSS-FADE ROTATING SLIDESHOW ── */}
        <div className={styles.grid}>
          {containerStates.map((activeIdx, boxIdx) => (
            <div key={`box-${boxIdx}`} className={`${styles.photoCard} ${isVisible ? styles.cardVisible : ''}`}>
              <div className={styles.imgWrap}>
                {/* Render all 3 images with smooth opacity transition */}
                {imageList.map((item, imgIdx) => {
                  const isActive = imgIdx === activeIdx;
                  return (
                    <div
                      key={item.src}
                      className={`${styles.slideLayer} ${isActive ? styles.layerActive : ''}`}
                    >
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
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
