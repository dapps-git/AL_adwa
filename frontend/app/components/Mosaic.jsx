import Image from 'next/image';
import styles from './Mosaic.module.css';

export default function Mosaic() {
  return (
    <section className={styles.mosaicSection} id="gallery">
      <div className={styles.mosaicGrid} id="gallery-mosaic">
        {/* Cell 1 */}
        <div className={styles.cell} id="mosaic-cell-1">
          <Image src="/img/studio.webp" alt="Indoor Studio Photography" fill sizes="33vw" />
          <div className={styles.overlay}><span>Indoor Photography</span></div>
        </div>

        {/* Text Card Center */}
        <div className={`${styles.cell} ${styles.textCell}`} id="mosaic-text-card">
          <span className={styles.textItalic}>our work</span>
          <h3 className={styles.textHeading}>AL ADHWA MEDIA</h3>
          <div className="rule center" />
          <span className={styles.textSub}>PHOTOGRAPHY · VIDEOGRAPHY<br />TELEPROMPTER · PRINTING</span>
          <a href="#contact" className="btn btn-outline" id="mosaic-cta" style={{ marginTop: '1.5rem', fontSize: '0.58rem', letterSpacing: '0.18em' }}>
            Book Studio
          </a>
        </div>

        {/* Cell 2 */}
        <div className={styles.cell} id="mosaic-cell-2">
          <Image src="/img/photogrphy.webp" alt="Outdoor Photography" fill sizes="33vw" />
          <div className={styles.overlay}><span>Outdoor Photography</span></div>
        </div>

        {/* Cell 3 */}
        <div className={styles.cell} id="mosaic-cell-3">
          <Image src="/img/photostudio.webp" alt="Videography Production" fill sizes="33vw" />
          <div className={styles.overlay}><span>Videography</span></div>
        </div>

        {/* Feature Card */}
        <div className={`${styles.cell} ${styles.featureCell}`} id="mosaic-feature-card">
          <span className={styles.textItalic}>established 2014</span>
          <h3 className={styles.textHeading}>MIDDLE EAST MEDIA</h3>
          <div className="rule center" />
          <span className={styles.textSub}>NATIONAL &amp; INTERNATIONAL<br />BRANDS IN UAE</span>
        </div>

        {/* Cell 4 */}
        <div className={styles.cell} id="mosaic-cell-4">
          <Image src="/img/teleprompt.webp" alt="Teleprompter Rigs" fill sizes="33vw" />
          <div className={styles.overlay}><span>Teleprompter Rigs</span></div>
        </div>
      </div>
    </section>
  );
}
