import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext'; // Adjust the import path
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './Auth.css'; // Import custom CSS

const Signup = () => {
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate(); // To redirect after successful signup
  const { login } = useContext(AuthContext); // Get login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      first_name,
      last_name,
      email,
      password,
      phone_number,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/auth/register', payload);
      const { token, user } = response.data;
      login(token, user);
      navigate('/events');
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors(['Sign-up failed! Please try again.']);
      }
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      window.location.href = 'http://localhost:8000/api/auth/google';
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('Google login failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">Create an Account</h2>
          {errors.length > 0 && (
            <div className="error-message">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="First Name"
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Last Name"
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Phone Number"
                value={phone_number}
                onChange={(e) => setPhone_number(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
          </form>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Signup;