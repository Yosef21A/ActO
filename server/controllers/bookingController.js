const nodemailer = require('nodemailer');
const Booking = require('../models/Booking');
const Event = require('../models/Event');
const User = require('../models/User');

exports.createBooking = async (req, res) => {
  try {
    const event = await Event.findById(req.body.event);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (event.availableSlots <= 0) {
      return res.status(400).json({ message: 'No available slots for this event' });
    }

    const booking = new Booking({
      event: req.body.event,
      user: req.user.id,
      bookingDate: req.body.bookingDate,
    });
    await booking.save();

    event.availableSlots -= 1;
    await event.save();

    const user = await User.findById(req.user.id);

    const transporter = nodemailer.createTransport({
      service: "yahoo",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `"Event Organizer" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Booking Confirmation",
      text: `Dear ${user.first_name},\n\nYour booking for the event has been confirmed.\n\nThank you!\n\nEvent Organizer`,
      html: `<p>Dear ${user.first_name},</p>
             <p>Your booking for the event has been confirmed.</p>
             <p>Thank you!</p>
             <p>Event Organizer</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('event');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    if (booking.user.toString() !== req.user.id.toString()) {
      console.log('Booking user ID:', booking.user.toString());
      console.log('Request user ID:', req.user.id.toString());
      return res.status(403).json({ message: 'You are not authorized to cancel this booking' });
    }

    const event = await Event.findById(booking.event);
    if (event) {
      event.availableSlots += 1;
      await event.save();
    }

    await booking.deleteOne();
    res.status(200).json({ message: 'Booking canceled successfully' });
  } catch (error) {
    console.error('Error canceling booking:', error);
    res.status(500).json({ message: 'Error canceling booking', error });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    if (booking.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to edit this booking' });
    }
    booking.bookingDate = req.body.bookingDate || booking.bookingDate;
    await booking.save();
    res.status(200).json({ message: 'Booking updated successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking', error });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('event');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking', error });
  }
};
