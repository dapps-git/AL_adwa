import Image from 'next/image';
import styles from './FullWidthBand.module.css';

export default function FullWidthBand() {
  return (
    <div className={styles.band} id="fullwidth-band">
      <Image
        src="/img3.webp"
        alt="AL ADHWA Studio – professional photography Sharjah"
        fill
        sizes="100vw"
        priority={false}
      />
      <div className={styles.overlay} />
    </div>
  );
}
