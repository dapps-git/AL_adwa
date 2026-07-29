'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './AdriannaWelcome.module.css';

export default function AdriannaWelcome() {
  const [typedTitle, setTypedTitle] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const fullText = 'Welcome to Our Site';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Typewriter effect when section becomes visible (clean without pipe cursor)
  useEffect(() => {
    if (!isVisible) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedTitle(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 70);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section className={`${styles.section} ${isVisible ? styles.visible : ''}`} id="welcome" ref={sectionRef}>
      <div className={styles.inner}>
        {/* LEFT COLUMN: Text Content */}
        <div className={styles.contentCol}>
          <span className={styles.eyebrow}>Hey there, friends!</span>
          
          {/* Clean Typewriter Title */}
          <h2 className={styles.title}>{typedTitle}</h2>

          <p className={styles.scriptTagline}>We believe there's extraordinary beauty</p>
          <span className={styles.taglineCap}>In the simplest of moments</span>

          <p className={styles.bodyText}>
            AL ADHWA Studio brings together photography, videography, teleprompter services, and personalised gift printing under one roof in Sharjah, UAE. From passport photos to broadcast teleprompters, from studio portrait sessions to outdoor commercial shoots — we are your single-point media resource across the Middle East.
          </p>

          <div className={styles.socialRow}>
            <a href="https://www.facebook.com/profile.php?id=61552814975664" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com/al.adhwa.studio" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.youtube.com/@aladhwastudio8" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="http://www.linkedin.com/in/aladhwastudio" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>

        {/* RIGHT COLUMN: Studio Image */}
        <div className={styles.imgCol}>
          <div className={styles.imgWrap}>
            <Image 
              src="/welcome.webp" 
              alt="Welcome to AL ADHWA Studio" 
              width={650} 
              height={450} 
              unoptimized 
              priority
              className={styles.welcomeImg}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
