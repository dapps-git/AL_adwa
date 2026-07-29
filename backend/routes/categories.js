const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Seed Categories Data
const seedCategories = [
  {
    num: '01',
    title: 'Studio Services & Printing',
    slug: 'studio-services',
    sub: 'Indoor Photography & Custom Gifts',
    desc: 'Passport & Emirates ID Photos, Family & Portrait Sessions, Product Shoot, Corporate Headshots, Mug/T-Shirt/Pillow Printing, Photo Frames, Canvas Printing, CV Typing & Document Services.',
    img: '/img/studio.webp',
    color: '#F4E8DB',
    details: {
      intro: 'Al Adhwa Studio provides high quality indoor photography sessions, document photos meeting official government standards, custom printed gifts, framing, photocopying, document lamination, scanning, and office document support.',
      services: [
        { title: 'PRODUCT SHOOT', img: '/img/photo.png', desc: 'Professional photography services to showcase your products in the best light. From e-commerce to promotional materials, we ensure every detail is captured to highlight the unique features of your products with customizable packages.' },
        { title: 'CORPORATE HEADSHOTS', img: '/img/data.png', desc: 'Professional headshot photography tailored to your business needs. Whether for LinkedIn, company websites, or marketing materials, we ensure your headshots are polished, high-quality, and make a great first impression.' },
        { title: 'FAMILY PHOTO SHOOT', img: '/img/photo.webp', desc: 'Studio Sessions specializing in capturing beautiful, timeless moments with your loved ones. Custom packages available with prints and framing options to preserve your memories forever.' },
        { title: 'PASSPORT & EMIRATES ID PHOTOS', img: '/img/imageq.webp', desc: 'High-quality, professionally sized passport photos meeting all official requirements for all countries passport and visa size photos. Fast, reliable service ready immediately.' },
        { title: 'PHOTO FRAMES', img: '/img/1.webp', desc: 'Wide selection of readymade and custom frames: 4x6, 5x7, 6x8, 8x10, A4, A3, A2, A1, 8X12, 12x16 UPTO 24X100 inches, Acrylic Frame, Wood Lamination in White, Black, Gold, Brown.' },
        { title: 'PHOTOCOPY / XEROX', img: '/img/images.webp', desc: 'Precise photocopying for single pages or bulk orders with high-quality clarity across various paper types and sizes.' },
        { title: 'DOCUMENT LAMINATION', img: '/img/images.webp', desc: 'High-quality lamination for all types of documents, from important papers to certificates and artwork in various finishes and sizes.' },
        { title: 'MUG PRINTING & MAGIC MUGS', img: '/img/gift.webp', desc: 'Custom printing on high-quality ceramic mugs & heat-sensitive magic mugs which change color when hot liquid is poured in for personal & corporate gifting.' },
        { title: 'T-SHIRT PRINTING', img: '/img/image.webp', desc: 'Custom-designed t-shirts for corporate events, promotional campaigns, or employee uniforms ensuring sharp, vibrant, long-lasting prints.' },
        { title: 'PILLOW PRINTING', img: '/img/image3.webp', desc: 'Designs printed on high-quality fabric pillows with vibrant, long-lasting colors for promotional purposes, corporate gifts, or home decor.' },
        { title: 'CV / RESUME MAKING', img: '/img/images.webp', desc: 'Crafting professional and polished CVs that align with your career goals, formatted to make a lasting impression.' }
      ],
      checklist: [
        'EMIRATES ID PHOTO', 'PASSPORT PHOTO', 'FAMILY PHOTO', 'PHOTO PRINTING',
        'MUG PRINTING', 'MAGIC MUGS', 'T-SHIRT PRINTING', 'PILLOW PRINTING',
        'KEY CHAIN PRINTING', 'BUSINESS CARD PRINTING', 'CV/RESUME TYPING',
        'COMPANY SEAL PRINTING', 'DOCUMENT SCANNING', 'DOCUMENT LAMINATION',
        'PHOTOCOPY / XEROX', 'PHOTO FRAMES'
      ]
    }
  },
  {
    num: '02',
    title: 'Outdoor Photography',
    slug: 'outdoor-photography',
    sub: 'Portrait, Travel & Commercial',
    desc: 'Weddings & Events, Fashion & Candid, Wildlife & Drone Aerials, Astrophotography & Macro, Architecture, Real Estate, Food & Still-Life Commercial Photography.',
    img: '/img/photogrphy.webp',
    color: '#E8F0E8',
    details: {
      intro: 'Capturing moments outdoors with state-of-the-art gear and expert lighting. We cover human subjects, outdoor nature, architectural structures, and commercial objects.',
      services: [
        { title: 'Portrait & Event', img: '/img/photogrphy.webp', desc: 'Focuses on human subjects. Styles include weddings, fashion, street candid photography, and sports.', items: ['Weddings & Ceremonies', 'Fashion Shoots', 'Street Candid', 'Sports Coverage'] },
        { title: 'Nature & Travel', img: '/img/1.webp', desc: 'Captures the outdoors. Sub-genres include wildlife, astrophotography, macro (extreme close-ups), and aerial/drone shots.', items: ['Wildlife & Landscapes', 'Astrophotography', 'Macro Detail Photography', 'Aerial / Drone Shots'] },
        { title: 'Commercial & Object', img: '/img/2.webp', desc: 'Designed to market items or places. This covers architectural, real estate, food, and still-life photography.', items: ['Architectural Photography', 'Real Estate Walkthroughs', 'Food & Cuisine Photography', 'Still-Life Product Photography'] }
      ]
    }
  },
  {
    num: '03',
    title: 'Outdoor Videography',
    slug: 'outdoor-videography',
    sub: 'Commercial, Events & Digital',
    desc: 'TV Commercials, Corporate Videos, Real Estate Tours, Wedding Highlight Reels, Concerts & Live Events, Documentaries, Social Media Reels, TikToks & Music Videos.',
    img: '/img/photostudio.webp',
    color: '#EDE8F0',
    details: {
      intro: 'Commercial, event, and documentary video production covering everything from corporate promotions to personal milestones and creative storytelling.',
      services: [
        { title: 'Commercial & Corporate', img: '/img/photostudio.webp', desc: 'TV or online ads promoting products and services, Corporate videos (internal communications, training guides), and Real estate property tours for buyers.', items: ['TV & Online Commercials', 'Corporate Videos & Training', 'Real Estate Property Tours'] },
        { title: 'Events & Personal', img: '/img/3.webp', desc: 'Weddings (ceremonies, receptions, highlight reels), Live events (concerts, conferences, sports), and Parties & milestones (birthdays, graduations).', items: ['Weddings & Highlight Reels', 'Concerts & Conferences', 'Parties & Milestones'] },
        { title: 'Creative & Digital', img: '/img/promptclients.webp', desc: 'Documentaries (real-world stories, interviews, features), Social Media (short-form vertical clips, TikToks, reels), and Music Videos.', items: ['Documentaries & Features', 'TikToks, Shorts & Instagram Reels', 'Artistic Music Videos'] }
      ]
    }
  },
  {
    num: '04',
    title: 'Teleprompter Services',
    slug: 'teleprompter-services',
    sub: 'Camera Rigs, Presidential & Floor Monitors',
    desc: 'Lead Operator Najeeb Abdul Noor (14+ years UAE experience). Studio Broadcast Rigs, Presidential Podium Glass Panels, Concealed Floor Displays & Camera Prompters for CEOs, Anchors & Global Summits like COP28.',
    img: '/img/teleprompt.webp',
    color: '#F0EEE8',
    details: {
      intro: 'NAJEEB ABDUL NOOR — With over 14 years of experience in the UAE, Najeeb Abdul Noor has built a reputation as the leading Dubai Autocue Teleprompter Expert. Specializing in both Autocue setups and complex multi-teleprompter systems, Najeeb is a trusted partner for TV commercials, high-profile social media campaigns, and large-scale international speaker events such as COP28. AL ADHWA STUDIO provides both on-camera teleprompters and podium-type speech prompters, backed by professional photo & videography teams.',
      services: [
        { title: 'Presidential (Podium) Teleprompters', img: '/img/podcast.webp', desc: 'Stand-alone Glass Panels placed on either side of a lectern for public speeches, and Concealed Floor Displays hidden at ground level that reflect text upward onto transparent glass.' },
        { title: 'Camera-Mounted Teleprompters', img: '/img/teleprompt.webp', desc: 'Studio Rigs attached to heavy broadcast cameras in TV studios, DSLR/Mirrorless Prompters for content creators, and Mobile/Tablet Mounts using smartphones or tablets.' },
        { title: 'Floor & Specialized Monitors', img: '/img/4.webp', desc: 'Floor/Confidence Monitors (angled screens placed on stage floor for cue glances), and Smart Eyewear projecting scrolling text into the user\'s field of vision.' }
      ]
    }
  }
];

// GET All Categories
router.get('/', async (req, res) => {
  try {
    let categories = await Category.find();
    if (categories.length === 0) {
      categories = await Category.insertMany(seedCategories);
    }
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET Category by Slug
router.get('/:slug', async (req, res) => {
  try {
    let category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      const foundSeed = seedCategories.find(c => c.slug === req.params.slug);
      if (foundSeed) {
        category = await Category.create(foundSeed);
      } else {
        return res.status(404).json({ message: 'Category not found' });
      }
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
