'use client';
import Image from 'next/image';
import { useTypewriter } from '../hooks/useTypewriter';
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
    sub: 'Portrait, Travel, Commercial · Wedding Photography · Birthday Photography',
    img: '/img/com.webp',
    href: '/categories/outdoor-photography',
  },
  {
    id: 'cat-outdoor-video',
    num: '03',
    title: 'Outdoor Videography',
    sub: 'Commercial, Events & Digital · Wedding Videography · Birthday Videography',
    img: '/img/outdoor.webp',
    href: '/categories/outdoor-videography',
  },
  {
    id: 'cat-teleprompter',
    num: '04',
    title: 'Teleprompter Services',
    sub: 'Camera Rigs, Presidential & Floor Monitors',
    img: '/img/tele.webp',
    href: '/categories/teleprompter-services',
  },
];

export default function Categories() {
  const fullCatTitle = 'OUR MEDIA SERVICES & CATEGORIES';
  const { ref, typedText, isVisible } = useTypewriter(fullCatTitle, 60, 0.15);
  const isDone = typedText.length === fullCatTitle.length;

  return (
    <section
      className={`${styles.section} reveal-on-scroll ${isVisible ? 'is-visible' : ''}`}
      id="categories"
      ref={ref}
    >
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
                <p className={styles.cardSub}>{p.sub}</p>
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
    </section>
  );
}
