import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom"; // For internal navigation links
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">Act-O</h5>
            <p>
              Act-O simplifies event booking and management by connecting users with upcoming events, providing seamless registration, and offering event organizers easy-to-use tools to manage schedules and participants.
            </p>
            <p>&copy; 2024 Act-O. All Rights Reserved.</p>
          </div>

          {/* Navigation Links */}
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/about" className="text-white text-decoration-none">About Us</Link>
              </li>
              <li>
                <Link to="/features" className="text-white text-decoration-none">Features</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white text-decoration-none">Contact</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white text-decoration-none">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="col-md-4 mb-3 text-center">
            <h5 className="text-uppercase">Connect with Us</h5>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-4">
          <p className="small">
            Designed by Act-O Team | Empowering event experiences for users and organizers alike.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
