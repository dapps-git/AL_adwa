'use client';
import { useState } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './page.module.css';

const archCards = [
  { img: '/img/studio.webp', label: 'State-of-the-Art Studio' },
  { img: '/img/photogrphy.webp', label: 'Outdoor Location Shoots' },
  { img: '/img/teleprompt.webp', label: 'Broadcast Teleprompters' },
  { img: '/img/photostudio.webp', label: 'Personalized Custom Prints' },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.email && form.name) setSent(true);
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* ── 1. HERO SECTION WITH STUDIO BACKGROUND IMAGE ────── */}
        <section className={styles.hero}>
          <div className={styles.heroBg}>
            <Image src="/img/studio.webp" alt="AL ADHWA Studio" fill sizes="100vw" priority />
            <div className={styles.heroOverlay} />
          </div>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Contact Us</h1>
              <p className={styles.heroSub}>
                Ready to start your next creative vision? We'd love to hear from you
              </p>
              <a href="#form-section" className={styles.heroBtn}>
                Book Your Slot Now ↗
              </a>
            </div>
          </div>
        </section>

        {/* ── 2. GET IN TOUCH + FORM SECTION ──────────────────── */}
        <section className={styles.contactSection} id="form-section">
          <div className={`container ${styles.grid}`}>
            {/* LEFT — Info */}
            <div className={styles.infoCol}>
              <span className={styles.eyebrow}>Get in Touch</span>
              <h2 className={styles.sectionTitle}>Contact Us</h2>
              <p className={styles.desc}>
                Since 2014, AL ADHWA Studio has been bringing ideas to life across the UAE — providing premier photography, videography, broadcast teleprompter services, custom gift printing, and document support.
              </p>

              <div className={styles.infoBlock}>
                <h4 className={styles.blockLabel}>STUDIO ADDRESS</h4>
                <p className={styles.blockVal}>
                  AL ADHWA STUDIO, P.O BOX: 95161<br />
                  Muwailah, Sharjah, United Arab Emirates
                </p>
              </div>

              <div className={styles.infoBlock}>
                <h4 className={styles.blockLabel}>OPERATING HOURS</h4>
                <p className={styles.blockVal}>Saturday – Thursday: 9:00am to 10:00pm</p>
              </div>

              <div className={styles.infoBlock}>
                <h4 className={styles.blockLabel}>PHONE &amp; WHATSAPP</h4>
                <p className={styles.blockVal}>
                  Landline: <a href="tel:+97165586870" className={styles.link}>+971 6 5586870</a><br />
                  Mobile: <a href="tel:+971525331575" className={styles.link}>+971 52 5331575</a><br />
                  WhatsApp: <a href="https://wa.me/971557544582" target="_blank" rel="noopener noreferrer" className={styles.link}>+971 55 7544582</a>
                </p>
              </div>

              <div className={styles.infoBlock}>
                <h4 className={styles.blockLabel}>EMAIL ADDRESSES</h4>
                <p className={styles.blockVal}>
                  Official: <a href="mailto:info@aladhwastudio.com" className={styles.link}>info@aladhwastudio.com</a><br />
                  General: <a href="mailto:studios.sfk@gmail.com" className={styles.link}>studios.sfk@gmail.com</a>
                </p>
              </div>

              <div className={styles.socialRow}>
                <a href="https://instagram.com/al.adhwa.studio" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📷</a>
                <a href="https://www.facebook.com/profile.php?id=61552814975664" target="_blank" rel="noopener noreferrer" aria-label="Facebook">f</a>
                <a href="http://www.linkedin.com/in/aladhwastudio" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
                <a href="https://www.youtube.com/@aladhwastudio8" target="_blank" rel="noopener noreferrer" aria-label="YouTube">▶</a>
              </div>
            </div>

            {/* RIGHT — White Form Card */}
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Chat with us or Fill out the form</h3>
              {sent ? (
                <div className={styles.success}>
                  <span>✓</span>
                  <h4>Message Sent Successfully!</h4>
                  <p>Thank you for reaching out to AL ADHWA Studio. We will get back to you shortly.</p>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.group}>
                    <input
                      type="text"
                      placeholder="Name"
                      className={styles.input}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className={styles.group}>
                    <input
                      type="email"
                      placeholder="Email"
                      className={styles.input}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className={styles.group}>
                    <textarea
                      placeholder="Message"
                      rows={5}
                      className={styles.input}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                    />
                  </div>
                  <button type="submit" className={styles.submitBtn}>
                    Submit
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── 3. 4 ARCH FEATURE CARDS GRID ───────────────────── */}
        <section className={styles.archSection}>
          <div className={`container ${styles.archGrid}`}>
            {archCards.map((card, i) => (
              <div key={i} className={styles.archCard}>
                <Image src={card.img} alt={card.label} fill sizes="(max-width:768px) 50vw, 25vw" />
                <div className={styles.archOverlay}>
                  <span>{card.label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. MAP SECTION WITH ARCHED FRAME & OVERLAY ──────── */}
        <section className={styles.mapSection}>
          <div className="container">
            <div className={styles.mapWrap}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.0603996692867!2d55.44267269999999!3d25.3021747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5ee0bf4e04c7%3A0x30830dcec56f0dad!2sAL%20ADHWA%20STUDIO!5e0!3m2!1sen!2sin!4v1785221431974!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="AL ADHWA STUDIO Location Map"
              />
              <div className={styles.mapBadge}>
                <span>Location ↗</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
