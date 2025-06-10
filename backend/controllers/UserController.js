const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    birthDate,
    phoneNumber,
    role
  } = req.body;

  // Basic validation
  if (!firstName || !lastName || !email || !password || !confirmPassword || !birthDate || !phoneNumber || !role) {
    return res.status(400).json({ message: 'Please fill in all required fields including role.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  // Validate role
  const validRoles = ['user', 'admin'];
  if (!validRoles.includes(role.toLowerCase())) {
    return res.status(400).json({ message: 'Invalid role. Must be "user" or "admin".' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      birthDate,
      phoneNumber,
      role: role.toLowerCase()
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
