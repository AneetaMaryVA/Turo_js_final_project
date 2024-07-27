const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  availableSlots: Number
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
