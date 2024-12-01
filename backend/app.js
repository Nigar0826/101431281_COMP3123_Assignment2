const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
require('dotenv').config();

// Import Routes
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

// Initialize Express App
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies

// Root Route
app.get('/', (req, res) => {
  res.status(200).send('API is running...');
});

// API Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/employees', employeeRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ message: 'Server error', error: err.message });
});

// Port Configuration
const PORT = process.env.PORT || 5000; 

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
