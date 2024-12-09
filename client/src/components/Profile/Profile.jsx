import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css'; // Import custom CSS

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <Container className="profile-container">
      <h2 className="profile-title">Profile</h2>
      <p><strong>First Name:</strong> {profile.user.first_name}</p>
      <p><strong>Last Name:</strong> {profile.user.last_name}</p>
      <p><strong>Email:</strong> {profile.user.email}</p>
      <p><strong>Phone Number:</strong> {profile.user.phone_number}</p>
      <Button variant="primary" onClick={() => navigate('/edit-profile')}>Edit Profile</Button>
    </Container>
  );
};

export default Profile;