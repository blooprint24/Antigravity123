import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const Outcomes = () => {
    const outcomes = [
        "Faster responses around the clock",
        "More captured leads that never go cold",
        "Higher conversion rates from every visitor",
        "Better client reviews on total autopilot",
        "Less stress for you and your team",
        "More revenue without more hiring"
    ];

    return (
        <section className="section" id="outcomes">
            <div className="container">
                <div className="grid grid-2 items-center">
                    <div className="reveal">
                        <h2 className="section-title text-left">What Changes When Friction Is Gone</h2>
                        <p className="section-intro text-left ml-0">Results you can see and feel in your daily operations.</p>

                        <div className="outcome-list">
                            {outcomes.map((item, index) => (
                                <div key={index} className="outcome-item">
                                    <CheckCircle2 className="text-green" size={24} />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="reveal reveal-delay">
                        <div className="outcome-visual">
                            <div className="outcome-card">
                                <span className="outcome-value">+40%</span>
                                <span className="outcome-label">Lead Capture Rate</span>
                            </div>
                            <div className="outcome-card">
                                <span className="outcome-value">&lt; 2min</span>
                                <span className="outcome-label">Response Time</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Outcomes;
