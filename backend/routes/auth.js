const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const ADMIN_EMAIL = 'aladhwastudio@admin.com';
const ADMIN_PASS  = 'admin@aladhwastudio1234';
const SECRET      = process.env.JWT_SECRET || 'al_adhwa_secret_key_2026_sharp';
const EXPIRE      = process.env.JWT_EXPIRE  || '30d';

// Seed admin on startup (once)
async function seedAdmin() {
  try {
    const exists = await Admin.findOne({ email: ADMIN_EMAIL });
    if (!exists) {
      await Admin.create({ email: ADMIN_EMAIL, password: ADMIN_PASS, name: 'AL ADHWA Admin' });
      console.log('✅  Admin user seeded:', ADMIN_EMAIL);
    }
  } catch (e) {
    console.error('Admin seed error:', e.message);
  }
}
seedAdmin();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required' });

    const cleanEmail = email.toLowerCase().trim();
    let admin = await Admin.findOne({ email: cleanEmail });

    // Fallback: If no admin user exists in DB yet, create standard admin on valid credentials
    if (!admin) {
      if (cleanEmail === ADMIN_EMAIL && password === ADMIN_PASS) {
        admin = await Admin.create({ email: ADMIN_EMAIL, password: ADMIN_PASS, name: 'AL ADHWA Admin' });
        console.log('✅  Admin user created on first login:', ADMIN_EMAIL);
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      const match = await admin.matchPassword(password);
      if (!match)
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, role: admin.role }, SECRET, { expiresIn: EXPIRE });

    res.json({
      token,
      admin: { id: admin._id, email: admin.email, name: admin.name, role: admin.role },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
});

// GET /api/auth/me  (protected)
const protect = require('../middleware/auth');
router.get('/me', protect, (req, res) => {
  res.json({ admin: req.admin });
});

module.exports = router;
