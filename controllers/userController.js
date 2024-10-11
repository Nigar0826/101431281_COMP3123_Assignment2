// Import the User model and bcrypt for hashing passwords
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

// Controller to get all users from db
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users); 
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

// Controller to get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); 
    }
    res.json(user); 
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};

// Controller to create a new user in db
const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); 
  }

  const { username, email, password } = req.body;

  // Create a new User object
  const user = new User({
    username,
    email,
    password
  });

  try {
    // Save the user to db
    const newUser = await user.save();
    res.status(201).json({
      message: 'User created successfully',
      user_id: newUser._id
    });
  } catch (err) {
    res.status(400).json({ message: 'Error creating user', error: err.message });
  }
};

// Controller to update an existing user by ID
const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Destructure user details from the request body
    const { username, email, password } = req.body;

    // Hash the password before updating it in db
    const hashedPassword = await bcrypt.hash(password, 10);

    // Find the user by ID and update the details
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User updated successfully',
      updatedUser,
    });
  } catch (err) {
    res.status(400).json({ message: 'Error updating user', error: err.message });
  }
};

// Controller to delete a user from db by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};

// Export the controller functions for use in routes
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};