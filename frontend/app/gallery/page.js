'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { API_URL } from '../config';
import styles from './page.module.css';

const CATEGORIES = ['All Work', 'School', 'Studio', 'Outdoor', 'Videography', 'Teleprompter', 'Printing'];

const DEFAULT_GALLERY_IMAGES = [
  { _id: 'g0', title: 'Studio Production & Setup', imageUrl: '/img/gallery.webp', category: 'Studio' },
  { _id: 'g1', title: 'Outdoor Commercial Photography', imageUrl: '/img/gallery1.webp', category: 'Outdoor' },
  { _id: 'g2', title: 'Teleprompter Broadcast Rig', imageUrl: '/img/gallery2.webp', category: 'Teleprompter' },
  { _id: 'g3', title: 'Corporate Video & Editing', imageUrl: '/img/gallery3.webp', category: 'Videography' },
  { _id: 'g4', title: 'Custom Printed Gifts & Framing', imageUrl: '/img/gallery4.webp', category: 'Printing' },
];

export default function GalleryPage() {
  const [images, setImages] = useState(DEFAULT_GALLERY_IMAGES);
  const [active, setActive] = useState('All Work');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    console.log('[Gallery] Fetching from:', `${API_URL}/gallery`);
    fetch(`${API_URL}/gallery`)
      .then(r => r.json())
      .then(d => {
        console.log('[Gallery] API response:', d);
        if (Array.isArray(d) && d.length > 0) {
          const valid = d.filter(i => Boolean(i.imageUrl && i.imageUrl.trim()));
          console.log('[Gallery] Valid images:', valid.length);
          if (valid.length > 0) setImages(valid);
        } else {
          console.log('[Gallery] No images returned from API, using defaults');
        }
      })
      .catch(err => console.error('[Gallery] Fetch error:', err));
  }, []);

  const filtered = active === 'All Work' 
    ? images 
    : images.filter(i => (i.category || '').toLowerCase().includes(active.toLowerCase()) || active.toLowerCase().includes((i.category || '').toLowerCase()));

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* ── STICKY FILTER TABS BAR ───────────────── */}
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

        {/* ── EDITORIAL SPLIT GALLERY ── */}
        <section className={styles.gallerySection}>
          <div className="container">
            <div className={styles.editorialRow}>
              {/* LEFT COLUMN: Editorial Title & Description */}
              <div className={styles.leftCol}>
                <span className={styles.eyebrow}>Visual Showcase</span>
                <h1 className={styles.title}>OUR<br />GALLERY</h1>
                <p className={styles.desc}>
                  Explore our curated portfolio of studio photography, outdoor sessions, video productions &amp; teleprompter setups across the UAE.
                </p>
                <a href="https://wa.me/971557544582" target="_blank" rel="noopener noreferrer" className={styles.bookBtn}>
                  BOOK NOW
                </a>
              </div>

              {/* RIGHT COLUMN: Bento Mosaic Grid (0px Border Radius) */}
              <div className={styles.rightCol}>
                {filtered.length === 0 ? (
                  <div className={styles.emptyGalleryState}>
                    <p className={styles.emptyText}>No gallery images for this category.</p>
                    <span className={styles.emptySub}>Select another category to view work.</span>
                  </div>
                ) : (
                  <div className={styles.bentoGrid}>
                    {filtered.map((img, idx) => (
                      <div
                        key={img._id || idx}
                        className={styles.card}
                        onClick={() => setLightbox(img)}
                      >
                        <Image
                          src={img.imageUrl || '/img/gallery.webp'}
                          alt={img.title || 'Gallery image'}
                          fill
                          sizes="(max-width:768px) 100vw, 33vw"
                          unoptimized
                          style={{ objectFit: 'cover' }}
                          className={styles.img}
                        />
                        <div className={styles.cardOverlay}>
                          <span className={styles.catBadge}>{img.category}</span>
                          <h3 className={styles.cardTitle}>{img.title}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
              <Image src={lightbox.imageUrl || '/img/gallery.webp'} alt={lightbox.title} fill sizes="90vw" unoptimized priority />
            </div>
            <div className={styles.lightboxMeta}>
              <span className={styles.lightboxCat}>{lightbox.category}</span>
              <h3 className={styles.lightboxTitle}>{lightbox.title}</h3>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
