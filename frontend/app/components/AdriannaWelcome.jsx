'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './AdriannaWelcome.module.css';

export default function AdriannaWelcome() {
  const [typedTitle, setTypedTitle] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const fullText = 'WELCOME TO OUR HOME';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset visibility on scroll out so animation re-triggers every scroll
          setIsVisible(false);
          setTypedTitle('');
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Typewriter writing animation when section becomes visible
  useEffect(() => {
    if (!isVisible) {
      setTypedTitle('');
      return;
    }

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
    <section className={`${styles.section} ${isVisible ? styles.visible : ''}`} id="about" ref={sectionRef}>
      <div className={styles.inner}>
        {/* LEFT COLUMN: Text Content (Slides in from Right) */}
        <div className={`${styles.contentCol} ${isVisible ? styles.contentColVisible : ''}`}>
          <span className={styles.eyebrow}>Hey dear friends,</span>

          {/* Writing Typewriter Title */}
          <h2 className={styles.title}>{typedTitle || fullText}</h2>

          <p className={styles.scriptTagline}>We believe there's extraordinary beauty</p>
          <span className={styles.taglineCap}>In the simplest of moments</span>

          <p className={styles.bodyText}>
            AL ADHWA Studio brings together photography, videography, teleprompter services, and personalised gift printing under one roof in Sharjah, UAE. From passport photos to broadcast teleprompters, from studio portrait sessions to outdoor commercial shoots — we are your single-point media resource across the Middle East.
          </p>

          <div className={styles.socialRow}>
            {/* Facebook */}
            <a href="https://www.facebook.com/profile.php?id=61552814975664" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            </a>
            {/* Instagram */}
            <a href="https://instagram.com/al.adhwa.studio" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </a>
            {/* YouTube */}
            <a href="https://www.youtube.com/@aladhwastudio8" target="_blank" rel="noopener noreferrer" aria-label="YouTube" title="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" /></svg>
            </a>
            {/* X (Twitter) */}
            <a href="https://x.com/ALADHWASTUDIO" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" title="X (Twitter)">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            {/* TikTok */}
            <a href="https://www.tiktok.com/@aladhwastudio" target="_blank" rel="noopener noreferrer" aria-label="TikTok" title="TikTok">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.73a4.85 4.85 0 0 1-1.01-.04z" /></svg>
            </a>
            {/* LinkedIn */}
            <a href="http://www.linkedin.com/in/aladhwastudio" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Studio Image (Slides in from LEFT) */}
        <div className={`${styles.imgCol} ${isVisible ? styles.imgColVisible : ''}`}>
          <div className={styles.imgWrap}>
            <Image
              src="/img/welcome.webp"
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
