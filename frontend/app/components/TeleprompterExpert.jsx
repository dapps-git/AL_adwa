'use client';
import Image from 'next/image';
import styles from './TeleprompterExpert.module.css';

export default function TeleprompterExpert() {
  return (
    <section className={`${styles.section} section`} id="teleprompter-expert">
      <div className="container">
        <div className={styles.grid}>
          {/* LEFT: Image */}
          <div className={styles.imgCol}>
            <div className={styles.imgWrap}>
              <Image
                src="/img/teleprompt.webp"
                alt="Najeeb Abdul Noor - Teleprompter Expert"
                fill
                sizes="(max-width:768px) 100vw, 45vw"
                unoptimized
                style={{ objectFit: 'cover' }}
              />
              <div className={styles.badge}>13+ YEARS IN UAE</div>
            </div>
          </div>

          {/* RIGHT: Detailed Bio & Tech Info — Clean Paragraphs, No Separate Boxes */}
          <div className={styles.textCol}>
            <span className={styles.eyebrowTag}>Autocue &amp; Teleprompter Specialist</span>
            <h2 className={styles.expertName}>
              NAJEEB ABDUL NOOR
            </h2>
            <p className={styles.subtitle}>Leading Dubai Autocue Teleprompter Expert &amp; Technical Operator</p>

            <div className={styles.dividerLine} />

            <p className={styles.descParagraph}>
              With over 13 years of experience in the UAE, <strong>Najeeb Abdul Noor</strong> has built a reputation as the leading Dubai Autocue Teleprompter Expert. Specializing in both Autocue setups and complex multi-teleprompter systems, Najeeb is a trusted partner for TV commercials, high-profile social media campaigns, and large-scale international speaker events like <strong>COP28</strong>.
            </p>

            <div className={styles.paragraphBlock}>
              <h4 className={styles.blockTitle}>Presidential Podium Prompters</h4>
              <p className={styles.blockText}>
                Two reflective glass panels on custom stands — ideal for Presidents, CEOs, keynote speakers, shareholder meetings &amp; global summits.
              </p>
            </div>

            <div className={styles.paragraphBlock}>
              <h4 className={styles.blockTitle}>On-Camera Autocue Rigs</h4>
              <p className={styles.blockText}>
                Direct line-of-sight glass in front of the camera lens so presenters maintain natural eye contact without memorization anxiety.
              </p>
            </div>

            <div className={styles.paragraphBlock}>
              <h4 className={styles.blockTitle}>Integrated Photo &amp; Videography Teams</h4>
              <p className={styles.blockText}>
                Beyond teleprompting services, Najeeb provides comprehensive support through dedicated photo &amp; videography teams, ensuring seamless integration between live presentations and full production coverage across Dubai and the UAE.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
