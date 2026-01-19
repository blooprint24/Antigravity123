import React from 'react';
import './FeaturedWork.css';

const FeaturedWork = () => {
    return (
        <section className="featured-work section" id="work">
            <div className="container">
                <h2 className="section-title">Creative Productions</h2>

                <div className="work-showcase glass-strong">
                    <div className="video-container">
                        <div className="video-placeholder">
                            <div className="play-button">
                                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                                    <circle cx="40" cy="40" r="38" stroke="white" strokeWidth="2" opacity="0.3" />
                                    <path d="M32 25L55 40L32 55V25Z" fill="white" />
                                </svg>
                            </div>
                            <div className="video-gradient"></div>
                        </div>
                    </div>

                    <div className="work-metadata">
                        <div className="metadata-item">
                            <span className="metadata-label">Category</span>
                            <span className="metadata-value">Commercial</span>
                        </div>
                        <div className="metadata-item">
                            <span className="metadata-label">Client</span>
                            <span className="metadata-value">Tech Innovators Inc.</span>
                        </div>
                        <div className="metadata-item">
                            <span className="metadata-label">Project</span>
                            <span className="metadata-value">AI-Powered Future Vision</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedWork;
