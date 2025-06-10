const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,      
      useUnifiedTopology: true,   
    });
    // If connection is successful, log a message
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If there's an error, log it and exit the application
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exits the Node.js process with an error code
  }
};

module.exports = connectDB; 