import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, Shield, Zap, FileText, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';

const PaymentPage = () => {
    const [selectedPlan, setSelectedPlan] = useState('full-edit');
    const [processing, setProcessing] = useState(false);
    const { upgradeToPremium } = useAuth();
    const navigate = useNavigate();

    const plans = [
        {
            id: 'full-edit',
            name: 'Full Edit',
            price: 49,
            description: 'Complete credit analysis and dispute strategies',
            features: [
                'Full Metro2 & FCRA compliance audit',
                'Detailed dispute strategies for all items',
                'Score impact predictions',
                'Priority email support',
                'Strategy vault access'
            ],
            popular: false
        },
        {
            id: 'fast-track',
            name: 'Fast Track Bundle',
            price: 99,
            description: 'Everything in Full Edit plus automated tools',
            features: [
                'Everything in Full Edit',
                'Automated dispute letter generation',
                'Direct creditor contact templates',
                'Monthly progress tracking',
                'Dedicated support specialist',
                'Lifetime strategy updates'
            ],
            popular: true
        }
    ];

    const handlePurchase = async () => {
        setProcessing(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Upgrade user to premium
        upgradeToPremium();

        // Navigate to strategy vault
        navigate('/strategy-vault');
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-secondary)' }}>
            <Navbar />

            <div className="container" style={{ paddingTop: 'var(--spacing-3xl)', paddingBottom: 'var(--spacing-3xl)' }}>
                <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)', maxWidth: '700px', margin: '0 auto var(--spacing-2xl)' }}>
                    <h1 style={{ marginBottom: 'var(--spacing-md)' }}>Unlock Your Credit Potential</h1>
                    <p style={{ fontSize: 'var(--font-size-lg)' }}>
                        Get full access to AI-powered dispute strategies and boost your credit score
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-2" style={{ maxWidth: '1000px', margin: '0 auto var(--spacing-3xl)' }}>
                    {plans.map(plan => (
                        <div
                            key={plan.id}
                            className="card"
                            style={{
                                position: 'relative',
                                border: selectedPlan === plan.id ? '3px solid var(--color-primary)' : '3px solid transparent',
                                cursor: 'pointer',
                                transition: 'all var(--transition-base)'
                            }}
                            onClick={() => setSelectedPlan(plan.id)}
                        >
                            {plan.popular && (
                                <div style={{
                                    position: 'absolute',
                                    top: '-12px',
                                    right: 'var(--spacing-lg)',
                                    backgroundColor: 'var(--color-accent)',
                                    color: 'white',
                                    padding: 'var(--spacing-xs) var(--spacing-md)',
                                    borderRadius: 'var(--radius-full)',
                                    fontSize: 'var(--font-size-xs)',
                                    fontWeight: 'var(--font-weight-bold)',
                                    textTransform: 'uppercase'
                                }}>
                                    Most Popular
                                </div>
                            )}

                            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                <h3 style={{ marginBottom: 'var(--spacing-xs)' }}>{plan.name}</h3>
                                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
                                    {plan.description}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--spacing-xs)' }}>
                                    <span style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)' }}>
                                        ${plan.price}
                                    </span>
                                    <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>
                                        one-time
                                    </span>
                                </div>
                            </div>

                            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'start', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-sm)' }}>
                                        <Check size={20} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                                        <span style={{ fontSize: 'var(--font-size-sm)' }}>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                border: `2px solid ${selectedPlan === plan.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 'auto'
                            }}>
                                {selectedPlan === plan.id && (
                                    <div style={{
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        backgroundColor: 'var(--color-primary)'
                                    }} />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Payment Form */}
                <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>
                        <CreditCard size={24} style={{ display: 'inline', marginRight: 'var(--spacing-sm)' }} />
                        Payment Information
                    </h3>

                    <div style={{
                        padding: 'var(--spacing-lg)',
                        backgroundColor: 'var(--color-bg-secondary)',
                        borderRadius: 'var(--radius-lg)',
                        marginBottom: 'var(--spacing-xl)',
                        textAlign: 'center'
                    }}>
                        <Shield size={40} color="var(--color-success)" style={{ margin: '0 auto var(--spacing-md)' }} />
                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 0 }}>
                            This is a demo payment page. In production, integrate with Stripe or your preferred payment processor.
                        </p>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Card Number</label>
                        <input type="text" className="form-input" placeholder="4242 4242 4242 4242" disabled />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-md)' }}>
                        <div className="form-group">
                            <label className="form-label">Expiry Date</label>
                            <input type="text" className="form-input" placeholder="MM/YY" disabled />
                        </div>
                        <div className="form-group">
                            <label className="form-label">CVC</label>
                            <input type="text" className="form-input" placeholder="123" disabled />
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 'var(--spacing-lg)',
                        backgroundColor: 'var(--color-bg-secondary)',
                        borderRadius: 'var(--radius-lg)',
                        marginBottom: 'var(--spacing-xl)'
                    }}>
                        <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>Total</span>
                        <span style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)' }}>
                            ${plans.find(p => p.id === selectedPlan)?.price}
                        </span>
                    </div>

                    <button
                        onClick={handlePurchase}
                        className="btn btn-primary btn-lg"
                        style={{ width: '100%' }}
                        disabled={processing}
                    >
                        {processing ? 'Processing...' : `Purchase ${plans.find(p => p.id === selectedPlan)?.name}`}
                    </button>

                    <p style={{ marginTop: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)', textAlign: 'center', marginBottom: 0 }}>
                        Secure payment powered by Stripe • 30-day money-back guarantee
                    </p>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-3" style={{ maxWidth: '800px', margin: 'var(--spacing-3xl) auto 0', textAlign: 'center' }}>
                    <div>
                        <Shield size={40} color="var(--color-primary)" style={{ margin: '0 auto var(--spacing-sm)' }} />
                        <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-xs)' }}>
                            Secure Payment
                        </p>
                        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', marginBottom: 0 }}>
                            256-bit SSL encryption
                        </p>
                    </div>
                    <div>
                        <Zap size={40} color="var(--color-accent)" style={{ margin: '0 auto var(--spacing-sm)' }} />
                        <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-xs)' }}>
                            Instant Access
                        </p>
                        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', marginBottom: 0 }}>
                            Immediate strategy unlock
                        </p>
                    </div>
                    <div>
                        <TrendingUp size={40} color="var(--color-success)" style={{ margin: '0 auto var(--spacing-sm)' }} />
                        <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-xs)' }}>
                            Proven Results
                        </p>
                        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', marginBottom: 0 }}>
                            Average 120+ point increase
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
