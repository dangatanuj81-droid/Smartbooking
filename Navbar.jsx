import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-logo">
          🍽️ Smart Cater
        </Link>
        
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/caterers">Caterers</Link>
          {user && (
            <>
              <Link to="/my-bookings">My Bookings</Link>
              <Link to="/profile">
                <FaUser /> Profile
              </Link>
              <button onClick={handleLogout} className="btn btn-outline">
                <FaSignOutAlt /> Logout
              </button>
            </>
          )}
          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;