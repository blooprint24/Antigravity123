import React from 'react';
import './Services.css';

const services = [
    {
        title: "Landscaping",
        description: "Complete landscape renovation and maintenance tailored to your needs.",
        stats: "Full Renovation",
        icon: "🌿"
    },
    {
        title: "Hardscaping",
        description: "Stone pathways, patios, and functional outdoor structures.",
        stats: "Custom Design",
        icon: "🧱"
    },
    {
        title: "Tree Services",
        description: "Professional tree care, trimming, and safe removal services.",
        stats: "Safe & Licensed",
        icon: "🌳"
    },
    {
        title: "Lawn Care",
        description: "Regular maintenance, mowing, and flower garden cleaning.",
        stats: "Weekly/Bi-weekly",
        icon: "✂️"
    }
];

const Services = () => {
    return (
        <section id="services" className="services-section">
            <div className="container">
                <div className="section-intro">
                    <span className="section-label">Our Expertise</span>
                    <h2 className="section-title">Premium Outdoor Services</h2>
                    <p className="section-description">
                        We provide exceptional quality services that cater to your specific needs and preferences.
                    </p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div className="service-card" key={index}>
                            <div className="service-icon-box">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <div className="service-footer">
                                <span className="service-stats">{service.stats}</span>
                                <a href="#contact" className="service-link">Learn More →</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
