import Image from 'next/image';
import styles from './Services.module.css';

const services = [
  {
    id: 'svc-photography',
    img: '/img1.webp',
    title: 'Photography & Videography',
    desc: 'Professional studio photography, portraits, events, and cinematic videography. Passport, visa & Emirates ID photos.',
  },
  {
    id: 'svc-printing',
    img: '/img2.webp',
    title: 'Printing & Scanning',
    desc: 'High-quality document printing, photocopying, and professional document scanning. Fast & reliable.',
  },
  {
    id: 'svc-gifts',
    img: '/img3.webp',
    title: 'Gifts & Canvas',
    desc: 'Custom gift printing on mugs, T-shirts, pillows & caps. Canvas prints, custom photo frames & personalised photo gifts.',
  },
];

export default function Services() {
  return (
    <section className={styles.services} id="services">
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className="eyebrow">What We Offer</span>
          <h2 className={`section-title ${styles.heading}`}>HOW CAN WE SERVE YOU?</h2>
          <div className="rule center" />
        </div>

        {/* 3 service image cards */}
        <div className={styles.grid} id="services-grid">
          {services.map((s) => (
            <div key={s.id} className={styles.card} id={s.id}>
              <div className={styles.imgWrap}>
                <Image src={s.img} alt={s.title} fill sizes="(max-width:768px) 90vw, 33vw" />
                <div className={styles.imgOverlay} />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <div className={styles.cardRule} />
                <p className={styles.cardDesc}>{s.desc}</p>
                <a href="#contact" className={`btn ${styles.cardBtn}`}>Enquire Now</a>
              </div>
            </div>
          ))}
        </div>

        {/* Services list pills */}
        <div className={styles.pills} id="services-pills">
          {[
            'Photography', 'Videography', 'Passport Photos', 'Visa Photos',
            'Emirates ID Photos', 'Photocopying', 'Printing', 'Document Scanning',
            'Gift Printing', 'Canvas Printing', 'Custom Photo Frames', 'Photo Gifts'
          ].map(p => (
            <span key={p} className={styles.pill}>{p}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
