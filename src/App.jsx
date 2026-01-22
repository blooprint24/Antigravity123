import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
    return (
        <div className="app-container">
            <Navbar />
            <main>
                <Hero />
                <Services />
                <About />
                <Reviews />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default App;

