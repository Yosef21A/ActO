const express = require('express');
const router = express.Router();
const { createBooking, getBookings, cancelBooking, updateBooking, getBookingById } = require('../controllers/bookingController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/', authenticate, createBooking);
router.get('/', authenticate, getBookings);
router.get('/:id', authenticate, getBookingById); // Add this line
router.put('/:id', authenticate, updateBooking); // Add this line
router.delete('/:id', authenticate, cancelBooking);

module.exports = router;