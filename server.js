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
      { name: 'Paris Explorer', description: 'Explore the city of love.', price: 500, availableSlots: 10 },
      { name: 'Safari Adventure', description: 'Experience the wild safari.', price: 800, availableSlots: 8 },
      { name: 'Beach Paradise', description: 'Relax on the beautiful beaches.', price: 300, availableSlots: 15 },
      { name: 'Mountain Trek', description: 'Conquer the majestic mountains.', price: 450, availableSlots: 12 },
      { name: 'City Lights', description: 'Discover the vibrant city life.', price: 350, availableSlots: 20 },
      { name: 'Historical Journey', description: 'Dive into rich history and culture.', price: 400, availableSlots: 10 },
      { name: 'Island Escape', description: 'Unwind on a peaceful island.', price: 600, availableSlots: 5 },
      { name: 'Desert Safari', description: 'Adventure through the vast deserts.', price: 550, availableSlots: 10 },
      { name: 'Rainforest Expedition', description: 'Explore the dense rainforest.', price: 700, availableSlots: 7 },
      { name: 'Northern Lights', description: 'Witness the awe-inspiring auroras.', price: 900, availableSlots: 6 }
    ];

    await Tour.insertMany(sampleTours);
    console.log('Sample tours have been added to the database.');
  }
}
