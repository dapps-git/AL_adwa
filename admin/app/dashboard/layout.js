'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './layout.module.css';

export default function DashboardLayout({ children }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [admin, setAdmin] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) { router.push('/'); return; }
    const user = localStorage.getItem('admin_user');
    if (user) setAdmin(JSON.parse(user));
  }, []);

  function logout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/');
  }

  return (
    <div className={`${styles.shell} ${collapsed ? styles.collapsed : ''}`}>
      {/* ── Sidebar ─────────────────────── */}
      <aside className={styles.sidebar}>
        <div className={styles.sideTop}>
          {/* Logo Header */}
          <div className={styles.sideLogoRow}>
            <div className={styles.sideLogoIcon}>
              <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="8" fill="url(#sideGrad)"/>
                <path d="M7 21L14 7L21 21" stroke="white" strokeWidth="2.2" strokeLinejoin="round"/>
                <path d="M9.5 16.5H18.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="sideGrad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F3C663"/>
                    <stop offset="1" stopColor="#B27B1E"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            {!collapsed && (
              <div className={styles.brandTitleWrap}>
                <span className={styles.sideLogoText}>AL ADHWA</span>
                <span className={styles.sideSubText}>Studio Admin</span>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className={styles.nav}>
            <a
              href="/dashboard/gallery"
              className={`${styles.navItem} ${pathname.includes('/gallery') || pathname === '/dashboard' ? styles.active : ''}`}
              title={collapsed ? 'Gallery Photos' : ''}
            >
              <span className={styles.navIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="3"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <path d="M21 15l-5-5L5 21"/>
                </svg>
              </span>
              {!collapsed && <span className={styles.navLabel}>Gallery Photos</span>}
            </a>
          </nav>
        </div>

        {/* Sidebar Bottom Profile */}
        <div className={styles.sideBottom}>
          {!collapsed && admin && (
            <div className={styles.adminInfo}>
              <div className={styles.adminAvatar}>{admin.name?.[0] || 'A'}</div>
              <div className={styles.adminMeta}>
                <p className={styles.adminName}>{admin.name || 'Administrator'}</p>
                <p className={styles.adminEmail}>{admin.email || 'admin@aladhwastudio.com'}</p>
              </div>
            </div>
          )}
          <button onClick={logout} className={styles.logoutBtn} title="Logout">
            <span className={styles.logoutIcon}>⇦</span>
            {!collapsed && 'Sign Out'}
          </button>
        </div>
      </aside>

      {/* ── Collapse toggle ──────────────── */}
      <button className={styles.collapseBtn} onClick={() => setCollapsed(c => !c)} title="Toggle sidebar">
        {collapsed ? '›' : '‹'}
      </button>

      {/* ── Main Layout Container ─────────── */}
      <div className={styles.mainWrapper}>
        {/* Top Header Bar */}
        <header className={styles.topHeader}>
          <div className={styles.topHeaderLeft}>
            <span className={styles.topGreeting}>Dashboard</span>
            <span className={styles.topDivider}>/</span>
            <span className={styles.topSection}>Gallery Management</span>
          </div>
          <div className={styles.topHeaderRight}>
            <div className={styles.statusPill}>
              <span className={styles.statusDot} />
              <span>Live System</span>
            </div>
            {admin && (
              <div className={styles.profileBadge}>
                <div className={styles.miniAvatar}>{admin.name?.[0] || 'A'}</div>
                <span>{admin.name || 'Admin'}</span>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}
