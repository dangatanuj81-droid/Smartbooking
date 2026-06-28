const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/profile', (req, res) => {
  res.json({ success: true, user: req.user });
});

module.exports = router;