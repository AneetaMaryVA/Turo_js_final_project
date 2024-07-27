const express = require('express');
const router = express.Router();
const Tour = require('../models/tour');
const User = require('../models/user'); // Ensure the User model is imported

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect('/login');
}

// View all tours
router.get('/tours', async (req, res) => {
  try {
    const tours = await Tour.find();
    res.render('tours', { tours, user: req.session.user });
  } catch (err) {
    res.status(500).send('Error retrieving tours.');
  }
});

// Add a tour to the cart
router.post('/tours/:id/add-to-cart', isLoggedIn, async (req, res) => {
  try {
    const tourId = req.params.id;
    const userId = req.session.user._id;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found.');
    }

    // Check if the tour is already in the cart
    let cartItem = user.cart.find(item => item.tourId.toString() === tourId);

    if (cartItem) {
      // If the tour is already in the cart, increment the quantity
      cartItem.quantity += 1;
    } else {
      // Otherwise, add a new item to the cart
      user.cart.push({ tourId, quantity: 1 });
    }

    // Save the updated user document
    await user.save();
    res.redirect('/cart');
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).send('Error adding to cart.');
  }
});

// View cart
router.get('/cart', isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id).populate('cart.tourId');
    res.render('cart', { cart: user.cart });
  } catch (err) {
    res.status(500).send('Error retrieving cart.');
  }
});

module.exports = router;
