const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/UserController');

// POST /api/users/register
router.post('/register', registerUser);

module.exports = router;
