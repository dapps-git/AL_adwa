'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './layout.module.css';

const NAV = [
  { href: '/dashboard/gallery', icon: '🖼', label: 'Gallery' },
];

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
          <div className={styles.sideLogoRow}>
            <div className={styles.sideLogoIcon}>
              <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="7" fill="#C8912B"/>
                <path d="M7 21L14 7L21 21" stroke="white" strokeWidth="2.2" strokeLinejoin="round"/>
                <path d="M9.5 16.5H18.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            {!collapsed && <span className={styles.sideLogoText}>AL ADHWA</span>}
          </div>

          <nav className={styles.nav}>
            {NAV.map(item => (
              <a
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${pathname === item.href || pathname === '/dashboard' ? styles.active : ''}`}
                title={collapsed ? item.label : ''}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
              </a>
            ))}
          </nav>
        </div>

        <div className={styles.sideBottom}>
          {!collapsed && admin && (
            <div className={styles.adminInfo}>
              <div className={styles.adminAvatar}>{admin.name?.[0] || 'A'}</div>
              <div>
                <p className={styles.adminName}>{admin.name}</p>
                <p className={styles.adminEmail}>{admin.email}</p>
              </div>
            </div>
          )}
          <button onClick={logout} className={styles.logoutBtn} title="Logout">
            <span>⇦</span>
            {!collapsed && ' Logout'}
          </button>
        </div>
      </aside>

      {/* ── Collapse toggle ──────────────── */}
      <button className={styles.collapseBtn} onClick={() => setCollapsed(c => !c)}>
        {collapsed ? '›' : '‹'}
      </button>

      {/* ── Main content ─────────────────── */}
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
