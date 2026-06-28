import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h3>🍽️ Smart Cater</h3>
          <p>Book the best caterers for your events. Wedding, birthday, corporate, and more.</p>
          <div style={{ marginTop: '20px' }}>
            <FaFacebook style={{ marginRight: '15px', fontSize: '24px' }} />
            <FaTwitter style={{ marginRight: '15px', fontSize: '24px' }} />
            <FaInstagram style={{ marginRight: '15px', fontSize: '24px' }} />
            <FaLinkedin style={{ fontSize: '24px' }} />
          </div>
        </div>
        
        <div>
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/caterers">Caterers</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>
        
        <div>
          <h3>For Caterers</h3>
          <Link to="/caterer-register">Register as Caterer</Link>
          <Link to="/premium">Premium Plans</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
        
        <div>
          <h3>Contact</h3>
          <p>📍 Pimpri, Maharashtra, India</p>
          <p>📞 +91 98765 43210</p>
          <p>✉️ info@smartcater.com</p>
        </div>
      </div>
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: '40px', 
        paddingTop: '20px', 
        borderTop: '1px solid rgba(255,255,255,0.1)' 
      }}>
        <p>© 2026 Smart Cater Booking. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;