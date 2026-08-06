'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTypewriter } from '../hooks/useTypewriter';
import styles from './SchoolPhotography.module.css';

const schoolImages = [
  { src: '/studentgallery/student.webp', alt: 'School Photography Student Portrait 1' },
  { src: '/studentgallery/student1.webp', alt: 'School Photography Student Portrait 2' },
  { src: '/studentgallery/student2.webp', alt: 'School Photography Student Portrait 3' },
];

export default function SchoolPhotography() {
  const fullTitle = 'SCHOOL PHOTOGRAPHY';
  const { ref, typedText, isVisible } = useTypewriter(fullTitle, 65, 0.2);
  const isDone = typedText.length === fullTitle.length;

  const [activeIdx, setActiveIdx] = useState(0);

  // Slow 4.5-second rotation with ultra-smooth 1.8s cross-fade transition
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % schoolImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className={`${styles.section} reveal-on-scroll ${isVisible ? 'is-visible' : ''}`}
      id="school-photography"
      ref={ref}
    >
      <div className="container">
        <div className={styles.grid}>

          {/* LEFT COLUMN: Image Container with Slow Cross-Fade Slideshow */}
          <div className={styles.imgCol}>
            <div className={styles.imgWrap}>
              {schoolImages.map((img, idx) => (
                <div
                  key={img.src}
                  className={`${styles.slideLayer} ${idx === activeIdx ? styles.activeLayer : ''}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    unoptimized
                    priority={idx === 0}
                    style={{ objectFit: 'cover' }}
                    className={styles.schoolImg}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Text Content */}
          <div className={styles.textCol}>
            <h2 className={`${styles.title} typewriter-title ${isDone ? 'typing-done' : ''}`}>
              {typedText}
            </h2>

            {/* Mobile-only image slideshow */}
            <div className={styles.mobileImgWrap}>
              {schoolImages.map((img, idx) => (
                <div
                  key={`mob-${img.src}`}
                  className={`${styles.slideLayer} ${idx === activeIdx ? styles.activeLayer : ''}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="100vw"
                    unoptimized
                    style={{ objectFit: 'cover' }}
                    className={styles.mobileSchoolImg}
                  />
                </div>
              ))}
            </div>

            <p className={styles.bodyText}>
              Capture every milestone with professional school photography that preserves memories for a lifetime. From individual student portraits and graduation photos to classroom moments, annual day celebrations, sports events, and cultural programs, our team delivers high-quality images with a natural and vibrant style. We ensure a smooth, organised photography experience with fast delivery, making it easy for schools and parents to cherish every special moment.
            </p>

            <div className={styles.btnRow}>
              <a href="/school-photography" className="btn-terracotta">
                Explore School Gallery ↗
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
