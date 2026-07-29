'use client';
import styles from './MainServicesShowcase.module.css';

const MAIN_SERVICES = [
  { id: '1', name: 'PRODUCT SHOOT', icon: '📷', tag: 'Photography' },
  { id: '2', name: 'CORPORATE VIDEO', icon: '🎬', tag: 'Videography' },
  { id: '3', name: 'TV COMMERCIAL', icon: '📺', tag: 'Production' },
  { id: '4', name: 'EVENT PHOTOGRAPHY', icon: '🎉', tag: 'Events' },
  { id: '5', name: 'PRESS PHOTO AND VIDEO', icon: '📰', tag: 'Media' },
  { id: '6', name: 'EXHIBITION PHOTOGRAPHY', icon: '🏛️', tag: 'Exhibitions' },
  { id: '7', name: 'LIVE FEED TO MULTI SCREENS', icon: '🖥️', tag: 'Live Broadcast' },
  { id: '8', name: 'INDUSTRIAL PHOTOGRAPHY', icon: '🏭', tag: 'Commercial' },
  { id: '9', name: 'LIVE MOTION GRAPHICS', icon: '✨', tag: 'Creative' },
  { id: '10', name: 'SPORTS PHOTOGRAPHY', icon: '⚽', tag: 'Sports' },
  { id: '11', name: 'PRESS CONFERENCE', icon: '🎙️', tag: 'Live Events' },
  { id: '12', name: 'EQUIPMENT RENTAL', icon: '📽️', tag: 'Gear Rental' },
  { id: '13', name: 'MULTI-CAM VIDEO', icon: '🎥', tag: 'Production' },
  { id: '14', name: 'TELEPROMPTER', icon: '📜', tag: 'Autocue Rigs' },
];

export default function MainServicesShowcase() {
  return (
    <section className={styles.section} id="main-services">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.eyebrow}>What We Do Best</span>
          <h2 className={styles.title}>OUR MAIN SERVICES</h2>
          <div className={styles.divider} />
          <p className={styles.subtitle}>
            Professional photography, video production, teleprompter rigs, and live event media support across Sharjah &amp; Dubai, UAE.
          </p>
        </div>

        <div className={styles.grid}>
          {MAIN_SERVICES.map((s) => (
            <div key={s.id} className={styles.card}>
              <span className={styles.cardIcon}>{s.icon}</span>
              <span className={styles.cardTag}>{s.tag}</span>
              <h3 className={styles.cardTitle}>{s.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
