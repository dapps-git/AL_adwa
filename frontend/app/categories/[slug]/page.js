'use client';
import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CategoryWhatsAppFloat from '../../components/CategoryWhatsAppFloat';
import { API_URL } from '../../config';
import styles from './page.module.css';

// ── STATIC CATEGORY METADATA ──────────────────────────
const CATEGORIES = {
  'studio-services': {
    num: '01',
    heroTitle: 'STUDIO SERVICES',
    title: 'Studio Services & Printing',
    sub: 'Indoor Photography & Custom Printed Gifts',
    img: '/studio/studio.webp',
    intro: 'Al Adhwa Studio provides high quality indoor photography sessions, document photos meeting official government standards, custom printed gifts, framing, photocopying, document lamination, scanning, and full office document support from our Muwailah, Sharjah studio.',
    services: [
      { title: 'PASSPORT & EMIRATES ID PHOTOS', img: '/studio/passport.jpg', desc: 'High-quality, professionally sized passport photos meeting all official requirements for UAE Emirates ID, Visa, and all international passports. Fast, reliable service ready immediately.' },
      { title: 'CUSTOM PHOTO FRAMES & WALL ART', img: '/studio/frames.webp', desc: 'High quality wooden, metallic, and canvas photo framing for family portraits, certificates, art prints, and decorative wall displays.' },
      { title: 'ROCK SLATE PHOTO PRINTING', img: '/studio/rock.webp', desc: 'Unique natural rock slate photo printing with vibrant color finish — handcrafted durable stone keepsakes for gifts and desk displays.' },
      { title: 'CORPORATE HEADSHOTS', img: '/studio/corporateheadshots.jpg', desc: 'Professional headshot photography for LinkedIn, company websites, executive profiles, or marketing materials in studio lighting.' },
      { title: 'FAMILY PHOTO SHOOT', img: '/studio/familyshoot.jpg', desc: 'Warm indoor studio sessions capturing beautiful, timeless family moments. Custom packages with high-resolution digital copies and framed prints.' },
      { title: 'PRODUCT PHOTOGRAPHY', img: '/studio/productphotography.jpg', desc: 'Studio product photography to showcase your products for e-commerce, Amazon, Instagram, or promotional catalogs in crisp detail.' },
      { title: 'MUG PRINTING & MAGIC MUGS', img: '/studio/mugprinting.jpg', desc: 'Custom printing on ceramic mugs with vibrant, long-lasting colors. Heat-sensitive magic mugs change color when hot liquid is poured.' },
      { title: 'T-SHIRT PRINTING', img: '/studio/tshirtprinting.jpg', desc: 'Custom-designed t-shirts for corporate events, promotional campaigns, sports teams, or uniform branding.' },
      { title: 'CUSTOMIZED PILLOW PRINTING', img: '/studio/customizedpillow.jpg', desc: 'Custom photo and text designs printed on high-quality fabric pillows — ideal for gifts, decor, and special occasions.' },
      { title: 'KEYCHAIN PRINTING', img: '/studio/keychain.jpg', desc: 'Personalized acrylic, metal, and wooden keychains printed with custom photos, logos, or personalized text.' },
      { title: 'MOBILE COVER PRINTING', img: '/studio/mobilecover.jpg', desc: 'Custom phone back covers printed with your favorite photos, artistic patterns, or personal branding.' },
      { title: 'WATER BOTTLE PRINTING', img: '/studio/waterbottleprinting.jpg', desc: 'Durable custom printing on stainless steel and aluminum water bottles for school, sports, or corporate giveaways.' },
      { title: 'CAP PRINTING', img: '/studio/cap.jpg', desc: 'Custom printed caps and hats with company logos, event branding, or personalized artwork.' },
      { title: 'POLAROIDS & PRINTS', img: '/studio/polariods.jpg', desc: 'Retro Polaroid-style photo prints, mini prints, and custom photo wall displays preserved on premium photo paper.' },
      { title: 'BUSINESS CARD PRINTING', img: '/studio/businesscard.jpg', desc: 'Premium quality business cards in matte, glossy, textured, and spot UV finishes for a striking professional impression.' },
      { title: 'GRAPHIC DESIGN SERVICES', img: '/studio/graphicdesign.jpg', desc: 'Creative graphic design for logos, flyers, brochures, social media banners, company profiles, and promotional media.' },
      { title: 'CV / RESUME MAKING', img: '/studio/resume.jpg', desc: 'Professional and polished CV crafting aligned with modern ATS and HR standards to help you stand out.' },
      { title: 'POUCH LAMINATION & DOCS', img: '/studio/pouchlamination.jpg', desc: 'Pouch lamination, document scanning, high-speed photocopying/xerox, and company seal stamps at one convenient location.' },
    ],
    checklist: ['EMIRATES ID PHOTO','PASSPORT PHOTO','CUSTOM PHOTO FRAMES','ROCK SLATE PRINTING','FAMILY PHOTO','PRODUCT SHOOT','CORPORATE HEADSHOTS','MUG PRINTING','MAGIC MUGS','T-SHIRT PRINTING','PILLOW PRINTING','KEY CHAIN PRINTING','MOBILE COVER PRINTING','WATER BOTTLE PRINTING','CAP PRINTING','POLAROIDS','BUSINESS CARDS','GRAPHIC DESIGN','CV/RESUME TYPING','POUCH LAMINATION','PHOTOCOPY/XEROX'],
  },
  'outdoor-photography': {
    num: '02',
    heroTitle: 'PHOTOGRAPHY',
    title: 'Outdoor Photography',
    sub: 'Portrait, Travel, Architecture & Commercial',
    img: '/studio/outdoorphoto.webp',
    intro: 'Capturing moments outdoors with state-of-the-art gear and expert lighting. Al Adhwa Studio covers human subjects, outdoor nature, architectural structures, and commercial objects across the UAE.',
    services: [
      { title: 'COMMERCIAL & BRAND', img: '/img/outdoor_commercial.webp', desc: 'High-end commercial brand shoots shot outdoors against modern skyline architecture and industrial setups.', items: ['Brand Commercial Shoots', 'Architectural Photography', 'Real Estate & Properties', 'Food & Culinary Scenes'] },
      { title: 'WEDDING PHOTOGRAPHY', img: '/img/wedding.webp', desc: 'Capturing unforgettable wedding moments with artistic storytelling, romantic couple portraits, and full ceremony coverage.', items: ['Bridal & Groom Portraits', 'Ceremony & Reception Coverage', 'Pre-Wedding & Engagement Shoots', 'High-Resolution Albums'] },
      { title: 'BIRTHDAY PHOTOGRAPHY', img: '/img/birthday.webp', desc: 'Vibrant and joyful birthday party photography for kids, adults, and milestone celebrations across the UAE.', items: ['Kids Birthday Parties', 'Milestone Celebrations', 'Cake Smash Sessions', 'Party Highlight Photography'] },
      { title: 'CORPORATE EXECUTIVE', img: '/img/outdoor_corporate.webp', desc: 'Corporate group sessions, team portraits, executive headshots, and leadership photography outdoors.', items: ['Executive Leadership Photos', 'Company Team Shoots', 'Annual Report Imagery', 'Corporate Campus Photography'] },
      { title: 'EVENTS & GALAS', img: '/img/outdoor_events.webp', desc: 'Vibrant outdoor gala celebrations, VIP summits, award ceremonies, and festival crowd photography.', items: ['Conferences & Summits', 'Gala Dinners', 'Award Ceremonies', 'Outdoor Festivals'] },
      { title: 'PERSONAL & PORTRAIT', img: '/img/outdoor_personal.webp', desc: 'Stunning outdoor portraits during golden hour in urban settings or UAE desert landscapes.', items: ['Personal Lifestyle Portraits', 'Fashion & Editorial', 'Engagement & Couples', 'Desert Golden Hour Shoots'] },
    ],
    checklist: ['COMMERCIAL SHOOT', 'WEDDING PHOTOGRAPHY', 'BIRTHDAY PHOTOGRAPHY', 'CORPORATE HEADSHOTS', 'OUTDOOR EVENTS', 'PORTRAIT SHOOT', 'CREATIVE ARCHITECTURE', 'DIGITAL PHOTOGRAPHY'],
  },
  'outdoor-videography': {
    num: '03',
    heroTitle: 'VIDEOGRAPHY',
    title: 'Outdoor Videography',
    sub: 'Commercial, Events, Weddings, Birthdays & Digital Production',
    img: '/studio/outdoorvideo.webp',
    intro: 'Commercial, event, wedding, birthday, and documentary video production covering everything from corporate promotions to personal milestones and creative storytelling across Dubai and the wider UAE.',
    services: [
      { title: 'COMMERCIAL & CORPORATE VIDEO', img: '/img/video_commercial.webp', desc: 'TV and online video commercials, corporate brand films, property walkthroughs, and promotional ads filmed with cinema cameras.', items: ['TV & Digital Video Commercials', 'Corporate Brand Films', 'Real Estate Property Tours', 'Industrial Feature Videos'] },
      { title: 'WEDDING VIDEOGRAPHY', img: '/videography/wedd.webp', desc: 'Cinematic wedding films, bridal prep, emotional ceremony vows, and reception highlight videos filmed in 4K.', items: ['Cinematic Wedding Highlights', 'Bridal Prep Coverage', 'Full Ceremony Film', 'Pre-Wedding Video Story'] },
      { title: 'BIRTHDAY VIDEOGRAPHY', img: '/videography/birth.webp', desc: 'Vibrant birthday video coverage for kids and adult milestone celebrations with highlight reels and social media edits.', items: ['Kids Birthday Highlights', 'Adult Milestone Films', 'Party Atmosphere Recaps', 'Reels & Shorts Edits'] },
      { title: 'PRESS & MEDIA CONFERENCE COVERAGE', img: '/videography/pressphoto.webp', desc: 'Professional press conference video recording, media interviews, VIP announcements, and live news feed streaming across official media channels.', items: ['Press Conferences & Launches', 'VIP Speaker Interviews', 'News & Media Broadcast Feeds', 'Fast-Turnaround News Edits'] },
      { title: 'MULTI-CAMERA LIVE PRODUCTION', img: '/videography/multicam.webp', desc: 'High-end multi-cam live switching for major summits, concerts, sports events, and corporate conventions filmed in 4K resolution with live vision mixing.', items: ['Live Video Switching & Mixing', 'Multi-Cam Concert & Summit Production', '4K Broadcast Recording', 'Instant Screen Playback'] },
      { title: 'EVENTS & LIVE COVERAGE', img: '/img/outdoor_events.webp', desc: 'Live event coverage, corporate summits, music concerts, and milestone celebrations filmed in 4K multi-cam format.', items: ['Multi-Cam Live Coverage', 'Conferences & Summits', 'Concerts & Shows', 'Highlight Reels'] },
      { title: 'CREATIVE & REELS', img: '/img/outdoor_commercial.webp', desc: 'High impact social media video production (TikToks, Shorts, Reels), artistic brand documentaries, and music videos.', items: ['Documentaries & Features', 'TikToks, Shorts & Instagram Reels', 'Artistic Music Videos'] },
    ],
    checklist: ['COMMERCIAL VIDEO', 'WEDDING VIDEOGRAPHY', 'BIRTHDAY VIDEOGRAPHY', 'PRESS & MEDIA COVERAGE', 'MULTI-CAMERA LIVE PRODUCTION', 'CORPORATE FILM', 'EVENT COVERAGE', 'DIGITAL REELS'],
  },
  'teleprompter-services': {
    num: '04',
    heroTitle: 'TELEPROMPTER',
    title: 'Teleprompter Services',
    sub: 'Camera Rigs, Presidential Podium & Stage Floor Displays',
    img: '/studio/tele.webp',
    intro: 'With over 14 years of UAE experience, Najeeb Abdul Noor is the leading Dubai Autocue Teleprompter Expert. A trusted partner for TV commercials, COP28, and large-scale international speaker events. AL ADHWA STUDIO provides both on-camera and presidential podium teleprompters.',
    services: [
      { title: 'PRESIDENTIAL PODIUM PROMPTERS', img: '/img/teleprompter_podium.webp', desc: 'Stand-alone transparent glass panels placed on either side of a lectern. Allows Presidents, CEOs, and keynote speakers to address crowds naturally — no memorization required.', items: ['Dual Reflective Glass Panels', 'Public Speeches & Summits', 'CEO & Shareholder Presentations'] },
      { title: 'CAMERA-MOUNTED AUTOCUE RIGS', img: '/img/teleprompter_rig.webp', desc: 'Beam-splitter glass mounted directly in front of the camera lens so TV anchors, news readers, and commercial presenters maintain 100% natural eye contact with viewers.', items: ['Studio Broadcast Rigs', 'DSLR / Mirrorless Prompters', 'Mobile & Tablet Mounts'] },
      { title: 'FLOOR & STAGE CONFIDENCE MONITORS', img: '/img/floor.webp', desc: 'Angled floor confidence monitors for stage performers, multi-prompter sync systems for global summits, and smart eyewear projecting scrolling text into the user\'s field of vision.', items: ['Floor / Stage Confidence Monitors', 'Multi-Teleprompter Sync Systems', 'Smart Eyewear Prompters'] },
    ],
    checklist: ['PRESIDENTIAL PODIUM PROMPTERS', 'CAMERA MOUNTED AUTOCUE', 'FLOOR CONFIDENCE MONITORS', 'MULTI-CAM PROMPTER SYNC'],
  },
};

export default function CategoryDetailPage({ params }) {
  const { slug } = use(params);
  const category = CATEGORIES[slug];
  const [dynamicItems, setDynamicItems] = useState([]);

  useEffect(() => {
    if (!category) return;
    fetch(`${API_URL}/gallery`)
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
                      <Image 
                        src={svc.img} 
                        alt={svc.title} 
                        fill 
                        sizes="(max-width:768px) 100vw, 33vw" 
                        unoptimized 
                        style={{ 
                          objectFit: 'cover', 
                          objectPosition: svc.img.includes('frames') ? '95% 40%' : (svc.img.includes('floor') ? '72% 35%' : 'center 35%')
                        }} 
                      />
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
      </main>

      {/* Floating Bottom-Left WhatsApp button ONLY on 4 category pages */}
      <CategoryWhatsAppFloat slug={slug} />

      <Footer />
    </>
  );
}
