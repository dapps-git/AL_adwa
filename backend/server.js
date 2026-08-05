const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// Try requiring cors npm package safely
let cors;
try {
  cors = require('cors');
  app.use(cors({ origin: '*', methods: '*', allowedHeaders: '*' }));
} catch (e) {
  console.log('cors package not found, using built-in CORS middleware');
}

// Universal Subdirectory Prefix Normalizer for cPanel Phusion Passenger
app.use((req, res, next) => {
  if (req.url.startsWith('/aladhwastudio/api')) {
    req.url = req.url.replace('/aladhwastudio/api', '/api');
  } else if (req.url.startsWith('/aladhwastudio')) {
    req.url = req.url.replace('/aladhwastudio', '');
  }
  next();
});

// Universal CORS & No-Cache Middleware — Runs on every single request
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Safe Route Loading with All Path Aliases (/api/*, /*, /aladhwastudio/api/*)
try {
  const authRoutes = require('./routes/auth');
  app.use('/api/auth', authRoutes);
  app.use('/auth', authRoutes);
  app.use('/aladhwastudio/api/auth', authRoutes);
} catch (e) { console.error('Error loading auth routes:', e.message); }

try {
  const contactRoutes = require('./routes/contact');
  app.use('/api/contact', contactRoutes);
  app.use('/contact', contactRoutes);
  app.use('/aladhwastudio/api/contact', contactRoutes);
} catch (e) { console.error('Error loading contact routes:', e.message); }

try {
  const categoryRoutes = require('./routes/categories');
  app.use('/api/categories', categoryRoutes);
  app.use('/categories', categoryRoutes);
  app.use('/aladhwastudio/api/categories', categoryRoutes);
} catch (e) { console.error('Error loading category routes:', e.message); }

try {
  const blogRoutes = require('./routes/blogs');
  app.use('/api/blogs', blogRoutes);
  app.use('/blogs', blogRoutes);
  app.use('/aladhwastudio/api/blogs', blogRoutes);
} catch (e) { console.error('Error loading blog routes:', e.message); }

try {
  const galleryRoutes = require('./routes/gallery');
  app.use('/api/gallery', galleryRoutes);
  app.use('/gallery', galleryRoutes);
  app.use('/aladhwastudio/api/gallery', galleryRoutes);
} catch (e) { console.error('Error loading gallery routes:', e.message); }

// Health Check Endpoint
app.get(['/api/health', '/health', '/', '/aladhwastudio/api/health'], (req, res) => {
  res.json({ status: 'ok', server: 'AL ADHWA API', timestamp: new Date().toISOString() });
});

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

// Only listen directly if executed via `node server.js`
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
