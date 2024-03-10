import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

export default function NavBar() {
  return (
    <header>
      <nav className="nav-bar">
        <Link to="/" className="icon"><img src="img/mango-icon.png" alt="mango icon" /></Link>
        
        {/* Dropdown for mobile view */}
        <div className="mobile-nav">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <i className="fa fa-bars"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as="button">
                <Link to="/">Home</Link>
              </Dropdown.Item>
              <Dropdown.Item as="button">
                <Link to="/game">Game</Link>
              </Dropdown.Item>
              <Dropdown.Item as="button">
                <Link to="/signin">Sign In</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        
        {/* Regular navigation for desktop view */}
        <div className="desktop-nav">
          <Link to="/">Home</Link>
          <Link to="/game">Game</Link>
          <Link to="/signin">Sign In</Link>
        </div>
      </nav>
    </header>
  );
}
