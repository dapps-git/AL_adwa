'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from './Navbar.module.css';

const servicesList = [
  { name: 'School Photography', href: '/school-photography' },
  { name: 'Product Shoot', href: '/categories/studio-services' },
  { name: 'Corporate Video', href: '/categories/outdoor-videography' },
  { name: 'TV Commercial', href: '/categories/outdoor-videography' },
  { name: 'Event Photography', href: '/categories/outdoor-photography' },
  { name: 'Press Photo & Video', href: '/categories/outdoor-photography' },
  { name: 'Exhibition Photography', href: '/categories/outdoor-photography' },
  { name: 'Live Feed to Multi Screens', href: '/categories/outdoor-videography' },
  { name: 'Industrial Photography', href: '/categories/outdoor-photography' },
  { name: 'Live Motion Graphics', href: '/categories/outdoor-videography' },
  { name: 'Sports Photography', href: '/categories/outdoor-photography' },
  { name: 'Press Conference', href: '/categories/outdoor-videography' },
  { name: 'Equipment Rental', href: '/contact' },
  { name: 'Multi-Cam Video', href: '/categories/outdoor-videography' },
  { name: 'Teleprompter Rigs', href: '/categories/teleprompter-services' },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isLightNav = scrolled || !isHomePage;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`${styles.navbar} ${isLightNav ? styles.scrolled : ''}`} id="navbar">
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
          <a href="/" className={styles.navLink}>Home</a>
          <a href="/about" className={styles.navLink}>About Us</a>
          
          {/* Services Dropdown */}
          <div 
            className={styles.dropdownWrap} 
            ref={dropdownRef}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button 
              className={`${styles.navLink} ${styles.dropdownToggle}`}
              onClick={() => setServicesOpen(prev => !prev)}
              aria-expanded={servicesOpen}
            >
              Services <span className={styles.arrow}>{servicesOpen ? '▴' : '▾'}</span>
            </button>

            {servicesOpen && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownHeader}>OUR SERVICES</div>
                <div className={styles.dropdownGrid}>
                  {servicesList.map((service) => (
                    <a
                      key={service.name}
                      href={service.href}
                      className={styles.dropdownItem}
                      onClick={() => setServicesOpen(false)}
                    >
                      <span className={styles.itemName}>{service.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

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
        
        {/* Mobile Services Accordion */}
        <div className={styles.mobileServicesSection}>
          <button 
            className={styles.mobileServicesToggle}
            onClick={() => setMobileServicesOpen(prev => !prev)}
          >
            <span>Services</span>
            <span>{mobileServicesOpen ? '−' : '+'}</span>
          </button>
          {mobileServicesOpen && (
            <div className={styles.mobileServicesList}>
              {servicesList.map((service) => (
                <a
                  key={service.name}
                  href={service.href}
                  className={styles.mobileServiceItem}
                  onClick={() => {
                    setMenuOpen(false);
                    setMobileServicesOpen(false);
                  }}
                >
                  <span>{service.name}</span>
                </a>
              ))}
            </div>
          )}
        </div>

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
