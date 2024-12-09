import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      fetchUser(token);
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const response = await axios.get('http://localhost:8000/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Failed to verify token:', error);
      localStorage.removeItem('userToken');
    }
  };

  const login = (token, user) => {
    localStorage.setItem('userToken', token);
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};