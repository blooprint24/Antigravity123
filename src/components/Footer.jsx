import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer" id="contact">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <span className="logo-text">CREATIVE</span>
                            <span className="logo-accent">STUDIO</span>
                        </div>
                        <p className="footer-tagline">
                            Transforming visions into reality through the power of AI
                        </p>
                    </div>

                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>Services</h4>
                            <ul>
                                <li><a href="#capabilities">Campaign Content</a></li>
                                <li><a href="#capabilities">Brand Films</a></li>
                                <li><a href="#capabilities">Product Visualization</a></li>
                                <li><a href="#capabilities">Social Media</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4>Company</h4>
                            <ul>
                                <li><a href="#work">Our Work</a></li>
                                <li><a href="#process">Process</a></li>
                                <li><a href="#team">Team</a></li>
                                <li><a href="#contact">Contact</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4>Connect</h4>
                            <ul className="social-links">
                                <li><a href="#" aria-label="LinkedIn">LinkedIn</a></li>
                                <li><a href="#" aria-label="Twitter">Twitter</a></li>
                                <li><a href="#" aria-label="Instagram">Instagram</a></li>
                                <li><a href="#" aria-label="YouTube">YouTube</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-cta">
                    <h3>Ready to create something amazing?</h3>
                    <a href="#contact" className="btn btn-primary">Start Your Project</a>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2024 Creative Studio. All rights reserved.</p>
                    <div className="footer-legal">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
