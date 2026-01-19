import React from 'react';
import './Awards.css';

const Awards = () => {
    const awards = [
        { title: 'Best AI Innovation', year: '2024', organization: 'Tech Awards' },
        { title: 'Creative Excellence', year: '2024', organization: 'Design Summit' },
        { title: 'Industry Leader', year: '2023', organization: 'AI Conference' },
    ];

    return (
        <section className="awards section">
            <div className="container">
                <h2 className="section-title">Awards & Recognition</h2>

                <div className="awards-grid">
                    {awards.map((award, index) => (
                        <div key={index} className="award-card glass">
                            <div className="laurel-icon">
                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                    <path d="M30 10L32 20L30 30L28 20L30 10Z" fill="var(--color-candy-red)" />
                                    <path d="M30 30L40 32L50 30L40 28L30 30Z" fill="var(--color-candy-red)" />
                                    <path d="M30 30L28 40L30 50L32 40L30 30Z" fill="var(--color-candy-red)" />
                                    <path d="M30 30L20 28L10 30L20 32L30 30Z" fill="var(--color-candy-red)" />
                                    <circle cx="30" cy="30" r="8" fill="none" stroke="var(--color-candy-red)" strokeWidth="2" />
                                </svg>
                            </div>
                            <h3 className="award-title">{award.title}</h3>
                            <p className="award-year">{award.year}</p>
                            <p className="award-org">{award.organization}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Awards;
