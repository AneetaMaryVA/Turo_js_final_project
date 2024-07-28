const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  availableSlots: Number,
  location: {
    address: String,  // e.g., "Eiffel Tower, Paris"
    lat: Number,      // Latitude
    lng: Number       // Longitude
  }
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
