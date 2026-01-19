import React from 'react';
import './Gallery.css';

const Gallery = () => {
    const galleryItems = [
        { id: 1, category: 'Character Design' },
        { id: 2, category: 'Environment' },
        { id: 3, category: 'Product Visualization' },
        { id: 4, category: 'Abstract Art' },
        { id: 5, category: 'Motion Graphics' },
        { id: 6, category: 'Concept Art' },
    ];

    return (
        <section className="gallery section">
            <div className="container">
                <h2 className="section-title">What We Develop</h2>
                <p className="gallery-subtitle">Exploring the full spectrum of AI-powered creativity</p>

                <div className="gallery-grid">
                    {galleryItems.map((item) => (
                        <div key={item.id} className="gallery-item">
                            <div className="gallery-image">
                                <div className="image-gradient" style={{
                                    background: `linear-gradient(${item.id * 60}deg, 
                    rgba(211, 47, 47, 0.3) 0%, 
                    rgba(26, 26, 26, 0.9) 100%)`
                                }}></div>
                            </div>
                            <div className="gallery-overlay">
                                <h3 className="gallery-category">{item.category}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
