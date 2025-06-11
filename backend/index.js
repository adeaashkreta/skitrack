const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

// Routes
const weatherRoute = require('./routes/weather');
const resortsRoute = require('./routes/resorts');
const bookingRoute = require('./routes/booking');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/UserRoutes');


// Middleware
app.use(cors());
app.use(express.json());

// Use Routes
app.use('/api/weather', weatherRoute);
app.use('/api/resorts', resortsRoute);
app.use('/api/booking', bookingRoute);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// MongoDB Connection
const PORT = process.env.PORT || 3000;

// MongoDB Connection Function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); // Exit with failure
  }
};

// Connect to MongoDB
connectDB();
