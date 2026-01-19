import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import { aiService } from '../services/aiService';

const UploadPage = () => {
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onDrop = async (acceptedFiles) => {
        const file = acceptedFiles[0];

        if (!file) {
            setError('Please select a file');
            return;
        }

        if (file.type !== 'application/pdf') {
            setError('Please upload a PDF file');
            return;
        }

        setError('');
        setUploading(true);
        setUploadProgress(0);

        // Simulate upload progress
        const progressInterval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 90) {
                    clearInterval(progressInterval);
                    return 90;
                }
                return prev + 10;
            });
        }, 200);

        try {
            // Parse report with AI service
            const reportData = await aiService.parseReport(file);

            // Store in localStorage
            localStorage.setItem('creditReport', JSON.stringify(reportData));

            setUploadProgress(100);

            // Navigate to dashboard after short delay
            setTimeout(() => {
                navigate('/dashboard');
            }, 500);
        } catch (err) {
            setError('Failed to process report. Please try again.');
            setUploading(false);
            clearInterval(progressInterval);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf']
        },
        maxFiles: 1,
        disabled: uploading
    });

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-secondary)' }}>
            <Navbar />

            <div className="container" style={{ paddingTop: 'var(--spacing-3xl)', paddingBottom: 'var(--spacing-3xl)' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
                        <h1 style={{ marginBottom: 'var(--spacing-md)' }}>Upload Your Credit Report</h1>
                        <p style={{ fontSize: 'var(--font-size-lg)', maxWidth: '600px', margin: '0 auto' }}>
                            Upload your credit report in PDF format and our AI will analyze it instantly
                        </p>
                    </div>

                    {/* Upload Area */}
                    <div
                        {...getRootProps()}
                        className="card"
                        style={{
                            padding: 'var(--spacing-3xl)',
                            textAlign: 'center',
                            cursor: uploading ? 'not-allowed' : 'pointer',
                            border: isDragActive ? '3px dashed var(--color-primary)' : '3px dashed var(--color-border)',
                            backgroundColor: isDragActive ? 'rgba(10, 36, 99, 0.05)' : 'var(--color-bg-primary)',
                            transition: 'all var(--transition-base)'
                        }}
                    >
                        <input {...getInputProps()} />

                        {!uploading ? (
                            <>
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto var(--spacing-xl)'
                                }}>
                                    <Upload size={50} color="white" />
                                </div>

                                <h3 style={{ marginBottom: 'var(--spacing-md)' }}>
                                    {isDragActive ? 'Drop your file here' : 'Drag & drop your credit report'}
                                </h3>

                                <p style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--color-text-secondary)' }}>
                                    or click to browse your files
                                </p>

                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-sm)',
                                    padding: 'var(--spacing-sm) var(--spacing-lg)',
                                    backgroundColor: 'var(--color-bg-secondary)',
                                    borderRadius: 'var(--radius-lg)'
                                }}>
                                    <FileText size={20} color="var(--color-primary)" />
                                    <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                                        PDF files only • Max 10MB
                                    </span>
                                </div>
                            </>
                        ) : (
                            <>
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    background: 'var(--color-bg-secondary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto var(--spacing-xl)',
                                    position: 'relative'
                                }}>
                                    <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            fill="none"
                                            stroke="var(--color-border)"
                                            strokeWidth="8"
                                        />
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            fill="none"
                                            stroke="var(--color-primary)"
                                            strokeWidth="8"
                                            strokeDasharray={`${2 * Math.PI * 40}`}
                                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - uploadProgress / 100)}`}
                                            strokeLinecap="round"
                                            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                                        />
                                    </svg>
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        fontSize: 'var(--font-size-xl)',
                                        fontWeight: 'var(--font-weight-bold)',
                                        color: 'var(--color-primary)'
                                    }}>
                                        {uploadProgress}%
                                    </div>
                                </div>

                                <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>
                                    {uploadProgress < 100 ? 'Analyzing your credit report...' : 'Analysis complete!'}
                                </h3>

                                <p style={{ color: 'var(--color-text-secondary)', marginBottom: 0 }}>
                                    {uploadProgress < 100 ? 'Please wait while our AI processes your data' : 'Redirecting to dashboard...'}
                                </p>
                            </>
                        )}
                    </div>

                    {error && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-sm)',
                            padding: 'var(--spacing-md)',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            borderRadius: 'var(--radius-lg)',
                            marginTop: 'var(--spacing-lg)',
                            color: 'var(--color-danger)'
                        }}>
                            <AlertCircle size={20} />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Info Cards */}
                    <div className="grid grid-3" style={{ marginTop: 'var(--spacing-2xl)' }}>
                        <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-lg)' }}>
                            <CheckCircle size={40} color="var(--color-success)" style={{ margin: '0 auto var(--spacing-md)' }} />
                            <h4 style={{ fontSize: 'var(--font-size-base)', marginBottom: 'var(--spacing-xs)' }}>Secure</h4>
                            <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: 0 }}>
                                Bank-level encryption
                            </p>
                        </div>

                        <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-lg)' }}>
                            <CheckCircle size={40} color="var(--color-success)" style={{ margin: '0 auto var(--spacing-md)' }} />
                            <h4 style={{ fontSize: 'var(--font-size-base)', marginBottom: 'var(--spacing-xs)' }}>Fast</h4>
                            <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: 0 }}>
                                Results in seconds
                            </p>
                        </div>

                        <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-lg)' }}>
                            <CheckCircle size={40} color="var(--color-success)" style={{ margin: '0 auto var(--spacing-md)' }} />
                            <h4 style={{ fontSize: 'var(--font-size-base)', marginBottom: 'var(--spacing-xs)' }}>Accurate</h4>
                            <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: 0 }}>
                                AI-powered analysis
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadPage;
