import React from 'react';
import { Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LockedContent = ({ children, title, description, onUpgrade }) => {
    const navigate = useNavigate();

    const handleUpgrade = () => {
        if (onUpgrade) {
            onUpgrade();
        } else {
            navigate('/payment');
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            {/* Blurred content */}
            <div className="locked-content">
                {children}
            </div>

            {/* Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.98) 60%)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--spacing-xl)',
                textAlign: 'center'
            }}>
                <div style={{
                    backgroundColor: 'var(--color-primary)',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 'var(--spacing-lg)',
                    boxShadow: 'var(--shadow-xl)'
                }}>
                    <Lock size={40} color="white" />
                </div>

                <h3 style={{ marginBottom: 'var(--spacing-sm)', color: 'var(--color-text-primary)' }}>
                    {title || 'Premium Feature'}
                </h3>

                <p style={{ marginBottom: 'var(--spacing-lg)', maxWidth: '400px', color: 'var(--color-text-secondary)' }}>
                    {description || 'Upgrade to access full credit analysis, dispute strategies, and automated letter generation.'}
                </p>

                <button onClick={handleUpgrade} className="btn btn-accent btn-lg">
                    Unlock Full Access
                    <ArrowRight size={20} />
                </button>

                <p style={{ marginTop: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>
                    Join thousands improving their credit scores
                </p>
            </div>
        </div>
    );
};

export default LockedContent;
