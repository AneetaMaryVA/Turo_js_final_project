const Tour = require('../models/tour');
const User = require('../models/user');
const Trip = require('../models/trip');

// View all tours (including trips)
exports.viewAllTours = async (req, res) => {
  try {
    // Fetch tours from the Tour model
    const tours = await Tour.find();

    // Fetch trips from the Trip model
    const trips = await Trip.find();

    // Combine both tours and trips
    const allTours = tours.concat(trips);

    res.render('tours', { tours: allTours, user: req.session.user });
  } catch (err) {
    console.error('Error retrieving tours:', err);
    res.status(500).send('Error retrieving tours.');
  }
};

// Add a tour to the cart
exports.addToCart = async (req, res) => {
  console.log('add to cart');
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
};

// View cart
exports.viewCart = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id).populate('cart.tourId');
    res.render('cart', { cart: user.cart });
  } catch (err) {
    res.status(500).send('Error retrieving cart.');
  }
};

// Remove a tour from the cart
exports.removeFromCart = async (req, res) => {
  try {
    const tourId = req.params.tourId;
    const userId = req.session.user._id;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found.');
    }

    // Remove the tour from the cart
    user.cart = user.cart.filter(item => item.tourId.toString() !== tourId);

    // Save the updated user document
    await user.save();
    res.redirect('/cart');
  } catch (err) {
    console.error('Error removing from cart:', err);
    res.status(500).send('Error removing from cart.');
  }
};

// View checkout
exports.viewCheckout = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id).populate('cart.tourId');

    if (!user) {
      return res.status(404).send('User not found.');
    }

    // Calculate total cost
    const totalCost = user.cart.reduce((total, item) => total + item.tourId.price * item.quantity, 0);

    res.render('checkout', { cart: user.cart, totalCost });
  } catch (err) {
    console.error('Error retrieving checkout:', err);
    res.status(500).send('Error retrieving checkout.');
  }
};
