import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <header>
        <nav className="nav-bar">
        <Link to="/" class="icon"><img src="img/mango-icon.png" alt="mango icon"/></Link>
            <div className="hamburger-menu"><a href="#"><i className="fa fa-bars" aria-label="menu"></i></a></div>
            <div className="nav-links">
                <ul className="nav-options">
                    <li className="nav-page"><Link to="/">Home</Link></li>
                    <li className="nav-page"><Link to="game">Game</Link></li>
                    <li className="nav-page"><Link to="signin">Sign in</Link></li>
                </ul>
            </div>
        </nav>
    </header>
    )
}