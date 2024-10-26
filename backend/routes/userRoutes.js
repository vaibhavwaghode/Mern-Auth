const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/register', register);


router.post('/login', login);

// Profile route protected by auth middleware
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
