import React, { useState, useRef, useEffect } from 'react';
import {
    loadImage,
    imageToCanvas,
    inpaintArea,
    downloadImage,
    applyGaussianBlur
} from '../services/imageProcessor';
import { detectWatermarks, createBrushMask } from '../services/watermarkDetector';

const ImageEditor = ({ image, allImages, onImageChange }) => {
    const [canvas, setCanvas] = useState(null);
    const [originalCanvas, setOriginalCanvas] = useState(null);
    const [maskCanvas, setMaskCanvas] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [brushSize, setBrushSize] = useState(25);
    const [mode, setMode] = useState('ai'); // 'ai' or 'manual'
    const [showBefore, setShowBefore] = useState(false);
    const [sliderPosition, setSliderPosition] = useState(50);
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [strokes, setStrokes] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);

    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const previewRef = useRef(null);

    // Initialize canvas when image changes
    useEffect(() => {
        const initCanvas = async () => {
            if (!image) return;

            const img = await loadImage(image.file);
            const c = imageToCanvas(img);
            const oc = imageToCanvas(img);

            setCanvas(c);
            setOriginalCanvas(oc);

            // Reset state for new image
            setHistory([imageToCanvas(img)]);
            setHistoryIndex(0);
            setStrokes([]);
            setMaskCanvas(null);

            if (mode === 'ai') {
                runAIDetection(c);
            }
        };

        initCanvas();
    }, [image]);

    const runAIDetection = (targetCanvas) => {
        setIsProcessing(true);
        // Simulate AI delay
        setTimeout(() => {
            const { maskCanvas: detectedMask } = detectWatermarks(targetCanvas);
            setMaskCanvas(detectedMask);
            setIsProcessing(false);
        }, 1500);
    };

    const startDrawing = (e) => {
        if (mode !== 'manual') return;
        setIsDrawing(true);
        draw(e);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const draw = (e) => {
        if (!isDrawing || mode !== 'manual') return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (canvas.height / rect.height);

        const newStroke = { x, y, size: brushSize };
        setStrokes(prev => [...prev, newStroke]);

        // Update mask preview in real-time
        updateBrushPreview([...strokes, newStroke]);
    };

    const updateBrushPreview = (currentStrokes) => {
        const mask = createBrushMask(canvas, currentStrokes);
        setMaskCanvas(mask);
    };

    const handleProcess = async () => {
        if (!maskCanvas) return;

        setIsProcessing(true);

        // Simulate processing delay
        setTimeout(async () => {
            const resultCanvas = imageToCanvas(canvas);
            inpaintArea(resultCanvas, maskCanvas);
            applyGaussianBlur(resultCanvas, 1);

            // Update history
            const newHistory = history.slice(0, historyIndex + 1);
            newHistory.push(imageToCanvas(resultCanvas));
            setHistory(newHistory);
            setHistoryIndex(newHistory.length - 1);

            setCanvas(resultCanvas);
            setMaskCanvas(null);
            setStrokes([]);
            setIsProcessing(false);
        }, 2000);
    };

    const undo = () => {
        if (historyIndex > 0) {
            const prevIdx = historyIndex - 1;
            setHistoryIndex(prevIdx);
            setCanvas(imageToCanvas(history[prevIdx]));
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
            const nextIdx = historyIndex + 1;
            setHistoryIndex(nextIdx);
            setCanvas(imageToCanvas(history[nextIdx]));
        }
    };

    const handleDownload = () => {
        downloadImage(canvas, `clearmark_${image.name.split('.')[0]}`, 'png');
    };

    // Hook up the canvas ref for drawing
    useEffect(() => {
        if (canvasRef.current && canvas) {
            const ctx = canvasRef.current.getContext('2d');
            ctx.drawImage(canvas, 0, 0);
        }
    }, [canvas]);

    if (!image || !canvas) return <div className="animate-pulse text-center p-3xl">Loading Editor...</div>;

    return (
        <div className="image-editor grid grid-4 gap-xl">
            {/* Sidebar Tool Panel */}
            <div className="col-span-1">
                <div className="card" style={{ position: 'sticky', top: 'var(--spacing-md)' }}>
                    <h3 className="mb-lg">Tools</h3>

                    <div className="form-group">
                        <label className="form-label">Mode</label>
                        <div className="flex gap-sm">
                            <button
                                className={`btn btn-sm ${mode === 'ai' ? 'btn-primary' : 'btn-outline'}`}
                                onClick={() => {
                                    setMode('ai');
                                    runAIDetection(canvas);
                                }}
                                disabled={isProcessing}
                            >
                                AI Auto
                            </button>
                            <button
                                className={`btn btn-sm ${mode === 'manual' ? 'btn-primary' : 'btn-outline'}`}
                                onClick={() => {
                                    setMode('manual');
                                    setMaskCanvas(null);
                                    setStrokes([]);
                                }}
                                disabled={isProcessing}
                            >
                                Manual
                            </button>
                        </div>
                    </div>

                    {mode === 'manual' && (
                        <div className="form-group animate-fade-in">
                            <label className="form-label">Brush Size: {brushSize}px</label>
                            <input
                                type="range"
                                min="5"
                                max="100"
                                value={brushSize}
                                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                                style={{ width: '100%' }}
                            />
                        </div>
                    )}

                    <div className="flex gap-sm mt-xl">
                        <button
                            className="btn btn-secondary w-full"
                            onClick={handleProcess}
                            disabled={isProcessing || (!maskCanvas && strokes.length === 0)}
                        >
                            {isProcessing ? (
                                <span className="flex items-center gap-sm">
                                    <div className="animate-spin" style={{ width: '16px', height: '16px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%' }} />
                                    Processing...
                                </span>
                            ) : 'Remove Watermark'}
                        </button>
                    </div>

                    <div className="mt-2xl">
                        <h4 className="mb-md">Batch Queue</h4>
                        <div className="flex flex-col gap-sm">
                            {allImages.map(img => (
                                <div
                                    key={img.id}
                                    className={`flex items-center gap-md p-sm rounded-lg cursor-pointer transition-all ${img.id === image.id ? 'bg-primary-light/10 border-2 border-primary' : 'hover:bg-gray-100'}`}
                                    onClick={() => onImageChange(img)}
                                >
                                    <img src={img.thumbnail} alt="" style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                                    <span style={{ fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{img.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Preview Area */}
            <div className="col-span-3">
                <div className="flex justify-between items-center mb-lg">
                    <div className="flex gap-sm">
                        <button className="btn btn-sm btn-outline" onClick={undo} disabled={historyIndex <= 0}>Undo</button>
                        <button className="btn btn-sm btn-outline" onClick={redo} disabled={historyIndex >= history.length - 1}>Redo</button>
                        <button
                            className={`btn btn-sm ${showBefore ? 'btn-primary' : 'btn-outline'}`}
                            onMouseDown={() => setShowBefore(true)}
                            onMouseUp={() => setShowBefore(false)}
                            onMouseLeave={() => setShowBefore(false)}
                        >
                            Hold for Before
                        </button>
                    </div>
                    <button className="btn btn-accent" onClick={handleDownload}>Download Result</button>
                </div>

                <div
                    className="canvas-container"
                    ref={containerRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    style={{
                        cursor: mode === 'manual' ? 'crosshair' : 'default',
                        maxHeight: '70vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#111'
                    }}
                >
                    {/* Main Workspace Canvas */}
                    <canvas
                        ref={canvasRef}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain'
                        }}
                        width={canvas.width}
                        height={canvas.height}
                        className="main-canvas"
                    />

                    {/* Mask Overlay */}
                    {maskCanvas && !showBefore && (
                        <img
                            src={maskCanvas.toDataURL()}
                            alt="mask"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 'auto',
                                height: 'auto',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                pointerEvents: 'none',
                                opacity: 0.6
                            }}
                        />
                    )}

                    {/* Original View Overlay */}
                    {showBefore && (
                        <img
                            src={originalCanvas.toDataURL()}
                            alt="original"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 'auto',
                                height: 'auto',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                pointerEvents: 'none',
                                zIndex: 20
                            }}
                        />
                    )}

                    {/* Processing Overlay */}
                    {isProcessing && (
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0,0,0,0.4)',
                            backdropFilter: 'blur(4px)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            zIndex: 100
                        }}>
                            <div className="animate-spin mb-md" style={{ width: '48px', height: '48px', border: '4px solid white', borderTopColor: 'var(--color-primary)', borderRadius: '50%' }} />
                            <h3 style={{ color: 'white' }}>Analyzing Watermarks...</h3>
                            <div className="progress-bar mt-md" style={{ width: '200px' }}>
                                <div className="progress-fill" style={{ width: '100%' }} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Workspace Labels */}
                <div className="flex justify-between mt-md px-md">
                    <div className="flex items-center gap-sm">
                        <span className="badge badge-info">
                            {mode === 'ai' ? 'AI Detection Active' : 'Manual Precision Mode'}
                        </span>
                        <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                            {canvas.width} × {canvas.height} px
                        </span>
                    </div>
                    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>
                        Zoom: Fit to Screen
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .col-span-1 { grid-column: span 1 / span 4; }
        .col-span-3 { grid-column: span 3 / span 4; }
        .w-full { width: 100%; }
        
        @media (max-width: 1024px) {
          .col-span-1, .col-span-3 { grid-column: span 4 / span 4; }
        }
        
        canvas {
          image-rendering: pixelated; /* Help see details when zoomed */
        }
      `}} />
        </div>
    );
};

export default ImageEditor;
