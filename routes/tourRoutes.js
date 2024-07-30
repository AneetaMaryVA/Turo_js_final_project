const express = require('express');
const tourController = require('../controller/tourController');

const router = express.Router();

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect('/login');
}

// View all tours (including trips)
router.get('/tours', isLoggedIn, tourController.viewAllTours);

// Add a tour to the cart
router.post('/tours/:id/add-to-cart', isLoggedIn, tourController.addToCart);

// View cart
router.get('/cart', isLoggedIn, tourController.viewCart);

// Remove a tour from the cart
router.post('/cart/:tourId/remove', isLoggedIn, tourController.removeFromCart);

// View checkout
router.get('/checkout', isLoggedIn, tourController.viewCheckout);

module.exports = router;
