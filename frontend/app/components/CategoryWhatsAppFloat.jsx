'use client';
import Image from 'next/image';
import styles from './CategoryWhatsAppFloat.module.css';

export default function CategoryWhatsAppFloat({ slug }) {
  const isPhoto = slug === 'studio-services' || slug === 'outdoor-photography';
  
  // Specific WhatsApp numbers requested:
  // Studio & Outdoor Photography: 971509261376
  // Outdoor Videography & Teleprompter: 971564627313
  const phone = isPhoto ? '971564627313' : '971557544582';
  const categoryName = isPhoto ? 'Studio & Outdoor Photography' : 'Videography & Teleprompter';
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(`Hello AL ADHWA Studio, I would like to inquire about ${categoryName} services.`)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.bottomLeftFloat}
      aria-label={`Chat on WhatsApp for ${categoryName}`}
      id="category-whatsapp-float"
    >
      <div className={styles.imgWrap}>
        <Image
          src="/img/w.webp"
          alt="WhatsApp Contact"
          width={60}
          height={60}
          unoptimized
          priority
          className={styles.wImg}
        />
      </div>
      <span className={styles.tooltip}>WhatsApp ({phone})</span>
    </a>
  );
}
