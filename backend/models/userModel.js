// models/userModel.js
const mongoose = require('mongoose');

// Define the schema for the User
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'], 
      trim: true, 
    },
    email: {
      type: String,
      required: [true, 'Email is required'], 
      unique: true, 
      lowercase: true, 
      validate: {
        validator: function (v) {
          return /^\S+@\S+\.\S+$/.test(v); 
        },
        message: 'Please provide a valid email address',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'], 
      minlength: [6, 'Password must be at least 6 characters long'], 
    },
  },
  {
    timestamps: true, 
  }
);

// Export the User model
module.exports = mongoose.model('User', userSchema);
