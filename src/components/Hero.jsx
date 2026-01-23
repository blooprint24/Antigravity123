import React, { useEffect, useState } from 'react';

const Hero = () => {
    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setOffsetY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="hero-section">
            <div className="hero-bg-layers">
                {/* Layer 1: Aurora Animation */}
                <div className="hero-aurora"></div>

                {/* Layer 2: Systems Grid */}
                <div className="hero-grid-pattern"></div>

                {/* Layer 3: Main Radial Glow */}
                <div className="hero-glow" style={{
                    transform: `translate3d(0, ${offsetY * 0.3}px, 0)`
                }}></div>
            </div>

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
        </section>
    );
};

export default Hero;
