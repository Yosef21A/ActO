const express = require('express');
const router = express.Router();
const { createEvent, getEvents, likeEvent, commentEvent, updateEvent, deleteEvent, getEventById } = require('../controllers/eventController');
const { authenticate } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', authenticate, createEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/:id/like', authenticate, likeEvent);
router.post('/:id/comment', authenticate, commentEvent);
router.put('/:id', authenticate, updateEvent);
router.delete('/:id', authenticate, deleteEvent);

module.exports = router;