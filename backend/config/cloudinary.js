const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'tcsawvun',
  api_key:    process.env.CLOUDINARY_API_KEY || '135471722828286',
  api_secret: process.env.CLOUDINARY_API_SECRET || '_6UuX7Qo--ZMfP23aqSuMnfNbO0',
});

module.exports = cloudinary;
