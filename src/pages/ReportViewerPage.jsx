import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import CreditItemCard from '../components/CreditItemCard';
import LockedContent from '../components/LockedContent';
import { useAuth } from '../contexts/AuthContext';
import { aiService } from '../services/aiService';

const ReportViewerPage = () => {
    const [reportData, setReportData] = useState(null);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [filter, setFilter] = useState('all'); // all, negative, positive
    const [searchTerm, setSearchTerm] = useState('');
    const { isPremium } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
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
                    <p>Loading report...</p>
                </div>
            </div>
        );
    }

    const { accounts } = reportData;

    // Filter accounts
    const filteredAccounts = accounts.filter(account => {
        const matchesFilter =
            filter === 'all' ||
            (filter === 'negative' && (account.impact === 'high' || account.impact === 'medium')) ||
            (filter === 'positive' && account.impact === 'positive');

        const matchesSearch =
            searchTerm === '' ||
            account.creditor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            account.type.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const handleAccountClick = (account) => {
        setSelectedAccount(account);
    };

    const handleCloseModal = () => {
        setSelectedAccount(null);
    };

    const renderStrategyContent = (account) => {
        const violations = aiService.auditAccount(account);
        const strategies = aiService.generateStrategy(account, violations);

        return (
            <div>
                <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Compliance Violations</h4>
                {violations.map((violation, idx) => (
                    <div key={idx} className="card" style={{ marginBottom: 'var(--spacing-md)', padding: 'var(--spacing-md)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
                            <span className={`badge badge-${violation.severity === 'high' ? 'danger' : 'warning'}`}>
                                {violation.type} - {violation.code}
                            </span>
                            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>
                                Impact: +{violation.impact} points
                            </span>
                        </div>
                        <p style={{ marginBottom: 0, fontSize: 'var(--font-size-sm)' }}>{violation.description}</p>
                    </div>
                ))}

                <h4 style={{ marginTop: 'var(--spacing-xl)', marginBottom: 'var(--spacing-md)' }}>Dispute Strategies</h4>
                {strategies.map((strategy, idx) => (
                    <div key={idx} className="card" style={{ marginBottom: 'var(--spacing-md)', padding: 'var(--spacing-lg)' }}>
                        <h5 style={{ marginBottom: 'var(--spacing-sm)' }}>{strategy.title}</h5>
                        <p style={{ marginBottom: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)' }}>
                            {strategy.description}
                        </p>
                        <div style={{ marginBottom: 'var(--spacing-md)' }}>
                            <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-xs)' }}>
                                Steps:
                            </p>
                            <ol style={{ paddingLeft: 'var(--spacing-lg)', margin: 0 }}>
                                {strategy.steps.map((step, stepIdx) => (
                                    <li key={stepIdx} style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--spacing-xs)' }}>
                                        {step}
                                    </li>
                                ))}
                            </ol>
                        </div>
                        <div style={{ display: 'flex', gap: 'var(--spacing-lg)', fontSize: 'var(--font-size-sm)' }}>
                            <div>
                                <span style={{ color: 'var(--color-text-tertiary)' }}>Expected Outcome: </span>
                                <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>{strategy.expectedOutcome}</span>
                            </div>
                            <div>
                                <span style={{ color: 'var(--color-text-tertiary)' }}>Timeframe: </span>
                                <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>{strategy.timeframe}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-secondary)' }}>
            <Navbar />

            <div className="container" style={{ paddingTop: 'var(--spacing-2xl)', paddingBottom: 'var(--spacing-3xl)' }}>
                <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
                    <h1 style={{ marginBottom: 'var(--spacing-sm)' }}>Credit Report Analysis</h1>
                    <p style={{ fontSize: 'var(--font-size-lg)', marginBottom: 0 }}>
                        Click on any account to view compliance violations and dispute strategies
                    </p>
                </div>

                {/* Filters and Search */}
                <div className="card" style={{ marginBottom: 'var(--spacing-xl)', padding: 'var(--spacing-lg)' }}>
                    <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                            <Filter size={20} color="var(--color-text-secondary)" />
                            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>Filter:</span>
                        </div>
                        <button
                            onClick={() => setFilter('all')}
                            className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                        >
                            All ({accounts.length})
                        </button>
                        <button
                            onClick={() => setFilter('negative')}
                            className={`btn btn-sm ${filter === 'negative' ? 'btn-primary' : 'btn-secondary'}`}
                        >
                            Negative ({accounts.filter(a => a.impact === 'high' || a.impact === 'medium').length})
                        </button>
                        <button
                            onClick={() => setFilter('positive')}
                            className={`btn btn-sm ${filter === 'positive' ? 'btn-primary' : 'btn-secondary'}`}
                        >
                            Positive ({accounts.filter(a => a.impact === 'positive').length})
                        </button>

                        <div style={{ flex: 1, minWidth: '200px', marginLeft: 'auto' }}>
                            <div style={{ position: 'relative' }}>
                                <Search size={20} color="var(--color-text-tertiary)" style={{
                                    position: 'absolute',
                                    left: 'var(--spacing-md)',
                                    top: '50%',
                                    transform: 'translateY(-50%)'
                                }} />
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Search accounts..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ paddingLeft: 'calc(var(--spacing-md) * 3)' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Accounts Grid */}
                <div className="grid grid-2" style={{ marginBottom: 'var(--spacing-xl)' }}>
                    {filteredAccounts.map(account => (
                        <CreditItemCard
                            key={account.id}
                            account={account}
                            onClick={() => handleAccountClick(account)}
                            isLocked={!isPremium && (account.impact === 'high' || account.impact === 'medium')}
                        />
                    ))}
                </div>

                {filteredAccounts.length === 0 && (
                    <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-3xl)' }}>
                        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-tertiary)', marginBottom: 0 }}>
                            No accounts found matching your filters
                        </p>
                    </div>
                )}
            </div>

            {/* Modal for Account Details */}
            {selectedAccount && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 'var(--z-modal)',
                    padding: 'var(--spacing-lg)',
                    overflow: 'auto'
                }} onClick={handleCloseModal}>
                    <div
                        className="card"
                        style={{
                            maxWidth: '800px',
                            width: '100%',
                            maxHeight: '90vh',
                            overflow: 'auto',
                            margin: 'var(--spacing-lg)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <h3 style={{ marginBottom: 'var(--spacing-xs)' }}>{selectedAccount.creditor}</h3>
                            <p style={{ color: 'var(--color-text-tertiary)', textTransform: 'capitalize', marginBottom: 0 }}>
                                {selectedAccount.type.replace('_', ' ')}
                            </p>
                        </div>

                        {!isPremium && (selectedAccount.impact === 'high' || selectedAccount.impact === 'medium') ? (
                            <LockedContent
                                title="Premium Strategy Locked"
                                description="Upgrade to access full Metro2 and FCRA dispute strategies, automated letter generation, and personalized action plans."
                            >
                                {renderStrategyContent(selectedAccount)}
                            </LockedContent>
                        ) : (
                            renderStrategyContent(selectedAccount)
                        )}

                        <div style={{ marginTop: 'var(--spacing-xl)', textAlign: 'center' }}>
                            <button onClick={handleCloseModal} className="btn btn-secondary">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportViewerPage;
