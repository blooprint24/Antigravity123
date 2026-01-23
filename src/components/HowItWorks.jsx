import React from 'react';
import { Search, Rocket, TrendingUp } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        {
            icon: <Search size={32} />,
            title: "Identify the friction",
            desc: "We pinpoint exactly where you're losing time, money, and customers."
        },
        {
            icon: <Rocket size={32} />,
            title: "Install the system",
            desc: "Our Digital Intelligence Platform takes over the manual work instantly."
        },
        {
            icon: <TrendingUp size={32} />,
            title: "Optimize and scale",
            desc: "Watch your business grow without adding more people or complexity."
        }
    ];

    return (
        <section className="section bg-navy text-white" id="how-it-works">
            <div className="container">
                <h2 className="section-title text-white reveal">Simple 3-Step Process</h2>
                <div className="grid grid-3 mt-lg">
                    {steps.map((step, index) => (
                        <div key={index} className="step-card reveal">
                            <div className="step-number">{index + 1}</div>
                            <div className="step-icon-box">{step.icon}</div>
                            <h3 className="step-title">{step.title}</h3>
                            <p className="step-desc">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
