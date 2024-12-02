const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes'); 
const employeeRoutes = require('./routes/employeeRoutes');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json()); 
app.use(cors({ origin: 'http://localhost:3000' }));

// Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});

// Root Route for Testing
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running. Use /api/v1/user or /api/v1/employees' });
});

// Mount routes
app.use('/api/v1/user', userRoutes); 
app.use('/api/v1/employees', employeeRoutes); 

// 404 Handler for unmatched routes
app.use((req, res) => {
  console.error(`Route Not Found: ${req.originalUrl}`);
  res.status(404).json({ message: 'API route not found.' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.message);
  res.status(500).json({ message: 'Server error. Please try again later.' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
