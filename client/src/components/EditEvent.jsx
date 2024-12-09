import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EventForm.css';  // Import the CSS for styling

const EditEvent = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(''); // Add state for location
  const [capacity, setCapacity] = useState(''); // Add state for capacity
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/events/${id}`);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setLocation(response.data.location); // Set location
        setCapacity(response.data.capacity); // Set capacity
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('userToken');
      await axios.put(`http://localhost:8000/api/events/${id}`, { title, description, location, capacity }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Event updated successfully!');
      navigate('/events');
    } catch (error) {
      setMessage('Error updating event');
    }
  };

  return (
    <div className="event-form-container">
      <h1>Edit Event</h1>
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Capacity</label>
          <input
            id="capacity"
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn-submit">Update Event</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default EditEvent;