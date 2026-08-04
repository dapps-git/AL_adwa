'use client';
import Image from 'next/image';
import styles from './QRCodeWidget.module.css';

export default function QRCodeWidget({ type = 'photo' }) {
  const isPhoto = type === 'photo' || type === 'studio' || type === 'outdoor';
  const scannerImg = isPhoto ? '/img/first.webp' : '/img/second.webp';
  const label = isPhoto ? 'Studio & Outdoor Photography' : 'Videography & Teleprompter';

  return (
    <div className={styles.scannerCard}>
      <div className={styles.scannerImgWrap}>
        <Image
          src={scannerImg}
          alt={`WhatsApp QR Scanner for ${label}`}
          width={280}
          height={280}
          unoptimized
          priority
          className={styles.scannerImg}
        />
      </div>
      <p className={styles.scannerText}>Scan the QR code to contact us on WhatsApp.</p>
    </div>
  );
}
