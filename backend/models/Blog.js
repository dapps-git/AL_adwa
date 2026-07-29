const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title:     { type: String, required: true, trim: true },
  slug:      { type: String, required: true, unique: true, lowercase: true },
  excerpt:   { type: String, default: '' },
  content:   { type: String, default: '' },
  coverImg:  { type: String, default: '' },
  category:  { type: String, default: 'General' },
  author:    { type: String, default: 'AL ADHWA Team' },
  published: { type: Boolean, default: true },
  tags:      [{ type: String }],
}, { timestamps: true });

// Auto-generate slug from title if not provided
BlogSchema.pre('validate', function(next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }
  next();
});

module.exports = mongoose.model('Blog', BlogSchema);
