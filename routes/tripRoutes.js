const express = require('express');
const Trip = require('../models/trip');
const router = express.Router();

// Middleware to check if user is logged in
function isLoggedIn(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
}

// Display form to create a new trip
router.get('/trips/new', isLoggedIn, (req, res) => {
    res.render('createTrip');
});

// Create a new trip
router.post('/trips', isLoggedIn, async (req, res) => {
    try {
        const { name, startDate, endDate, destination } = req.body;
        const user = req.session.user._id;

        const trip = new Trip({ name, startDate, endDate, destination, user });
        await trip.save();
        res.redirect('/trips');
    } catch (err) {
        console.error('Error creating trip:', err);
        res.status(500).send('Error creating trip.');
    }
});

// Display all trips
router.get('/trips', isLoggedIn, async (req, res) => {
    try {
        const trips = await Trip.find({ user: req.session.user._id });
        res.render('trips', { trips });
    } catch (err) {
        console.error('Error retrieving trips:', err);
        res.status(500).send('Error retrieving trips.');
    }
});

// Display form to edit a trip
router.get('/trips/:id/edit', isLoggedIn, async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip || trip.user.toString() !== req.session.user._id.toString()) {
            return res.status(403).send('Forbidden');
        }
        res.render('editTrip', { trip });
    } catch (err) {
        console.error('Error retrieving trip:', err);
        res.status(500).send('Error retrieving trip.');
    }
});

// Update a trip
router.post('/trips/:id', isLoggedIn, async (req, res) => {
    try {
        const { name, startDate, endDate, destination } = req.body;
        const trip = await Trip.findById(req.params.id);
        if (!trip || trip.user.toString() !== req.session.user._id.toString()) {
            return res.status(403).send('Forbidden');
        }
        trip.name = name;
        trip.startDate = startDate;
        trip.endDate = endDate;
        trip.destination = destination;
        await trip.save();
        res.redirect('/trips');
    } catch (err) {
        console.error('Error updating trip:', err);
        res.status(500).send('Error updating trip.');
    }
});

// Delete a trip
router.post('/trips/:id/delete', isLoggedIn, async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip || trip.user.toString() !== req.session.user._id.toString()) {
            return res.status(403).send('Forbidden');
        }
        await trip.remove();
        res.redirect('/trips');
    } catch (err) {
        console.error('Error deleting trip:', err);
        res.status(500).send('Error deleting trip.');
    }
});

module.exports = router;
