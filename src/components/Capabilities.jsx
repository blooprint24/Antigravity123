import React from 'react';
import './Capabilities.css';

const Capabilities = () => {
    const services = [
        {
            title: 'Campaign & Ad Content',
            description: 'Eye-catching commercials and promotional content that drives engagement and conversions.'
        },
        {
            title: 'Brand Films & Stories',
            description: 'Compelling narratives that capture your brand essence and connect with audiences emotionally.'
        },
        {
            title: 'Product Visualization',
            description: 'Stunning 3D renders and animations that showcase your products in the best light.'
        },
        {
            title: 'Social Media Content',
            description: 'Scroll-stopping content optimized for maximum impact across all social platforms.'
        }
    ];

    return (
        <section className="capabilities section" id="capabilities">
            <div className="container">
                <h2 className="section-title">Our Capabilities</h2>

                <div className="capabilities-grid">
                    {services.map((service, index) => (
                        <div key={index} className="capability-card glass">
                            <div className="card-tag">CREATIVE STUDIO</div>
                            <div className="card-image">
                                <div className="card-gradient" style={{
                                    background: `linear-gradient(${135 + index * 45}deg, 
                    rgba(211, 47, 47, 0.4) 0%, 
                    rgba(26, 26, 26, 0.8) 100%)`
                                }}></div>
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{service.title}</h3>
                                <p className="card-description">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Capabilities;
