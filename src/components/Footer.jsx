import React from 'react';

import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer className="footer section pb-xl">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="logo">
                            <img src={logo} alt="Ideal Performance Group" className="logo-img" />
                        </div>
                        <p className="mt-sm text-gray-800" style={{ maxWidth: '300px' }}>
                            Modernizing businesses by removing friction and installing intelligent systems.
                        </p>
                    </div>

                    <div className="footer-links">
                        <h4 className="footer-title">Quick Links</h4>
                        <a href="#how-it-works" className="footer-link">How It Works</a>
                        <a href="#what-we-do" className="footer-link">What We Do</a>
                        <a href="#outcomes" className="footer-link">Outcomes</a>
                    </div>

                    <div className="footer-contact">
                        <h4 className="footer-title">Contact</h4>
                        <p className="footer-link">hello@idealperformance.com</p>
                        <p className="footer-link">(555) 123-4567</p>
                        <a href="#audit" className="btn btn-secondary mt-sm">Free Audit</a>
                    </div>
                </div>

                <div className="footer-bottom mt-xl pt-md border-t">
                    <p className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} Ideal Performance Group. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
