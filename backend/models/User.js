const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,                // ensures no duplicate emails
      match: /.+\@.+\..+/          // basic email validation
    },
    password: {
      type: String,
      required: true
    },
    birthDate: {
      type: Date,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true,
      match: /^\d{8,15}$/          // ensures 8-15 digits
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
