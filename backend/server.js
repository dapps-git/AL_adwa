const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');

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

// Master Admin Auth Constants
const ADMIN_EMAIL = 'aladhwastudio@admin.com';
const ADMIN_PASS  = 'admin@aladhwastudio1234';
const SECRET      = process.env.JWT_SECRET || 'al_adhwa_secret_key_2026_sharp';
const EXPIRE      = process.env.JWT_EXPIRE  || '30d';

// DIRECT LOGIN ENDPOINT — Listens on ALL path variations
const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const cleanEmail = String(email).toLowerCase().trim();

    if (cleanEmail === ADMIN_EMAIL && password === ADMIN_PASS) {
      const token = jwt.sign({ id: 'master-admin-1', role: 'admin' }, SECRET, { expiresIn: EXPIRE });
      return res.json({
        token,
        admin: { id: 'master-admin-1', email: ADMIN_EMAIL, name: 'AL ADHWA Admin', role: 'admin' },
      });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

app.post('/api/auth/login', loginHandler);
app.post('/auth/login', loginHandler);
app.post('/aladhwastudio/api/auth/login', loginHandler);
app.post('/aladhwastudio/auth/login', loginHandler);
app.post('/login', loginHandler);

// Health Check Endpoint — Listens on ALL path variations
const healthHandler = (req, res) => {
  res.json({ status: 'ok', server: 'AL ADHWA API', timestamp: new Date().toISOString() });
};

app.get('/api/health', healthHandler);
app.get('/health', healthHandler);
app.get('/aladhwastudio/api/health', healthHandler);
app.get('/aladhwastudio/health', healthHandler);
app.get('/', healthHandler);

// Safe Route Loader for Other Endpoints
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

safeLoadRoute('/api/contact', './routes/contact');
safeLoadRoute('/api/categories', './routes/categories');
safeLoadRoute('/api/blogs', './routes/blogs');
safeLoadRoute('/api/gallery', './routes/gallery');

// Fallback Root Router Catch-All (Node 22 path-to-regexp safe)
app.use((req, res) => {
  res.json({ status: 'ok', server: 'AL ADHWA API', message: 'Endpoint active', path: req.originalUrl });
});

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
