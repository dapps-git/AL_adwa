import Image from 'next/image';
import styles from './Teleprompter.module.css';

const teleprompterTypes = [
  {
    type: 'Camera-Mounted Teleprompters',
    img: '/img/tele.webp',
    details: [
      { name: 'Studio Rigs', desc: 'Large units attached to heavy broadcast cameras in TV studios.' },
      { name: 'DSLR / Mirrorless Prompters', desc: 'Smaller, portable glass-and-hood systems built for content creators and field videographers.' },
      { name: 'Mobile / Tablet Mounts', desc: 'Lightweight frames that use a smartphone or small tablet as the text display.' },
    ],
  },
  {
    type: 'Presidential (Podium) Teleprompters',
    img: '/img/teleprompter_podium.webp',
    details: [
      { name: 'Stand-alone Glass Panels', desc: 'Tall, transparent glass pieces placed on either side of a lectern for public speeches.' },
      { name: 'Concealed Floor Displays', desc: 'Monitors hidden at ground level reflect text upward onto glass so speakers look outward at crowds.' },
    ],
  },
  {
    type: 'Floor & Specialized Monitors',
    img: '/img/floor.webp',
    details: [
      { name: 'Floor / Confidence Monitors', desc: 'Angled screens placed on stage floors so performers or speakers can glance down for cues.' },
      { name: 'Smart Eyewear Prompters', desc: 'Modern transparent smart glasses projecting scrolling text directly into the field of vision.' },
    ],
  },
];

export default function Teleprompter() {
  return (
    <section className={styles.section} id="teleprompter">
      <div className="container">
        <div className={styles.header}>
          <span className="eyebrow">Category 04</span>
          <h2 className="section-title">TELEPROMPTER SERVICES</h2>
          <div className="rule center" />
          <p className={styles.desc}>
            Cutting-edge teleprompter equipment and operator services across UAE for broadcast studios, live events, presidential speeches, and video shoots.
          </p>
        </div>

        <div className={styles.grid}>
          {teleprompterTypes.map((item, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.imgWrap}>
                <Image src={item.img} alt={item.type} fill sizes="(max-width:768px) 100vw, 33vw" />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.typeTitle}>{item.type}</h3>
                <div className={styles.list}>
                  {item.details.map((d, i) => (
                    <div key={i} className={styles.item}>
                      <span className={styles.itemName}>• {d.name}</span>
                      <p className={styles.itemDesc}>{d.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
