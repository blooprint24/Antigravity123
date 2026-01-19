import React from 'react';

const HowItWorks = () => {
    const steps = [
        {
            number: "01",
            title: "Upload Images",
            description: "Drag and drop your photos into the workspace. Batch upload is supported!"
        },
        {
            number: "02",
            title: "Detect & Highlight",
            description: "Our AI automatically detects watermarks, or you can brush them manually."
        },
        {
            number: "03",
            title: "Process & Refine",
            description: "Click 'Remove' and watch the magic happen. Undo or redo any changes."
        },
        {
            number: "04",
            title: "Download Results",
            description: "Export your clean images in high resolution as PNG, JPG, or WebP."
        }
    ];

    return (
        <section className="how-it-works py-3xl" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
            <div className="container">
                <div className="text-center mb-3xl">
                    <h2 className="text-gradient">How It Works</h2>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Simple process, professional results</p>
                </div>

                <div className="grid grid-4 gap-xl">
                    {steps.map((step, idx) => (
                        <div key={idx} className="text-center animate-fade-in" style={{ animationDelay: `${idx * 0.15}s` }}>
                            <div
                                style={{
                                    fontSize: '4rem',
                                    fontWeight: '800',
                                    color: 'rgba(99, 102, 241, 0.1)',
                                    lineHeight: '1',
                                    marginBottom: '-1rem',
                                    fontFamily: 'system-ui'
                                }}
                            >
                                {step.number}
                            </div>
                            <h3 className="mb-md" style={{ position: 'relative', zIndex: 1 }}>{step.title}</h3>
                            <p style={{ fontSize: 'var(--font-size-sm)' }}>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
