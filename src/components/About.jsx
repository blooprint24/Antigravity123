import React from 'react';
import './About.css';

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="container about-grid">
                <div className="about-image-container">
                    <div className="experience-badge">
                        <span className="years">5+</span>
                        <span className="exp-text">Years of Excellence</span>
                    </div>
                    {/* Note: In a real app we'd use another generated image here */}
                    <div className="about-placeholder-image"></div>
                </div>

                <div className="about-content">
                    <span className="section-label">About Ace Terrain</span>
                    <h2 className="section-title">Guided by Quality, Sustainable by Nature.</h2>
                    <p className="about-lead">
                        "Welcome to Ace Terrain Landscaping, your go-to destination for all your landscaping needs."
                    </p>
                    <p className="about-text">
                        Our team of expert professionals offers a wide range of services, including landscaping, hardscaping, tree services, and lawn care services.
                        With 5 years of experience in the industry, we provide exceptional quality services that cater to your specific needs and preferences.
                    </p>
                    <p className="about-text">
                        Our mission is to transform your outdoor space into a beautiful, functional, and sustainable place you'll love spending time in.
                        Whether you need a complete landscape renovation or regular lawn maintenance, we've got you covered.
                    </p>

                    <div className="about-features">
                        <div className="feature-item">
                            <span className="feature-icon">🌿</span>
                            <span>Sustainable Practices</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">💎</span>
                            <span>Expert Precision</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">🤝</span>
                            <span>Client Focused</span>
                        </div>
                    </div>

                    <a href="tel:2252780029" className="btn-primary">Connect With Us Today</a>
                </div>
            </div>
        </section>
    );
};

export default About;
