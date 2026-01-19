/**
 * Image Processing Utilities for ClearMark Pro
 * Handles canvas manipulation, format conversion, and image optimization
 */

/**
 * Load an image file and return as HTMLImageElement
 */
export const loadImage = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

/**
 * Create a canvas from an image
 */
export const imageToCanvas = (image) => {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    return canvas;
};

/**
 * Convert canvas to blob for download
 */
export const canvasToBlob = (canvas, format = 'image/png', quality = 0.95) => {
    return new Promise((resolve) => {
        canvas.toBlob(resolve, format, quality);
    });
};

/**
 * Download image from canvas
 */
export const downloadImage = async (canvas, filename, format = 'png', quality = 0.95) => {
    const mimeType = `image/${format}`;
    const blob = await canvasToBlob(canvas, mimeType, quality);
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
};

/**
 * Resize image while maintaining aspect ratio
 */
export const resizeImage = (canvas, maxWidth, maxHeight) => {
    const { width, height } = canvas;
    let newWidth = width;
    let newHeight = height;

    if (width > maxWidth) {
        newWidth = maxWidth;
        newHeight = (height * maxWidth) / width;
    }

    if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = (width * maxHeight) / height;
    }

    if (newWidth === width && newHeight === height) {
        return canvas;
    }

    const resizedCanvas = document.createElement('canvas');
    resizedCanvas.width = newWidth;
    resizedCanvas.height = newHeight;
    const ctx = resizedCanvas.getContext('2d');
    ctx.drawImage(canvas, 0, 0, newWidth, newHeight);

    return resizedCanvas;
};

/**
 * Apply inpainting to remove watermark (simplified content-aware fill)
 * This is a client-side simulation - real AI would require backend
 */
export const inpaintArea = (canvas, maskCanvas) => {
    const ctx = canvas.getContext('2d');
    const maskCtx = maskCanvas.getContext('2d');

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const maskData = maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);

    const data = imageData.data;
    const mask = maskData.data;

    // Simple inpainting: replace masked pixels with surrounding average
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            const idx = (y * canvas.width + x) * 4;

            // If pixel is masked (alpha > 0)
            if (mask[idx + 3] > 0) {
                // Sample surrounding pixels
                const samples = [];
                for (let dy = -5; dy <= 5; dy++) {
                    for (let dx = -5; dx <= 5; dx++) {
                        const sx = x + dx;
                        const sy = y + dy;

                        if (sx >= 0 && sx < canvas.width && sy >= 0 && sy < canvas.height) {
                            const sIdx = (sy * canvas.width + sx) * 4;

                            // Only sample unmasked pixels
                            if (mask[sIdx + 3] === 0) {
                                samples.push({
                                    r: data[sIdx],
                                    g: data[sIdx + 1],
                                    b: data[sIdx + 2]
                                });
                            }
                        }
                    }
                }

                // Average the samples
                if (samples.length > 0) {
                    const avg = samples.reduce((acc, s) => ({
                        r: acc.r + s.r,
                        g: acc.g + s.g,
                        b: acc.b + s.b
                    }), { r: 0, g: 0, b: 0 });

                    data[idx] = avg.r / samples.length;
                    data[idx + 1] = avg.g / samples.length;
                    data[idx + 2] = avg.b / samples.length;
                }
            }
        }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
};

/**
 * Apply Gaussian blur to smooth inpainted areas
 */
export const applyGaussianBlur = (canvas, radius = 2) => {
    const ctx = canvas.getContext('2d');
    ctx.filter = `blur(${radius}px)`;
    ctx.drawImage(canvas, 0, 0);
    ctx.filter = 'none';
    return canvas;
};

/**
 * Get image format from file
 */
export const getImageFormat = (file) => {
    const type = file.type;
    if (type === 'image/png') return 'png';
    if (type === 'image/jpeg' || type === 'image/jpg') return 'jpeg';
    if (type === 'image/webp') return 'webp';
    return 'png';
};

/**
 * Validate image file
 */
export const validateImageFile = (file) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
        return { valid: false, error: 'Invalid file type. Please upload PNG, JPG, or WebP.' };
    }

    if (file.size > maxSize) {
        return { valid: false, error: 'File too large. Maximum size is 10MB.' };
    }

    return { valid: true };
};

/**
 * Create thumbnail from image
 */
export const createThumbnail = async (file, maxSize = 200) => {
    const img = await loadImage(file);
    const canvas = imageToCanvas(img);
    const thumbnail = resizeImage(canvas, maxSize, maxSize);
    return thumbnail.toDataURL();
};

/**
 * Batch process multiple images
 */
export const batchProcess = async (files, processFunc, onProgress) => {
    const results = [];

    for (let i = 0; i < files.length; i++) {
        const result = await processFunc(files[i]);
        results.push(result);

        if (onProgress) {
            onProgress((i + 1) / files.length * 100);
        }
    }

    return results;
};

/**
 * Convert image format
 */
export const convertFormat = async (canvas, targetFormat, quality = 0.95) => {
    const mimeType = `image/${targetFormat}`;
    const blob = await canvasToBlob(canvas, mimeType, quality);
    return blob;
};

/**
 * Optimize image quality
 */
export const optimizeImage = (canvas, targetQuality = 0.85) => {
    // Apply slight sharpening
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Simple sharpening kernel
    const sharpen = [
        0, -1, 0,
        -1, 5, -1,
        0, -1, 0
    ];

    const data = imageData.data;
    const width = canvas.width;
    const height = canvas.height;
    const output = new Uint8ClampedArray(data);

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            for (let c = 0; c < 3; c++) {
                let sum = 0;
                for (let ky = -1; ky <= 1; ky++) {
                    for (let kx = -1; kx <= 1; kx++) {
                        const idx = ((y + ky) * width + (x + kx)) * 4 + c;
                        const kernelIdx = (ky + 1) * 3 + (kx + 1);
                        sum += data[idx] * sharpen[kernelIdx];
                    }
                }
                const idx = (y * width + x) * 4 + c;
                output[idx] = Math.max(0, Math.min(255, sum));
            }
        }
    }

    const outputData = new ImageData(output, width, height);
    ctx.putImageData(outputData, 0, 0);

    return canvas;
};
