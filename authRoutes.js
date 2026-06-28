const express = require('express');
const { 
  register, 
  login, 
  forgotPassword, 
  verifyOTP, 
  googleLogin 
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post('/google', googleLogin);
router.get('/profile', protect, getProfile);

module.exports = router;