const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB URI from environment variable
const dbURI = process.env.MONGO_URI; // Make sure you set MONGO_URI in your .env file

// Connect to MongoDB
mongoose.connect(dbURI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Import FoodItem model
const FoodItem = require('./models/FoodItem');

// POST route to create a new food item
app.post('/api/food', async (req, res) => {
  const { name, description, price, imageUrl, category } = req.body;

  const foodItem = new FoodItem({
    name,
    description,
    price,
    imageUrl,
    category,
  });

  try {
    const newFoodItem = await foodItem.save();
    res.status(201).json(newFoodItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Sample route
// GET route to fetch all food items
app.get('/api/food', async (req, res) => {
    try {
      const foodItems = await FoodItem.find();
      res.json(foodItems);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
