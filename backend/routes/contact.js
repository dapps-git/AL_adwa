const express = require('express');
const router  = express.Router();
const nodemailer = require('nodemailer');

// ── Nodemailer transporter ──────────────────────────────────
function createTransporter() {
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST   || 'mail.aladhwastudio.com',
    port:   Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER || 'info@aladhwastudio.com',
      pass: process.env.SMTP_PASS || '',
    },
    tls: { rejectUnauthorized: false },
  });
}

// ── POST /api/contact ───────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { name, email, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, message: 'Name, email, and message are required.' });
    }

    const toEmail = process.env.CONTACT_TO || 'info@aladhwastudio.com';
    const transporter = createTransporter();

    // ── Email to studio (notification) ──
    await transporter.sendMail({
      from:    `"AL ADHWA Studio Website" <${process.env.SMTP_USER}>`,
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
    });

    // ── Auto-reply to sender ──
    await transporter.sendMail({
      from:    `"AL ADHWA Studio" <${process.env.SMTP_USER}>`,
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
            AL ADHWA Studio — P.O BOX: 95161, Muwailah, Sharjah, UAE
          </div>
        </div>
      `,
    });

    return res.json({ ok: true, message: 'Message sent successfully.' });
  } catch (err) {
    console.error('Contact email error:', err);
    return res.status(500).json({ ok: false, message: 'Failed to send email. Please try again.' });
  }
});

module.exports = router;
