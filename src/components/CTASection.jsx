import React from 'react';

const CTASection = () => {
    return (
        <section className="section bg-navy text-white" id="audit">
            <div className="container text-center">
                <div className="cta-box reveal">
                    <h2 className="section-title text-white">Find the Friction in Your Business</h2>
                    <p className="section-intro text-white" style={{ opacity: 0.9 }}>
                        Our free audit identifies exactly where time, money, and customers are being lost in your current process.
                    </p>
                    <a href="#" className="btn btn-primary btn-lg mt-md">Get Your Free Friction Audit</a>
                    <p className="mt-sm" style={{ fontSize: '0.9rem', opacity: 0.7 }}>No obligation. No jargon. Just clarity.</p>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
