'use client';
import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from './page.module.css';

// ── STATIC CATEGORY METADATA ──────────────────────────
const CATEGORIES = {
  'studio-services': {
    num: '01',
    heroTitle: 'STUDIO SERVICES',
    title: 'Studio Services & Printing',
    sub: 'Indoor Photography & Custom Printed Gifts',
    img: '/img/studio.webp',
    intro: 'Al Adhwa Studio provides high quality indoor photography sessions, document photos meeting official government standards, custom printed gifts, framing, photocopying, document lamination, scanning, and full office document support from our Muwailah, Sharjah studio.',
    services: [
      { title: 'PRODUCT SHOOT', img: '/img/photo.png', desc: 'Professional photography services to showcase your products in the best light. From e-commerce to promotional materials, every detail is captured. Customizable packages available.' },
      { title: 'CORPORATE HEADSHOTS', img: '/img/data.png', desc: 'Professional headshot photography for LinkedIn, company websites, or marketing materials. Polished, high-quality results that make a great first impression in various styles and settings.' },
      { title: 'FAMILY PHOTO SHOOT', img: '/img/photo.webp', desc: 'Studio sessions capturing beautiful, timeless moments with your loved ones. Custom packages with prints and framing options to preserve your memories forever.' },
      { title: 'PASSPORT & EMIRATES ID PHOTOS', img: '/img/imageq.webp', desc: 'High-quality, professionally sized passport photos meeting all official requirements. We provide all countries passport and visa size photos. Fast, reliable service ready immediately.' },
      { title: 'PHOTO FRAMES', img: '/img/1.webp', desc: 'Readymade and custom frames: 4x6, 5x7, 6x8, 8x10, A4, A3, A2, A1, 8X12, 12x16 up to 24x100 inches. Acrylic Frame, Wood Lamination in White, Black, Gold, Brown.' },
      { title: 'MUG PRINTING & MAGIC MUGS', img: '/img/gift.webp', desc: 'Custom printing on high-quality ceramic mugs with vibrant colors. Heat-sensitive magic mugs change color when hot liquid is poured in — ideal for personal & corporate gifting.' },
      { title: 'T-SHIRT PRINTING', img: '/img/image.webp', desc: 'Custom-designed t-shirts for corporate events, promotional campaigns, or employee uniforms. Sharp, vibrant, long-lasting prints that communicate your brand effectively.' },
      { title: 'PILLOW PRINTING', img: '/img/image3.webp', desc: 'Designs printed on high-quality fabric pillows with vibrant, long-lasting colors for promotional purposes, corporate gifts, or home decor.' },
      { title: 'CV / RESUME MAKING', img: '/img/images.webp', desc: 'Professional and polished CVs crafted to align with your career goals. From design to content, clear, impactful, and perfectly formatted to make a lasting impression.' },
      { title: 'DOCUMENT SERVICES', img: '/img/images.webp', desc: 'Photocopy/Xerox, Document Scanning, Document Lamination, Company Seal Printing, Business Card Printing, and Key Chain Printing all available at one location.' },
    ],
    checklist: ['EMIRATES ID PHOTO','PASSPORT PHOTO','FAMILY PHOTO','PHOTO PRINTING','MUG PRINTING','MAGIC MUGS','T-SHIRT PRINTING','PILLOW PRINTING','KEY CHAIN PRINTING','PHOTO FRAMES','BUSINESS CARD PRINTING','CV/RESUME TYPING','COMPANY SEAL PRINTING','DOCUMENT SCANNING','DOCUMENT LAMINATION','PHOTOCOPY/XEROX'],
  },
  'outdoor-photography': {
    num: '02',
    heroTitle: 'PHOTOGRAPHY',
    title: 'Outdoor Photography',
    sub: 'Portrait, Travel, Architecture & Commercial',
    img: '/img/outdoor.webp',
    intro: 'Capturing moments outdoors with state-of-the-art gear and expert lighting. Al Adhwa Studio covers human subjects, outdoor nature, architectural structures, and commercial objects across the UAE.',
    services: [
      { title: 'PORTRAIT & EVENT', img: '/img/photogrphy.webp', desc: 'Focuses on human subjects — weddings, fashion shoots, street candid photography, and sports events.', items: ['Weddings & Ceremonies', 'Fashion Shoots', 'Street Candid', 'Sports Coverage'] },
      { title: 'NATURE & TRAVEL', img: '/img/1.webp', desc: 'Captures the outdoors. Sub-genres include wildlife, astrophotography, macro (extreme close-ups), and aerial/drone shots.', items: ['Wildlife & Landscapes', 'Astrophotography', 'Macro Photography', 'Aerial / Drone Shots'] },
      { title: 'COMMERCIAL & OBJECT', img: '/img/2.webp', desc: 'Designed to market items or places: architectural, real estate, food, and still-life photography.', items: ['Architectural Photography', 'Real Estate Walkthroughs', 'Food & Cuisine Photography', 'Still-Life Product Photography'] },
    ],
    checklist: [],
  },
  'outdoor-videography': {
    num: '03',
    heroTitle: 'VIDEOGRAPHY',
    title: 'Outdoor Videography',
    sub: 'Commercial, Events & Digital Production',
    img: '/img/photostudio.webp',
    intro: 'Commercial, event, and documentary video production covering everything from corporate promotions to personal milestones and creative storytelling across Dubai and the wider UAE.',
    services: [
      { title: 'COMMERCIAL & CORPORATE', img: '/img/photostudio.webp', desc: 'TV or online ads promoting products and services, corporate videos (internal communications, training guides, company overviews), and real estate property tours.', items: ['TV & Online Commercials', 'Corporate Videos & Training', 'Real Estate Property Tours'] },
      { title: 'EVENTS & PERSONAL', img: '/img/3.webp', desc: 'Weddings (ceremonies, receptions, highlight reels), live events (concerts, conferences, sports highlights), and personal milestones (birthdays, graduations, celebrations).', items: ['Weddings & Highlight Reels', 'Concerts & Conferences', 'Parties & Milestones'] },
      { title: 'CREATIVE & DIGITAL', img: '/img/promptclients.webp', desc: 'Documentaries (real-world stories, interviews, investigative features), social media content (TikToks, Reels, Shorts), and artistic music videos.', items: ['Documentaries & Features', 'TikToks, Shorts & Instagram Reels', 'Artistic Music Videos'] },
    ],
    checklist: [],
  },
  'teleprompter-services': {
    num: '04',
    heroTitle: 'TELEPROMPTER',
    title: 'Teleprompter Services',
    sub: 'Camera Rigs, Presidential Podium & Stage Floor Displays',
    img: '/img/teleprompt.webp',
    intro: 'With over 14 years of UAE experience, Najeeb Abdul Noor is the leading Dubai Autocue Teleprompter Expert. A trusted partner for TV commercials, COP28, and large-scale international speaker events. AL ADHWA STUDIO provides both on-camera and presidential podium teleprompters.',
    services: [
      { title: 'PRESIDENTIAL PODIUM PROMPTERS', img: '/img/podcast.webp', desc: 'Stand-alone transparent glass panels placed on either side of a lectern. Allows Presidents, CEOs, and keynote speakers to address crowds naturally — no memorization required.', items: ['Dual Reflective Glass Panels', 'Public Speeches & Summits', 'CEO & Shareholder Presentations'] },
      { title: 'CAMERA-MOUNTED AUTOCUE RIGS', img: '/img/teleprompt.webp', desc: 'Beam-splitter glass mounted directly in front of the camera lens so TV anchors, news readers, and commercial presenters maintain 100% natural eye contact with viewers.', items: ['Studio Broadcast Rigs', 'DSLR / Mirrorless Prompters', 'Mobile & Tablet Mounts'] },
      { title: 'FLOOR & SPECIALIZED MONITORS', img: '/img/4.webp', desc: 'Angled floor confidence monitors for stage performers, multi-prompter sync systems for global summits, and smart eyewear projecting scrolling text into the user\'s field of vision.', items: ['Floor / Stage Confidence Monitors', 'Multi-Teleprompter Sync Systems', 'Smart Eyewear Prompters'] },
    ],
    checklist: [],
  },
};

