const mongoose = require('mongoose'); 


const bookingSchema = mongoose.Schema(
  {
    resortName: {
      type: String,     // Data type is text
      required: true,   // This field must be provided
    },
    checkInDate: {
      type: Date,       // Data type is a date
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    numberOfGuests: {
      type: Number,     // Data type is a number
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/, // Simple check to see if it looks like an email
    },
    phoneNumber: {
      type: String,     // Optional field, so no 'required'
    },
    specialRequests: {
      type: String,
    },
    bookingDate: {
      type: Date,
      default: Date.now, // Automatically set to the current date/time when created
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'], // Only these values are allowed
      default: 'pending', // Default status when a new booking is created
    },
  
  },
  {
    timestamps: true, 
  }
);


const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking; 