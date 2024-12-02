const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const router = express.Router();


// POST /signup - User signup
router.post(
  '/signup',
  [
    // Validation middleware
    check('username', 'Username is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    console.log('Incoming Signup Request:', req.body); 

    // Validate incoming request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error('Validation Errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // Check if user already exists
      console.log('Checking for existing user...');
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.error('Signup Error: Email already in use');
        return res.status(400).json({ message: 'Email already in use.' });
      }

      // Hash the password
      console.log('Hashing password...');
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      console.log('Creating new user...');
      const user = new User({ username, email, password: hashedPassword });
      const newUser = await user.save();

      console.log('User created successfully:', newUser);
      res.status(201).json({ message: 'User created successfully', user_id: newUser._id });
    } catch (err) {
      console.error('Signup Error:', err.message);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  }
);

// POST /login - User login
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password.' });
      }

      // Return basic user details
      res.json({ message: 'Login successful', user_id: user._id });
    } catch (err) {
      console.error('Login Error:', err.message);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  }
);

module.exports = router;

