const mongoose = require('mongoose');

const lessonRegistrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    lowercase: true
  },
  skillLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('LessonRegistration', lessonRegistrationSchema);
