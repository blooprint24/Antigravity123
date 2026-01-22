import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container nav-content">
                <div className="logo" onClick={scrollToTop}>
                    <span className="logo-text">ACE <span className="text-accent">TERRAIN</span></span>
                    <span className="logo-subtext">LANDSCAPING</span>
                </div>

                <ul className="nav-links">
                    <li><a href="#services">Services</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#reviews">Reviews</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>

                <div className="nav-cta">
                    <a href="tel:2252780029" className="btn-call">
                        <span className="icon">📞</span>
                        (225) 278-0029
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
