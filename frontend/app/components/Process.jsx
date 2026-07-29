import Image from 'next/image';
import styles from './Process.module.css';

// 3-step process section — matching "Step 1 / 2 / 3" row in the reference
const steps = [
  {
    id: 'step-1',
    num: 'Step 1',
    img: '/img1.webp',
    title: 'BOOK YOUR SESSION',
    desc: 'Contact us to pick your service and schedule a convenient time slot.',
  },
  {
    id: 'step-2',
    num: 'Step 2',
    img: '/img2.webp',
    title: 'WE CREATE THE MAGIC',
    desc: 'Visit our studio and let our professionals capture your best moments.',
  },
  {
    id: 'step-3',
    num: 'Step 3',
    img: '/img3.webp',
    title: 'TAKE HOME YOUR GIFT',
    desc: 'Leave with stunning prints, canvases, personalised gifts, or your final photos.',
  },
];

export default function Process() {
  return (
    <section className={styles.process} id="about">
      <div className={`container ${styles.stepsRow}`} id="steps-row">
        {steps.map((s, i) => (
          <div className={styles.step} key={s.id} id={s.id}>
            <div className={styles.imgBox}>
              <Image src={s.img} alt={s.title} fill sizes="(max-width:768px) 80vw, 30vw" />
            </div>
            <div className={styles.stepBody}>
              <span className={styles.stepNum}>{s.num}</span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Centered text block below steps */}
      <div className={styles.bottom}>
        <p className={styles.bottomItalic}>The art of gifting a beautifully crafted memory</p>
        <div className="rule center" />
        <p className={styles.bottomCopy}>
          Come in and see the studio for yourself. Step inside and experience our hand-crafted<br />
          and wonderfully curated photography, printing &amp; personalised gift creations.
        </p>
      </div>
    </section>
  );
}
