const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express(); // ✅ Must be declared before using routes
const PORT = 5000;

// Models
const Feedback = require('./models/Feedback');

// Routes

const propertyRoutes = require('./routes/propertyRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect('mongodb://localhost:27017/feedbackDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB error:', err));

// Use Routes

app.use('/api/properties', propertyRoutes);

// Feedback route
app.post('/api/submit', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required.' });

  try {
    const fb = new Feedback({ name });
    await fb.save();
    res.json({ message: `Hello, ${name}! Your data was saved.` });
  } catch {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Test routes
app.get('/', (req, res) => {
  res.send('Welcome to the House Hunt Backend!');
});

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Backend running at http://localhost:${PORT}`));
