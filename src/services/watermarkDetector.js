/**
 * Watermark Detection Service for ClearMark Pro
 * Simulates AI-powered watermark detection using image analysis
 */

/**
 * Detect watermarks in an image using edge detection and pattern analysis
 */
export const detectWatermarks = (canvas, sensitivity = 0.5) => {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Create detection mask
    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = canvas.width;
    maskCanvas.height = canvas.height;
    const maskCtx = maskCanvas.getContext('2d');
    const maskData = maskCtx.createImageData(canvas.width, canvas.height);

    // Detect semi-transparent overlays (common in watermarks)
    const regions = detectTransparentRegions(data, canvas.width, canvas.height, sensitivity);

    // Detect text patterns
    const textRegions = detectTextPatterns(data, canvas.width, canvas.height, sensitivity);

    // Detect repeated patterns
    const patternRegions = detectRepeatedPatterns(data, canvas.width, canvas.height, sensitivity);

    // Combine all detected regions
    const allRegions = [...regions, ...textRegions, ...patternRegions];

    // Mark detected regions in mask
    allRegions.forEach(region => {
        for (let y = region.y; y < region.y + region.height; y++) {
            for (let x = region.x; x < region.x + region.width; x++) {
                if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
                    const idx = (y * canvas.width + x) * 4;
                    maskData.data[idx] = 255;
                    maskData.data[idx + 1] = 100;
                    maskData.data[idx + 2] = 100;
                    maskData.data[idx + 3] = 180; // Semi-transparent highlight
                }
            }
        }
    });

    maskCtx.putImageData(maskData, 0, 0);

    return {
        maskCanvas,
        regions: allRegions,
        confidence: calculateConfidence(allRegions, canvas.width, canvas.height)
    };
};

/**
 * Detect semi-transparent regions that might be watermarks
 */
const detectTransparentRegions = (data, width, height, sensitivity) => {
    const regions = [];
    const visited = new Set();
    const threshold = 30 * sensitivity;

    for (let y = 0; y < height; y += 10) {
        for (let x = 0; x < width; x += 10) {
            const idx = (y * width + x) * 4;
            const key = `${x},${y}`;

            if (visited.has(key)) continue;

            // Check for consistent color/brightness (watermark characteristic)
            const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;

            if (brightness > 200 || brightness < 50) {
                const region = growRegion(data, width, height, x, y, threshold, visited);

                if (region.width > 50 && region.height > 20) {
                    regions.push(region);
                }
            }
        }
    }

    return regions;
};

/**
 * Detect text-like patterns using edge detection
 */
const detectTextPatterns = (data, width, height, sensitivity) => {
    const regions = [];
    const edgeMap = detectEdges(data, width, height);

    // Look for horizontal text patterns
    for (let y = 0; y < height - 20; y += 5) {
        for (let x = 0; x < width - 100; x += 10) {
            let edgeCount = 0;

            // Sample horizontal strip
            for (let dx = 0; dx < 100; dx += 2) {
                for (let dy = 0; dy < 20; dy += 2) {
                    const idx = ((y + dy) * width + (x + dx));
                    if (edgeMap[idx]) edgeCount++;
                }
            }

            // If high edge density, likely text
            if (edgeCount > 50 * sensitivity) {
                regions.push({
                    x: Math.max(0, x - 10),
                    y: Math.max(0, y - 5),
                    width: Math.min(120, width - x),
                    height: Math.min(30, height - y),
                    type: 'text'
                });
            }
        }
    }

    return mergeOverlappingRegions(regions);
};

/**
 * Detect repeated patterns (tiled watermarks)
 */
const detectRepeatedPatterns = (data, width, height, sensitivity) => {
    const regions = [];
    const patchSize = 50;
    const stride = 100;

    // Sample patches across the image
    const patches = [];
    for (let y = 0; y < height - patchSize; y += stride) {
        for (let x = 0; x < width - patchSize; x += stride) {
            const patch = extractPatch(data, width, x, y, patchSize);
            patches.push({ x, y, data: patch });
        }
    }

    // Find similar patches (repeated patterns)
    for (let i = 0; i < patches.length; i++) {
        let matchCount = 0;

        for (let j = i + 1; j < patches.length; j++) {
            const similarity = calculateSimilarity(patches[i].data, patches[j].data);

            if (similarity > 0.8) {
                matchCount++;
            }
        }

        // If pattern repeats, mark as watermark
        if (matchCount > 2 * sensitivity) {
            regions.push({
                x: patches[i].x,
                y: patches[i].y,
                width: patchSize,
                height: patchSize,
                type: 'pattern'
            });
        }
    }

    return regions;
};

/**
 * Simple edge detection using Sobel operator
 */
