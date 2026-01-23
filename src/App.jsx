import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FrictionPoints from './components/FrictionPoints';
import WhatWeDo from './components/WhatWeDo';
import HowItWorks from './components/HowItWorks';
import Outcomes from './components/Outcomes';
import Services from './components/Services';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

function App() {
    useEffect(() => {
        const reveals = document.querySelectorAll('.reveal');

        const revealOnScroll = () => {
            reveals.forEach(reveal => {
                const windowHeight = window.innerHeight;
                const revealTop = reveal.getBoundingClientRect().top;
                const revealPoint = 150;

                if (revealTop < windowHeight - revealPoint) {
                    reveal.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Initial check

        return () => window.removeEventListener('scroll', revealOnScroll);
    }, []);

    return (
        <div className="app-wrapper">
            <Navbar />
            <main>
                <Hero />
                <FrictionPoints />
                <WhatWeDo />
                <HowItWorks />
                <Outcomes />
                <Services />
                <CTASection />
            </main>
            <Footer />

            {/* Mobile Sticky CTA */}
            <div className="mobile-cta">
                <a href="#audit" className="btn btn-primary" style={{ width: '100%', borderRadius: '4px' }}>
                    Free Friction Audit
                </a>
            </div>
        </div>
    );
}

export default App;
