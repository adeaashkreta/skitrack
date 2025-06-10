const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); // models/Booking.js exists!

// POST endpoint to handle booking requests
router.post('/book', async (req, res) => {
   
    const { resortName, checkInDate, checkOutDate, numberOfGuests, fullName, email, phoneNumber, specialRequests } = req.body;


    if (!resortName || !checkInDate || !checkOutDate || !numberOfGuests || !fullName || !email) {
        return res.status(400).json({ success: false, message: 'Missing required booking information.' });
    }
    
    try { 
        console.log(`Received booking for ${resortName}:`);
        console.log(`    Check-in: ${checkInDate}`);
        console.log(`    Check-out: ${checkOutDate}`);
        console.log(`    Guests: ${numberOfGuests}`);
        console.log(`    Full Name: ${fullName}`); // Log fullName
        console.log(`    Email: ${email}`);         // Log email
        console.log('--- Booking Processed ---');

        const newBooking = new Booking({
            resortName: resortName,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            numberOfGuests: numberOfGuests,
            fullName: fullName, // Add fullName here
            email: email,       // Use 'email' directly
            phoneNumber: phoneNumber, 
            specialRequests: specialRequests,
        });

        // Saving the booking to MongoDB
        const savedBooking = await newBooking.save();

        console.log(`Booking successfully saved to database with ID: ${savedBooking._id}`);

        res.status(201).json({
            success: true,
            message: 'Booking confirmed and successfully saved!',
            bookingId: savedBooking._id 
        });

    } catch (error) {
        console.error('Error saving booking to database:', error);
        
        res.status(500).json({ success: false, message: `Failed to process booking due to a server error: ${error.message}. Please try again.` });
    }
});


module.exports = router;