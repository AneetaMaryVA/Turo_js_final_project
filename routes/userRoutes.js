const express = require('express');
const authController = require('../controller/userController');

const router = express.Router();

// Render registration page
router.get('/register', authController.renderRegisterPage);

// Handle registration
router.post('/register', authController.registerUser);

// Render login page
router.get('/login', authController.renderLoginPage);

// Handle login
router.post('/login', authController.loginUser);

// Handle logout
router.post('/logout', authController.logoutUser);

module.exports = router;
