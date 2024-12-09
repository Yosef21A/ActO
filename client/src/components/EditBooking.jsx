import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const EditBooking = () => {
  const { id } = useParams();
  const [bookingDate, setBookingDate] = useState('');
  const [message, setMessage] = useState('');
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get(`http://localhost:8000/api/bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookingDate(response.data.bookingDate);
      } catch (error) {
        console.error('Error fetching booking:', error);
      }
    };

    fetchBooking();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('userToken');
      await axios.put(`http://localhost:8000/api/bookings/${id}`, { bookingDate }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Booking updated successfully!');
      navigate('/my-bookings');
    } catch (error) {
      setMessage('Error updating booking');
      console.error('Error updating booking:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Booking</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="bookingDate">Booking Date</label>
          <input
            type="date"
            className="form-control"
            id="bookingDate"
            name="bookingDate"
            value={bookingDate.split('T')[0]} // Format the date for the input field
            onChange={(e) => setBookingDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Update Booking</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default EditBooking;