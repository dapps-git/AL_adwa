'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './page.module.css';

const p1Text = 'Al Adhwa Studio is one of the leading Photography, Videography and Teleprompter Services in the UAE with a wide armory of state-of-the-art facilities and cutting edge technology. Founded in 2014, Al Adhwa is all set to cater to your comprehensive media needs.';

const p2Text = 'Right from single sales events to major corporate events, we cover all the essentials in the world of media. These include corporate films, TV commercials, Television software production, and Documentaries that add to the many services we provide, making Al Adhwa the single-point resource pool for the media and photography industry.';

const p3Text = 'The company has been instrumental in developing incomparable and path-breaking videography and photography, and has achieved numerous milestones for national and international companies. The creativity and uniqueness of style as portrayed by Al Adhwa is what makes it the most sought-after media resource across the Middle East.';

export default function AboutPage() {
  const [typedP1, setTypedP1] = useState('');
  const [typedP2, setTypedP2] = useState('');
  const [typedP3, setTypedP3] = useState('');
  const [typingFinished, setTypingFinished] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const storyRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (storyRef.current) observer.observe(storyRef.current);
    return () => observer.disconnect();
  }, []);

  // Sequential typewriter effect across all 3 paragraphs down to Contact Team
  useEffect(() => {
    if (!isVisible) return;

    let index1 = 0;
    let index2 = 0;
    let index3 = 0;

    const timer = setInterval(() => {
      if (index1 <= p1Text.length) {
        setTypedP1(p1Text.slice(0, index1));
        index1 += 2;
      } else if (index2 <= p2Text.length) {
        setTypedP2(p2Text.slice(0, index2));
        index2 += 2;
      } else if (index3 <= p3Text.length) {
        setTypedP3(p3Text.slice(0, index3));
        index3 += 2;
      } else {
        setTypingFinished(true);
        clearInterval(timer);
      }
    }, 15);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* ── HEADER BANNER ───────────────────────────── */}
        <section className={styles.heroSection}>
          <div className="container">
            <div className={styles.heroHeader}>
              <span className={styles.eyebrow}>ESTABLISHED 2014 • SHARJAH, UAE</span>
              <h1 className={styles.title}>ABOUT AL ADHWA STUDIO</h1>
              <div className={styles.divider} />
              <p className={styles.tagline}>
                One of the leading Photography, Videography &amp; Teleprompter Services in the UAE
              </p>
            </div>
          </div>
        </section>

        {/* ── MAIN ABOUT CONTENT & STORY ───────────────── */}
        <section className={styles.contentSection} ref={storyRef}>
          <div className="container">
            <div className={styles.storyGrid}>
              {/* Left Column: Stationary Image Showcase */}
              <div className={styles.imgCol}>
                <div className={styles.imgWrapMain}>
                  <Image
                    src="/img/aboutusinner.webp"
                    alt="AL ADHWA Studio Facilities"
                    fill
                    sizes="(max-width:768px) 100vw, 55vw"
                    unoptimized
                    priority
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.badgeBox}>
                  <span className={styles.badgeNum}>14+</span>
                  <span className={styles.badgeText}>Years of Media Excellence in the UAE</span>
                </div>
              </div>

              {/* Right Column: Narrative Text with Sequential Typewriter Animation */}
              <div className={styles.textCol}>
                <h2 className={styles.headingSec}>Comprehensive Media &amp; Production Resource</h2>
                
                <p className={`${styles.paragraph} ${styles.typewriterParagraph}`}>
                  {typedP1 || p1Text}
                </p>

                <p className={`${styles.paragraph} ${styles.typewriterParagraph}`}>
                  {typedP2 || (typedP1.length >= p1Text.length ? p2Text : '')}
                </p>

                <p className={`${styles.paragraph} ${styles.typewriterParagraph}`}>
                  {typedP3 || (typedP2.length >= p2Text.length ? p3Text : '')}
                </p>

                {/* CTA Row: Smooth Fade-In Transition AFTER Typing Finishes */}
                <div className={`${styles.ctaRow} ${typingFinished ? styles.ctaRowVisible : ''}`}>
                  <a href="https://wa.me/971557544582" target="_blank" rel="noopener noreferrer" className="btn-terracotta">
                    BOOK A SESSION ↗
                  </a>
                  <a href="/#contact" className="btn-outline">
                    CONTACT TEAM
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4 MAIN CATEGORIES ─────────────────────────── */}
        <section className={styles.statsSection}>
          <div className="container">
            <div className={styles.statsGrid}>
              <a href="/categories/outdoor-photography" className={styles.statCard}>
                <h3>Outdoor Photography</h3>
                <p>Portrait, Travel, Commercial, Wedding &amp; Event Photography across the UAE.</p>
              </a>

              <a href="/categories/outdoor-videography" className={styles.statCard}>
                <h3>Outdoor Videography</h3>
                <p>Commercial Ads, Corporate Brand Films, Weddings &amp; 4K Multi-Cam Production.</p>
              </a>

              <a href="/categories/teleprompter-services" className={styles.statCard}>
                <h3>Teleprompter Services</h3>
                <p>Presidential Podiums, Broadcast Camera Rigs &amp; Stage Floor Monitors.</p>
              </a>

              <a href="/categories/studio-services" className={styles.statCard}>
                <h3>Studio Services &amp; Printing</h3>
                <p>Indoor Studio Shoots, ID Photos, Graphic Design &amp; Custom Printed Gifts.</p>
              </a>
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA STRIP ───────────────────────── */}
        <section className={styles.ctaStrip}>
          <div className="container">
            <div className={styles.ctaInner}>
              <h2>Ready to Bring Your Vision to Life?</h2>
              <p>Connect with our creative team for custom package pricing or studio availability in Muwailah, Sharjah.</p>
              <a href="https://wa.me/971557544582" target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
                Chat on WhatsApp ↗
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
