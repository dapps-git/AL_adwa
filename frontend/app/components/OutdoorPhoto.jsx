import Image from 'next/image';
import styles from './OutdoorPhoto.module.css';

const subgenres = [
  {
    title: 'Portrait & Event Photography',
    subtitle: 'Human Subjects & Milestones',
    desc: 'Focuses on human subjects. Styles include weddings, fashion shoots, street candid photography, corporate events, and sports coverage.',
    items: ['Weddings & Ceremonies', 'Fashion Shoots', 'Street Candid', 'Sports Coverage'],
    img: '/img/photogrphy.webp',
  },
  {
    title: 'Nature & Travel Photography',
    subtitle: 'Outdoors & Aerial Shots',
    desc: 'Captures the great outdoors. Sub-genres include wildlife, astrophotography, macro (extreme close-ups of small subjects), and aerial/drone shots.',
    items: ['Wildlife & Landscapes', 'Astrophotography', 'Macro Detail Photography', 'Aerial / Drone Shots'],
    img: '/img/1.webp',
  },
  {
    title: 'Commercial & Object Photography',
    subtitle: 'Marketing & Architecture',
    desc: 'Designed to market items, commercial spaces, or places. This covers architectural, real estate walkthroughs, food, and still-life photography.',
    items: ['Architectural Photography', 'Real Estate Walkthroughs', 'Food & Cuisine Photography', 'Still-Life Product Photography'],
    img: '/img/2.webp',
  },
];

export default function OutdoorPhoto() {
  return (
    <section className={styles.section} id="outdoor-photo">
      <div className="container">
        <div className={styles.header}>
          <span className="eyebrow">Category 02</span>
          <h2 className="section-title">OUTDOOR PHOTOGRAPHY</h2>
          <div className="rule center" />
          <p className={styles.desc}>
            Professional outdoor photography capturing portraits, events, nature, architectural spaces, and commercial branding.
          </p>
        </div>

        <div className={styles.grid}>
          {subgenres.map((item, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.imgWrap}>
                <Image src={item.img} alt={item.title} fill sizes="(max-width:768px) 100vw, 33vw" />
              </div>
              <div className={styles.cardBody}>
                <span className={styles.subtitle}>{item.subtitle}</span>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
                <div className={styles.itemList}>
                  {item.items.map((it, i) => (
                    <span key={i} className={styles.itemBullet}>• {it}</span>
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
