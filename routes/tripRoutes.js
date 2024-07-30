const express = require('express');
const tripController = require('../controller/tripController');

const router = express.Router();

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
}

// Render the createTrips page
router.get('/trips', isLoggedIn, tripController.renderCreateTripsPage);

// Create a new trip and add it to tours
router.post('/trips', isLoggedIn, tripController.createTrip);

module.exports = router;
