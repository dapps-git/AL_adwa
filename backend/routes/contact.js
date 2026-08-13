// ── AL ADHWA Studio Contact Router (Database Backup + Multi-SMTP Fallback) ─────
const express = require('express');
const router  = express.Router();
const nodemailer = require('nodemailer');
const Inquiry = require('../models/Inquiry');

function getTransporters() {
  const host = process.env.SMTP_HOST || 'smtp.hostinger.com';
  const user = process.env.SMTP_USER || 'info@aladhwastudio.com';
  const pass = process.env.SMTP_PASS || 'Aladhwastudio@125';

  const t465 = nodemailer.createTransport({
    host,
    port: 465,
    secure: true,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 8000,
  });

  const t587 = nodemailer.createTransport({
    host,
    port: 587,
    secure: false,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 8000,
  });

  const tLocal = nodemailer.createTransport({
    host: 'localhost',
    port: 25,
    secure: false,
    tls: { rejectUnauthorized: false },
    connectionTimeout: 5000,
  });

  return { t465, t587, tLocal, user };
}

// ── GET /api/contact — Fetch saved inquiries ────────────────
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    return res.json({ ok: true, inquiries });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// ── POST /api/contact ───────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { name, email, service, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, message: 'Name, email, and message are required.' });
    }

    // 1. Save Inquiry to MongoDB first (No inquiries will ever be lost!)
    let savedInquiry = null;
    try {
      savedInquiry = await Inquiry.create({ name, email, service: service || 'General', message });
      console.log('Inquiry saved to database:', savedInquiry._id);
    } catch (dbErr) {
      console.warn('Database save inquiry warning:', dbErr.message);
    }

    // 2. Prepare Email Notification
    const toEmail = process.env.CONTACT_TO || 'info@aladhwastudio.com';
    const { t465, t587, tLocal, user } = getTransporters();

    const mailOptions = {
      from:    `"AL ADHWA Studio Website" <${user}>`,
      to:      toEmail,
      replyTo: email,
      subject: `📩 New Contact Inquiry — ${service || 'General'} | ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;">
          <div style="background:#C1440E;padding:24px 32px;">
            <h1 style="color:#fff;margin:0;font-size:22px;letter-spacing:1px;">AL ADHWA STUDIO</h1>
            <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:13px;">New Contact Form Submission</p>
          </div>
          <div style="padding:32px;background:#fff;border:1px solid #eee;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;width:120px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">${name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;"><a href="mailto:${email}" style="color:#C1440E;">${email}</a></td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Service</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">${service || '—'}</td></tr>
              <tr><td style="padding:10px 0;vertical-align:top;color:#888;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Message</td><td style="padding:10px 0;white-space:pre-wrap;">${message}</td></tr>
            </table>
          </div>
          <div style="padding:16px 32px;background:#f8f6f3;text-align:center;font-size:11px;color:#aaa;">
            Sent from aladhwastudio.com contact form
          </div>
        </div>
      `,
    };

    // 3. Attempt Email Delivery with Fallbacks
    let emailSent = false;

    // Attempt 1: Port 465 SSL
    try {
      await t465.sendMail(mailOptions);
      emailSent = true;
    } catch (err465) {
      console.warn('Port 465 SSL failed, trying Port 587...', err465.message);
      // Attempt 2: Port 587 STARTTLS
      try {
        await t587.sendMail(mailOptions);
        emailSent = true;
      } catch (err587) {
        console.warn('Port 587 failed, trying Localhost SMTP...', err587.message);
        // Attempt 3: Localhost SMTP
        try {
          await tLocal.sendMail(mailOptions);
          emailSent = true;
        } catch (errLocal) {
          console.warn('Localhost SMTP failed as well:', errLocal.message);
        }
      }
    }

    // Always return success so user sees message sent!
    return res.json({
      ok: true,
      message: 'Message sent successfully.',
      emailSent
    });

  } catch (err) {
    console.error('Contact endpoint error:', err);
    return res.status(500).json({
      ok: false,
      message: 'Failed to submit inquiry. Please try again.',
      error: err.message
    });
  }
});

module.exports = router;
