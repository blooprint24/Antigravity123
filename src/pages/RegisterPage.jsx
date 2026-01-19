import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            await register(email, password, name);
            navigate('/upload');
        } catch (err) {
            setError(err.message || 'Failed to create account');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
            padding: 'var(--spacing-lg)'
        }}>
            <div className="card" style={{
                maxWidth: '500px',
                width: '100%',
                boxShadow: 'var(--shadow-2xl)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto var(--spacing-md)'
                    }}>
                        <Shield size={30} color="white" />
                    </div>
                    <h2 style={{ marginBottom: 'var(--spacing-xs)' }}>Create Your Account</h2>
                    <p style={{ marginBottom: 0 }}>Start your credit improvement journey today</p>
                </div>

                {/* Benefits */}
                <div style={{
                    backgroundColor: 'var(--color-bg-secondary)',
                    padding: 'var(--spacing-md)',
                    borderRadius: 'var(--radius-lg)',
                    marginBottom: 'var(--spacing-lg)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-sm)' }}>
                        <CheckCircle size={16} color="var(--color-success)" />
                        <span style={{ fontSize: 'var(--font-size-sm)' }}>Free credit report analysis</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-sm)' }}>
                        <CheckCircle size={16} color="var(--color-success)" />
                        <span style={{ fontSize: 'var(--font-size-sm)' }}>AI-powered compliance audit</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                        <CheckCircle size={16} color="var(--color-success)" />
                        <span style={{ fontSize: 'var(--font-size-sm)' }}>Personalized score predictions</span>
                    </div>
                </div>

                {error && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-sm)',
                        padding: 'var(--spacing-md)',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderRadius: 'var(--radius-lg)',
                        marginBottom: 'var(--spacing-lg)',
                        color: 'var(--color-danger)'
                    }}>
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">
                            <User size={16} style={{ display: 'inline', marginRight: 'var(--spacing-xs)' }} />
                            Full Name
                        </label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            <Mail size={16} style={{ display: 'inline', marginRight: 'var(--spacing-xs)' }} />
                            Email Address
                        </label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            <Lock size={16} style={{ display: 'inline', marginRight: 'var(--spacing-xs)' }} />
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="At least 6 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            <Lock size={16} style={{ display: 'inline', marginRight: 'var(--spacing-xs)' }} />
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', marginTop: 'var(--spacing-md)' }}
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <div style={{
                    marginTop: 'var(--spacing-xl)',
                    paddingTop: 'var(--spacing-lg)',
                    borderTop: '1px solid var(--color-border)',
                    textAlign: 'center'
                }}>
                    <p style={{ marginBottom: 0 }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                            Sign in
                        </Link>
                    </p>
                </div>

                <div style={{ marginTop: 'var(--spacing-md)', textAlign: 'center' }}>
                    <Link to="/" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>
                        ← Back to home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
