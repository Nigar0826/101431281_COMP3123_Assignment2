// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // MongoDB connection setup

// Import routes for users and employees
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

// Initialize the Express application
const app = express();

// Connect to the MongoDB database using the connectDB function from db.js
connectDB();

// Use bodyParser middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Define a basic route for testing if the API is running
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use the routes defined in userRoutes and employeeRoutes
app.use('/api/v1/user', userRoutes); 
app.use('/api/v1/emp', employeeRoutes);

// Define the port for the server to listen 
const PORT = process.env.PORT || 3000;

// Start the server 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));