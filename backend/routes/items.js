const express = require('express');
const router = express.Router();

// Step 1: Apne Item model ko import karo
const Item = require('../models/Item');

// Route:  POST /api/items
// Kaam:   Ek naya item database mein save karna
router.post('/', async (req, res) => {
  try {
    // Step 2: Frontend se aaye data se ek naya item banao
    const newItem = new Item({
      type: req.body.type,
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      contactName: req.body.contactName,
      contactEmail: req.body.contactEmail,
      contactPhone: req.body.contactPhone,
      // imageUrl ko bhi yahan add kar sakte hain agar woh aa raha hai
    });

    // Step 3: Naye item ko database mein save karo
    const savedItem = await newItem.save();

    // Step 4: Frontend ko confirmation ke liye saved item waapas bhejo
    res.status(201).json(savedItem);

  } catch (error) {
    // Step 5: Agar koi error aaye, toh usko handle karo
    console.error('Error saving item:', error.message);
    res.status(500).json({ message: 'Server error, please try again.' });
  }
});

module.exports = router;