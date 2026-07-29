import Image from 'next/image';
import styles from './About.module.css';

const highlights = [
  'Photography, Videography & Teleprompter leadership in UAE',
  'Corporate films, TV commercials & Television software production',
  'National & International brands — achieved across the Middle East',
  'State-of-the-art facilities & cutting-edge media technology',
];

export default function About() {
  return (
    <section className={`${styles.about} section`} id="about">
      <div className="container">
        {/* Top label */}
        <div className={styles.topLabel}>
          <div className="eyebrow-pill"><span className="dot" />About Us</div>
          <span className={styles.counter}>01 — 04</span>
        </div>

        <div className={styles.grid}>
          {/* LEFT — main hero image */}
          <div className={styles.imgStack}>
            <div className={styles.mainImgWrap}>
              <Image
                src="/img/image1.webp"
                alt="AL ADHWA Studio Facility"
                fill
                sizes="(max-width:768px) 100vw, 45vw"
              />
            </div>
            {/* Overlay card */}
            <div className={styles.overlayCard}>
              <div className={styles.overlayImgWrap}>
                <Image src="/img/image.webp" alt="Studio printing" fill sizes="120px" unoptimized />
              </div>
              <div>
                <span className={styles.overlayNum}>10+</span>
                <p className={styles.overlayLabel}>Years in the UAE Media Industry</p>
              </div>
            </div>
            {/* Location pill */}
            <div className={styles.locationPill}>
              <span>📍</span>
              <span>Muwailah, Sharjah, UAE</span>
            </div>
          </div>

          {/* RIGHT — Text content */}
          <div className={styles.content}>
            <h2 className={`heading-display ${styles.title}`}>
              Making <span className="serif">Memories</span><br />
              Around the World.<br />
              Together.
            </h2>
            <p className={styles.lead}>
              Al Adhwa Studio is one of the leading Photography, Videography and Teleprompter Services in the UAE — founded in 2014 with a wide armory of state-of-the-art facilities and cutting-edge technology.
            </p>
            <p className={styles.body}>
              Right from single sales events to major corporate events, we cover all the essentials in the world of media: corporate films, TV commercials, Television software production, and Documentaries — making Al Adhwa the single-point resource pool for the media and photography industry across the Middle East.
            </p>

            <ul className={styles.highlights}>
              {highlights.map((h, i) => (
                <li key={i} className={styles.hItem}>
                  <span className={styles.hDot}>✦</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className={styles.contactBar}>
              <div className={styles.contactItem}>
                <span className={styles.cLabel}>Official Email</span>
                <a href="mailto:info@aladhwastudio.com" className={styles.cVal}>info@aladhwastudio.com</a>
              </div>
              <div className={styles.divider} />
              <div className={styles.contactItem}>
                <span className={styles.cLabel}>Studio Address</span>
                <span className={styles.cVal}>P.O Box 95161, Muwailah, Sharjah</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission strip */}
        <div className={styles.missionStrip}>
          <p className={styles.missionText}>
            <span className="serif">"We're not just a studio.</span><br />
            We're memory makers. Connection builders. Story starters."
          </p>
          <a href="#categories" className="btn-primary">Join Our Next Project</a>
        </div>
      </div>
    </section>
  );
}
