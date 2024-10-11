// Import the Mongoose library
const mongoose = require('mongoose');

// Function to connect to the MongoDB Atlas database
const connectDB = async () => {
    try {
        // Connect to Mongodb using the MongoDB Atlas connection string
        await mongoose.connect('mongodb+srv://nigarahmadova:qCOep5jmKJfanU7E@comp3123assignment1.eyrcw.mongodb.net/comp3123assignment1?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        // If the connection is successful, log a success message
        console.log('MongoDB connected successfully');
    } catch (err) {
        // If the connection fails, log the error message and exit the process
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

module.exports = connectDB;