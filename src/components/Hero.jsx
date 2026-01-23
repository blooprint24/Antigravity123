import React from 'react';

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="container hero-container">
                <div className="hero-content">
                    <h1 className="hero-title reveal">
                        Modernize Your Business. <br />
                        <span className="text-blue">Kill the Friction.</span>
                    </h1>
                    <p className="hero-subtitle reveal">
                        We help businesses make more money with less effort by installing systems that run automatically.
                    </p>
                    <div className="hero-actions reveal">
                        <a href="#audit" className="btn btn-primary">Get a Free Friction Audit</a>
                        <a href="#how-it-works" className="btn btn-secondary">See How It Works</a>
                    </div>
                </div>
            </div>

            {/* Subtle Background Element */}
            <div className="hero-bg-accent"></div>
        </section>
    );
};

export default Hero;
