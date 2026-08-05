'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { API_URL } from '../config';
import styles from './page.module.css';

const STUDENT_GALLERY_IMAGES = [
  { _id: 'sg0', imageUrl: '/studentgallery/student.webp', title: 'School Photography' },
  { _id: 'sg1', imageUrl: '/studentgallery/image.webp', title: 'School Photography' },
  { _id: 'sg2', imageUrl: '/studentgallery/image1.webp', title: 'School Photography' },
  { _id: 'sg3', imageUrl: '/studentgallery/image2.webp', title: 'School Photography' },
  { _id: 'sg4', imageUrl: '/studentgallery/image3.webp', title: 'School Photography' },
  { _id: 'sg5', imageUrl: '/studentgallery/image4.webp', title: 'School Photography' },
  { _id: 'sg6', imageUrl: '/studentgallery/image5.webp', title: 'School Photography' },
  { _id: 'sg7', imageUrl: '/studentgallery/image7.webp', title: 'School Photography' },
  { _id: 'sg8', imageUrl: '/studentgallery/image8.webp', title: 'School Photography' },
  { _id: 'sg9', imageUrl: '/studentgallery/image9.webp', title: 'School Photography' },
  { _id: 'sg10', imageUrl: '/studentgallery/image10.webp', title: 'School Photography' },
  { _id: 'sg11', imageUrl: '/studentgallery/image11.webp', title: 'School Photography' },
];

export default function SchoolPhotographyPage() {
  const [images, setImages] = useState(STUDENT_GALLERY_IMAGES);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch(`${API_URL}/gallery`)
      .then(r => (r.ok ? r.json() : []))
      .then(d => {
        if (isMounted && Array.isArray(d) && d.length > 0) {
          const schoolFilter = d.filter(i => 
            Boolean(i.imageUrl && i.imageUrl.trim()) &&
            ((i.category || '').toLowerCase().includes('school') || (i.title || '').toLowerCase().includes('school'))
          );
          if (schoolFilter.length > 0) {
            setImages([...schoolFilter, ...STUDENT_GALLERY_IMAGES]);
          }
        }
      })
      .catch(() => {});
    return () => { isMounted = false; };
  }, []);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* ── DEDICATED GALLERY SHOWCASE (IMAGE ONLY) ────────── */}
        <section className={styles.gallerySection}>
          <div className="container">
            <div className={styles.sectionHeaderCenter}>
              <span className={styles.eyebrowTag}>Campus Portfolio</span>
              <h2 className={styles.sectionHeading}>Student Photography Gallery</h2>
              <div className={styles.dividerLine} />
            </div>

            <div className={styles.galleryGrid}>
              {images.map((img, idx) => (
                <div key={img._id || idx} className={styles.card} onClick={() => setLightbox(img)}>
                  <div className={styles.imgWrap}>
                    <Image
                      src={img.imageUrl}
                      alt={img.title || 'Student Photography'}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      unoptimized
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOOKING CTA ───────────────────────── */}
        <section className={styles.ctaStrip}>
          <div className="container">
            <div className={styles.ctaInner}>
              <h2>Partner With AL ADHWA Studio for Your Next School Event</h2>
              <p>Schedule a mobile studio setup or request custom package pricing for your educational institution.</p>
              <a href="/#contact" className="btn-terracotta">Contact Our Team ↗</a>
            </div>
          </div>
        </section>
      </main>

      {/* ── LIGHTBOX MODAL ───────────────────────── */}
      {lightbox && (
        <div className={styles.lightboxBackdrop} onClick={() => setLightbox(null)}>
          <div className={styles.lightboxContent} onClick={e => e.stopPropagation()}>
            <button className={styles.lightboxClose} onClick={() => setLightbox(null)}>✕</button>
            <div className={styles.lightboxImgWrap}>
              <Image src={lightbox.imageUrl} alt={lightbox.title || 'School Photography'} fill sizes="90vw" unoptimized priority />
            </div>
            <div className={styles.lightboxMeta}>
              <span className={styles.lightboxCat}>School Photography</span>
              {lightbox.title && <h3 className={styles.lightboxTitle}>{lightbox.title}</h3>}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
