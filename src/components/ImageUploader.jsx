import React, { useState, useRef } from 'react';
import { validateImageFile, createThumbnail } from '../services/imageProcessor';

const ImageUploader = ({ onImagesUploaded }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        await processFiles(files);
    };

    const handleFileSelect = async (e) => {
        const files = Array.from(e.target.files);
        await processFiles(files);
    };

    const processFiles = async (files) => {
        setError('');
        const validImages = [];
        const errors = [];

        for (const file of files) {
            const validation = validateImageFile(file);

            if (validation.valid) {
                try {
                    const thumbnail = await createThumbnail(file);
                    validImages.push({
                        file,
                        thumbnail,
                        name: file.name,
                        size: file.size,
                        id: Math.random().toString(36).substr(2, 9)
                    });
                } catch (err) {
                    errors.push(`Failed to process ${file.name}`);
                }
            } else {
                errors.push(validation.error);
            }
        }

        if (errors.length > 0) {
            setError(errors[0]);
        }

        if (validImages.length > 0) {
            const allImages = [...images, ...validImages];
            setImages(allImages);
            onImagesUploaded(allImages);
        }
    };

    const removeImage = (id) => {
        const filtered = images.filter(img => img.id !== id);
        setImages(filtered);
        if (filtered.length === 0) {
            onImagesUploaded([]);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    return (
        <div className="image-uploader-section">
            <div className="text-center mb-xl">
                <h2 className="text-gradient">Upload Your Images</h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-lg)' }}>
                    Drag and drop or click to select images (PNG, JPG, WebP)
                </p>
            </div>

            <div
                className={`upload-zone ${isDragging ? 'drag-over' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    multiple
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                />

                <div style={{ pointerEvents: 'none' }}>
                    <svg
                        width="80"
                        height="80"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{
                            margin: '0 auto var(--spacing-lg)',
                            color: isDragging ? 'var(--color-accent)' : 'var(--color-primary)',
                            transition: 'all var(--transition-base)'
                        }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                    </svg>

                    <h3 style={{
                        color: isDragging ? 'var(--color-accent)' : 'var(--color-text-primary)',
                        marginBottom: 'var(--spacing-sm)'
                    }}>
                        {isDragging ? 'Drop images here' : 'Drop images here or click to browse'}
                    </h3>

                    <p style={{ color: 'var(--color-text-tertiary)', marginBottom: 'var(--spacing-md)' }}>
                        Supports PNG, JPG, and WebP up to 10MB
                    </p>

                    <div className="flex justify-center gap-md" style={{ flexWrap: 'wrap' }}>
                        <span className="badge badge-gradient">AI Detection</span>
                        <span className="badge badge-gradient">Manual Brush</span>
                        <span className="badge badge-gradient">Batch Processing</span>
                    </div>
                </div>
            </div>

            {error && (
                <div className="form-error text-center mt-md" style={{
                    padding: 'var(--spacing-md)',
                    background: 'rgba(239, 68, 68, 0.1)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-danger)'
                }}>
                    {error}
                </div>
            )}

            {images.length > 0 && (
                <div className="mt-xl">
                    <h3 className="mb-lg">Uploaded Images ({images.length})</h3>
                    <div className="grid grid-3 gap-md">
                        {images.map((img) => (
                            <div
                                key={img.id}
                                className="card animate-scale-in"
                                style={{
                                    padding: 'var(--spacing-md)',
                                    position: 'relative'
                                }}
                            >
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeImage(img.id);
                                    }}
                                    style={{
                                        position: 'absolute',
                                        top: 'var(--spacing-sm)',
                                        right: 'var(--spacing-sm)',
                                        background: 'var(--color-danger)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: 'var(--radius-full)',
                                        width: '28px',
                                        height: '28px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '18px',
                                        lineHeight: '1',
                                        zIndex: 10
                                    }}
                                >
                                    ×
                                </button>

                                <img
                                    src={img.thumbnail}
                                    alt={img.name}
                                    style={{
                                        width: '100%',
                                        height: '150px',
                                        objectFit: 'cover',
                                        borderRadius: 'var(--radius-lg)',
                                        marginBottom: 'var(--spacing-sm)'
                                    }}
                                />

                                <div style={{ fontSize: 'var(--font-size-sm)' }}>
                                    <div style={{
                                        fontWeight: 'var(--font-weight-semibold)',
                                        color: 'var(--color-text-primary)',
                                        marginBottom: 'var(--spacing-xs)',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {img.name}
                                    </div>
                                    <div style={{ color: 'var(--color-text-tertiary)' }}>
                                        {formatFileSize(img.size)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
