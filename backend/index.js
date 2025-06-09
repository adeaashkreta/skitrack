 const express = require('express');
 const cors    = require('cors');
 require('dotenv').config();
 const connectDB = require('./config/db');

 const app = express();
 const weatherRoute = require('./routes/weather');
 const resortsRoute = require('./routes/resorts'); 
 const bookingRoute = require('./routes/booking');

 app.use(cors());
 app.use(express.json());
 app.use('/api/weather',  weatherRoute);
 app.use('/api/resorts',  resortsRoute);       // ← new
 app.use('/api/booking', bookingRoute);
 

 const PORT = process.env.PORT || 3000;
 app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
