import React from 'react';
import './Partners.css';

const Partners = () => {
    const partners = [
        'TechCorp', 'InnovateLabs', 'DigitalVision',
        'CreativeHub', 'FutureWorks', 'MediaPro'
    ];

    return (
        <section className="partners section">
            <div className="container">
                <h2 className="section-title">Trusted By Industry Leaders</h2>

                <div className="partners-grid">
                    {partners.map((partner, index) => (
                        <div key={index} className="partner-logo">
                            <div className="logo-placeholder">
                                {partner}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;
