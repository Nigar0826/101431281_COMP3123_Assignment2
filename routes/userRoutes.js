const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const router = express.Router();

// POST /api/v1/user/signup
router.post('/api/v1/user/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Create a new User 
  const user = new User({
    username: username,
    email: email,
    password: password
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

// POST /api/v1/user/login 
router.post('/api/v1/user/login', async (req, res) => {
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

// GET /api/v1/user/users - Get all users (For testing purposes)
router.get('/api/v1/user/users', async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;