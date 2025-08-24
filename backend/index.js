// =============================================================
// SECTION 1: IMPORTS (Zaroori tools ko bulana)
// =============================================================

// express: Node.js ka sabse popular framework. Server banane aur API routes manage karne mein madad karta hai.
const express = require('express');

// mongoose: MongoDB database se baat karna aasan banata hai. Yeh data ko model karne aur save/fetch karne mein help karta hai.
const mongoose = require('mongoose');

// cors: Cross-Origin Resource Sharing. Yeh ek security middleware hai jo batata hai ki humare backend se kaun-kaun (jaise humara frontend) baat kar sakta hai.
const cors = require('cors');

// dotenv: Environment variables ko `.env` file se load karne mein madad karta hai taaki hum secrets (jaise database password) ko code se alag rakh sakein.
require('dotenv').config();

// =============================================================
// SECTION 2: APP INITIALIZATION (Server ki neev rakhna)
// =============================================================

// 'app' object banana. Yeh object hi humara poora Express server represent karta hai.
const app = express();

// Port define karna. Server is port number par chalega.
// `process.env.PORT` production ke liye hai, `5000` humare local development ke liye hai.
const PORT = process.env.PORT || 5000;

// =============================================================
// SECTION 3: MIDDLEWARES (Server ke "Gatekeepers" aur "Translators")
// =============================================================
// Middlewares aisi functions hain jo har request ke aane par, route tak pahunchne se pehle chalti hain.

// CORS Middleware: Yeh frontend (jo alag port par chal raha hai) ko backend se request karne ki permission deta hai.
app.use(cors());

// Body Parser Middleware for JSON: Yeh server ko batata hai ki frontend se aane waale JSON data ko kaise samajhna hai.
// Iske bina, `req.body` hamesha khaali (undefined) rahega.
app.use(express.json());

// =============================================================
// SECTION 4: DATABASE CONNECTION (Database se rishta jodna)
// =============================================================

// Ek function jo database se connect karne ki koshish karega.
const connectDB = async () => {
  // `try...catch` block errors ko handle karne ke liye.
  try {
    // Mongoose ka use karke `.env` file se `MONGO_URI` lekar connect karo.
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    // Agar connection mein koi error aata hai, toh usko console par dikhao.
    console.error('MongoDB connection failed:', error.message);
    // Aur server ko band kar do, kyunki bina database ke app nahi chal sakta.
    process.exit(1);
  }
};

// Database connection function ko call karo.
connectDB();

// =============================================================
// SECTION 5: ROUTES (Alag-alag URL ke liye "Direction Board")
// =============================================================
// Yeh server ko batata hai ki kis URL par aane waali request ko kahan bhejna hai.

// Jab bhi koi request `/api/items` se shuru ho, toh us request ko `routes/items.js` file ke paas bhej do.
app.use('/api/items', require('./routes/items'));

app.use('/api/uploads', require('./routes/uploads')); // <-- YEH NAYI LINE HAI

// Ek simple sa test route jo server ke homepage par "Hello World" dikhata hai.
app.get('/', (req, res) => {
  res.send('Hello World! Hamara server chal raha hai.');
});

// =============================================================
// SECTION 6: SERVER START (Server ko chalu karna)
// =============================================================

// Server ko 'PORT' par "listen" (sun'na) shuru karwao.
// Iska matlab hai ki server ab ready hai aur is port par aane waali requests ka intezaar kar raha hai.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


/*
=============================================================
REQUEST KA FLOW KAISE KAAM KARTA HAI (EK REQUEST KA SAFAR)
=============================================================

Socho, frontend se ek naya item post karne ki request aati hai (POST http://localhost:5000/api/items).

1.  **Request Server par Aati Hai:** Sabse pehle, request Express server (`app`) tak pahunchti hai.

2.  **Middlewares Chalte Hain:**
    * `app.use(cors())` chalta hai. Yeh check karta hai ki request allowed origin se hai ya nahi aur permission deta hai.
    * `app.use(express.json())` chalta hai. Yeh request ki body mein se JSON data ko nikaal kar `req.body` object mein daal deta hai taaki aage use kiya ja sake.

3.  **Routing (Raasta Tay Hota Hai):**
    * Server request ka URL dekhta hai, jo ki `/api/items` hai.
    * `app.use('/api/items', require('./routes/items'))` waali line match ho jaati hai.
    * Express is request ko `routes/items.js` file ke "hawale" kar deta hai.

4.  **Route Handler (Sahi Function Chalta Hai):**
    * `routes/items.js` file ke andar, router dekhta hai ki yeh ek `POST` request hai.
    * Toh, `router.post('/', ...)` waala function trigger ho jaata hai.

5.  **Controller Logic (Asli Kaam Hota Hai):**
    * Is function ke andar, hum `req.body` se data nikaalte hain.
    * `Item` model ka use karke ek naya item banate hain.
    * `newItem.save()` function se us item ko MongoDB database mein save kar dete hain.

6.  **Response Waapas Jata Hai:**
    * Database mein item save hone ke baad, humara server `res.status(201).json(savedItem)` se frontend ko ek success response (saved item ke data ke saath) waapas bhejta hai.

Yeh poora safar milli-seconds mein complete ho jaata hai.

*/
