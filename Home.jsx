import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
  const handleSearch = (e) => {
    e.preventDefault();
    const city = e.target.city.value;
    const eventType = e.target.eventType.value;
    toast.success(`Searching caterers in ${city} for ${eventType}`);
  };

  const categories = [
    { name: 'Wedding', icon: '💒', color: '#ff6b35' },
    { name: 'Birthday', icon: '🎂', color: '#ff8c42' },
    { name: 'Corporate', icon: '👔', color: '#4a90d9' },
    { name: 'Religious', icon: '🙏', color: '#9b59b6' },
    { name: 'Party', icon: '🎉', color: '#e74c3c' },
    { name: 'College', icon: '🎓', color: '#3498db' }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="fade-in">Book the Best Caterers for Your Event</h1>
          <p className="fade-in">Find reliable caterers, compare prices, view menus, and book online</p>
          
          <form onSubmit={handleSearch} className="search-bar fade-in">
            <input 
              type="text" 
              name="city" 
              placeholder="Enter your city" 
              required 
            />
            <select name="eventType" required>
              <option value="">Select Event Type</option>
              <option value="wedding">Wedding</option>
              <option value="birthday">Birthday</option>
              <option value="corporate">Corporate</option>
              <option value="religious">Religious</option>
              <option value="party">Party</option>
              <option value="college">College</option>
            </select>
            <button type="submit" className="btn btn-primary">
              Search Caterers
            </button>
          </form>
          
          <Link to="/caterers" className="btn btn-primary" style={{ marginTop: '20px' }}>
            Book Now
          </Link>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="container" style={{ padding: '80px 20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '50px', fontSize: '36px' }}>
          Popular Categories
        </h2>
        <div className="grid grid-3">
          {categories.map((cat, index) => (
            <div className="card" style={{ textAlign: 'center', padding: '40px' }} key={index}>
              <div style={{ fontSize: '60px', color: cat.color, marginBottom: '20px' }}>
                {cat.icon}
              </div>
              <h3 style={{ marginBottom: '15px' }}>{cat.name}</h3>
              <Link to="/caterers" className="btn btn-outline">
                View Caterers
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ background: '#f8f9fa', padding: '80px 20px' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '50px', fontSize: '36px' }}>
            How It Works
          </h2>
          <div className="grid grid-4">
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                background: 'var(--gradient)', 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: 'white', 
                fontSize: '24px', 
                fontWeight: 'bold',
                margin: '0 auto 20px'
              }}>
                1
              </div>
              <h3>Search</h3>
              <p>Find caterers in your city</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                background: 'var(--gradient)', 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: 'white', 
                fontSize: '24px', 
                fontWeight: 'bold',
                margin: '0 auto 20px'
              }}>
                2
              </div>
              <h3>Compare</h3>
              <p>Compare prices & menus</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                background: 'var(--gradient)', 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: 'white', 
                fontSize: '24px', 
                fontWeight: 'bold',
                margin: '0 auto 20px'
              }}>
                3
              </div>
              <h3>Book</h3>
              <p>Select package & book</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                background: 'var(--gradient)', 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: 'white', 
                fontSize: '24px', 
                fontWeight: 'bold',
                margin: '0 auto 20px'
              }}>
                4
              </div>
              <h3>Enjoy</h3>
              <p>Beautiful event experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div className="grid grid-4">
          <div>
            <h2 style={{ fontSize: '48px', color: 'var(--primary)', marginBottom: '10px' }}>500+</h2>
            <p>Happy Customers</p>
          </div>
          <div>
            <h2 style={{ fontSize: '48px', color: 'var(--primary)', marginBottom: '10px' }}>150+</h2>
            <p>Verified Caterers</p>
          </div>
          <div>
            <h2 style={{ fontSize: '48px', color: 'var(--primary)', marginBottom: '10px' }}>1000+</h2>
            <p>Successful Bookings</p>
          </div>
          <div>
            <h2 style={{ fontSize: '48px', color: 'var(--primary)', marginBottom: '10px' }}>4.8</h2>
            <p>Average Rating</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;