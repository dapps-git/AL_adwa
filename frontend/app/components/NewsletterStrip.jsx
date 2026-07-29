'use client';
import { useState } from 'react';
import styles from './NewsletterStrip.module.css';

export default function NewsletterStrip() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.titleWrap}>
          <span className={styles.tagline}>weekly fun in your inbox</span>
          <h3 className={styles.heading}>JOIN THE LIST</h3>
        </div>

        {subscribed ? (
          <p className={styles.success}>✓ Thank you for subscribing to AL ADHWA Studio!</p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Your Email Address"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.submitBtn}>SUBSCRIBE</button>
          </form>
        )}
      </div>
    </section>
  );
}
