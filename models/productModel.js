const mongoose = require("mongoose");

// Define the schema for a Product
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    //required: true,
    trim: true,
  },
  description: {
    type: String,
    //required: true,
  },
  mrp: {
    type: Number,
    //required: true,
    min: 0,
  },
  price: {
    type: Number,
    //required: true,
    min: 0,
  },
  category: {
    type: String,
    //required: true,
  },
  imageUrl: {
    type: String,
    //required: true,
  },
  brand: {
    type: String,
    default: "Agro Pean",
  },
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  countInStock: {
    type: Number,
    default: 1000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create models from the schemas
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
