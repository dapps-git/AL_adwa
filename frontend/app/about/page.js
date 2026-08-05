'use client';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './page.module.css';

export default function AboutPage() {
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
        <section className={styles.contentSection}>
          <div className="container">
            <div className={styles.storyGrid}>
              {/* Left Column: Image Showcase */}
              <div className={styles.imgCol}>
                <div className={styles.imgWrapMain}>
                  <Image
                    src="/img/aboutusinner.webp"
                    alt="AL ADHWA Studio Facilities"
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
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

              {/* Right Column: Detailed Narrative Text */}
              <div className={styles.textCol}>
                <h2 className={styles.headingSec}>Comprehensive Media &amp; Production Resource</h2>
                
                <p className={styles.paragraph}>
                  Al Adhwa Studio is one of the leading Photography, Videography and Teleprompter Services in the UAE with a wide armory of state-of-the-art facilities and cutting edge technology. Founded in 2014, Al Adhwa is all set to cater to your comprehensive media needs.
                </p>

                <p className={styles.paragraph}>
                  Right from single sales events to major corporate events, we cover all the essentials in the world of media. These include corporate films, TV commercials, Television software production, and Documentaries that add to the many services we provide, making Al Adhwa the single-point resource pool for the media and photography industry.
                </p>

                <p className={styles.paragraph}>
                  The company has been instrumental in developing incomparable and path-breaking videography and photography, and has achieved numerous milestones for national and international companies. The creativity and uniqueness of style as portrayed by Al Adhwa is what makes it the most sought-after media resource across the Middle East.
                </p>

                <div className={styles.ctaRow}>
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
