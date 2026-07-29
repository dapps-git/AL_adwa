import Image from 'next/image';
import styles from './WhyUs.module.css';

const reasons = [
  { icon: '🏆', title: 'Single-Point Media Resource', desc: 'From passport photos to broadcast teleprompters — one studio covers all your media needs in UAE.' },
  { icon: '🎯', title: 'Safe & Organised', desc: 'Well-planned trips, transport and support — every detail managed so you focus on your vision.' },
  { icon: '🌟', title: 'Unique Destinations', desc: 'We know famous spots with hidden gems — our locations reflect personality and story.' },
  { icon: '📸', title: 'Memory-Filled Experiences', desc: 'Road trips, group shoots, outdoor games, local food and late-night creations. Real moments.' },
];

const showcaseImages = [
  { src: '/img/studio.webp', label: 'Indoor Studio' },
  { src: '/img/photogrphy.webp', label: 'Outdoor Photography' },
  { src: '/img/teleprompt.webp', label: 'Teleprompter' },
  { src: '/img/photostudio.webp', label: 'Videography' },
];

export default function WhyUs() {
  return (
    <section className={`${styles.section} section`} id="why-us">
      <div className="container">
        <div className={styles.grid}>
          {/* LEFT — Text + Reasons */}
          <div className={styles.leftCol}>
            <div className="eyebrow-pill"><span className="dot" />Why Choose Us</div>
            <h2 className={`heading-display ${styles.title}`}>
              Why Choose <span className="serif">AL ADHWA?</span>
            </h2>
            <p className="subtext">
              At AL ADHWA, we believe the best part of media isn't just the place — it's the people you meet along the way and the stories that get created.
            </p>

            <ul className={styles.reasonsList}>
              {reasons.map((r, i) => (
                <li key={i} className={styles.reasonItem}>
                  <span className={styles.rIcon}>{r.icon}</span>
                  <div>
                    <h4 className={styles.rTitle}>{r.title}</h4>
                    <p className={styles.rDesc}>{r.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — Photo Mosaic */}
          <div className={styles.rightCol}>
            <div className={styles.mosaic}>
              {showcaseImages.map((img, i) => (
                <div key={i} className={`${styles.mosaicCell} ${i === 0 ? styles.cellTall : ''}`}>
                  <Image src={img.src} alt={img.label} fill sizes="(max-width:768px) 50vw, 25vw" />
                  <span className={styles.mosaicTag}>{img.label}</span>
                </div>
              ))}
            </div>

            {/* Caption */}
            <p className={styles.caption}>
              Captured Memories — Capture your AL ADHWA Studio Journey Forever
            </p>
            <p className={styles.captionSub}>
              Don't wait for the perfect media project. Your next story is waiting for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
