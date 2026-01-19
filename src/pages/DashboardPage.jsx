import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, AlertTriangle, CheckCircle, FileText, ArrowRight, Upload } from 'lucide-react';
import Navbar from '../components/Navbar';
import ScoreGauge from '../components/ScoreGauge';
import ProgressChart from '../components/ProgressChart';

const DashboardPage = () => {
    const [reportData, setReportData] = useState(null);

    useEffect(() => {
        // Load report data from localStorage
        const stored = localStorage.getItem('creditReport');
        if (stored) {
            setReportData(JSON.parse(stored));
        }
    }, []);

    if (!reportData) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-secondary)' }}>
                <Navbar />
                <div className="container" style={{ paddingTop: 'var(--spacing-3xl)', textAlign: 'center' }}>
                    <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: 'var(--spacing-3xl)' }}>
                        <Upload size={60} color="var(--color-text-tertiary)" style={{ margin: '0 auto var(--spacing-lg)' }} />
                        <h2 style={{ marginBottom: 'var(--spacing-md)' }}>No Report Found</h2>
                        <p style={{ marginBottom: 'var(--spacing-xl)' }}>
                            Upload your credit report to get started with AI-powered analysis
                        </p>
                        <Link to="/upload" className="btn btn-primary btn-lg">
                            Upload Credit Report
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const { currentScore, potentialScore, scoreGap, summary } = reportData;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-secondary)' }}>
            <Navbar />

            <div className="container" style={{ paddingTop: 'var(--spacing-2xl)', paddingBottom: 'var(--spacing-3xl)' }}>
                {/* Header */}
                <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
                    <h1 style={{ marginBottom: 'var(--spacing-sm)' }}>Credit Command Center</h1>
                    <p style={{ fontSize: 'var(--font-size-lg)', marginBottom: 0 }}>
                        Your complete credit health overview
                    </p>
                </div>

                {/* Stellar Score Gap */}
                <div className="card" style={{
                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
                    color: 'white',
                    padding: 'var(--spacing-2xl)',
                    marginBottom: 'var(--spacing-xl)'
                }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                        <div>
                            <ScoreGauge currentScore={currentScore} potentialScore={potentialScore} />
                        </div>

                        <div>
                            <h2 style={{ color: 'white', marginBottom: 'var(--spacing-md)' }}>
                                Stellar Score Gap
                            </h2>
                            <div style={{
                                fontSize: 'var(--font-size-5xl)',
                                fontWeight: 'var(--font-weight-extrabold)',
                                marginBottom: 'var(--spacing-sm)',
                                color: 'white'
                            }}>
                                +{scoreGap}
                            </div>
                            <p style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-lg)', color: 'rgba(255, 255, 255, 0.9)' }}>
                                Potential score increase with our strategies
                            </p>
                            <Link to="/report-viewer" className="btn btn-lg" style={{
                                backgroundColor: 'white',
                                color: 'var(--color-primary)'
                            }}>
                                View Full Analysis
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-3" style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--spacing-md)' }}>
                            <div>
                                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)', marginBottom: 'var(--spacing-xs)' }}>
                                    Total Accounts
                                </p>
                                <h3 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 0 }}>
                                    {summary.totalAccounts}
                                </h3>
                            </div>
                            <FileText size={40} color="var(--color-info)" />
                        </div>
                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 0 }}>
                            Accounts on your report
                        </p>
                    </div>

                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--spacing-md)' }}>
                            <div>
                                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)', marginBottom: 'var(--spacing-xs)' }}>
                                    Negative Items
                                </p>
                                <h3 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 0, color: 'var(--color-danger)' }}>
                                    {summary.negativeItems}
                                </h3>
                            </div>
                            <AlertTriangle size={40} color="var(--color-danger)" />
                        </div>
                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 0 }}>
                            Items hurting your score
                        </p>
                    </div>

                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--spacing-md)' }}>
                            <div>
                                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)', marginBottom: 'var(--spacing-xs)' }}>
                                    Positive Items
                                </p>
                                <h3 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 0, color: 'var(--color-success)' }}>
                                    {summary.positiveItems}
                                </h3>
                            </div>
                            <CheckCircle size={40} color="var(--color-success)" />
                        </div>
                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 0 }}>
                            Accounts in good standing
                        </p>
                    </div>
                </div>

                {/* Violations Alert */}
                <div className="card" style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.05)',
                    borderLeft: '4px solid var(--color-danger)',
                    marginBottom: 'var(--spacing-xl)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'start', gap: 'var(--spacing-md)' }}>
                        <AlertTriangle size={24} color="var(--color-danger)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div style={{ flex: 1 }}>
                            <h4 style={{ marginBottom: 'var(--spacing-sm)', color: 'var(--color-danger)' }}>
                                {summary.totalViolations} Compliance Violations Detected
                            </h4>
                            <p style={{ marginBottom: 'var(--spacing-md)' }}>
                                Our AI has identified potential Metro2 and FCRA violations that could be disputed.
                                These violations may be impacting your credit score unfairly.
                            </p>
                            <Link to="/report-viewer" className="btn btn-danger">
                                View Violations
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Progress Chart */}
                <div className="card" style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>
                        <TrendingUp size={24} style={{ display: 'inline', marginRight: 'var(--spacing-sm)' }} />
                        Score Progress Projection
                    </h3>
                    <ProgressChart />
                    <p style={{ marginTop: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)', textAlign: 'center', marginBottom: 0 }}>
                        Projected score improvement over 6 months with dispute strategies
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-2">
                    <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
                        <FileText size={50} color="var(--color-primary)" style={{ margin: '0 auto var(--spacing-md)' }} />
                        <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>View Detailed Report</h4>
                        <p style={{ marginBottom: 'var(--spacing-lg)' }}>
                            See all accounts and compliance violations
                        </p>
                        <Link to="/report-viewer" className="btn btn-primary">
                            View Report
                        </Link>
                    </div>

                    <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
                        <TrendingUp size={50} color="var(--color-accent)" style={{ margin: '0 auto var(--spacing-md)' }} />
                        <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>Unlock Full Strategies</h4>
                        <p style={{ marginBottom: 'var(--spacing-lg)' }}>
                            Get complete dispute letters and legal strategies
                        </p>
                        <Link to="/payment" className="btn btn-accent">
                            Upgrade Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
