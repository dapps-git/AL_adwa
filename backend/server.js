const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// ── CORS ──────────────────────────────────────────────────
app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── MongoDB ───────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aladhwa_studio')
  .then(() => console.log('✅  MongoDB connected'))
  .catch(err => console.error('❌  MongoDB error:', err));

// ── Routes ────────────────────────────────────────────────
app.use('/api/auth',       require('./routes/auth'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/blogs',      require('./routes/blogs'));
app.use('/api/gallery',    require('./routes/gallery'));

// ── Health check ──────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ ok: true, ts: new Date() }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀  Backend running on http://localhost:${PORT}`));
