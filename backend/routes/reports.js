const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Report = require('../models/Report'); // Naye model ko import karo
require('dotenv').config();

// @route   POST api/reports
// @desc    Report an item
// @access  Public
router.post('/', async (req, res) => {
  const { itemId, reason, message } = req.body;

  try {
    // 1. Report ko database mein save karo (auditing ke liye)
    const newReport = new Report({ itemId, reason, message });
    await newReport.save();

    // 2. Admin ko email bhejo
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Email admin ko hi jayega
      subject: `New Item Report - Reason: ${reason}`,
      html: `
        <h2>A new item has been reported.</h2>
        <p><strong>Item ID:</strong> ${itemId}</p>
        <p><strong>Reason:</strong> ${reason}</p>
        <p><strong>Message:</strong> ${message || 'No message provided.'}</p>
        <p>Click here to view the item: <a href="http://localhost:5173/items/${itemId}">View Item</a></p>
      `,
    };
    // IMPORTANT: Upar 'YOUR_FRONTEND_URL' ko apne frontend ke URL se badalna, jaise 'http://localhost:5173'

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Report submitted successfully!' });
  } catch (error) {
    console.error('Error submitting report:', error);
    res.status(500).json({ message: 'Failed to submit report.' });
  }
});

module.exports = router;
