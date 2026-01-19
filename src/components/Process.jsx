import React from 'react';
import './Process.css';

const Process = () => {
    const steps = [
        {
            number: '01',
            title: 'Concept & Script',
            description: 'We collaborate with you to develop compelling narratives and creative concepts that align with your vision.'
        },
        {
            number: '02',
            title: 'AI Generation',
            description: 'Our advanced AI pipeline transforms concepts into stunning visuals, leveraging cutting-edge technology.'
        },
        {
            number: '03',
            title: 'Post-Production',
            description: 'Expert editing, color grading, and sound design bring everything together for a polished final product.'
        },
        {
            number: '04',
            title: 'Delivery & Support',
            description: 'We deliver in your preferred format and provide ongoing support to ensure your complete satisfaction.'
        }
    ];

    return (
        <section className="process section" id="process">
            <div className="container">
                <h2 className="section-title">How We Create Magic</h2>

                <div className="process-timeline">
                    {steps.map((step, index) => (
                        <div key={index} className="process-step">
                            <div className="step-number">{step.number}</div>
                            <div className="step-content glass">
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-description">{step.description}</p>
                            </div>
                            {index < steps.length - 1 && <div className="step-connector"></div>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
