import Image from 'next/image';
import styles from './OutdoorVideo.module.css';

const videoCategories = [
  {
    cat: 'Commercial & Corporate',
    desc: 'Commercials (TV or online ads promoting products & services), Corporate videos (Internal communications, training guides, company overviews), and Real estate (Property tours and walkthrough showcases for buyers).',
    bullets: ['TV & Online Commercials', 'Corporate Videos & Training', 'Real Estate Property Tours'],
    img: '/img/photostudio.webp',
  },
  {
    cat: 'Events & Personal',
    desc: 'Weddings (Ceremonies, receptions, and highlight reels), Live events (Concerts, conferences, and sports highlights), and Parties/Milestones (Birthdays, graduations, and family celebrations).',
    bullets: ['Weddings & Highlight Reels', 'Concerts & Conferences', 'Parties & Milestones'],
    img: '/img/3.webp',
  },
  {
    cat: 'Creative & Digital',
    desc: 'Documentaries (Real-world stories, interviews, and investigative features), Social Media (Short-form vertical clips, TikToks, and reels), and Music Videos (Artistic visual accompaniments for songs).',
    bullets: ['Documentaries & Features', 'TikToks, Shorts & Instagram Reels', 'Artistic Music Videos'],
    img: '/img/promptclients.webp',
  },
];

export default function OutdoorVideo() {
  return (
    <section className={styles.section} id="outdoor-video">
      <div className="container">
        <div className={styles.header}>
          <span className="eyebrow">Category 03</span>
          <h2 className="section-title">OUTDOOR VIDEOGRAPHY</h2>
          <div className="rule center" />
          <p className={styles.desc}>
            Commercial, event, and documentary video production covering corporate promotions, personal milestones, and creative storytelling.
          </p>
        </div>

        <div className={styles.grid}>
          {videoCategories.map((item, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.imgWrap}>
                <Image src={item.img} alt={item.cat} fill sizes="(max-width:768px) 100vw, 33vw" />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.catTitle}>{item.cat}</h3>
                <p className={styles.descText}>{item.desc}</p>
                <div className={styles.bulletBox}>
                  {item.bullets.map((b, i) => (
                    <span key={i} className={styles.bullet}>▶ {b}</span>
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
