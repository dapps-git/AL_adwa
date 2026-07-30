'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]   = useState('');
  const [pass,  setPass]    = useState('');
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res  = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_user',  JSON.stringify(data.admin));
      router.push('/dashboard/gallery');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      {/* Background ambient lighting */}
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />
      <div className={styles.gridOverlay} />

      <div className={styles.card}>
        {/* Brand Header */}
        <div className={styles.logoArea}>
          <div className={styles.logoIcon}>
            <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="url(#brandGrad)"/>
              <path d="M7 21L14 7L21 21" stroke="white" strokeWidth="2.2" strokeLinejoin="round"/>
              <path d="M9.5 16.5H18.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <defs>
                <linearGradient id="brandGrad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F3C663"/>
                  <stop offset="1" stopColor="#B27B1E"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <h1 className={styles.brand}>AL ADHWA STUDIO</h1>
            <p className={styles.brandSub}>Content Management System</p>
          </div>
        </div>

        <div className={styles.headingBlock}>
          <h2 className={styles.title}>Admin Portal</h2>
          <p className={styles.sub}>Sign in to manage studio media &amp; portfolio content</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}>✉</span>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@aladhwastudio.com"
                required
                autoFocus
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}>🔒</span>
              <input
                type="password"
                value={pass}
                onChange={e => setPass(e.target.value)}
                placeholder="••••••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className={styles.errorBanner}>
              <span>⚠</span> {error}
            </div>
          )}

          <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={loading}>
            {loading ? 'Authenticating…' : 'Sign In to Dashboard →'}
          </button>
        </form>

        <div className={styles.footerNote}>
          <span>📍 Sharjah, UAE</span>
          <span className={styles.dot}>•</span>
          <span>AL ADHWA Media</span>
        </div>
      </div>
    </div>
  );
}
