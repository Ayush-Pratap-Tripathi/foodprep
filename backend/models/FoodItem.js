const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: false },
  category: { type: String, required: true },
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem;
