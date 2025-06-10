const LessonRegistration = require('../models/LessonRegistration');

// 📝 Create Registration
exports.createRegistration = async (req, res) => {
  try {
    const { name, email, skillLevel } = req.body;

    if (!name || !email || !skillLevel) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newRegistration = new LessonRegistration({
      name,
      email,
      skillLevel
    });

    await newRegistration.save();
    res.status(201).json({ message: 'Registration successful.', registration: newRegistration });
  } catch (error) {
    console.error('Error creating registration:', error.message, error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// 📝 Get All Registrations
exports.getRegistrations = async (req, res) => {
  try {
    const registrations = await LessonRegistration.find();
    res.json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// 📝 Get Registration by ID
exports.getRegistrationById = async (req, res) => {
  try {
    const registration = await LessonRegistration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found.' });
    }
    res.json(registration);
  } catch (error) {
    console.error('Error fetching registration:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// 📝 Update Registration
exports.updateRegistration = async (req, res) => {
  try {
    const { name, email, skillLevel } = req.body;
    const updatedRegistration = await LessonRegistration.findByIdAndUpdate(
      req.params.id,
      { name, email, skillLevel },
      { new: true }
    );
    if (!updatedRegistration) {
      return res.status(404).json({ message: 'Registration not found.' });
    }
    res.json({ message: 'Registration updated.', registration: updatedRegistration });
  } catch (error) {
    console.error('Error updating registration:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// 📝 Delete Registration
exports.deleteRegistration = async (req, res) => {
  try {
    const deletedRegistration = await LessonRegistration.findByIdAndDelete(req.params.id);
    if (!deletedRegistration) {
      return res.status(404).json({ message: 'Registration not found.' });
    }
    res.json({ message: 'Registration deleted.' });
  } catch (error) {
    console.error('Error deleting registration:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};
