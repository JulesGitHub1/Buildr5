const fs = require('fs');
const { createCanvas } = require('canvas');

// Create the images directory if it doesn't exist
const imagesDir = './images';
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

// Building colors - using a variety of architectural colors
const buildingColors = [
    '#607D8B', // Blue Grey
    '#795548', // Brown
    '#9E9E9E', // Grey
    '#455A64', // Dark Blue Grey
    '#5D4037', // Dark Brown
    '#616161', // Dark Grey
    '#263238', // Very Dark Blue Grey
    '#3E2723', // Very Dark Brown
    '#212121'  // Very Dark Grey
];

// Generate 9 building images
for (let i = 1; i <= 9; i++) {
    // Create a canvas (800x1200 - portrait orientation for mobile)
    const canvas = createCanvas(800, 1200);
    const ctx = canvas.getContext('2d');
    
    // Fill background with building color
    ctx.fillStyle = buildingColors[i - 1];
    ctx.fillRect(0, 0, 800, 1200);
    
    // Add some architectural elements to make it look like a building
    // Windows
    ctx.fillStyle = '#FFFFFF';
    const windowSize = 60;
    const windowSpacing = 100;
    const windowRows = 10;
    const windowCols = 6;
    
    for (let row = 0; row < windowRows; row++) {
        for (let col = 0; col < windowCols; col++) {
            // Add some randomness to window appearance
            if (Math.random() > 0.2) { // 80% chance of having a window
                ctx.globalAlpha = 0.3 + Math.random() * 0.7; // Random opacity
                ctx.fillRect(
                    100 + col * windowSpacing, 
                    150 + row * windowSpacing, 
                    windowSize, 
                    windowSize
                );
            }
        }
    }
    
    // Reset opacity
    ctx.globalAlpha = 1.0;
    
    // Add some architectural details
    ctx.fillStyle = '#000000';
    ctx.globalAlpha = 0.3;
    
    // Horizontal lines (floors)
    for (let floor = 1; floor < windowRows; floor++) {
        ctx.fillRect(50, 150 + floor * windowSpacing - 20, 700, 10);
    }
    
    // Vertical lines (structural elements)
    for (let column = 0; column <= windowCols; column++) {
        ctx.fillRect(100 + column * windowSpacing - 20, 100, 10, 1000);
    }
    
    // Reset opacity
    ctx.globalAlpha = 1.0;
    
    // Save the image
    const buffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync(`${imagesDir}/building${i}.jpg`, buffer);
    
    console.log(`Generated building${i}.jpg`);
}

console.log('All building images generated successfully!');
