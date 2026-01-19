import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, User, LogOut, Shield } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { user, logout, isAuthenticated, isPremium } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav style={{
            backgroundColor: 'var(--color-bg-primary)',
            boxShadow: 'var(--shadow-md)',
            position: 'sticky',
            top: 0,
            zIndex: 'var(--z-sticky)'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'var(--spacing-md) var(--spacing-lg)',
                minHeight: '70px'
            }}>
                {/* Logo */}
                <Link to={isAuthenticated ? "/dashboard" : "/"} style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)'
                }}>
                    <Shield size={28} />
                    The Credit Edit
                </Link>

                {/* Desktop Navigation */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-lg)'
                }} className="desktop-nav">
                    {isAuthenticated ? (
                        <>
                            <Link to="/dashboard" style={{ fontWeight: 'var(--font-weight-medium)' }}>Dashboard</Link>
                            <Link to="/upload" style={{ fontWeight: 'var(--font-weight-medium)' }}>Upload Report</Link>
                            <Link to="/report-viewer" style={{ fontWeight: 'var(--font-weight-medium)' }}>My Reports</Link>
                            {isPremium && (
                                <Link to="/strategy-vault" style={{ fontWeight: 'var(--font-weight-medium)' }}>Strategy Vault</Link>
                            )}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-md)',
                                paddingLeft: 'var(--spacing-md)',
                                borderLeft: '2px solid var(--color-border)'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-sm)',
                                    color: 'var(--color-text-secondary)'
                                }}>
                                    <User size={20} />
                                    <span>{user?.name}</span>
                                    {isPremium && (
                                        <span className="badge badge-success" style={{ marginLeft: 'var(--spacing-xs)' }}>Premium</span>
                                    )}
                                </div>
                                <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-secondary btn-sm">Login</Link>
                            <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="mobile-menu-btn"
                    style={{
                        display: 'none',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--color-primary)'
                    }}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="mobile-nav" style={{
                    display: 'none',
                    flexDirection: 'column',
                    gap: 'var(--spacing-sm)',
                    padding: 'var(--spacing-lg)',
                    borderTop: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg-primary)'
                }}>
                    {isAuthenticated ? (
                        <>
                            <Link to="/dashboard" onClick={() => setIsOpen(false)} style={{ padding: 'var(--spacing-sm) 0' }}>Dashboard</Link>
                            <Link to="/upload" onClick={() => setIsOpen(false)} style={{ padding: 'var(--spacing-sm) 0' }}>Upload Report</Link>
                            <Link to="/report-viewer" onClick={() => setIsOpen(false)} style={{ padding: 'var(--spacing-sm) 0' }}>My Reports</Link>
                            {isPremium && (
                                <Link to="/strategy-vault" onClick={() => setIsOpen(false)} style={{ padding: 'var(--spacing-sm) 0' }}>Strategy Vault</Link>
                            )}
                            <div style={{
                                padding: 'var(--spacing-sm) 0',
                                borderTop: '1px solid var(--color-border)',
                                marginTop: 'var(--spacing-sm)'
                            }}>
                                <p style={{ marginBottom: 'var(--spacing-sm)', color: 'var(--color-text-secondary)' }}>
                                    {user?.name} {isPremium && <span className="badge badge-success">Premium</span>}
                                </p>
                                <button onClick={handleLogout} className="btn btn-secondary" style={{ width: '100%' }}>
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" onClick={() => setIsOpen(false)} className="btn btn-secondary">Login</Link>
                            <Link to="/register" onClick={() => setIsOpen(false)} className="btn btn-primary">Get Started</Link>
                        </>
                    )}
                </div>
            )}

            <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .mobile-nav {
            display: flex !important;
          }
        }
      `}</style>
        </nav>
    );
};

export default Navbar;

