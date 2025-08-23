const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ----- DATABASE CONNECTION -----
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};
connectDB();

// =============================================================
// NAYI CHEEZEIN YAHAN HAIN
// =============================================================

// 1. Body Parser Middleware
// Yeh server ko batata hai ki frontend se aane waale JSON data ko kaise samajhna hai.
// Iske bina, `req.body` hamesha khaali (undefined) rahega.
app.use(express.json());

// 2. Main Gate par Direction Board
// Yeh server ko batata hai ki agar koi bhi URL '/api/items' se shuru ho,
// toh us request ko seedha `routes/items.js` waali file ke paas bhej do.
app.use('/api/items', require('./routes/items'));

// =============================================================

// Humara purana test route
app.get('/', (req, res) => {
  res.send('Hello World! Hamara server chal raha hai.');
});

// Server ko start karna
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});