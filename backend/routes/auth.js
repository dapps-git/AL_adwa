const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const ADMIN_EMAIL = 'aladhwastudio@admin.com';
const ADMIN_PASS  = 'admin@aladhwastudio1234';
const SECRET      = process.env.JWT_SECRET || 'al_adhwa_secret_key_2026_sharp';
const EXPIRE      = process.env.JWT_EXPIRE  || '30d';

// Seed admin when DB connects (non-blocking)
async function seedAdmin() {
  try {
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) return;
    const exists = await Admin.findOne({ email: ADMIN_EMAIL }).maxTimeMS(2000).catch(() => null);
    if (!exists) {
      await Admin.create({ email: ADMIN_EMAIL, password: ADMIN_PASS, name: 'AL ADHWA Admin' }).catch(() => null);
      console.log('✅  Admin user seeded:', ADMIN_EMAIL);
    }
  } catch (e) {
    // Non-blocking log
  }
}
setTimeout(seedAdmin, 3000);

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required' });

    const cleanEmail = email.toLowerCase().trim();
    
    // Direct check for master admin credentials
    if (cleanEmail === ADMIN_EMAIL && password === ADMIN_PASS) {
      let admin = await Admin.findOne({ email: cleanEmail }).maxTimeMS(3000).catch(() => null);
      if (!admin) {
        admin = { _id: 'master-admin-1', email: ADMIN_EMAIL, name: 'AL ADHWA Admin', role: 'admin' };
      }
      const token = jwt.sign({ id: admin._id, role: 'admin' }, SECRET, { expiresIn: EXPIRE });
      return res.json({
        token,
        admin: { id: admin._id, email: admin.email, name: admin.name, role: 'admin' },
      });
    }

    let admin = await Admin.findOne({ email: cleanEmail }).maxTimeMS(3000);

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const match = await admin.matchPassword(password);
    if (!match)
      return res.status(401).json({ message: 'Invalid credentials' });

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
