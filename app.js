// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // MongoDB connection setup
require('dotenv').config(); // Load environment variables from .env file

// Import routes for users and employees
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

// Initialize the Express application
const app = express();

// Connect to the MongoDB database using the connectDB function from db.js
connectDB();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Define a basic route for testing if the API is running
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use user and employee routes
app.use('/api/v1/user', userRoutes); 
app.use('/api/v1/emp', employeeRoutes);

// Define server port 
const PORT = process.env.PORT || 3000;

// Start the server 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));