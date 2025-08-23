const mongoose = require('mongoose');

// Ye humara blueprint hai
const ItemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['lost', 'found'], // Sirf ye do values ho sakti hain
    required: true,
  },
  title: {
    type: String,
    required: true, // Ye field zaroori hai
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String, // Ye zaroori nahi hai, user photo de bhi sakta hai, nahi bhi
  },
  contactName: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
    required: true,
  },
  postedAt: {
    type: Date,
    default: Date.now, // Jab bhi naya item banega, ye date apne aap set ho jayegi
  },
});

// Is blueprint ko use karke ek model banate hain aur usko export karte hain
module.exports = mongoose.model('Item', ItemSchema);

