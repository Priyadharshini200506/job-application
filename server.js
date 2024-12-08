const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config(); // Load environment variables from .env

// MongoDB URI from environment variables
const mongoURI = process.env.MONGO_URI;

// Debugging log to verify the value of MONGO_URI
console.log('MongoDB URI:', mongoURI);

if (!mongoURI) {
  console.error('MongoDB URI not provided!');
  process.exit(1); // Exit the process if the URI is not available
}

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB Connected');
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Failed:', err);
  });

// Root route to display a message
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Backend!</h1><p>This is your backend homepage.</p>');
});

// Optional /status route to check MongoDB connection status
app.get('/status', (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.send('<h1>Status: MongoDB is connected!</h1>');
  } else {
    res.send('<h1>Status: MongoDB connection failed!</h1>');
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
