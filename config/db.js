// Import the Mongoose library
const mongoose = require('mongoose');

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/comp3123_assigment1');
        
        // If the connection is successful, log a success message
        console.log('MongoDB connected successfully');
      } catch (err) {
        
        // If the connection fails, log the error message and exit the process
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
      }
};

module.exports = connectDB;