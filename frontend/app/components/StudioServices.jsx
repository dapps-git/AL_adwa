import Image from 'next/image';
import styles from './StudioServices.module.css';

const studioServices = [
  {
    id: 'studio-product',
    title: 'PRODUCT SHOOT',
    img: '/img/photo.png',
    desc: 'Professional photography services to showcase your products in the best light. From e-commerce to promotional materials, we ensure every detail is captured for all platforms.',
  },
  {
    id: 'studio-headshots',
    title: 'CORPORATE HEADSHOTS',
    img: '/img/data.png',
    desc: 'Professional headshot photography tailored to your business needs for LinkedIn, company websites, and marketing materials. Polished, high-quality, and matching your brand.',
  },
  {
    id: 'studio-family',
    title: 'FAMILY PHOTO SHOOT',
    img: '/img/photo.webp',
    desc: 'Studio sessions capturing beautiful, timeless family moments. Custom packages available with premium prints and framing options to preserve memories forever.',
  },
  {
    id: 'studio-passport',
    title: 'PASSPORT & EMIRATES ID PHOTOS',
    img: '/img/imageq.webp',
    desc: 'High-quality, professionally sized passport & visa photos meeting official requirements for all countries. Fast, reliable service for Emirates ID and visas.',
  },
  {
    id: 'studio-frames',
    title: 'CUSTOM PHOTO FRAMES',
    img: '/img/1.webp',
    desc: 'Wide selection of readymade & custom frames (4x6 to 24x100 inches, Acrylic, Wood Lamination, White, Black, Gold, Brown) to complement your photos.',
  },
  {
    id: 'studio-mugs',
    title: 'MUG PRINTING & MAGIC MUGS',
    img: '/img/gift.webp',
    desc: 'Custom printing on high-quality ceramic mugs & heat-sensitive color changing magic mugs for personal, corporate gifting & promotional branding.',
  },
  {
    id: 'studio-tshirts',
    title: 'T-SHIRT PRINTING',
    img: '/img/image.webp',
    desc: 'Custom-designed t-shirts reflecting your business branding & style for corporate events, promotional campaigns, or employee uniforms.',
  },
  {
    id: 'studio-pillows',
    title: 'PILLOW & GIFT PRINTING',
    img: '/img/image3.webp',
    desc: 'Custom designs printed on high-quality fabric pillows, key chains, and custom photo gifts with vibrant, long-lasting colors.',
  },
  {
    id: 'studio-docs',
    title: 'DOCUMENT SERVICES & CV TYPING',
    img: '/img/images.webp',
    desc: 'Crafting polished CV/Resumes, company seal printing, high-clarity document photocopying, document scanning, and document lamination.',
  },
];

export default function StudioServices() {
  return (
    <section className={styles.section} id="studio-services">
      <div className="container">
        <div className={styles.header}>
          <span className="eyebrow">Category 01</span>
          <h2 className="section-title">STUDIO SERVICES &amp; PRINTING</h2>
          <div className="rule center" />
          <p className={styles.desc}>
            Indoor photography, biometric document photos, personalized print gifts, photo frames, and document services.
          </p>
        </div>

        <div className={styles.grid}>
          {studioServices.map((svc) => (
            <div key={svc.id} className={styles.card} id={svc.id}>
              <div className={styles.imgWrap}>
                <Image src={svc.img} alt={svc.title} fill sizes="(max-width:768px) 100vw, 33vw" />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.title}>{svc.title}</h3>
                <p className={styles.cardDesc}>{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Full checklist tag cloud */}
        <div className={styles.checklist}>
          <h4 className={styles.checkTitle}>ALL INDOOR STUDIO SERVICES:</h4>
          <div className={styles.tags}>
            {[
              'EMIRATES ID PHOTO', 'PASSPORT PHOTO', 'FAMILY PHOTO', 'PRODUCT SHOOT',
              'CORPORATE HEADSHOTS', 'PHOTO PRINTING', 'MUG PRINTING', 'MAGIC MUGS',
              'T-SHIRT PRINTING', 'PILLOW PRINTING', 'KEY CHAIN PRINTING', 'PHOTO FRAMES',
              'BUSINESS CARD PRINTING', 'CV/RESUME TYPING', 'COMPANY SEAL PRINTING',
              'DOCUMENT SCANNING', 'DOCUMENT LAMINATION', 'PHOTOCOPY/XEROX'
            ].map(item => (
              <span key={item} className={styles.tag}>✓ {item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
