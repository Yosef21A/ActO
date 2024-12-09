const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true }, // Add location field
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String },
  capacity: { type: Number, required: true },
  availableSlots: { type: Number, required: true },
  waitlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  cancellationPolicy: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [commentSchema],
});

module.exports = mongoose.model('Event', eventSchema);