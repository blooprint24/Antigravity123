import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

import logo from '../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'What We Do', href: '#what-we-do' },
        { name: 'Outcomes', href: '#outcomes' },
    ];

    return (
        <nav className={`nav-main ${scrolled ? 'nav-scrolled' : ''}`}>
            <div className="container nav-container">
                {/* Logo */}
                <a href="/" className="logo">
                    <img src={logo} alt="Ideal Performance Group" className="logo-img" />
                </a>

                {/* Desktop Nav */}
                <div className="nav-desktop">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="nav-link">
                            {link.name}
                        </a>
                    ))}
                    <a href="#audit" className="btn btn-primary">Free Friction Audit</a>
                </div>

                {/* Mobile Toggle */}
                <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`nav-mobile ${isOpen ? 'nav-mobile-open' : ''}`}>
                <div className="nav-mobile-content">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="nav-mobile-link"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a href="#audit" className="btn btn-primary" onClick={() => setIsOpen(false)}>
                        Free Friction Audit
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
