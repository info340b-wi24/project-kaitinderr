import React from 'react';

export default function NavBar() {
    return (
        <header>
        <nav className="nav-bar">
            <a href="index.html" class="icon"><img src="img/mango-icon.png" alt="mango icon"/></a>
            <div className="hamburger-menu"><a href="#"><i className="fa fa-bars" aria-label="menu"></i></a></div>
            <div className="nav-links">
                <ul className="nav-options">
                    <li className="nav-page"><a href="#">Home</a></li>
                    <li className="nav-page"><a href="#">Game</a></li>
                    <li className="nav-page"><a href="#">Sign in</a></li>
                </ul>
            </div>
        </nav>
    </header>
    )
}