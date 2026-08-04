'use client';
import Image from 'next/image';
import { useTypewriter } from '../hooks/useTypewriter';
import styles from './SchoolPhotography.module.css';

export default function SchoolPhotography() {
  const fullTitle = 'SCHOOL PHOTOGRAPHY';
  const { ref, typedText, isVisible } = useTypewriter(fullTitle, 65, 0.2);
  const isDone = typedText.length === fullTitle.length;

  return (
    <section
      className={`${styles.section} reveal-on-scroll ${isVisible ? 'is-visible' : ''}`}
      id="school-photography"
      ref={ref}
    >
      <div className="container">
        <div className={styles.grid}>

          {/* LEFT COLUMN: Image — Desktop only */}
          <div className={styles.imgCol}>
            <div className={styles.imgWrap}>
              <Image
                src="/studentgallery/student.webp"
                alt="AL ADHWA Studio School Photography"
                width={700}
                height={500}
                unoptimized
                priority
                className={styles.schoolImg}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Text Content */}
          <div className={styles.textCol}>
            <h2 className={`${styles.title} typewriter-title ${isDone ? 'typing-done' : ''}`}>
              {typedText}
            </h2>

            {/* Mobile-only image — shown between title and text on small screens */}
            <div className={styles.mobileImgWrap}>
              <Image
                src="/studentgallery/student.webp"
                alt="AL ADHWA Studio School Photography"
                width={700}
                height={400}
                unoptimized
                className={styles.mobileSchoolImg}
              />
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