export default function CategoryDetailPage({ params }) {
  const { slug } = use(params);
  const category = CATEGORIES[slug];
  const [dynamicItems, setDynamicItems] = useState([]);

  useEffect(() => {
    if (!category) return;
    fetch('http://localhost:4000/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const catTitle = (category.title || '').toLowerCase();
          const slugClean = (slug || '').replace(/-/g, ' ');
          const filtered = data.filter((item) => {
            const itemCat = (item.category || '').toLowerCase();
            return (
              itemCat === catTitle ||
              itemCat.includes(slugClean) ||
              catTitle.includes(itemCat)
            );
          });
          setDynamicItems(filtered);
        }
      })
      .catch(() => setDynamicItems([]));
  }, [category, slug]);

  if (!category) return (
    <>
      <Navbar />
      <div style={{ minHeight: '60vh', textAlign: 'center', paddingTop: '140px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem' }}>Category not found</h2>
        <a href="/" style={{ display: 'inline-block', marginTop: '1.5rem', padding: '0.8rem 2rem', background: 'var(--charcoal)', color: '#fff', borderRadius: '999px', fontSize: '0.75rem', letterSpacing: '0.15em' }}>← Back to Home</a>
      </div>
      <Footer />
    </>
  );

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* ── CLEAN TITLE & INTRO HEADER ─────────────────── */}
        <section className={styles.servicesSection} id="services">
          <div className="container">
            <div className={styles.sectionHeaderCenter}>
              <span className={styles.eyebrowTag}>{category.sub}</span>
              <h1 className={styles.sectionHeading}>{category.title}</h1>
              <div className={styles.dividerLine} />
              <p className={styles.categoryIntroText}>{category.intro}</p>
            </div>

            {/* ── DYNAMIC BACKEND CATEGORY UPLOADS ───────────────────── */}
            {dynamicItems.length > 0 && (
              <div style={{ marginBottom: '3.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', textTransform: 'uppercase', marginBottom: '1.5rem', color: '#1C1917', textAlign: 'center' }}>
                  Uploaded Category Showcase ({dynamicItems.length})
                </h3>
                <div className={styles.servicesGrid}>
                  {dynamicItems.map((item, idx) => (
                    <div key={item._id || idx} className={styles.svcCard}>
                      {item.imageUrl && (
                        <div className={styles.svcImgWrap}>
                          <Image src={item.imageUrl} alt={item.description || category.title} fill sizes="(max-width:768px) 100vw, 33vw" unoptimized style={{ objectFit: 'cover' }} />
                        </div>
                      )}
                      <div className={styles.svcBody}>
                        <h4 className={styles.svcTitle}>{item.category}</h4>
                        {item.description && <p className={styles.svcDesc}>{item.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── STANDARD SERVICES GRID ───────────────────────── */}
            <div className={styles.servicesGrid}>
              {category.services.map((svc, idx) => (
                <div key={idx} className={styles.svcCard}>
                  {svc.img && (
                    <div className={styles.svcImgWrap}>
                      <Image src={svc.img} alt={svc.title} fill sizes="(max-width:768px) 100vw, 33vw" />
                    </div>
                  )}
                  <div className={styles.svcBody}>
                    <h3 className={styles.svcTitle}>{svc.title}</h3>
                    <p className={styles.svcDesc}>{svc.desc}</p>
                    {svc.items && svc.items.length > 0 && (
                      <ul className={styles.bulletList}>
                        {svc.items.map((it, i) => (
                          <li key={i} className={styles.bullet}>✓ {it}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CHECKLIST TAG CLOUD ────────────────────── */}
        {category.checklist && category.checklist.length > 0 && (
          <section className={styles.checklistSection}>
            <div className="container">
              <div className={styles.checklistBox}>
                <h3 className={styles.checklistTitle}>All Included Services</h3>
                <div className={styles.tagCloud}>
                  {category.checklist.map((item, i) => (
                    <span key={i} className={styles.tag}>✓ {item}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── BOOK CTA STRIP ─────────────────────────── */}
        <section className={styles.ctaStrip}>
          <div className="container">
            <div className={styles.ctaContent}>
              <div>
                <h3 className={styles.ctaTitle}>Ready to book?</h3>
                <p className={styles.ctaSub}>Contact AL ADHWA Studio for packages, pricing & bookings.</p>
              </div>
              <div className={styles.ctaBtns}>
                <a href="/#contact" className="btn-terracotta">Get in Touch ↗</a>
                <a href="https://wa.me/971557544582" target="_blank" rel="noopener noreferrer" className="btn-outline">WhatsApp Us</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
