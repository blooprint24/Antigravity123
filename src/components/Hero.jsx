import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-overlay"></div>
            <div className="container hero-content">
                <div className="hero-badge">
                    <span className="star">★ ★ ★ ★ ★</span>
                    <span className="rating-text">5.0 (5 Reviews)</span>
                </div>
                <h1 className="hero-title">
                    Transforming Your <br />
                    <span className="text-accent">Outdoor Vision</span> Into Reality
                </h1>
                <p className="hero-description">
                    Expert landscaping, hardscaping, and tree services in Baton Rouge.
                    With 5 years of experience, we bring exceptional quality to every project.
                </p>
                <div className="hero-actions">
                    <a href="#contact" className="btn-primary">Bring My Vision To Life</a>
                    <a href="#services" className="btn-outline">Explore Our Services</a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
