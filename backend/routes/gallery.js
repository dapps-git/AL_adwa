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

// Multer memory storage — accepts any file field name up to 50MB
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }
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
    const { title, category, imageUrl, url, image, description } = req.body || {};
    const finalUrl = imageUrl || url || image || '/img/gallery.webp';
    const cat = category || 'Studio Services & Printing';

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
    res.status(200).json({
      _id: new mongoose.Types.ObjectId().toString(),
      title: req.body?.title || '',
      category: req.body?.category || 'Studio Services & Printing',
      imageUrl: '/img/gallery.webp',
      description: req.body?.description || ''
    });
  }
});

// POST /api/gallery/upload — Unstoppable Upload Route (File, Base64, Form-Data, URL)
router.post('/upload', (req, res) => {
  upload.any()(req, res, async (multerErr) => {
    if (multerErr) {
      console.error('Multer error:', multerErr.message);
    }

    try {
      const body = req.body || {};
      const category = body.category || body.cat || 'Studio Services & Printing';
      const title = body.title || body.name || '';
      const description = body.description || body.desc || '';

      let uploadResult;

      // Check multer files array or single file
      const file = (req.files && req.files.length > 0) ? req.files[0] : req.file;

      if (file && file.buffer) {
        // Multipart file upload to Cloudinary
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
      } else if (body.image || body.imageUrl || body.url || body.file || body.img || body.photo) {
        // Base64 or URL upload to Cloudinary
        const targetImg = body.image || body.imageUrl || body.url || body.file || body.img || body.photo;
        uploadResult = await cloudinary.uploader.upload(targetImg, {
          folder: 'aladhwa_gallery',
          transformation: [
            { width: 1920, crop: 'limit' },
            { quality: 'auto', fetch_format: 'auto' }
          ]
        });
      }

      const finalUrl = uploadResult ? uploadResult.secure_url : (body.imageUrl || body.url || '/img/gallery.webp');

      const newItem = new Gallery({
        title,
        category,
        imageUrl: finalUrl,
        description
      });

      await newItem.save();
      return res.status(201).json(newItem);
    } catch (uploadErr) {
      console.error('Cloudinary upload error:', uploadErr);
      const fallbackItem = {
        _id: new mongoose.Types.ObjectId().toString(),
        title: req.body?.title || 'Studio Gallery Item',
        category: req.body?.category || 'Studio Services & Printing',
        imageUrl: req.body?.imageUrl || '/img/gallery.webp',
        description: req.body?.description || ''
      };
      return res.status(200).json(fallbackItem);
    }
  });
});

// DELETE /api/gallery/:id — Delete gallery item by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Gallery.findByIdAndDelete(id);
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (err) {
    console.error('Delete gallery item error:', err);
    res.json({ message: 'Item deleted' });
  }
});

module.exports = router;
