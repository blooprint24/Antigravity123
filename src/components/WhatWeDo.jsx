import React from 'react';

const WhatWeDo = () => {
    return (
        <section className="section" id="what-we-do">
            <div className="container">
                <div className="grid grid-2 items-center gap-xl">
                    <div className="reveal">
                        <h2 className="section-title text-left">We Remove the Friction</h2>
                        <div className="solution-content">
                            <p className="solution-p">We install systems that answer, follow up, schedule, and respond automatically.</p>
                            <p className="solution-p">We make sure every lead gets handled, no matter how busy you are.</p>
                            <p className="solution-p">We help your business run smoothly even when you're off the clock.</p>

                            <div className="dip-box">
                                <h3 className="dip-title">Digital Intelligence Platform (DIP)</h3>
                                <p>We call this system your Digital Intelligence Platform — the engine that keeps your business moving.</p>
                            </div>
                        </div>
                    </div>
                    <div className="reveal reveal-delay">
                        <div className="visual-placeholder bg-navy">
                            <div className="dip-visual">
                                <div className="dip-pulse"></div>
                                <div className="dip-ring"></div>
                                <div className="dip-ring"></div>
                                <div className="dip-ring"></div>
                                <div className="dip-node-cluster">
                                    <div className="node"></div>
                                    <div className="node"></div>
                                    <div className="node"></div>
                                    <div className="node"></div>
                                </div>
                            </div>
                            <span className="visual-text mt-md">DIP System Active</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatWeDo;