const detectEdges = (data, width, height) => {
    const edgeMap = new Uint8Array(width * height);

    const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
    const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            let gx = 0, gy = 0;

            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {
                    const idx = ((y + ky) * width + (x + kx)) * 4;
                    const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
                    const kernelIdx = (ky + 1) * 3 + (kx + 1);

                    gx += brightness * sobelX[kernelIdx];
                    gy += brightness * sobelY[kernelIdx];
                }
            }

            const magnitude = Math.sqrt(gx * gx + gy * gy);
            edgeMap[y * width + x] = magnitude > 50 ? 1 : 0;
        }
    }

    return edgeMap;
};

/**
 * Grow region from seed point
 */
const growRegion = (data, width, height, startX, startY, threshold, visited) => {
    const queue = [[startX, startY]];
    let minX = startX, maxX = startX, minY = startY, maxY = startY;

    const startIdx = (startY * width + startX) * 4;
    const targetBrightness = (data[startIdx] + data[startIdx + 1] + data[startIdx + 2]) / 3;

    while (queue.length > 0 && queue.length < 1000) {
        const [x, y] = queue.shift();
        const key = `${x},${y}`;

        if (visited.has(key)) continue;
        visited.add(key);

        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);

        // Check neighbors
        const neighbors = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];

        for (const [nx, ny] of neighbors) {
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                const nKey = `${nx},${ny}`;
                if (!visited.has(nKey)) {
                    const idx = (ny * width + nx) * 4;
                    const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;

                    if (Math.abs(brightness - targetBrightness) < threshold) {
                        queue.push([nx, ny]);
                    }
                }
            }
        }
    }

    return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
        type: 'region'
    };
};

/**
 * Extract image patch
 */
const extractPatch = (data, width, x, y, size) => {
    const patch = [];

    for (let py = 0; py < size; py++) {
        for (let px = 0; px < size; px++) {
            const idx = ((y + py) * width + (x + px)) * 4;
            patch.push(data[idx], data[idx + 1], data[idx + 2]);
        }
    }

    return patch;
};

/**
 * Calculate similarity between two patches
 */
const calculateSimilarity = (patch1, patch2) => {
    if (patch1.length !== patch2.length) return 0;

    let sum = 0;
    for (let i = 0; i < patch1.length; i++) {
        const diff = Math.abs(patch1[i] - patch2[i]);
        sum += diff;
    }

    const avgDiff = sum / patch1.length;
    return 1 - (avgDiff / 255);
};

/**
 * Merge overlapping regions
 */
const mergeOverlappingRegions = (regions) => {
    if (regions.length === 0) return [];

    const merged = [];
    const used = new Set();

    for (let i = 0; i < regions.length; i++) {
        if (used.has(i)) continue;

        let current = { ...regions[i] };
        used.add(i);

        for (let j = i + 1; j < regions.length; j++) {
            if (used.has(j)) continue;

            if (regionsOverlap(current, regions[j])) {
                current = mergeRegions(current, regions[j]);
                used.add(j);
            }
        }

        merged.push(current);
    }

    return merged;
};

/**
 * Check if two regions overlap
 */
const regionsOverlap = (r1, r2) => {
    return !(r1.x + r1.width < r2.x ||
        r2.x + r2.width < r1.x ||
        r1.y + r1.height < r2.y ||
        r2.y + r2.height < r1.y);
};

/**
 * Merge two regions
 */
const mergeRegions = (r1, r2) => {
    const minX = Math.min(r1.x, r2.x);
    const minY = Math.min(r1.y, r2.y);
    const maxX = Math.max(r1.x + r1.width, r2.x + r2.width);
    const maxY = Math.max(r1.y + r1.height, r2.y + r2.height);

    return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
        type: r1.type
    };
};

/**
 * Calculate detection confidence
 */
const calculateConfidence = (regions, width, height) => {
    if (regions.length === 0) return 0;

    const totalArea = width * height;
    const detectedArea = regions.reduce((sum, r) => sum + (r.width * r.height), 0);
    const coverage = detectedArea / totalArea;

    // Confidence based on coverage and number of regions
    const confidence = Math.min(0.95, coverage * 2 + regions.length * 0.1);

    return confidence;
};

/**
 * Create selection mask from manual brush strokes
 */
export const createBrushMask = (canvas, strokes) => {
    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = canvas.width;
    maskCanvas.height = canvas.height;
    const ctx = maskCanvas.getContext('2d');

    ctx.fillStyle = 'rgba(255, 100, 100, 0.7)';

    strokes.forEach(stroke => {
        ctx.beginPath();
        ctx.arc(stroke.x, stroke.y, stroke.size, 0, Math.PI * 2);
        ctx.fill();
    });

    return maskCanvas;
};
