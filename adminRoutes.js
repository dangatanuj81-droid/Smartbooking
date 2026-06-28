const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

// Admin only routes
router.get('/users', (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  // Get all users
});

router.get('/caterers', (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  // Get all caterers
});

router.get('/bookings', (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  // Get all bookings
});

router.get('/revenue', (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  // Get revenue analytics
});

module.exports = router;