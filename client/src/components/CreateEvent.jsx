import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EventForm.css';  // Import the CSS for styling

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(''); // Add state for location
  const [image, setImage] = useState(null);
  const [capacity, setCapacity] = useState(''); // Add state for capacity
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('location', location); // Append location
    formData.append('capacity', capacity); // Append capacity
    if (image) {
      formData.append('image', image);
    }

    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.post('http://localhost:8000/api/events', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Event created successfully!');
      navigate('/events');
    } catch (error) {
      setMessage('Error creating event');
    }
  };

  return (
    <div className="event-form-container">
      <h1>Create Event</h1>
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
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            id="image"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn-submit">Create Event</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CreateEvent;