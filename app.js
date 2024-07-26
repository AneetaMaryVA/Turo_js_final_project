const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Define a schema and model for MongoDB
const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
});

const Item = mongoose.model('Item', itemSchema);

// Basic route to test the server
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js and MongoDB app!');
});

// Route to get all items
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
});

// Route to add a new item
app.post('/items', async (req, res) => {
  const newItem = new Item(req.body);
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error adding item' });
  }
});

module.exports = app;
