import React, { useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css'; // Import custom CSS

const EditProfile = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
        });
        const profile = response.data;
        setFormData({
          first_name: profile.user.first_name,
          last_name: profile.user.last_name,
          email: profile.user.email,
          phone_number: profile.user.phone_number
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:8000/api/profile', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
      });
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Container className="profile-container">
      <h2 className="profile-title">Edit Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default EditProfile;