'use client';
import styles from './Footer.module.css';

const socials = [
  {
    name: 'Instagram',
    url: 'https://instagram.com/al.adhwa.studio',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    )
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61552814975664',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    )
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@aladhwastudio',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
      </svg>
    )
  },
  {
    name: 'X (Twitter)',
    url: 'https://x.com/ALADHWASTUDIO',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.767-9.233M13.233 9.233L20 4"/>
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    url: 'http://www.linkedin.com/in/aladhwastudio',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    )
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@aladhwastudio8',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
      </svg>
    )
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/971557544582',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    )
  }
];

export default function Footer() {
  return (
    <footer className={styles.footer} id="footer">
      {/* ── Top CTA Block ────── */}
      <div className={styles.topCta}>
        <span className={styles.ctaTagline}>like what you see?</span>
        <h2 className={styles.ctaTitle}>LET'S WORK TOGETHER</h2>
        <div className={styles.line} />
        <p className={styles.ctaSub}>CONTACT US FOR MORE DETAILS</p>
        <a href="tel:+97165586870" className={styles.phoneNum}>+971 6 5586870</a>
      </div>

      {/* ── Main Footer Info Row ──────────────────── */}
      <div className={`container ${styles.mainRow}`}>
        {/* Column 1: Navigation */}
        <div className={styles.col}>
          <h4 className={styles.colHeader}>FIND YOUR WAY AROUND</h4>
          <div className={styles.lineSmall} />
          <nav className={styles.navLinks}>
            <a href="/">HOME</a>
            <a href="/#about">ABOUT</a>
            <a href="/#categories">CATEGORIES</a>
            <a href="/gallery">OUR WORK</a>
            <a href="/blog">THE BLOG</a>
            <a href="/contact">CONTACT US</a>
          </nav>
        </div>

        {/* Column 2: Social Links (Single Horizontal Row of Icons Only) */}
        <div className={styles.col}>
          <h4 className={styles.colHeader}>CONNECT WITH US</h4>
          <div className={styles.lineSmall} />
          <div className={styles.socialRowIcons}>
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIconOnly}
                aria-label={s.name}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Column 3: Contact & Address Info (Standard SVG Icons) */}
        <div className={styles.col}>
          <h4 className={styles.colHeader}>STUDIO LOCATION</h4>
          <div className={styles.lineSmall} />
          <div className={styles.locationInfo}>
            <div className={styles.locItemRow}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Muwailah, Sharjah, UAE</span>
            </div>
            <div className={styles.locItemRow}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>info@aladhwastudio.com</span>
            </div>
            <div className={styles.locItemRow}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>+971 6 5586870</span>
            </div>
            <div className={styles.locItemRow}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
              <span>+971 55 754 4582</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ────────────────────────────── */}
      <div className={styles.bottomBar}>
        <p>© 2014–2026 AL ADHWA STUDIO | MUWAILAH, SHARJAH, UAE</p>
      </div>
    </footer>
  );
}
