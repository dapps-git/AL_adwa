'use client';
import { useState, useEffect } from 'react';
import styles from './WelcomeLoader.module.css';

export default function WelcomeLoader() {
  const [loading, setLoading] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Only show on initial website load (new tab / session)
    try {
      const hasShown = sessionStorage.getItem('has_shown_welcome_loader');
      if (hasShown) {
        return; // Already shown — keep loading false so overlay never appears
      }
      sessionStorage.setItem('has_shown_welcome_loader', 'true');
      setLoading(true);
    } catch (e) {
      return;
    }

    // Play 1.0 second 5-dot welcome animation, then fade out
    const timer1 = setTimeout(() => setFade(true), 1000);
    const timer2 = setTimeout(() => setLoading(false), 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className={`${styles.loaderOverlay} ${fade ? styles.fadeOut : ''}`}>
      <div className={styles.loaderContent}>
        <h1 className={styles.welcomeText}>Welcome to Al Adhwa</h1>
        <div className={styles.dotsContainer}>
          <span className={`${styles.dot} ${styles.dot1}`} />
          <span className={`${styles.dot} ${styles.dot2}`} />
          <span className={`${styles.dot} ${styles.dot3}`} />
          <span className={`${styles.dot} ${styles.dot4}`} />
          <span className={`${styles.dot} ${styles.dot5}`} />
        </div>
      </div>
    </div>
  );
}
