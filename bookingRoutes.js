const express = require('express');
const { 
  createBooking, 
  getUserBookings, 
  getBookingById, 
  updateBookingStatus, 
  addReview 
} = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/', createBooking);
router.get('/', getUserBookings);
router.get('/:id', getBookingById);
router.put('/:id/status', updateBookingStatus);
router.post('/:id/review', addReview);

module.exports = router;