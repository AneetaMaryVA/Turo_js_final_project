const express = require('express');
const profileController = require('../controller/profileController');

const router = express.Router();

// Middleware to check if user is logged in
function isLoggedIn(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect('/login');
}

// Display user profile
router.get('/profile', isLoggedIn, profileController.viewProfile);

// Update user profile
router.post('/profile', isLoggedIn, profileController.updateProfile);

// Change password
router.post('/profile/change-password', isLoggedIn, profileController.changePassword);

module.exports = router;
