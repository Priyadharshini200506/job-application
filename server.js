const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();  // Load environment variables from .env

// MongoDB URI from environment variables
const mongoURI = process.env.MONGO_URI;

// Debugging log to check if the MONGO_URI is being loaded properly
console.log('MongoDB URI:', mongoURI);  // Will show the URI or undefined if not loaded

if (!mongoURI) {
  console.error('MongoDB URI not provided!');
  process.exit(1);  // Exit the process if the URI is not available
}

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.error('MongoDB Connection Failed:', err);
  });

// Define a route to check the MongoDB connection status and show a friendly message
app.get('/status', (req, res) => {
  if (mongoose.connection.readyState === 1) {
    // Display a friendly message if MongoDB is connected
    res.send('<h1>Welcome! MongoDB is connected!</h1>');
  } else {
    // Display a friendly message if MongoDB is not connected
    res.send('<h1>Hello! MongoDB connection failed!</h1>');
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
