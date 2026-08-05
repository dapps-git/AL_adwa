const express   = require('express');
const router    = express.Router();
const multer    = require('multer');
const Gallery   = require('../models/Gallery');
const protect   = require('../middleware/auth');
const cloudinary = require('../config/cloudinary');

// Multer — store in memory, then stream to Cloudinary
const storage = multer.memoryStorage();
const upload  = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'), false);
  },
});

// ── ADMIN: Upload image to Cloudinary ─────────────────────
router.post('/upload', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No image file provided' });

    // Stream buffer → Cloudinary (fast direct upload, CDN handles webp/compression on delivery)
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'aladhwa_gallery',
          resource_type: 'image',
        },
        (err, result) => { if (err) reject(err); else resolve(result); }
      );
      stream.end(req.file.buffer);
    });

    // Apply Cloudinary's dynamic fast delivery transformations (f_auto = auto WebP/AVIF, q_auto = smart compression)
    let optimizedUrl = result.secure_url;
    if (optimizedUrl.includes('/upload/')) {
      optimizedUrl = optimizedUrl.replace('/upload/', '/upload/f_auto,q_auto,w_1920,c_limit/');
    }

    res.json({ imageUrl: optimizedUrl, publicId: result.public_id });
  } catch (err) {
    console.error('Cloudinary upload error:', err.message);
    res.status(500).json({ message: err.message || 'Upload failed' });
  }
});

// ── PUBLIC: GET all gallery images ────────────────────────
router.get('/', async (req, res) => {
  try {
    const images = await Gallery.find().sort({ order: 1, createdAt: -1 });
    res.json(images || []);
  } catch (err) {
    console.error('Gallery fetch error:', err.message);
    res.json([]);
  }
});

// ── ADMIN: CREATE gallery image ───────────────────────────
router.post('/', protect, async (req, res) => {
  try {
    const image = await Gallery.create(req.body);
    res.status(201).json(image);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// ── ADMIN: UPDATE gallery image ───────────────────────────
router.put('/:id', protect, async (req, res) => {
  try {
    const image = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!image) return res.status(404).json({ message: 'Image not found' });
    res.json(image);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// ── ADMIN: DELETE gallery image ───────────────────────────
router.delete('/:id', protect, async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Image deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
