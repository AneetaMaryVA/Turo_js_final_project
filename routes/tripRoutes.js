const express = require('express');
const Trip = require('../models/trip'); // Assuming you have a Trip model
const Tour = require('../models/tour'); // Assuming you have a Tour model
const router = express.Router();

// Middleware to check if user is logged in
function isLoggedIn(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
}
// Render the createTrips page
router.get('/trips', isLoggedIn, (req, res) => {
    res.render('createTrip', { user: req.session.user });
});
// Create a new trip and add it to tours
router.post('/trips', isLoggedIn, async (req, res) => {
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
});

module.exports = router;
