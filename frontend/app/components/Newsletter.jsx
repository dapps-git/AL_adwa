'use client';
import { useState } from 'react';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const handle = (e) => {
    e.preventDefault();
    if (email) { setDone(true); setEmail(''); }
  };

  return (
    <section className={styles.newsletter} id="newsletter">
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <span className={styles.small}>weekly fun to your inbox</span>
          <h3 className={styles.heading}>JOIN THE LIST</h3>
        </div>
        {done ? (
          <p className={styles.thanks}>✓ Thank you for subscribing!</p>
        ) : (
          <form className={styles.form} onSubmit={handle} id="newsletter-form">
            <input
              type="text"
              placeholder="Your Name"
              className={styles.input}
              id="newsletter-name"
            />
            <span className={styles.sep} />
            <input
              type="email"
              placeholder="Your Email Address"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="newsletter-email"
              required
            />
            <button type="submit" className={`btn btn-dark ${styles.subBtn}`} id="newsletter-submit">
              SUBSCRIBE
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
