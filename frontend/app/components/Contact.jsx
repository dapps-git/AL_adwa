'use client';
import { useState } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });

  const handle = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className={`${styles.contact} section`} id="contact">
      <div className={`container ${styles.grid}`}>
        {/* Info Left */}
        <div className={styles.info} id="contact-info">
          <span className="eyebrow">Reach Out To Us</span>
          <h2 className="serif-display" style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>
            CONTACT AL ADHWA STUDIO
          </h2>
          <div className="editorial-divider" />

          {/* Address */}
          <div className={styles.infoItem} id="contact-location">
            <span className={styles.infoIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </span>
            <div>
              <p className={styles.infoLabel}>Studio Address</p>
              <p className={styles.infoVal}>
                AL ADHWA STUDIO<br />
                P.O BOX: 95161<br />
                Muwailah, Sharjah, United Arab Emirates
              </p>
            </div>
          </div>

          {/* Phone Numbers */}
          <div className={styles.infoItem} id="contact-phones">
            <span className={styles.infoIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </span>
            <div>
              <p className={styles.infoLabel}>Phone &amp; WhatsApp</p>
              <p className={styles.infoVal}>
                Landline: <a href="tel:+97165586870" className={styles.link}>+971 6 5586870</a><br />
                Mobile: <a href="tel:+971525331575" className={styles.link}>+971 52 5331575</a><br />
                WhatsApp: <a href="https://wa.me/971557544582" target="_blank" rel="noopener noreferrer" className={styles.link}>+971 55 7544582</a>
              </p>
            </div>
          </div>

          {/* Email Addresses */}
          <div className={styles.infoItem} id="contact-email">
            <span className={styles.infoIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </span>
            <div>
              <p className={styles.infoLabel}>Email Addresses</p>
              <p className={styles.infoVal}>
                Official: <a href="mailto:info@aladhwastudio.com" className={styles.link}>info@aladhwastudio.com</a><br />
                General: <a href="mailto:studios.sfk@gmail.com" className={styles.link}>studios.sfk@gmail.com</a>
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className={styles.infoItem} id="contact-socials">
            <span className={styles.infoIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </span>
            <div>
              <p className={styles.infoLabel}>Social &amp; Professional Links</p>
              <p className={styles.infoVal}>
                Instagram: <a href="https://instagram.com/al.adhwa.studio" target="_blank" rel="noopener noreferrer" className={styles.link}>@al.adhwa.studio</a><br />
                Facebook: <a href="https://www.facebook.com/profile.php?id=61552814975664" target="_blank" rel="noopener noreferrer" className={styles.link}>AL ADHWA Studio Facebook</a><br />
                LinkedIn: <a href="http://www.linkedin.com/in/aladhwastudio" target="_blank" rel="noopener noreferrer" className={styles.link}>linkedin.com/in/aladhwastudio</a><br />
                YouTube: <a href="https://www.youtube.com/@aladhwastudio8" target="_blank" rel="noopener noreferrer" className={styles.link}>youtube.com/@aladhwastudio8</a>
              </p>
            </div>
          </div>
        </div>

        {/* Form Right */}
        <div className={styles.formWrap} id="contact-form-wrap">
          {sent ? (
            <div className={styles.success} id="contact-success">
              <span className={styles.successIcon}>✓</span>
              <h3>Message Sent!</h3>
              <p>Thank you for reaching AL ADHWA Studio. We will contact you shortly.</p>
              <button className="btn-outline" onClick={() => setSent(false)} style={{ marginTop: '1.5rem', fontSize: '0.6rem' }}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form className={styles.form} id="contact-form" onSubmit={handle} noValidate>
              <h3 className={styles.formTitle}>Book a Session or Request Quote</h3>
              <div className={styles.row}>
                <div className={styles.group}>
                  <label htmlFor="cf-name" className={styles.label}>Full Name</label>
                  <input id="cf-name" type="text" className={styles.input} placeholder="Your Full Name"
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className={styles.group}>
                  <label htmlFor="cf-email" className={styles.label}>Email Address</label>
                  <input id="cf-email" type="email" className={styles.input} placeholder="your@email.com"
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                </div>
              </div>
              <div className={styles.group}>
                <label htmlFor="cf-service" className={styles.label}>Select Category / Service</label>
                <select id="cf-service" className={styles.input}
                  value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                  <option value="">Select Service Required...</option>
                  <option value="studio">Indoor Studio (Passport, ID, Headshots, Frames)</option>
                  <option value="printing">Gift &amp; Custom Printing (Mugs, T-Shirts, Pillows)</option>
                  <option value="outdoor-photo">Outdoor Photography (Portraits, Travel, Commercial)</option>
                  <option value="outdoor-video">Outdoor Videography (Events, Commercial, Reels)</option>
                  <option value="teleprompter">Teleprompter Services (Camera, Presidential, Floor Rigs)</option>
                  <option value="docs">CV Typing, Lamination, Scanning, Photocopy</option>
                </select>
              </div>
              <div className={styles.group}>
                <label htmlFor="cf-message" className={styles.label}>Requirements &amp; Details</label>
                <textarea id="cf-message" className={`${styles.input} ${styles.textarea}`} rows={5}
                  placeholder="Tell us about your event, photo shoot, teleprompter, or printing requirements..."
                  value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              </div>
              <button type="submit" className={`btn-terracotta ${styles.submit}`} id="cf-submit">
                Submit Inquiry
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ── GOOGLE MAPS EMBED ─────────────────────── */}
      <div className={`container ${styles.mapContainer}`}>
        <div className={styles.mapHeader}>
          <span className={styles.mapLabel}>Find Our Studio Location</span>
          <h3 className={styles.mapTitle}>VISIT AL ADHWA STUDIO IN SHARJAH</h3>
        </div>
        <div className={styles.mapFrameWrap}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.0603996692867!2d55.44267269999999!3d25.3021747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5ee0bf4e04c7%3A0x30830dcec56f0dad!2sAL%20ADHWA%20STUDIO!5e0!3m2!1sen!2sin!4v1785221431974!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="AL ADHWA STUDIO Location Map"
          />
        </div>
      </div>
    </section>
  );
}
