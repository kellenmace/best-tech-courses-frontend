import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';

const tempStyles = {
  border: '3px solid #eee',
};

export default () => (
  <header className="header" style={tempStyles}>
    <div className="logo">
      <Link to="/">Best Tech Courses</Link>
    </div>
    <div className="nav">
      <Nav />
    </div>
  </header>
);

// TODO:
// Output BTC logo
