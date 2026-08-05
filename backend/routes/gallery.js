const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');

// Inline / Fallback Gallery Item Schema
const gallerySchema = new mongoose.Schema({
  title: { type: String, default: '' },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);

// Multer memory storage — accepts any file field name up to 15MB
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 }
});

// GET /api/gallery — Fetch all gallery items sorted by newest first
router.get('/', async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error('Fetch gallery error:', err);
    res.status(500).json({ error: 'Failed to fetch gallery items' });
  }
});

// POST /api/gallery — Create new gallery item with URL
router.post('/', async (req, res) => {
  try {
    const { title, category, imageUrl, url, description } = req.body || {};
    const finalUrl = imageUrl || url;
    const cat = category || 'Studio Services & Printing';

    if (!finalUrl) {
      return res.status(400).json({ error: 'Image URL is required' });
    }

    const newItem = new Gallery({
      title: title || '',
      category: cat,
      imageUrl: finalUrl,
      description: description || ''
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error('Create gallery error:', err);
    res.status(500).json({ error: 'Failed to save gallery item' });
  }
});

// POST /api/gallery/upload — Universal File / Base64 Upload to Cloudinary with WebP Compression
router.post('/upload', upload.any(), async (req, res) => {
  try {
    const body = req.body || {};
    const category = body.category || body.cat || 'Studio Services & Printing';
    const title = body.title || '';
    const description = body.description || '';

    let uploadResult;

    // Check files array from upload.any() or req.file
    const file = (req.files && req.files.length > 0) ? req.files[0] : req.file;

    if (file && file.buffer) {
      // Multipart file upload
      const b64 = Buffer.from(file.buffer).toString('base64');
      const mime = file.mimetype || 'image/jpeg';
      const dataURI = `data:${mime};base64,${b64}`;
      uploadResult = await cloudinary.uploader.upload(dataURI, {
        folder: 'aladhwa_gallery',
        transformation: [
          { width: 1920, crop: 'limit' },
          { quality: 'auto', fetch_format: 'auto' }
        ]
      });
    } else if (body.image || body.imageUrl || body.url || body.file || body.img) {
      // Base64 or URL upload
      const targetImg = body.image || body.imageUrl || body.url || body.file || body.img;
      uploadResult = await cloudinary.uploader.upload(targetImg, {
        folder: 'aladhwa_gallery',
        transformation: [
          { width: 1920, crop: 'limit' },
          { quality: 'auto', fetch_format: 'auto' }
        ]
      });
    } else {
      return res.status(400).json({ error: 'No image file or image data was attached to request' });
    }

    const newItem = new Gallery({
      title,
      category,
      imageUrl: uploadResult.secure_url,
      description
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    res.status(500).json({ error: err.message || 'Failed to upload image to Cloudinary' });
  }
});

// DELETE /api/gallery/:id — Delete gallery item by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Gallery.findByIdAndDelete(id);
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (err) {
    console.error('Delete gallery item error:', err);
    res.status(500).json({ error: 'Failed to delete gallery item' });
  }
});

module.exports = router;
