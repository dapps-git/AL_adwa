const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  num:     { type: String },
  title:   { type: String, required: true },
  slug:    { type: String, required: true, unique: true },
  sub:     { type: String },
  desc:    { type: String },
  img:     { type: String },
  color:   { type: String },
  details: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);
