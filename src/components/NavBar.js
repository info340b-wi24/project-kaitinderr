import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

export default function NavBar() {
  return (
    <header>
      <nav className="nav-bar">
        <Link to="/" className="icon"><img src="https://firebasestorage.googleapis.com/v0/b/mangomusic-64e1e.appspot.com/o/icon%2Fmango-icon.png?alt=media&token=1ecb68e5-2143-4353-be8c-4591b4d45cab" alt="mango icon" /></Link>
        
        <div className="mobile-nav">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic" aria-label="Navigation Menu">
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
        
        <div className="desktop-nav">
          <Link to="/">Home</Link>
          <Link to="/game">Game</Link>
          <Link to="/signin">Sign In</Link>
        </div>
      </nav>
    </header>
  );
}
