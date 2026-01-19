import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Brain, FileText, TrendingUp, Lock, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';

const LandingPage = () => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-secondary)' }}>
            <Navbar />

            {/* Hero Section */}
            <section style={{
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
                color: 'white',
                padding: 'var(--spacing-3xl) 0',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                        maxWidth: '800px',
                        margin: '0 auto',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-sm)',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            padding: 'var(--spacing-sm) var(--spacing-lg)',
                            borderRadius: 'var(--radius-full)',
                            marginBottom: 'var(--spacing-xl)',
                            backdropFilter: 'blur(10px)'
                        }} className="animate-fade-in">
                            <Sparkles size={20} />
                            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                                AI-Powered Credit Repair Platform
                            </span>
                        </div>

                        <h1 style={{
                            fontSize: 'var(--font-size-5xl)',
                            fontWeight: 'var(--font-weight-extrabold)',
                            marginBottom: 'var(--spacing-lg)',
                            lineHeight: 1.1,
                            color: 'white'
                        }} className="animate-fade-in">
                            Transform Your Credit Score with AI Intelligence
                        </h1>

                        <p style={{
                            fontSize: 'var(--font-size-xl)',
                            marginBottom: 'var(--spacing-2xl)',
                            color: 'rgba(255, 255, 255, 0.9)',
                            lineHeight: 1.6
                        }} className="animate-fade-in">
                            Upload your credit report and get instant AI-powered analysis with Metro2 and FCRA compliance audits.
                            Unlock personalized dispute strategies to boost your score.
                        </p>

                        <div style={{
                            display: 'flex',
                            gap: 'var(--spacing-md)',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }} className="animate-fade-in">
                            <Link to="/register" className="btn btn-accent btn-lg" style={{
                                backgroundColor: 'white',
                                color: 'var(--color-primary)',
                                boxShadow: 'var(--shadow-xl)'
                            }}>
                                Get Started Free
                                <ArrowRight size={20} />
                            </Link>
                            <Link to="/login" className="btn btn-lg" style={{
                                backgroundColor: 'transparent',
                                color: 'white',
                                borderColor: 'white'
                            }}>
                                Sign In
                            </Link>
                        </div>

                        <p style={{
                            marginTop: 'var(--spacing-lg)',
                            fontSize: 'var(--font-size-sm)',
                            color: 'rgba(255, 255, 255, 0.8)'
                        }}>
                            ✓ No credit card required  ✓ Free analysis  ✓ Instant results
                        </p>
                    </div>
                </div>

                {/* Decorative elements */}
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-10%',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                    borderRadius: '50%'
                }}></div>
            </section>

            {/* Features Section */}
            <section style={{ padding: 'var(--spacing-3xl) 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
                        <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Powerful AI-Driven Features</h2>
                        <p style={{ fontSize: 'var(--font-size-lg)', maxWidth: '600px', margin: '0 auto' }}>
                            Everything you need to understand, dispute, and improve your credit profile
                        </p>
                    </div>

                    <div className="grid grid-3" style={{ marginTop: 'var(--spacing-2xl)' }}>
                        <div className="card card-glass animate-fade-in">
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: 'var(--radius-lg)',
                                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 'var(--spacing-lg)'
                            }}>
                                <Brain size={30} color="white" />
                            </div>
                            <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>AI Report Parsing</h3>
                            <p>Advanced AI extracts and categorizes every account, identifying patterns and anomalies instantly.</p>
                        </div>

                        <div className="card card-glass animate-fade-in">
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: 'var(--radius-lg)',
                                background: 'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-accent) 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 'var(--spacing-lg)'
                            }}>
                                <Shield size={30} color="white" />
                            </div>
                            <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>Compliance Audit</h3>
                            <p>Identify Metro2 and FCRA violations with precision. Know exactly what's wrong and why it matters.</p>
                        </div>

                        <div className="card card-glass animate-fade-in">
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: 'var(--radius-lg)',
                                background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-success) 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 'var(--spacing-lg)'
                            }}>
                                <TrendingUp size={30} color="white" />
                            </div>
                            <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>Impact Predictor</h3>
                            <p>See your potential score increase before you start. Data-driven predictions you can trust.</p>
                        </div>

                        <div className="card card-glass animate-fade-in">
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: 'var(--radius-lg)',
                                background: 'linear-gradient(135deg, var(--color-success) 0%, var(--color-primary) 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 'var(--spacing-lg)'
                            }}>
                                <FileText size={30} color="white" />
                            </div>
                            <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>Legal Strategies</h3>
                            <p>Get Metro2 and FCRA-compliant dispute strategies tailored to each negative item.</p>
                        </div>

                        <div className="card card-glass animate-fade-in">
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: 'var(--radius-lg)',
                                background: 'linear-gradient(135deg, var(--color-warning) 0%, var(--color-danger) 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 'var(--spacing-lg)'
                            }}>
                                <Lock size={30} color="white" />
                            </div>
                            <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>Secure & Private</h3>
                            <p>Bank-level encryption protects your sensitive financial data. Your privacy is our priority.</p>
                        </div>

                        <div className="card card-glass animate-fade-in">
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: 'var(--radius-lg)',
                                background: 'linear-gradient(135deg, var(--color-info) 0%, var(--color-primary) 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 'var(--spacing-lg)'
                            }}>
                                <CheckCircle size={30} color="white" />
                            </div>
                            <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>Proven Results</h3>
                            <p>Join thousands who've improved their scores by an average of 120+ points in 90 days.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section style={{
                padding: 'var(--spacing-3xl) 0',
                backgroundColor: 'var(--color-bg-primary)'
            }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
                        <h2 style={{ marginBottom: 'var(--spacing-md)' }}>How It Works</h2>
                        <p style={{ fontSize: 'var(--font-size-lg)', maxWidth: '600px', margin: '0 auto' }}>
                            Three simple steps to start improving your credit score today
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: 'var(--spacing-xl)',
                        marginTop: 'var(--spacing-2xl)'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: 'var(--color-primary)',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 'var(--font-size-3xl)',
                                fontWeight: 'var(--font-weight-bold)',
                                margin: '0 auto var(--spacing-lg)'
                            }}>
                                1
                            </div>
                            <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>Create Account</h4>
                            <p>Sign up in seconds. No credit card required for your free analysis.</p>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: 'var(--color-secondary)',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 'var(--font-size-3xl)',
                                fontWeight: 'var(--font-weight-bold)',
                                margin: '0 auto var(--spacing-lg)'
                            }}>
                                2
                            </div>
                            <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>Upload Report</h4>
                            <p>Drag and drop your credit report PDF. Our AI analyzes it in seconds.</p>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: 'var(--color-accent)',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 'var(--font-size-3xl)',
                                fontWeight: 'var(--font-weight-bold)',
                                margin: '0 auto var(--spacing-lg)'
                            }}>
                                3
                            </div>
                            <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>Get Strategies</h4>
                            <p>Receive personalized dispute strategies and watch your score improve.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                padding: 'var(--spacing-3xl) 0',
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
                color: 'white',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h2 style={{ color: 'white', marginBottom: 'var(--spacing-md)' }}>
                        Ready to Take Control of Your Credit?
                    </h2>
                    <p style={{
                        fontSize: 'var(--font-size-xl)',
                        marginBottom: 'var(--spacing-xl)',
                        color: 'rgba(255, 255, 255, 0.9)',
                        maxWidth: '600px',
                        margin: '0 auto var(--spacing-xl)'
                    }}>
                        Join thousands of users who have successfully improved their credit scores with The Credit Edit.
                    </p>
                    <Link to="/register" className="btn btn-lg" style={{
                        backgroundColor: 'white',
                        color: 'var(--color-primary)',
                        boxShadow: 'var(--shadow-xl)'
                    }}>
                        Start Your Free Analysis
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                padding: 'var(--spacing-xl) 0',
                backgroundColor: 'var(--color-bg-dark)',
                color: 'var(--color-text-inverse)',
                textAlign: 'center'
            }}>
                <div className="container">
                    <p style={{ marginBottom: 'var(--spacing-sm)', color: 'rgba(255, 255, 255, 0.8)' }}>
                        © 2024 The Credit Edit. All rights reserved.
                    </p>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255, 255, 255, 0.6)', marginBottom: 0 }}>
                        This service is not a credit repair organization as defined under federal or state law.
                        We provide educational tools and resources for credit management.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
