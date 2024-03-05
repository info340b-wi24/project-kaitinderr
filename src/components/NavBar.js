import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    return (
        <header>
        <nav className="nav-bar">
        <NavLink to="/" class="icon"><img src="img/mango-icon.png" alt="mango icon"/></NavLink>
            <div className="hamburger-menu"><a href="#"><i className="fa fa-bars" aria-label="menu"></i></a></div>
            <div className="nav-links">
                <ul className="nav-options">
                    <li className="nav-page"><NavLink to="/">Home</NavLink></li>
                    <li className="nav-page"><NavLink to="GamePage">Game</NavLink></li>
                    <li className="nav-page"><a href="#">Sign in</a></li>
                </ul>
            </div>
        </nav>
    </header>
    )
}