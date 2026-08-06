'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { API_URL } from '../config';
import styles from './page.module.css';

const CATEGORIES = [
  'All Work',
  'Outdoor Photography',
  'Outdoor Videography',
  'Teleprompter Services',
  'Studio Services & Printing',
  'School Photography',
];

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('All Work');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch(`${API_URL}/gallery?t=${Date.now()}`, { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : []))
      .then(d => {
        if (isMounted && Array.isArray(d)) {
          const valid = d.filter(i => Boolean(i.imageUrl && i.imageUrl.trim()));
          setImages(valid);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  const filtered = active === 'All Work' 
    ? images 
    : images.filter(i => (i.category || '').toLowerCase().includes(active.toLowerCase()) || active.toLowerCase().includes((i.category || '').toLowerCase()));

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* ── TOP CENTERED HEADER SECTION ──────────────────────── */}
        <section className={styles.headerSection}>
          <div className="container">
            <div className={styles.headerCenter}>
              <span className={styles.eyebrow}>Visual Showcase</span>
              <h1 className={styles.title}>OUR GALLERY</h1>
              <a href="https://wa.me/971557544582" target="_blank" rel="noopener noreferrer" className={styles.bookBtn}>
                BOOK NOW
              </a>
            </div>
          </div>
        </section>

        {/* ── STICKY CLEAN TEXT FILTER BAR ───────────────── */}
        <section className={styles.filterSection}>
          <div className="container">
            <div className={styles.filterRow}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`${styles.filterBtn} ${active === cat ? styles.filterActive : ''}`}
                  onClick={() => setActive(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── FULL WIDTH GALLERY PHOTO GRID ── */}
        <section className={styles.gallerySection}>
          <div className="container">
            {loading ? (
              /* ── SKELETON SHIMMER LOADING GRID ────────── */
              <div className={styles.galleryGrid}>
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <div key={n} className={styles.skeletonCard}>
                    <div className={styles.skeletonShimmer} />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className={styles.emptyGalleryState}>
                <p className={styles.emptyText}>No gallery images available.</p>
                <span className={styles.emptySub}>Upload photos from Admin Panel to display here.</span>
              </div>
            ) : (
              <div className={styles.galleryGrid}>
                {filtered.map((img, idx) => (
                  <div
                    key={img._id || idx}
                    className={styles.card}
                    onClick={() => setLightbox(img)}
                  >
                    <Image
                      src={img.imageUrl}
                      alt={img.title || 'Gallery image'}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      unoptimized
                      style={{ objectFit: 'cover' }}
                      className={styles.img}
                    />
                    <div className={styles.cardOverlay}>
                      <span className={styles.catBadge}>{img.category}</span>
                      {img.title && <h3 className={styles.cardTitle}>{img.title}</h3>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* ── LIGHTBOX MODAL ───────────────────────── */}
      {lightbox && (
        <div className={styles.lightboxBackdrop} onClick={() => setLightbox(null)}>
          <div className={styles.lightboxContent} onClick={e => e.stopPropagation()}>
            <button className={styles.lightboxClose} onClick={() => setLightbox(null)}>✕</button>
            <div className={styles.lightboxImgWrap}>
              <Image src={lightbox.imageUrl} alt={lightbox.title || 'Gallery image'} fill sizes="90vw" unoptimized priority />
            </div>
            <div className={styles.lightboxMeta}>
              <span className={styles.lightboxCat}>{lightbox.category}</span>
              {lightbox.title && <h3 className={styles.lightboxTitle}>{lightbox.title}</h3>}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
