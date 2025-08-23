// 1. Zaruri packages ko import karna
const express = require('express');

// 2. Express app banana
const app = express();
const PORT = 5000; // Humara server is port par chalega

// 3. Ek test route banana
// Jab koi humare server ke home page par aayega, toh ye message dikhega
app.get('/', (req, res) => {
  res.send('Hello World! Hamara server chal raha hai.');
});

// 4. Server ko start karna
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

