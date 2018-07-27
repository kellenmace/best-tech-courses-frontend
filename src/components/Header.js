import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';

export default () => (
  <header className="header" style={{border: '3px solid #eee'}}>
    <div className="logo">
      <Link to="/">Best Tech Courses</Link>
    </div>
    <div className="nav">
      <Nav />
    </div>
  </header>
);
