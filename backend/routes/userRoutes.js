const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const router = express.Router();


// POST /api/v1/user/signup
router.post('/signup', [
  // Validation checks
  check('username', 'Username is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;


  // Create a new User
  const user = new User({
    username,
    email,
    password
  });

  try {
    // Save the new user to the database
    const newUser = await user.save();
    res.status(201).json({
      message: 'User created successfully',
      user_id: newUser._id
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// POST /api/v1/user/login - User login
router.post('/login', [
  // Validation checks
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').notEmpty()
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find user by email in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.json({
      message: 'Login successful',
      user_id: user._id
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET /api/v1/user/users - Get all users 
router.get('/users', async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;