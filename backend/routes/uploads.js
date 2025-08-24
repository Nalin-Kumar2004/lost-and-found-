const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Cloudinary ko humare credentials ke saath configure karo
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @route   POST api/uploads/sign
// @desc    Generate a signature for direct cloud upload
// @access  Public
router.post('/sign', async (req, res) => {
  try {
    // Frontend se 'timestamp' aur 'upload_preset' aayega
    const { timestamp, upload_preset } = req.body;

    // Cloudinary se ek secure signature generate karo
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        upload_preset: upload_preset,
      },
      process.env.CLOUDINARY_API_SECRET
    );

    res.json({ signature });
  } catch (error) {
    console.error('Error generating signature:', error);
    res.status(500).json({ message: 'Server error while generating signature.' });
  }
});

module.exports = router;
