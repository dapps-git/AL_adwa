// ── AL ADHWA Studio Contact Router (Hostinger Business Email Enabled) ─────
const express = require('express');
const router  = express.Router();
const nodemailer = require('nodemailer');

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
    connectionTimeout: 10000,
  });

  const t587 = nodemailer.createTransport({
    host,
    port: 587,
    secure: false,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 10000,
  });

  return { t465, t587, user };
}

// ── POST /api/contact ───────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { name, email, service, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, message: 'Name, email, and message are required.' });
    }

    const toEmail = process.env.CONTACT_TO || 'info@aladhwastudio.com';
    const { t465, t587, user } = getTransporters();

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

    let activeTransporter = t465;
    try {
      await t465.sendMail(mailOptions);
    } catch (err465) {
      console.warn('Port 465 failed, trying Port 587...', err465.message);
      activeTransporter = t587;
      await t587.sendMail(mailOptions);
    }

    // ── Auto-reply to sender ──
    try {
      await activeTransporter.sendMail({
        from:    `"AL ADHWA Studio" <${user}>`,
        to:      email,
        subject: `Thank you for reaching AL ADHWA Studio, ${name}!`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;">
            <div style="background:#C1440E;padding:24px 32px;">
              <h1 style="color:#fff;margin:0;font-size:22px;letter-spacing:1px;">AL ADHWA STUDIO</h1>
              <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:13px;">Sharjah, United Arab Emirates</p>
            </div>
            <div style="padding:32px;background:#fff;border:1px solid #eee;">
              <p>Dear <strong>${name}</strong>,</p>
              <p>Thank you for contacting <strong>AL ADHWA Studio</strong>. We have received your inquiry and one of our team members will get back to you shortly.</p>
              <p>In the meantime, feel free to explore our services at <a href="https://aladhwastudio.com" style="color:#C1440E;">aladhwastudio.com</a>.</p>
              <br/>
              <p style="margin:0;">Warm regards,</p>
              <p style="margin:4px 0 0;font-weight:600;">AL ADHWA Studio Team</p>
              <p style="margin:4px 0 0;font-size:12px;color:#888;">📞 +971 52 5331575 &nbsp;|&nbsp; 📧 info@aladhwastudio.com</p>
            </div>
            <div style="padding:16px 32px;background:#f8f6f3;text-align:center;font-size:11px;color:#aaa;">
              AL ADHWA Studio — P.O BOX: 95161, Muwaileh, Sharjah, UAE
            </div>
          </div>
        `,
      });
    } catch (autoReplyErr) {
      console.warn('Auto-reply email could not be delivered to sender:', autoReplyErr.message);
    }

    return res.json({ ok: true, message: 'Message sent successfully.' });
  } catch (err) {
    console.error('Contact email error:', err);
    return res.status(500).json({
      ok: false,
      message: err.message || 'Failed to send email. Please try again.',
      code: err.code || 'UNKNOWN'
    });
  }
});

module.exports = router;
