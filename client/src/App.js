import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';
import Login from './components/Forms/Login/Login';
import Signup from './components/Forms/Signup/Signup';
import Profile from './components/Profile/Profile';
import EditProfile from './components/Profile/EditProfile';
import EventList from './components/EventList';
import BookEvent from './components/BookEvent';
import MyBookings from './components/MyBookings';
import CreateEvent from './components/CreateEvent';
import EditEvent from './components/EditEvent';
import ContactUs from './components/ContactUs';
import EditBooking from './components/EditBooking'; // Add this line
import { AuthContext } from './context/AuthContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/events" /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/events" /> : <Signup />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/edit-booking/:id" element={isAuthenticated ? <EditBooking /> : <Navigate to="/login" />} /> {/* Add this line */}
        {/* Protected Routes */}
        <Route path="/events" element={isAuthenticated ? <EventList /> : <Navigate to="/login" />} />
        <Route path="/book/:id" element={isAuthenticated ? <BookEvent /> : <Navigate to="/login" />} />
        <Route path="/my-bookings" element={isAuthenticated ? <MyBookings /> : <Navigate to="/login" />} />
        <Route path="/create-event" element={isAuthenticated ? <CreateEvent /> : <Navigate to="/login" />} />
        <Route path="/edit-event/:id" element={isAuthenticated ? <EditEvent /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/edit-profile" element={isAuthenticated ? <EditProfile /> : <Navigate to="/login" />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;