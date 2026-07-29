const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  title:    { type: String, required: true, trim: true },
  imageUrl: { type: String, required: true },
  category: { type: String, default: 'General' },
  alt:      { type: String, default: '' },
  order:    { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Gallery', GallerySchema);
