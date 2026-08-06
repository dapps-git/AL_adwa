'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isLightNav = scrolled || !isHomePage;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.navbar} ${isLightNav ? styles.scrolled : ''}`} id="navbar">
      <div className={styles.navInner}>
        {/* ── LEFT LOGO ───────────────────────────── */}
        <a href="/" className={styles.logoWrap} id="brand-logo">
          <Image
            src="/img/logo.webp?v=2"
            alt="AL ADHWA Studio"
            width={220}
            height={60}
            priority
            unoptimized
            className={styles.logoImg}
          />
        </a>

        {/* ── RIGHT NAV LINKS & CTA ────────────────── */}
        <nav className={styles.navLinks} aria-label="Main navigation">
          <a href="/" className={styles.navLink}>Home</a>
          <a href="/about" className={styles.navLink}>About Us</a>
          <a href="/#categories" className={styles.navLink}>Categories</a>
          <a href="/gallery" className={styles.navLink}>Gallery</a>
          <a href="/school-photography" className={styles.navLink}>School Gallery</a>
          <a href="/#contact" className={styles.navLink}>Contact</a>
          <a href="https://wa.me/971557544582" target="_blank" rel="noopener noreferrer" className={styles.waBtn}>
            WhatsApp
          </a>
        </nav>

        {/* ── MOBILE HAMBURGER ─────────────────────── */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          id="hamburger-btn"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* ── MOBILE DRAWER ─────────────────────────── */}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`} id="mobile-menu">
        <a href="/" className={styles.drawerLink} onClick={() => setMenuOpen(false)}>Home</a>
        <a href="/about" className={styles.drawerLink} onClick={() => setMenuOpen(false)}>About Us</a>
        <a href="/#categories" className={styles.drawerLink} onClick={() => setMenuOpen(false)}>Categories</a>
        <a href="/gallery" className={styles.drawerLink} onClick={() => setMenuOpen(false)}>Gallery</a>
        <a href="/school-photography" className={styles.drawerLink} onClick={() => setMenuOpen(false)}>School Gallery</a>
        <a href="/#contact" className={styles.drawerLink} onClick={() => setMenuOpen(false)}>Contact</a>
        <a href="https://wa.me/971557544582" target="_blank" rel="noopener noreferrer" className={styles.drawerLink}>
          WhatsApp Us
        </a>
        <div className={styles.drawerContact}>
          <p>+971 6 5586870</p>
          <p>Muwailah, Sharjah, UAE</p>
        </div>
      </div>
    </header>
  );
}
