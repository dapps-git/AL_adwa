'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { API_URL } from '../config';
import styles from './page.module.css';

export default function SchoolPhotographyPage() {
  const [images, setImages] = useState([]);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch(`${API_URL}/gallery?t=${Date.now()}`, { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : []))
      .then(d => {
        if (isMounted && Array.isArray(d)) {
          const schoolFilter = d.filter(i => 
            Boolean(i.imageUrl && i.imageUrl.trim()) &&
            ((i.category || '').toLowerCase().includes('school') || (i.title || '').toLowerCase().includes('school'))
          );
          setImages(schoolFilter);
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

            {images.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#FFFFFF', border: '1px dashed var(--cream-border)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: '#1C1917', marginBottom: '0.4rem' }}>No school photography uploaded yet</h3>
                <p style={{ fontSize: '0.85rem', color: '#666' }}>Upload school photos with category "School Photography" in the Admin Panel to display here.</p>
              </div>
            ) : (
              <div className={styles.galleryGrid}>
                {images.map((item, idx) => (
                  <div
                    key={item._id || idx}
                    className={styles.card}
                    onClick={() => setLightbox(item)}
                  >
                    <div className={styles.imgWrap}>
                      <Image
                        src={item.imageUrl}
                        alt={item.title || 'Student Photography'}
                        fill
                        sizes="(max-width:768px) 100vw, 33vw"
                        unoptimized
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className={styles.cardBody}>
                      <span className={styles.cardCat}>{item.category || 'School Photography'}</span>
                      <h3 className={styles.cardTitle}>{item.title || 'Student Photography'}</h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* ── LIGHTBOX MODAL ─────────────────────────── */}
      {lightbox && (
        <div className={styles.lightboxBackdrop} onClick={() => setLightbox(null)}>
          <div className={styles.lightboxContent} onClick={e => e.stopPropagation()}>
            <button className={styles.lightboxClose} onClick={() => setLightbox(null)}>✕</button>
            <div className={styles.lightboxImgWrap}>
              <Image
                src={lightbox.imageUrl}
                alt={lightbox.title || 'Student Photography'}
                fill
                sizes="90vw"
                unoptimized
                priority
              />
            </div>
            <div className={styles.lightboxMeta}>
              <span className={styles.lightboxCat}>{lightbox.category || 'School Photography'}</span>
              <h3 className={styles.lightboxTitle}>{lightbox.title || 'Student Photography'}</h3>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
