const Event = require('../models/Event');
const upload = require('../middleware/uploadMiddleware');

exports.createEvent = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Error uploading file:', err);
      return res.status(400).json({ message: err });
    }
    try {
      console.log('Request Body:', req.body);
      console.log('Uploaded File:', req.file);
      const event = new Event({
        ...req.body,
        createdBy: req.user.id,
        imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
         // Set imageUrl if file is uploaded
        availableSlots: req.body.capacity,

        });
      await event.save();
      console.log('Event created:', event);
      res.status(201).json(event);
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ message: 'Error creating event', error });
    }
  });
};
exports.updateEvent = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      if (event.createdBy.toString() !== req.user.id.toString()) {
        console.log("Unauthorized edit attempt by user:", req.user.id);
        console.log(`Event is created by: ${event.createdBy}`);
        return res.status(403).json({ message: 'You are not authorized to edit this event' });
      }
      Object.assign(event, req.body);
      await event.save();
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ message: 'Error updating event', error });
    }  
};
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('likes').populate('comments.user');
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};

exports.likeEvent = async (req, res) => {
    try {
      console.log("Event ID:", req.params.id);
      console.log("User ID:", req.user?.id);
      const event = await Event.findById(req.params.id);
      console.log("Event found:", event);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      if (!event.likes.includes(req.user.id)) {
        event.likes.push(req.user.id);
        await event.save();
        console.log("Event updated with new like:", event);
      }
      res.status(200).json(event);
    } catch (error) {
      console.error("Error in likeEvent:", error);
      res.status(500).json({ message: 'Error liking event', error });
    }
  };
  

exports.commentEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const comment = {
      user: req.user.id,
      text: req.body.text,
    };
    event.comments.push(comment);
    await event.save();
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error commenting on event', error });
  }
};


exports.getEventById = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id).populate('likes').populate('comments.user');
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching event', error });
    }
  };


  exports.deleteEvent = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      if (event.createdBy.toString() !== req.user.id.toString()) {
        return res.status(403).json({ message: 'You are not authorized to delete this event' });
      }
      await event.deleteOne();
      res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting event', error });
    }
  };