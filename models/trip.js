const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  name: String,
  destination: String,
  startDate: Date,
  endDate: Date,
  description: String,
  price: Number
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
