const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Render the registration page
exports.renderRegisterPage = (req, res) => {
  res.render('register');
};

// Handle user registration
exports.registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword
    });
    await user.save();
    res.redirect('/login');
  } catch {
    res.redirect('/register');
  }
};

// Render the login page
exports.renderLoginPage = (req, res) => {
  res.render('login');
};

// Handle user login
exports.loginUser = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    req.session.user = user;
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
};

// Handle user logout
exports.logoutUser = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
