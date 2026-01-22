import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="contact-section">
            <div className="container contact-container">
                <div className="contact-info-panel">
                    <span className="section-label">Contact Us</span>
                    <h2 className="section-title">Ready to Start Your Project?</h2>
                    <p className="contact-lead">
                        Contact us today, and let's bring your outdoor dream space to life.
                    </p>

                    <div className="info-items">
                        <div className="info-item">
                            <span className="info-icon">📞</span>
                            <div className="info-content">
                                <span className="info-label">Call or Text</span>
                                <a href="tel:2252780029" className="info-value">(225) 278-0029</a>
                            </div>
                        </div>
                        <div className="info-item">
                            <span className="info-icon">📍</span>
                            <div className="info-content">
                                <span className="info-label">Main Office</span>
                                <span className="info-value">10141 Buttercup Dr, Baton Rouge</span>
                            </div>
                        </div>
                        <div className="info-item">
                            <span className="info-icon">⏰</span>
                            <div className="info-content">
                                <span className="info-label">Open Hours</span>
                                <span className="info-value">Open Now · Closes 9 PM</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contact-form-panel">
                    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label>Your Name</label>
                            <input type="text" placeholder="John Doe" />
                        </div>
                        <div className="form-group">
                            <label>Service Needed</label>
                            <select>
                                <option>Landscaping</option>
                                <option>Hardscaping</option>
                                <option>Tree Services</option>
                                <option>Lawn Maintenance</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea placeholder="Tell us about your outdoor vision..."></textarea>
                        </div>
                        <button type="submit" className="btn-primary full-width">Request Free Quote</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
