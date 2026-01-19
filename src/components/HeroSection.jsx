import React from 'react';

const HeroSection = () => {
    const scrollToUpload = () => {
        const uploader = document.querySelector('.image-uploader-section');
        if (uploader) {
            uploader.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <section className="hero-section" style={{
            background: 'var(--gradient-hero)',
            padding: 'var(--spacing-4xl) 0',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Animated background elements */}
            <div style={{
                position: 'absolute',
                top: '10%',
                left: '5%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: 'float 6s ease-in-out infinite'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '15%',
                right: '10%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: 'float 8s ease-in-out infinite'
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="text-center">
                    <div className="animate-fade-in">
                        <h1 style={{
                            fontSize: 'var(--font-size-6xl)',
                            fontWeight: 'var(--font-weight-extrabold)',
                            color: 'var(--color-text-inverse)',
                            marginBottom: 'var(--spacing-lg)',
                            textShadow: '0 2px 20px rgba(0,0,0,0.2)'
                        }}>
                            ClearMark Pro
                        </h1>
                        <p style={{
                            fontSize: 'var(--font-size-2xl)',
                            color: 'rgba(255,255,255,0.95)',
                            marginBottom: 'var(--spacing-2xl)',
                            maxWidth: '800px',
                            margin: '0 auto var(--spacing-2xl)',
                            textShadow: '0 1px 10px rgba(0,0,0,0.1)'
                        }}>
                            Remove watermarks from images instantly with AI-powered precision
                        </p>
                    </div>

                    <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
                        <button
                            className="btn btn-lg"
                            onClick={scrollToUpload}
                            style={{
                                background: 'var(--color-bg-primary)',
                                color: 'var(--color-primary)',
                                marginRight: 'var(--spacing-md)',
                                marginBottom: 'var(--spacing-md)'
                            }}
                        >
                            Get Started Free
                        </button>
                        <button
                            className="btn btn-lg btn-outline"
                            style={{
                                borderColor: 'white',
                                color: 'white',
                                marginBottom: 'var(--spacing-md)'
                            }}
                            onClick={() => {
                                const features = document.querySelector('.feature-showcase');
                                if (features) features.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Learn More
                        </button>
                    </div>

                    <div className="flex justify-center gap-xl mt-2xl" style={{
                        flexWrap: 'wrap',
                        color: 'rgba(255,255,255,0.9)'
                    }}>
                        <div className="flex items-center gap-sm">
                            <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>100% Free</span>
                        </div>
                        <div className="flex items-center gap-sm">
                            <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>AI-Powered</span>
                        </div>
                        <div className="flex items-center gap-sm">
                            <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Batch Processing</span>
                        </div>
                        <div className="flex items-center gap-sm">
                            <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>No Signup Required</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
