import React, { useEffect, useState } from 'react';
import './Hero.css';

const Hero = () => {
    const [text, setText] = useState('');
    const fullText = 'CINEMATIC AI PRODUCTIONS';

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index <= fullText.length) {
                setText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(timer);
            }
        }, 100);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="hero" id="hero">
            <div className="hero-background">
                <div className="gradient-overlay"></div>
                <div className="animated-gradient"></div>
            </div>

            <div className="hero-content">
                <div className="hero-text">
                    <h1 className="hero-title">
                        {text}
                        <span className="cursor">|</span>
                    </h1>
                    <p className="hero-subtitle">
                        Where creativity meets artificial intelligence
                    </p>
                    <div className="hero-cta">
                        <a href="#work" className="btn btn-primary">View Our Work</a>
                        <a href="#contact" className="btn btn-outline">Get Started</a>
                    </div>
                </div>

                <div className="scroll-indicator">
                    <div className="mouse">
                        <div className="wheel"></div>
                    </div>
                    <p>Scroll to explore</p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
