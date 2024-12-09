import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './BookEvent.css';  // Import the CSS file for styling

const BookEvent = () => {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const { isAuthenticated, user } = useContext(AuthContext);

  const handleBooking = async () => {
    if (!isAuthenticated) {
      alert('Please log in to book an event.');
      return;
    }
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.post('http://localhost:8000/api/bookings', 
        { event: id, bookingDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Booking successful!');
    } catch (error) {
      setMessage('Error booking event');
      console.error('Error booking event:', error);
    }
  };

  return (
    <div className="book-event-container">
      <h1 className="book-event-title">Book Event</h1>
      <div className="book-event-form">
        <div className="book-event-form-group">
          <label htmlFor="bookingDate" className="book-event-label">Select Date:</label>
          <input
            type="date"
            id="bookingDate"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            required
            className="book-event-form-control"
          />
        </div>
        <button onClick={handleBooking} className="book-event-btn-primary">Book Event</button>
        {message && <p className={`book-event-message ${message.includes('Error') ? 'error' : ''}`}>{message}</p>}
      </div>
    </div>
  );
};

export default BookEvent;