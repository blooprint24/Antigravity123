import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="logo white">
                            <span className="logo-text">ACE <span className="text-accent">TERRAIN</span></span>
                            <span className="logo-subtext">LANDSCAPING</span>
                        </div>
                        <p>Transforming Baton Rouge outdoor spaces with expert precision and 5 years of dedicated experience.</p>
                        <div className="footer-contact-info">
                            <p><strong>Phone:</strong> (225) 278-0029</p>
                            <p><strong>Areas:</strong> Baton Rouge & Nearby Areas</p>
                            <p><strong>Hours:</strong> Closes 9 PM</p>
                        </div>
                    </div>

                    <div className="footer-nav">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#services">Services</a></li>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#reviews">Reviews</a></li>
                            <li><a href="#contact">Get a Quote</a></li>
                        </ul>
                    </div>

                    <div className="footer-services">
                        <h3>Our Services</h3>
                        <ul>
                            <li>Landscaping</li>
                            <li>Hardscaping</li>
                            <li>Tree Services</li>
                            <li>Lawn Care</li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Ace Terrain Landscaping. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
