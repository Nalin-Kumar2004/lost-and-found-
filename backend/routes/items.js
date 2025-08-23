const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// ROUTE 1: Naya item post karna (Pehle se hai)
router.post('/', async (req, res) => {
  // ... (no change here)
  try {
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
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Error saving item:', error.message);
    res.status(500).json({ message: 'Server error, please try again.' });
  }
});

// ROUTE 2: Saare items get karna (Pehle se hai)
router.get('/', async (req, res) => {
  // ... (no change here)
  try {
    const items = await Item.find().sort({ postedAt: -1 });
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error.message);
    res.status(500).json({ message: 'Server error, please try again.' });
  }
});

// ================================================================
// NAYA CODE YAHAN SE SHURU HAI
// ================================================================

// ----------------------------------------------------------------
// ROUTE 3: Ek single item ko uski ID se get karna
// ----------------------------------------------------------------
// @route   GET api/items/:id
// @desc    Get a single item by its ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    // req.params.id se hum URL se ID nikaal rahe hain
    const item = await Item.findById(req.params.id);

    // Agar uss ID ka item nahi milta hai, toh error bhejo
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item); // Agar item mil gaya, toh usko bhej do
  } catch (error) {
    console.error('Error fetching item by ID:', error.message);
    res.status(500).json({ message: 'Server error, please try again.' });
  }
});

module.exports = router;

// ka matlab hai ki aap router object ko is file se "export" kar rahe ho, taki doosri files (jaise index.js) isko "import" kar sakein.

// Jab aap require('./routes/items') likhte ho apne index.js mein, toh woh yahi router object ko import karta hai. Isse aapke routes (router.post('/', ...) etc.) aapke main app mein use ho sakte hain.

// Simple words mein:

// module.exports = router; se aap apne routes ko baahar bhej rahe ho.
// require('./routes/items') se aap un routes ko apne main server mein laa rahe ho aur use kar rahe ho.
// Yeh Node.js ka standard tarika hai cheezein share karne ka alag-alag files ke beech.

//---------------More Explaination------------------------------------------

// Q)--->kya hum directly items.js ko export kar de aur import kar le tab kya kaam karega ?

// Ans--->Aap directly items.js ko export/import kar sakte hain, lekin kaam tabhi karega jab aap sahi cheez export kar rahe hain.
// Aapka items.js ek Express router banata hai:
// const router = express.Router();
// ...routes...
// module.exports = router;

// Isliye jab aap require('./routes/items') karte hain, aapko ek router object milta hai, jo app.use('/api/items', ...) mein kaam karta hai.
// Agar aap items.js mein sirf functions ya variables export karenge (router nahi), toh app.use() kaam nahi karega, kyunki usko ek router ya middleware chahiye.
// Summary:
// •	module.exports = router; hona chahiye, taki app.use() sahi tarike se kaam kare.
// •	Agar aap kuch aur export karenge (jaise function ya object jo router nahi hai), toh error aayega ya route kaam nahi karega.
// Aapko hamesha router hi export karna hai jab aap Express routes bana rahe hain.



