'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { API_URL } from '../config';
import styles from './GallerySection.module.css';

export default function GallerySection() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    let isMounted = true;
    fetch(`${API_URL}/gallery`)
      .then(res => (res.ok ? res.json() : []))
      .then(data => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setImages(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setImages([
            { _id: '1', title: 'Studio Session', url: '/img/studio.webp', category: 'Studio' },
            { _id: '2', title: 'Outdoor Shoot', url: '/img/photogrphy.webp', category: 'Outdoor' },
            { _id: '3', title: 'Teleprompter Setup', url: '/img/teleprompt.webp', category: 'Teleprompter' },
            { _id: '4', title: 'Videography', url: '/img/photostudio.webp', category: 'Videography' },
            { _id: '5', title: 'Podcast Recording', url: '/img/podcast.webp', category: 'Teleprompter' },
            { _id: '6', title: 'Gift Printing', url: '/img/gift.webp', category: 'Printing' },
          ]);
        }
      });
    return () => { isMounted = false; };
  }, []);

  return (
    <section className={`${styles.section} section`} id="gallery">
      <div className="container">
        <div className={styles.header}>
          <div className="eyebrow-pill"><span className="dot" />Portfolio Showcase</div>
          <h2 className={`heading-display ${styles.title}`}>
            Captured <span className="serif">Moments &amp; Work</span>
          </h2>
          <p className="subtext">Browse our dynamic gallery of photography, video setups, and printing creations.</p>
        </div>

        <div className={styles.grid}>
          {images.map((img) => (
            <div key={img._id || img.url || img.imageUrl} className={styles.card}>
              <Image src={img.imageUrl || img.url} alt={img.title || 'Gallery Image'} fill sizes="(max-width:768px) 50vw, 33vw" unoptimized />
              <div className={styles.overlay}>
                <span className={styles.catTag}>{img.category}</span>
                {img.title && <h4 className={styles.imgTitle}>{img.title}</h4>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
