import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email, password };

    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', payload, { withCredentials: true });
      if (response.status === 200) {
        const userToken = response.data.token;
        const user = response.data.user;
        login(userToken, user);
        navigate('/events');
      }
    } catch (err) {
      setError('Login failed! Please check your credentials.');
      console.error('Login error:', err);
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      // Send the Google token to your backend for validation and user creation
      const res = await axios.get('http://localhost:8000/api/auth/google/callback', {
        headers: { Authorization: `Bearer ${response.credential}` },
      });
  
      // Process the response (store token, redirect, etc.)
      const userToken = res.data.token;
      const user = res.data.user;
      login(userToken, user);
      navigate('/events');
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
          <h2 className="auth-title">Login</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary btn-block">Login</button>
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

export default Login;