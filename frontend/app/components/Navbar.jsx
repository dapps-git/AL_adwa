'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Navbar.module.css';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/#about' },
  { label: 'Categories', href: '/#categories' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'The Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} id="navbar">
      <div className={styles.navInner}>
        {/* ── LEFT LOGO ───────────────────────────── */}
        <a href="/" className={styles.logoWrap} id="brand-logo">
          <Image
            src="/img/logo.webp?v=2"
            alt="AL ADHWA Studio"
            width={160}
            height={44}
            priority
            unoptimized
            className={styles.logoImg}
          />
        </a>

        {/* ── RIGHT NAV LINKS & CTA ────────────────── */}
        <nav className={styles.navLinks} aria-label="Main navigation">
          {navItems.map(item => (
            <a key={item.label} href={item.href} className={styles.navLink}>{item.label}</a>
          ))}
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
        {navItems.map(item => (
          <a key={item.label} href={item.href} className={styles.drawerLink} onClick={() => setMenuOpen(false)}>
            {item.label}
          </a>
        ))}
        <a href="https://wa.me/971557544582" target="_blank" rel="noopener noreferrer" className={styles.drawerLink}>
          WhatsApp Us
        </a>
        <div className={styles.drawerContact}>
          <p>📞 +971 6 5586870</p>
          <p>📍 Muwailah, Sharjah, UAE</p>
        </div>
      </div>
    </header>
  );
}
