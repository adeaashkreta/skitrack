const User = require('../models/User');

// Register User
exports.registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    birthDate,
    phoneNumber
  } = req.body;

  // Basic validation
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !confirmPassword ||
    !birthDate ||
    !phoneNumber
  ) {
    return res.status(400).json({ message: 'Please fill in all required fields.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email already exists.' });
    }

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password, // 🔥 Stored as plain text! For testing only.
      birthDate,
      phoneNumber,
      role: 'user'
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Send user details back
    res.status(200).json({
      message: 'Login successful!',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Get User by ID
exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
