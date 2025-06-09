const mongoose = require('mongoose'); // Import Mongoose

// Define the structure (schema) for a Booking document
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
    // If you later add user accounts, you could link bookings to users here
    // user: {
    //   type: mongoose.Schema.Types.ObjectId, // This means it will store a MongoDB ID
    //   ref: 'User', // It refers to a 'User' model (if you create one)
    // },
  },
  {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
  }
);

// 'Booking' will be the name of the collection in MongoDB (it will be pluralized to 'bookings').
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking; // Make the Booking model available