const express = require('express');
const router  = express.Router();
const Blog    = require('../models/Blog');
const protect = require('../middleware/auth');

// ── PUBLIC: GET all published blogs ───────────────────────
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
    res.json(blogs || []);
  } catch (err) { res.json([]); }
});

// ── PUBLIC: GET blog by slug ───────────────────────────────
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// ── ADMIN: GET all blogs (including unpublished) ──────────
router.get('/admin/all', protect, async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// ── ADMIN: CREATE blog ─────────────────────────────────────
router.post('/', protect, async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// ── ADMIN: UPDATE blog ─────────────────────────────────────
router.put('/:id', protect, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// ── ADMIN: DELETE blog ─────────────────────────────────────
router.delete('/:id', protect, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
