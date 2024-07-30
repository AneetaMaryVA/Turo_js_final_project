const bcrypt = require('bcrypt');
const User = require('../models/user'); // Adjust the path as needed

// Display user profile
exports.viewProfile = async (req, res) => {
  console.log('Profile route');
  try {
    const user = await User.findById(req.session.user._id);
    const editMode = req.query.edit === 'true'; // Determine if in edit mode
    res.render('profile', { user, editMode }); // Pass user and editMode to the template
  } catch (err) {
    console.error('Error retrieving profile:', err);
    res.status(500).send('Error retrieving profile.');
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const { username, email } = req.body;

    // Update user details
    await User.findByIdAndUpdate(userId, { username, email });
    res.redirect('/profile');
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).send('Error updating profile.');
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const { currentPassword, newPassword } = req.body;

    // Find the user and check current password
    const user = await User.findById(userId);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).send('Current password is incorrect.');
    }

    // Hash new password and update user
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.redirect('/profile');
  } catch (err) {
    console.error('Error changing password:', err);
    res.status(500).send('Error changing password.');
  }
};
