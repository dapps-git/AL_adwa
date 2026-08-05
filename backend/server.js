const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Universal CORS Middleware — Allows all origins (www.aladhwastudio.com, admin.aladhwastudio.com, aladhwastudio.com & localhost)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Dynamically reflect origin or default to wildcard to prevent LiteSpeed cache mismatch
  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Vary', 'Origin');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes — Mounted on /api/*, /*, and /aladhwastudio/api/* for 100% cPanel Passenger URL compatibility
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const categoryRoutes = require('./routes/categories');
const blogRoutes = require('./routes/blogs');
const galleryRoutes = require('./routes/gallery');

// Auth routes
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);
app.use('/aladhwastudio/api/auth', authRoutes);

// Contact routes
app.use('/api/contact', contactRoutes);
app.use('/contact', contactRoutes);
app.use('/aladhwastudio/api/contact', contactRoutes);

// Category routes
app.use('/api/categories', categoryRoutes);
app.use('/categories', categoryRoutes);
app.use('/aladhwastudio/api/categories', categoryRoutes);

// Blog routes
app.use('/api/blogs', blogRoutes);
app.use('/blogs', blogRoutes);
app.use('/aladhwastudio/api/blogs', blogRoutes);

// Gallery routes
app.use('/api/gallery', galleryRoutes);
app.use('/gallery', galleryRoutes);
app.use('/aladhwastudio/api/gallery', galleryRoutes);

// Health Check Endpoint
app.get(['/api/health', '/health', '/', '/aladhwastudio/api/health'], (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Connect to MongoDB & Start Server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => {
      console.log('MongoDB connected successfully');
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
      app.listen(PORT, () => console.log(`Server running on port ${PORT} (MongoDB offline)`));
    });
} else {
  console.log('No MONGO_URI provided, starting standalone server');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
