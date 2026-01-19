import React from 'react';

const FeatureShowcase = () => {
    const features = [
        {
            title: "AI Smart Detection",
            description: "Our advanced neural networks automatically identify watermarks, logos, and text overlays with pixel-perfect accuracy.",
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="48" height="48">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
            gradient: "var(--gradient-primary)"
        },
        {
            title: "Batch Processing",
            description: "Save time by processing entire folders of images at once. Consistency guaranteed across your whole library.",
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="48" height="48">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
            gradient: "var(--gradient-secondary)"
        },
        {
            title: "Manual Precision",
            description: "For complex images, use our precision brush tool to manually highlight areas for surgical removal.",
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="48" height="48">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            ),
            gradient: "var(--gradient-accent)"
        },
        {
            title: "Quality Preserved",
            description: "Our algorithms fill in the gaps by analyzing surrounding pixels, keeping your images sharp and natural.",
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="48" height="48">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            gradient: "var(--gradient-purple)"
        }
    ];

    return (
        <section className="feature-showcase py-3xl bg-white">
            <div className="container">
                <div className="text-center mb-3xl">
                    <h2 className="text-gradient">Professional Features</h2>
                    <p className="container-narrow mx-auto" style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem' }}>
                        Everything you need to clean up your images in seconds. No software installation, no complex tools.
                    </p>
                </div>

                <div className="grid grid-2 gap-2xl">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="card flex gap-xl items-start animate-fade-in"
                            style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                            <div
                                style={{
                                    background: feature.gradient,
                                    color: 'white',
                                    padding: 'var(--spacing-md)',
                                    borderRadius: 'var(--radius-xl)',
                                    boxShadow: 'var(--shadow-md)',
                                    flexShrink: 0
                                }}
                            >
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="mb-sm">{feature.title}</h3>
                                <p style={{ margin: 0 }}>{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
        .mx-auto { margin-left: auto; margin-right: auto; }
        .py-3xl { padding-top: var(--spacing-4xl); padding-bottom: var(--spacing-4xl); }
      `}} />
        </section>
    );
};

export default FeatureShowcase;
