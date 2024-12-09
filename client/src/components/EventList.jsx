import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Modal, Button, Form } from 'react-bootstrap';
import './EventList.css';  // For custom styles

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [commentTexts, setCommentTexts] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editLocation, setEditLocation] = useState(''); // Add state for edit location
  const [editCapacity, setEditCapacity] = useState(''); // Add state for edit capacity
  const [searchQuery, setSearchQuery] = useState(''); // Add state for search query
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleLike = async (eventId) => {
    if (!isAuthenticated) {
      alert('Please log in or register to like this event.');
      return;
    }
    try {
      await axios.post(`http://localhost:8000/api/events/${eventId}/like`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
      });
      setEvents(events.map(event => event._id === eventId ? { ...event, likes: [...event.likes, { _id: user._id }] } : event));
    } catch (error) {
      console.error('Error liking event:', error);
    }
  };

  const handleComment = async (eventId) => {
    if (!isAuthenticated) {
      alert('Please log in or register to comment on this event.');
      return;
    }
    try {
      const response = await axios.post(`http://localhost:8000/api/events/${eventId}/comment`, { text: commentTexts[eventId] }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
      });
      setEvents(events.map(event => event._id === eventId ? response.data : event));
      setCommentTexts({ ...commentTexts, [eventId]: '' });
    } catch (error) {
      console.error('Error commenting on event:', error);
    }
  };

  const handleEdit = (event) => {
    setCurrentEvent(event);
    setEditTitle(event.title);
    setEditDescription(event.description);
    setEditLocation(event.location); // Set edit location
    setEditCapacity(event.capacity); // Set edit capacity
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('userToken');
      await axios.put(`http://localhost:8000/api/events/${currentEvent._id}`, 
        { title: editTitle, description: editDescription, location: editLocation, capacity: editCapacity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEvents(events.map(event => event._id === currentEvent._id ? { ...event, title: editTitle, description: editDescription, location: editLocation, capacity: editCapacity } : event));
      setShowModal(false);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      const token = localStorage.getItem('userToken');
      await axios.delete(`http://localhost:8000/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.filter(event => event._id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // Filter events based on search query
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase()) // Include location in search
  );

  // Sort events by the number of likes in descending order
  const sortedEvents = [...filteredEvents].sort((a, b) => b.likes.length - a.likes.length);

  return (
    <div className="event-list-container">
      <h1 className="mb-4">Upcoming Events</h1>
      <Link to="/create-event" className="btn btn-primary mb-3">Create Event</Link>

      {/* Search Bar */}
      <div className="search-bar mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="row">
        {sortedEvents.map(event => (
          <div key={event._id} className="col-md-4 mb-4">
            <div className="card event-card shadow-sm">
              {event.imageUrl && <img src={`http://localhost:8000${event.imageUrl}`} alt={event.title} className="card-img-top" />}
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text">{event.description}</p>
                <p className="card-text"><strong>Location:</strong> {event.location}</p> {/* Display location */}
                <p className="card-text"><strong>Capacity:</strong> {event.capacity}</p> {/* Display capacity */}

                <button onClick={() => handleLike(event._id)} className="btn btn-outline-primary btn-sm">
                  Like ({event.likes.length})
                </button>

                <div className="comment-section mt-2">
                  <input
                    type="text"
                    className="form-control"
                    value={commentTexts[event._id] || ''}
                    onChange={(e) => setCommentTexts({ ...commentTexts, [event._id]: e.target.value })}
                    placeholder="Add a comment"
                  />
                  <button onClick={() => handleComment(event._id)} className="btn btn-outline-secondary btn-sm mt-2">
                    Comment
                  </button>
                </div>

                <ul className="list-group mt-3">
                  {event.comments.map(comment => (
                    <li key={comment._id} className="list-group-item">
                      <strong>{comment.user.first_name} {comment.user.last_name}:</strong> {comment.text}
                    </li>
                  ))}
                </ul>

                {isAuthenticated && event.createdBy === user?._id && (
                  <>
                    <button onClick={() => handleEdit(event)} className="btn btn-outline-warning btn-sm mt-2">Edit</button>
                    <button onClick={() => handleDelete(event._id)} className="btn btn-outline-danger btn-sm mt-2">Delete</button>
                  </>
                )}
                <button onClick={() => navigate(`/book/${event._id}`)} className="btn btn-primary btn-sm mt-2">Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCapacity">
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="number"
                value={editCapacity}
                onChange={(e) => setEditCapacity(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EventList;