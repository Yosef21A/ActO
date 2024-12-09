import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './MyBookings.css';  // Importing the new CSS file for styling

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!isAuthenticated) {
        return;
      }
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get('http://localhost:8000/api/bookings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [isAuthenticated]);

  const handleCancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('userToken');
      await axios.delete(`http://localhost:8000/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(bookings.filter(booking => booking._id !== bookingId));
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  };

  return (
    <div className="bookings-container">
      <h1 className="title">My Bookings</h1>
      {bookings.length === 0 ? (
        <p className="no-bookings-message">You have no upcoming bookings.</p>
      ) : (
        <ul className="bookings-list">
          {bookings.map(booking => (
            <li key={booking._id} className="booking-item">
              <div className="booking-info">
                <h3 className="booking-title">{booking.event.title}</h3>
                <p className="booking-description">{booking.event.description}</p>
                <p className="booking-date">Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => handleCancelBooking(booking._id)}
                className="btn btn-danger cancel-button"
              >
                Cancel Booking
              </button>
              <button
                onClick={() => navigate(`/edit-booking/${booking._id}`)}
                className="btn btn-primary edit-button"
              >
                Edit Booking
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;