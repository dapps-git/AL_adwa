const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// ── CORS ──────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  'https://admin.aladhwastudio.com',
  'https://aladhwastudio.com',
  'http://localhost:3000',
  'http://localhost:3001',
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin) {
    // Direct requests (e.g. curl, Postman) — allow
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle preflight immediately — never pass OPTIONS to route handlers
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── MongoDB ───────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aladhwa_studio')
  .then(() => console.log('✅  MongoDB connected'))
  .catch(err => console.error('❌  MongoDB error:', err));

// ── Routes ────────────────────────────────────────────────
const authRoutes       = require('./routes/auth');
const categoriesRoutes = require('./routes/categories');
const blogsRoutes      = require('./routes/blogs');
const galleryRoutes    = require('./routes/gallery');
const contactRoutes    = require('./routes/contact');

// Standard API Routes
app.use('/api/auth',       authRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/blogs',      blogsRoutes);
app.use('/api/gallery',    galleryRoutes);
app.use('/api/contact',    contactRoutes);

// cPanel Subpath Routes (e.g. /aladhwastudio/api/...)
app.use('/aladhwastudio/api/auth',       authRoutes);
app.use('/aladhwastudio/api/categories', categoriesRoutes);
app.use('/aladhwastudio/api/blogs',      blogsRoutes);
app.use('/aladhwastudio/api/gallery',    galleryRoutes);
app.use('/aladhwastudio/api/contact',    contactRoutes);

// ── Health & Root check ───────────────────────────────────
app.get('/', (req, res) => res.status(200).send('AL ADHWA Studio API Running'));
app.get('/aladhwastudio', (req, res) => res.status(200).send('AL ADHWA Studio API Running'));
app.get('/api/health', (req, res) => res.json({ ok: true, ts: new Date() }));
app.get('/aladhwastudio/api/health', (req, res) => res.json({ ok: true, ts: new Date() }));

const PORT = process.env.PORT || 4000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`🚀  Backend running on http://localhost:${PORT}`));
}

module.exports = app;
