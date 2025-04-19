# BUILDR

A mobile-optimized web app that lets users swipe on images of buildings in a TikTok-like format.

## Features

- Swipe up to like a building, swipe down to dislike
- Conditional navigation based on swipe feedback (if-then logic for next image)
- Mobile-optimized interface
- Desktop testing support with mouse interactions
- No descriptive text on images for a clean interface

## How It Works

The app uses a predefined flow of images based on user feedback:

- When a user likes an image (swipes up), they are shown a specific predetermined next image
- When a user dislikes an image (swipes down), they are shown a different predetermined next image
- This creates a personalized experience based on the user's preferences

## Testing Instructions

### Mobile Testing

1. Open the app on a mobile device
2. Swipe up on a building image to like it
3. Swipe down on a building image to dislike it
4. Notice how the next image shown depends on your swipe direction

### Desktop Testing

The app also supports mouse interactions for desktop testing:

1. Click and drag up on a building image to like it
2. Click and drag down on a building image to dislike it
3. The same conditional navigation applies

## Running the App

1. Open the `index.html` file in a web browser
2. For the best experience, use a mobile device or mobile emulator
3. Alternatively, you can use a local server:
   ```
   npx http-server
   ```

## Technical Details

- Pure HTML, CSS, and JavaScript implementation
- No external libraries or frameworks required
- SVG images for buildings with randomized architectural elements
- Touch and mouse event handling for cross-device compatibility
