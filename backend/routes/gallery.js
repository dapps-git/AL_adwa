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

// Multer memory storage for direct Cloudinary streaming
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB limit
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
    const { title, category, imageUrl, url, description } = req.body;
    const finalUrl = imageUrl || url;

    if (!category || !finalUrl) {
      return res.status(400).json({ error: 'Category and Image URL are required' });
    }

    const newItem = new Gallery({
      title: title || '',
      category,
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

// POST /api/gallery/upload — Direct File / Base64 Upload to Cloudinary with WebP Compression
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { category, title, description, image, imageUrl } = req.body || {};
    const cat = category || 'Studio Services & Printing';

    let uploadResult;

    if (req.file && req.file.buffer) {
      // Multipart file upload
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      uploadResult = await cloudinary.uploader.upload(dataURI, {
        folder: 'aladhwa_gallery',
        transformation: [
          { width: 1920, crop: 'limit' },
          { quality: 'auto', fetch_format: 'auto' }
        ]
      });
    } else if (image || imageUrl) {
      // Base64 or URL upload
      const targetImg = image || imageUrl;
      uploadResult = await cloudinary.uploader.upload(targetImg, {
        folder: 'aladhwa_gallery',
        transformation: [
          { width: 1920, crop: 'limit' },
          { quality: 'auto', fetch_format: 'auto' }
        ]
      });
    } else {
      return res.status(400).json({ error: 'Image file or base64 data is required' });
    }

    const newItem = new Gallery({
      title: title || '',
      category: cat,
      imageUrl: uploadResult.secure_url,
      description: description || ''
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
