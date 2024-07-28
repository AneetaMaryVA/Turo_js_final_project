const mongoose = require('mongoose');
const app = require('./app');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Start the server
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });

    // Seed database with tours
    seedTours();
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

// Seed the database with tours if not already present
async function seedTours() {
  const Tour = require('./models/tour');

  const tours = await Tour.find();
  if (tours.length === 0) {
    const sampleTours = [
        { name: 'Paris Explorer', description: 'Explore the city of love.', price: 500, availableSlots: 10, location: { address: 'Eiffel Tower, Paris', lat: 48.8584, lng: 2.2945 } },
        { name: 'Safari Adventure', description: 'Experience the wild safari.', price: 800, availableSlots: 8, location: { address: 'Serengeti National Park, Tanzania', lat: -2.3333, lng: 34.8333 } },
        { name: 'Beach Paradise', description: 'Relax on the beautiful beaches.', price: 300, availableSlots: 15, location: { address: 'Maldives', lat: 3.2028, lng: 73.2207 } },
        { name: 'Mountain Trek', description: 'Conquer the majestic mountains.', price: 450, availableSlots: 12, location: { address: 'Everest Base Camp, Nepal', lat: 28.0026, lng: 86.8528 } },
        { name: 'City Lights', description: 'Discover the vibrant city life.', price: 350, availableSlots: 20, location: { address: 'New York City, USA', lat: 40.7128, lng: -74.0060 } },
        { name: 'Historical Journey', description: 'Dive into rich history and culture.', price: 400, availableSlots: 10, location: { address: 'The Colosseum, Rome', lat: 41.8902, lng: 12.4922 } },
        { name: 'Island Escape', description: 'Unwind on a peaceful island.', price: 600, availableSlots: 5, location: { address: 'Bora Bora, French Polynesia', lat: -16.5000, lng: -151.7415 } },
        { name: 'Desert Safari', description: 'Adventure through the vast deserts.', price: 550, availableSlots: 10, location: { address: 'Dubai Desert, UAE', lat: 25.276987, lng: 55.296249 } },
        { name: 'Rainforest Expedition', description: 'Explore the dense rainforest.', price: 700, availableSlots: 7, location: { address: 'Amazon Rainforest, Brazil', lat: -3.4653, lng: -62.2159 } },
        { name: 'Northern Lights', description: 'Witness the awe-inspiring auroras.', price: 900, availableSlots: 6, location: { address: 'Reykjavik, Iceland', lat: 64.1265, lng: -21.8174 } }
      ];
      
      // { name: 'Paris Explorer', description: 'Explore the city of love.', price: 500, availableSlots: 10 },
      // { name: 'Safari Adventure', description: 'Experience the wild safari.', price: 800, availableSlots: 8 },
      // { name: 'Beach Paradise', description: 'Relax on the beautiful beaches.', price: 300, availableSlots: 15 },
      // { name: 'Mountain Trek', description: 'Conquer the majestic mountains.', price: 450, availableSlots: 12 },
      // { name: 'City Lights', description: 'Discover the vibrant city life.', price: 350, availableSlots: 20 },
      // { name: 'Historical Journey', description: 'Dive into rich history and culture.', price: 400, availableSlots: 10 },
      // { name: 'Island Escape', description: 'Unwind on a peaceful island.', price: 600, availableSlots: 5 },
      // { name: 'Desert Safari', description: 'Adventure through the vast deserts.', price: 550, availableSlots: 10 },
      // { name: 'Rainforest Expedition', description: 'Explore the dense rainforest.', price: 700, availableSlots: 7 },
      // { name: 'Northern Lights', description: 'Witness the awe-inspiring auroras.', price: 900, availableSlots: 6 }
    // ];

    await Tour.insertMany(sampleTours);
    console.log('Sample tours have been added to the database.');
  }
}
