import React from 'react';
import { Lock, AlertCircle, TrendingUp } from 'lucide-react';

const CreditItemCard = ({ account, onClick, isLocked = false }) => {
    const getImpactColor = (impact) => {
        if (impact === 'high') return 'var(--color-danger)';
        if (impact === 'medium') return 'var(--color-warning)';
        return 'var(--color-success)';
    };

    const getStatusBadge = (status) => {
        const badges = {
            current: { text: 'Current', class: 'badge-success' },
            late_payment: { text: 'Late Payment', class: 'badge-danger' },
            charge_off: { text: 'Charge Off', class: 'badge-danger' },
            collection: { text: 'Collection', class: 'badge-danger' },
            unpaid: { text: 'Unpaid', class: 'badge-danger' }
        };
        return badges[status] || { text: status, class: 'badge-info' };
    };

    const badge = getStatusBadge(account.status);
    const isNegative = account.impact === 'high' || account.impact === 'medium';

    return (
        <div
            onClick={onClick}
            className="card"
            style={{
                cursor: 'pointer',
                borderLeft: `4px solid ${getImpactColor(account.impact)}`,
                position: 'relative',
                transition: 'all var(--transition-base)'
            }}
        >
            {isLocked && (
                <div style={{
                    position: 'absolute',
                    top: 'var(--spacing-md)',
                    right: 'var(--spacing-md)',
                    color: 'var(--color-text-tertiary)'
                }}>
                    <Lock size={20} />
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--spacing-md)' }}>
                <div>
                    <h4 style={{ marginBottom: 'var(--spacing-xs)', color: 'var(--color-text-primary)' }}>
                        {account.creditor}
                    </h4>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)', textTransform: 'capitalize', marginBottom: 0 }}>
                        {account.type.replace('_', ' ')}
                    </p>
                </div>
                <span className={`badge ${badge.class}`}>{badge.text}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                <div>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', marginBottom: 'var(--spacing-xs)' }}>
                        Balance
                    </p>
                    <p style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', marginBottom: 0 }}>
                        ${account.balance.toLocaleString()}
                    </p>
                </div>
                <div>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', marginBottom: 'var(--spacing-xs)' }}>
                        Account Age
                    </p>
                    <p style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', marginBottom: 0 }}>
                        {account.age} years
                    </p>
                </div>
            </div>

            {isNegative && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)',
                    padding: 'var(--spacing-sm)',
                    backgroundColor: 'rgba(239, 68, 68, 0.05)',
                    borderRadius: 'var(--radius-md)',
                    marginTop: 'var(--spacing-md)'
                }}>
                    <AlertCircle size={16} color="var(--color-danger)" />
                    <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-danger)' }}>
                        Negative impact on credit score
                    </span>
                </div>
            )}

            {isLocked && (
                <div style={{
                    marginTop: 'var(--spacing-md)',
                    padding: 'var(--spacing-sm)',
                    backgroundColor: 'var(--color-bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center'
                }}>
                    <TrendingUp size={16} style={{ display: 'inline', marginRight: 'var(--spacing-xs)' }} color="var(--color-success)" />
                    <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                        Click to view dispute strategy
                    </span>
                </div>
            )}
        </div>
    );
};

export default CreditItemCard;
