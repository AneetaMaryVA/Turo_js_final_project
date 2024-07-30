const Trip = require('../models/trip');
const Tour = require('../models/tour');

// Render the createTrips page
exports.renderCreateTripsPage = (req, res) => {
    res.render('createTrips', { user: req.session.user });
};

// Create a new trip and add it to tours
exports.createTrip = async (req, res) => {
    console.log('trip route');
    try {
        const { name, destination, startDate, endDate, description, price } = req.body;
        
        // Create a new trip
        const newTrip = new Trip({ name, destination, startDate, endDate, description, price });
        await newTrip.save();

        // Add the trip to tours collection
        const newTour = new Tour({ name, destination, startDate, endDate, description, price });
        await newTour.save();

        res.redirect('/trips');
    } catch (err) {
        console.error('Error creating trip:', err);
        res.status(500).send('Error creating trip.');
    }
};
