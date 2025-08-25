const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

// @route   POST api/contact
// @desc    Send a contact form message via email
// @access  Public
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // 1. Nodemailer Transporter banana
  // Yeh email bhejne ki service (jaise Gmail) ko set up karta hai
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Aapka email
      pass: process.env.EMAIL_PASS, // Aapka App Password
    },
  });

  // 2. Email ka content define karna
  const mailOptions = {
    from: `"${name}" <${email}>`, // Bhejne waale ka naam aur email
    to: process.env.EMAIL_USER, // Email kahan jayega (aapke paas)
    subject: `New Contact Message from ${name}`,
    text: `You have received a new message from:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  // 3. Email bhejna
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send message.' });
  }
});

module.exports = router;
