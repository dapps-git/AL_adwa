const express = require('express');
const router  = express.Router();
const Gallery = require('../models/Gallery');
const protect = require('../middleware/auth');

// ── PUBLIC: GET all gallery images ────────────────────────
router.get('/', async (req, res) => {
  try {
    const images = await Gallery.find().sort({ order: 1, createdAt: -1 });
    res.json(images);
  } catch (err) { res.status(500).json({ message: err.message }); }
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
