const express = require('express');
const path = require('path');

const app = express();

// Try loading dotenv
try { require('dotenv').config(); } catch (e) {}

// Try loading mongoose
let mongoose;
try { mongoose = require('mongoose'); } catch (e) {}

// Universal CORS & No-Cache Middleware — Runs on every single request
app.use((req, res, next) => {
  const origin = req.headers.origin;
  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Vary', 'Origin');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health Check Routes
app.get(['/health', '/api/health', '/aladhwastudio/api/health'], (req, res) => {
  res.json({ status: 'ok', server: 'AL ADHWA API', timestamp: new Date().toISOString() });
});

// Safe Route Loader with Universal Subfolder Aliasing
function safeLoadRoute(routePath, modulePath) {
  try {
    const router = require(modulePath);
    app.use(routePath, router);
    if (routePath.startsWith('/api/')) {
      const nonApi = routePath.replace('/api/', '/');
      app.use(nonApi, router);
      app.use(`/aladhwastudio${routePath}`, router);
      app.use(`/aladhwastudio${nonApi}`, router);
    }
  } catch (e) {
    console.error(`Error loading route ${routePath}:`, e.message);
  }
}

safeLoadRoute('/api/auth', './routes/auth');
safeLoadRoute('/api/contact', './routes/contact');
safeLoadRoute('/api/categories', './routes/categories');
safeLoadRoute('/api/blogs', './routes/blogs');
safeLoadRoute('/api/gallery', './routes/gallery');

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

if (mongoose && MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

// Only listen directly if executed via `node server.js`
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
