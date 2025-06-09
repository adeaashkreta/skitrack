const mongoose = require('mongoose'); // Import Mongoose library

// Function to connect to the database
const connectDB = async () => {
  try {
    // Mongoose will try to connect using the MONGO_URI from your .env file
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,      // Recommended option for compatibility
      useUnifiedTopology: true,   // Recommended option for compatibility
    });
    // If connection is successful, log a message
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If there's an error, log it and exit the application
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exits the Node.js process with an error code
  }
};

module.exports = connectDB; // Make this function available to other files