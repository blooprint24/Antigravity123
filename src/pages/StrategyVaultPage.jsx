import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Download, FileText, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import ProgressChart from '../components/ProgressChart';
import { useAuth } from '../contexts/AuthContext';
import { aiService } from '../services/aiService';

const StrategyVaultPage = () => {
    const [reportData, setReportData] = useState(null);
    const { isPremium } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isPremium) {
            navigate('/payment');
            return;
        }

        const stored = localStorage.getItem('creditReport');
        if (stored) {
            setReportData(JSON.parse(stored));
        }
    }, [isPremium, navigate]);

    if (!isPremium) {
        return null;
    }

    if (!reportData) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-secondary)' }}>
                <Navbar />
                <div className="container" style={{ paddingTop: 'var(--spacing-3xl)' }}>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    const negativeAccounts = reportData.accounts.filter(a => a.impact === 'high' || a.impact === 'medium');

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-secondary)' }}>
            <Navbar />

            <div className="container" style={{ paddingTop: 'var(--spacing-2xl)', paddingBottom: 'var(--spacing-3xl)' }}>
                {/* Header */}
                <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-sm)' }}>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: 'var(--radius-lg)',
                            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Lock size={24} color="white" />
                        </div>
                        <div>
                            <h1 style={{ marginBottom: 'var(--spacing-xs)' }}>Strategy Vault</h1>
                            <p style={{ fontSize: 'var(--font-size-lg)', marginBottom: 0 }}>
                                Your complete credit repair arsenal
                            </p>
                        </div>
                    </div>
                </div>

                {/* Premium Badge */}
                <div className="card" style={{
                    background: 'linear-gradient(135deg, var(--color-success) 0%, var(--color-accent) 100%)',
                    color: 'white',
                    marginBottom: 'var(--spacing-xl)',
                    padding: 'var(--spacing-lg)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
                        <div>
                            <h3 style={{ color: 'white', marginBottom: 'var(--spacing-xs)' }}>Premium Member</h3>
                            <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: 0 }}>
                                Full access to all dispute strategies and tools
                            </p>
                        </div>
                        <span className="badge" style={{ backgroundColor: 'white', color: 'var(--color-success)' }}>
                            Active
                        </span>
                    </div>
                </div>

                {/* Progress Tracking */}
                <div className="card" style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>
                        <Calendar size={24} style={{ display: 'inline', marginRight: 'var(--spacing-sm)' }} />
                        Historical Progress
                    </h3>
                    <ProgressChart />
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: 'var(--spacing-md)',
                        marginTop: 'var(--spacing-lg)',
                        padding: 'var(--spacing-lg)',
                        backgroundColor: 'var(--color-bg-secondary)',
                        borderRadius: 'var(--radius-lg)'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)', marginBottom: 'var(--spacing-xs)' }}>
                                Starting Score
                            </p>
                            <p style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-danger)', marginBottom: 0 }}>
                                {reportData.currentScore}
                            </p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)', marginBottom: 'var(--spacing-xs)' }}>
                                Projected Score
                            </p>
                            <p style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-success)', marginBottom: 0 }}>
                                {reportData.potentialScore}
                            </p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)', marginBottom: 'var(--spacing-xs)' }}>
                                Potential Gain
                            </p>
                            <p style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)', marginBottom: 0 }}>
                                +{reportData.scoreGap}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Full Strategies */}
                <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>
                        <FileText size={24} style={{ display: 'inline', marginRight: 'var(--spacing-sm)' }} />
                        Complete Dispute Strategies
                    </h3>

                    {negativeAccounts.map((account, idx) => {
                        const violations = aiService.auditAccount(account);
                        const strategies = aiService.generateStrategy(account, violations);

                        return (
                            <div key={account.id} className="card" style={{ marginBottom: 'var(--spacing-lg)' }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'start',
                                    marginBottom: 'var(--spacing-lg)',
                                    paddingBottom: 'var(--spacing-md)',
                                    borderBottom: '2px solid var(--color-border)'
                                }}>
                                    <div>
                                        <h4 style={{ marginBottom: 'var(--spacing-xs)' }}>{account.creditor}</h4>
                                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)', textTransform: 'capitalize', marginBottom: 0 }}>
                                            {account.type.replace('_', ' ')} • ${account.balance.toLocaleString()}
                                        </p>
                                    </div>
                                    <button className="btn btn-secondary btn-sm">
                                        <Download size={16} />
                                        Download Letter
                                    </button>
                                </div>

                                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                    <h5 style={{ fontSize: 'var(--font-size-base)', marginBottom: 'var(--spacing-md)' }}>
                                        Identified Violations ({violations.length})
                                    </h5>
                                    {violations.map((violation, vIdx) => (
                                        <div key={vIdx} style={{
                                            padding: 'var(--spacing-md)',
                                            backgroundColor: 'var(--color-bg-secondary)',
                                            borderRadius: 'var(--radius-md)',
                                            marginBottom: 'var(--spacing-sm)',
                                            borderLeft: `4px solid ${violation.severity === 'high' ? 'var(--color-danger)' : 'var(--color-warning)'}`
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)' }}>
                                                <span className={`badge badge-${violation.severity === 'high' ? 'danger' : 'warning'}`}>
                                                    {violation.type} - {violation.code}
                                                </span>
                                                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-success)' }}>
                                                    +{violation.impact} points potential
                                                </span>
                                            </div>
                                            <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: 0 }}>{violation.description}</p>
                                        </div>
                                    ))}
                                </div>

                                {strategies.map((strategy, sIdx) => (
                                    <div key={sIdx} style={{
                                        padding: 'var(--spacing-lg)',
                                        backgroundColor: 'var(--color-bg-secondary)',
                                        borderRadius: 'var(--radius-lg)',
                                        marginBottom: sIdx < strategies.length - 1 ? 'var(--spacing-md)' : 0
                                    }}>
                                        <h5 style={{ marginBottom: 'var(--spacing-sm)' }}>{strategy.title}</h5>
                                        <p style={{ marginBottom: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)' }}>
                                            {strategy.description}
                                        </p>

                                        <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                            <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-sm)' }}>
                                                Action Steps:
                                            </p>
                                            <ol style={{ paddingLeft: 'var(--spacing-lg)', margin: 0 }}>
                                                {strategy.steps.map((step, stepIdx) => (
                                                    <li key={stepIdx} style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--spacing-xs)' }}>
                                                        {step}
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>

                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                            gap: 'var(--spacing-md)',
                                            padding: 'var(--spacing-md)',
                                            backgroundColor: 'var(--color-bg-primary)',
                                            borderRadius: 'var(--radius-md)'
                                        }}>
                                            <div>
                                                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', marginBottom: 'var(--spacing-xs)' }}>
                                                    Expected Outcome
                                                </p>
                                                <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 0 }}>
                                                    {strategy.expectedOutcome}
                                                </p>
                                            </div>
                                            <div>
                                                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', marginBottom: 'var(--spacing-xs)' }}>
                                                    Timeframe
                                                </p>
                                                <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 0 }}>
                                                    {strategy.timeframe}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default StrategyVaultPage;
