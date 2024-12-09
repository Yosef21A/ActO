import React, { useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css"; // Import custom CSS

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem("userToken");
      // Removed fetchUserRole call
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/auth/logout", {}, { withCredentials: true });
      logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-white" to="/">
          Act-o
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link btn btn-light px-3 me-2" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn btn-outline-light px-3" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <>
                {location.pathname !== "/events" && (
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/events">
                      Events
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/my-bookings">
                    My Bookings
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/profile">
                    My Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-light px-3" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;