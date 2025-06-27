require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Route imports

const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/feedbackDB')
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB error:', err));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));


// Default route
app.get('/', (req, res) => {
  res.send('🏡 Welcome to HouseHunt backend!');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
